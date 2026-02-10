# 🚀 Quick Start Guide - Registration App

## Prerequisites Checklist
- [ ] Node.js installed (v14+)
- [ ] MySQL installed (v8.0+)
- [ ] Terminal/Command Prompt access

## 5-Minute Setup

### 1️⃣ Install Dependencies (1 min)
```bash
cd registration-app
npm install
```

### 2️⃣ Setup Database (2 min)
```bash
# Login to MySQL
mysql -u root -p

# Run this command in MySQL:
source database.sql
# OR
exit
mysql -u root -p < database.sql
```

### 3️⃣ Configure Environment (1 min)
```bash
# Copy environment file
cp .env.example .env

# Edit .env and update these:
# DB_PASSWORD=your_mysql_password
```

### 4️⃣ Start the Server (1 min)
```bash
npm start
```

### 5️⃣ Open Browser
Visit: `http://localhost:3000`

## 🎯 What to Test

1. **Home Page** → http://localhost:3000
2. **Register** → Create a new account
3. **Login** → Sign in with your account
4. **Dashboard** → View all users

## 🧪 Sample Login Credentials

```
Email: john@example.com
Password: password123

Email: jane@example.com
Password: password123
```

## 🆘 Quick Troubleshooting

**Problem:** Database connection failed
**Fix:** Check DB_PASSWORD in `.env` file

**Problem:** Port 3000 in use
**Fix:** Change PORT in `.env` to 3001

**Problem:** npm install fails
**Fix:** Delete `node_modules` and run `npm install` again

## 📚 Full Documentation

See `README.md` for complete documentation including:
- API endpoints
- Deployment guides
- Security features
- Advanced configuration

## 🎉 You're Ready!

If you see "Server running on port 3000" and can access the home page, you're all set!

**Next Steps:**
1. Register your own account
2. Explore the dashboard
3. Read README.md for deployment to AWS
4. Customize the application

---

Need help? Check the README.md or open an issue.