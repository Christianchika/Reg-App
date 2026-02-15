// API Base URL
const API_URL = '/api';

// Show alert message
function showAlert(message, type = 'success') {
    const alertDiv = document.getElementById('alert');
    if (!alertDiv) return;

    alertDiv.className = `alert alert-${type} show`;
    alertDiv.textContent = message;

    // Auto hide after 5 seconds
    setTimeout(() => {
        hideAlert();
    }, 5000);
}

// Hide alert
function hideAlert() {
    const alertDiv = document.getElementById('alert');
    if (alertDiv) {
        alertDiv.classList.remove('show');
    }
}

// Show loading state
function showLoading(button) {
    if (!button) return;
    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.textContent = 'Loading...';
}

// Hide loading state
function hideLoading(button) {
    if (!button) return;
    button.disabled = false;
    button.textContent = button.dataset.originalText || button.textContent;
}

// Validate email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validate username
function isValidUsername(username) {
    const regex = /^[a-zA-Z0-9_]{3,50}$/;
    return regex.test(username);
}

// Validate password
function isValidPassword(password) {
    return password.length >= 6 && /\d/.test(password);
}

// Show form error
function showFormError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorDiv = document.getElementById(`${inputId}-error`);
    
    if (input) {
        input.classList.add('error');
    }
    
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
    }
}

// Clear form error
function clearFormError(inputId) {
    const input = document.getElementById(inputId);
    const errorDiv = document.getElementById(`${inputId}-error`);
    
    if (input) {
        input.classList.remove('error');
    }
    
    if (errorDiv) {
        errorDiv.textContent = '';
        errorDiv.classList.remove('show');
    }
}

// Clear all form errors
function clearAllFormErrors() {
    const errors = document.querySelectorAll('.form-error');
    errors.forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
    
    const inputs = document.querySelectorAll('.form-control.error');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Save user to localStorage
function saveUser(userData) {
    localStorage.setItem('currentUser', JSON.stringify(userData));
}

// Get current user from localStorage
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

// Clear current user
function clearCurrentUser() {
    localStorage.removeItem('currentUser');
}

// Check if user is logged in
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Redirect if not logged in
function requireLogin() {
    if (!isLoggedIn()) {
        window.location.href = '/login';
        return false;
    }
    return true;
}

// Logout function
function logout() {
    clearCurrentUser();
    window.location.href = '/';
}

// Make API request
async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add active class to current nav link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Clear alerts on click
    const alert = document.getElementById('alert');
    if (alert) {
        alert.addEventListener('click', hideAlert);
    }
});