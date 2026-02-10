# 📝 Registration App

A complete full-stack user registration application built with Node.js, Express, and MySQL. Features user registration, login, and a dashboard to manage users.

![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![Express](https://img.shields.io/badge/Express-v4.18-blue)
![MySQL](https://img.shields.io/badge/MySQL-v8.0-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- ✅ **User Registration** - Complete signup with validation
- 🔐 **Secure Authentication** - Password hashing with bcrypt
- 📊 **User Dashboard** - View all registered users
- 🎨 **Modern UI** - Responsive and beautiful design
- ✅ **Form Validation** - Client and server-side validation
- 🗄️ **MySQL Database** - Robust data storage
- 🚀 **RESTful API** - Clean API architecture
- 📱 **Responsive Design** - Works on all devices

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3 (Custom styling with CSS variables)
- Vanilla JavaScript (ES6+)

### Backend
- Node.js
- Express.js
- MySQL2 (Promise-based)
- bcryptjs (Password hashing)
- express-validator (Input validation)
- dotenv (Environment variables)
- cors (Cross-origin resource sharing)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/)
- **npm** (comes with Node.js)
- A code editor (VS Code recommended)

## 🚀 Installation & Setup

### Step 1: Clone or Download the Project

```bash
# If you have git
git clone <your-repo-url>
cd registration-app

# Or download and extract the ZIP file
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up MySQL Database

**Option A: Using MySQL Command Line**

```bash
# Login to MySQL
mysql -u root -p

# Run the database setup script
source database.sql

# Or manually run:
mysql -u root -p < database.sql
```

**Option B: Using MySQL Workbench**
1. Open MySQL Workbench
2. Connect to your MySQL server
3. File → Run SQL Script
4. Select `database.sql`
5. Click "Run"

### Step 4: Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your database credentials
nano .env  # or use any text editor
```

Update the `.env` file:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=registrationdb
DB_PORT=3306

# Server Configuration
PORT=3000
NODE_ENV=development

# Security
JWT_SECRET=your_random_secret_key_here
```

### Step 5: Start the Application

```bash
# Development mode (auto-restart on changes)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## 📂 Project Structure

```
registration-app/
├── config/
│   └── database.js          # Database configuration
├── middleware/
│   └── validation.js        # Input validation middleware
├── routes/
│   └── users.js            # User routes (register, login, CRUD)
├── public/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   └── js/
│       └── app.js          # Frontend JavaScript utilities
├── views/
│   ├── index.html          # Home page
│   ├── register.html       # Registration page
│   ├── login.html          # Login page
│   └── dashboard.html      # User dashboard
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore file
├── database.sql            # Database schema
├── package.json            # Project dependencies
├── server.js               # Main server file
└── README.md               # This file
```

## 🔌 API Endpoints

### User Registration & Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/users/register` | Register a new user | No |
| POST | `/api/users/login` | Login user | No |
| GET | `/api/users` | Get all users | No* |
| GET | `/api/users/:id` | Get user by ID | No* |
| DELETE | `/api/users/:id` | Delete user | No* |
| GET | `/health` | Health check | No |

*In production, these should be protected with authentication

### Example API Requests

**Register User:**
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "fullname": "Test User",
    "phone": "+1234567890"
  }'
```

**Login User:**
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Get All Users:**
```bash
curl http://localhost:3000/api/users
```

## 🎯 Usage

### 1. Home Page (`/`)
- Overview of the application
- Links to register and login

### 2. Registration (`/register`)
- Fill out the registration form
- Validation feedback in real-time
- Create your account

### 3. Login (`/login`)
- Sign in with email and password
- Remember me option
- Redirects to dashboard on success

### 4. Dashboard (`/dashboard`)
- View all registered users
- See statistics (total users, recent users, active users)
- View and delete users
- Logout option

## 🔒 Security Features

- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ SQL injection prevention (parameterized queries)
- ✅ Input validation (server and client-side)
- ✅ XSS protection
- ✅ CORS enabled
- ✅ Environment variables for sensitive data

## 🧪 Testing

### Manual Testing

1. **Test Registration:**
   - Go to `/register`
   - Try invalid inputs (validation should prevent submission)
   - Register with valid data
   - Try duplicate username/email (should fail)

2. **Test Login:**
   - Go to `/login`
   - Try wrong credentials (should fail)
   - Login with correct credentials (should succeed)

3. **Test Dashboard:**
   - View all users
   - Check statistics
   - Delete a user
   - Refresh the list

### Sample Test Users

The database includes sample users (password: `password123`):
- **Username:** john_doe, **Email:** john@example.com
- **Username:** jane_smith, **Email:** jane@example.com
- **Username:** demo_user, **Email:** demo@example.com

## 🐛 Troubleshooting

### Common Issues

**1. Database Connection Failed**
```
❌ Database connection failed: Access denied for user
```
**Solution:** Check your `.env` file and ensure DB_USER and DB_PASSWORD are correct

**2. Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:** Change PORT in `.env` or kill the process using port 3000:
```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>
```

**3. Module Not Found**
```
Error: Cannot find module 'express'
```
**Solution:** Install dependencies:
```bash
npm install
```

**4. CORS Error**
**Solution:** Ensure CORS is enabled in server.js (already included)

## 🚀 Deployment

### Deploy to AWS EC2

Follow the AWS deployment guide provided in the project documentation.

### Deploy to Heroku

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add MySQL database (ClearDB or JawsDB)
heroku addons:create cleardb:ignite

# Set environment variables
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Open app
heroku open
```

### Deploy to DigitalOcean

1. Create a Droplet (Ubuntu 22.04)
2. SSH into droplet
3. Install Node.js and MySQL
4. Clone repository
5. Configure environment
6. Use PM2 to keep app running
7. Configure Nginx as reverse proxy

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| DB_HOST | MySQL host | localhost |
| DB_USER | MySQL username | root |
| DB_PASSWORD | MySQL password | mypassword |
| DB_NAME | Database name | registrationdb |
| DB_PORT | MySQL port | 3306 |
| PORT | Server port | 3000 |
| NODE_ENV | Environment | development/production |
| JWT_SECRET | Secret key for JWT | random_string_here |

## 📝 Future Enhancements

- [ ] Add JWT authentication
- [ ] Email verification
- [ ] Password reset functionality
- [ ] User profile editing
- [ ] File upload (profile pictures)
- [ ] Role-based access control (Admin/User)
- [ ] Search and filter users
- [ ] Pagination for user list
- [ ] Activity logs
- [ ] Two-factor authentication (2FA)
- [ ] Social login (Google, Facebook)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Your Name
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Node.js community
- Express.js team
- MySQL team
- All contributors

## 📞 Support

If you have any questions or need help, please:
- Open an issue
- Email: your.email@example.com
- Join our Discord: [link]

---

**Happy Coding! 🚀**

Made with ❤️ by [Your Name]