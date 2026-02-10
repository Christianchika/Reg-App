const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');
const { 
    validateRegistration, 
    validateLogin, 
    handleValidationErrors 
} = require('../middleware/validation');

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', validateRegistration, handleValidationErrors, async (req, res) => {
    const { username, email, password, fullname, phone } = req.body;

    try {
        // Check if user already exists
        const [existingUsers] = await pool.query(
            'SELECT * FROM users WHERE email = ? OR username = ?',
            [email, username]
        );

        if (existingUsers.length > 0) {
            const existingUser = existingUsers[0];
            if (existingUser.email === email) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already registered'
                });
            }
            if (existingUser.username === username) {
                return res.status(400).json({
                    success: false,
                    message: 'Username already taken'
                });
            }
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password_hash, fullname, phone) VALUES (?, ?, ?, ?, ?)',
            [username, email, hashedPassword, fullname, phone || null]
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user_id: result.insertId,
                username,
                email,
                fullname
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
});

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post('/login', validateLogin, handleValidationErrors, async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const user = users[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Update last login time
        await pool.query(
            'UPDATE users SET last_login = NOW() WHERE user_id = ?',
            [user.user_id]
        );

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                fullname: user.fullname,
                phone: user.phone
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
});

// @route   GET /api/users
// @desc    Get all registered users
// @access  Public (in production, this should be protected)
router.get('/', async (req, res) => {
    try {
        const [users] = await pool.query(
            'SELECT user_id, username, email, fullname, phone, created_at, last_login FROM users ORDER BY created_at DESC'
        );

        res.json({
            success: true,
            count: users.length,
            data: users
        });

    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching users'
        });
    }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Public (in production, this should be protected)
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [users] = await pool.query(
            'SELECT user_id, username, email, fullname, phone, created_at, last_login FROM users WHERE user_id = ?',
            [id]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: users[0]
        });

    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching user'
        });
    }
});

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Public (in production, this should be protected)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            'DELETE FROM users WHERE user_id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'User deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting user'
        });
    }
});

module.exports = router;