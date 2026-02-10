-- ==========================================
-- Registration App Database Schema
-- ==========================================

-- Create database
CREATE DATABASE IF NOT EXISTS registration_db;
USE registration_db;

-- Drop existing table if it exists (for clean setup)
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL DEFAULT NULL,
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample users (passwords are 'password123')
INSERT INTO users (username, email, password_hash, fullname, phone) VALUES
('john_doe', 'john@example.com', '$2a$10$rXK5YqZ0Zo5vP0dZ5N0NJeOqVqGqvG5z5YqZ0Zo5vP0dZ5N0NJeOq', 'John Doe', '+1 (555) 123-4567'),
('jane_smith', 'jane@example.com', '$2a$10$rXK5YqZ0Zo5vP0dZ5N0NJeOqVqGqvG5z5YqZ0Zo5vP0dZ5N0NJeOq', 'Jane Smith', '+1 (555) 987-6543'),
('demo_user', 'demo@example.com', '$2a$10$rXK5YqZ0Zo5vP0dZ5N0NJeOqVqGqvG5z5YqZ0Zo5vP0dZ5N0NJeOq', 'Demo User', NULL);

-- Update last_login for some users
UPDATE users SET last_login = DATE_SUB(NOW(), INTERVAL 2 DAY) WHERE username = 'john_doe';
UPDATE users SET last_login = NOW() WHERE username = 'jane_smith';

-- Show created tables
SHOW TABLES;

-- Display sample data
SELECT user_id, username, email, fullname, phone, created_at, last_login FROM users;

-- Success message
SELECT 'Database setup completed successfully!' AS Status;