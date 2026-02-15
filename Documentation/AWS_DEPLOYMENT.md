# 🚀 AWS Deployment Guide - Registration App

Complete step-by-step guide to deploy your Registration App on AWS cloud.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Option 1: EC2 + MySQL (Recommended)](#option-1-ec2--mysql-recommended)
3. [Option 2: EC2 + RDS](#option-2-ec2--rds-managed-database)
4. [Domain Setup (Optional)](#domain-setup-optional)
5. [SSL Certificate (Optional)](#ssl-certificate-optional)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- AWS Account (Free tier available)
- Basic terminal knowledge
- Your application code ready

**Estimated Cost:**
- Free Tier: $0/month (first 12 months)
- After Free Tier: $8-15/month

---

## Option 1: EC2 + MySQL (Recommended)

### Step 1: Launch EC2 Instance

1. **Login to AWS Console**
   - Go to https://console.aws.amazon.com
   - Navigate to EC2 Dashboard

2. **Launch Instance**
   - Click "Launch Instance"

3. **Configure Instance:**

   **Name:** `registration-app-server`
   
   **OS Image:**
   - Select "Ubuntu Server 22.04 LTS" (Free tier)
   
   **Instance Type:**
   - `t2.micro` (1 vCPU, 1GB RAM - Free tier)
   
   **Key Pair:**
   - Click "Create new key pair"
   - Name: `registration-app-key`
   - Type: RSA
   - Format: `.pem` (Mac/Linux) or `.ppk` (Windows)
   - Download and **save securely**
   
   **Network Settings:**
   - Create security group: `registration-app-sg`
   - Add these inbound rules:
     ```
     SSH          Port 22    Source: My IP
     HTTP         Port 80    Source: Anywhere (0.0.0.0/0)
     Custom TCP   Port 3000  Source: Anywhere (0.0.0.0/0)
     ```
   
   **Storage:**
   - 20 GB (Free tier: up to 30GB)

4. **Launch Instance**
   - Click "Launch Instance"
   - Wait 2-3 minutes for initialization

---

### Step 2: Connect to EC2

**Get Public IP:**
- EC2 Dashboard → Instances → Select your instance
- Copy "Public IPv4 address"

**For Mac/Linux:**
```bash
# Set permissions on key
chmod 400 registration-app-key.pem

# Connect
ssh -i "registration-app-key.pem" ubuntu@YOUR-PUBLIC-IP
```

**For Windows (PuTTY):**
1. Convert `.pem` to `.ppk` using PuTTYgen
2. Open PuTTY
3. Host: `ubuntu@YOUR-PUBLIC-IP`
4. SSH → Auth → Browse to `.ppk` file
5. Click "Open"

---

### Step 3: Install Node.js

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version  # Should show v18.x.x
npm --version

# Install Git
sudo apt install git -y
```

---

### Step 4: Install MySQL

```bash
# Install MySQL
sudo apt install mysql-server -y

# Start MySQL
sudo systemctl start mysql
sudo systemctl enable mysql

# Secure installation
sudo mysql_secure_installation
```

**During secure installation:**
- Validate password plugin: Y
- Password level: 2 (strong)
- Root password: **[Create strong password - SAVE IT!]**
- Remove anonymous users: Y
- Disallow root remote login: Y
- Remove test database: Y
- Reload privileges: Y

---

### Step 5: Setup Database

```bash
# Login to MySQL
sudo mysql -u root -p
# Enter root password
```

**In MySQL prompt:**
```sql
-- Create database
CREATE DATABASE registration_db;

-- Create user
CREATE USER 'reg_user'@'localhost' IDENTIFIED BY 'RegUserPass123!';

-- Grant privileges
GRANT ALL PRIVILEGES ON registration_db.* TO 'reg_user'@'localhost';
FLUSH PRIVILEGES;

-- Use database
USE registration_db;

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
    INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Verify
SHOW TABLES;
DESCRIBE users;

-- Exit
EXIT;
```

---

### Step 6: Deploy Application

**Method A: Upload via Git (Recommended)**

```bash
# Clone from GitHub
cd ~
git clone https://github.com/Christianchika/Reg-App.git
cd Reg-App

# If you don't have GitHub, use Method B
```

**Method B: Upload via SCP (from your computer)**

```bash
# On YOUR LOCAL MACHINE (not EC2):
cd /path/to/registration-app

# Upload entire directory
scp -i "registration-app-key.pem" -r . ubuntu@YOUR-PUBLIC-IP:~/registration-app
```

---

### Step 7: Configure Application

```bash
# Navigate to app directory
cd ~/registration-app

# Install dependencies
npm install

# Create .env file
nano .env
```

**Add this to .env:**
```env
DB_HOST=localhost
DB_USER=appuser
DB_PASSWORD=StrongPassword123!
DB_NAME=registrationdb
DB_PORT=3306
PORT=3000
NODE_ENV=production
JWT_SECRET=your-random-secret-key-here-change-this
```

Save: `Ctrl+X` → `Y` → `Enter`

---

### Step 8: Test Application

```bash
# Test run
npm start

# You should see:
# ✅ Database connected successfully
# 🚀 Server running on port 3000
```

**Test in browser:**
- Open: `http://YOUR-PUBLIC-IP:3000`
- You should see the home page!

Press `Ctrl+C` to stop the server.

---

### Step 9: Keep App Running with PM2

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start app with PM2
pm2 start server.js --name registration-app

# Auto-start on reboot
pm2 startup systemd
# Copy and run the command it outputs

pm2 save

# Check status
pm2 status

# View logs
pm2 logs registration-app
```

**Useful PM2 commands:**
```bash
pm2 restart registration-app  # Restart
pm2 stop registration-app     # Stop
pm2 delete registration-app   # Remove
pm2 logs registration-app     # View logs
pm2 monit                     # Monitor
```

---

### Step 10: Setup Nginx (Optional - for Port 80)

```bash
# Install Nginx
sudo apt install nginx -y

# Create config
sudo nano /etc/nginx/sites-available/registration-app
```

**Add this configuration:**
```nginx
server {
    listen 80;
    server_name YOUR-PUBLIC-IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/registration-app /etc/nginx/sites-enabled/

# Remove default
sudo rm /etc/nginx/sites-enabled/default

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

**Update Security Group:**
- AWS Console → EC2 → Security Groups
- Select your security group
- Edit inbound rules
- You can now remove port 3000 (keep only 22 and 80)

**Access your app:**
- `http://YOUR-PUBLIC-IP` (no port needed!)

---

## Option 2: EC2 + RDS (Managed Database)

### Advantages:
- Automated backups
- Easy scaling
- High availability
- Managed updates

### Cost:
- ~$15-25/month (no free tier for RDS MySQL)

### Steps:

1. **Launch EC2** (same as Option 1, Steps 1-3)

2. **Create RDS Instance:**
   - AWS Console → RDS
   - Create database
   - Engine: MySQL
   - Template: Free tier (if available) or Dev/Test
   - DB instance identifier: `registration-db`
   - Master username: `admin`
   - Master password: **[Create strong password]**
   - DB instance class: `db.t3.micro`
   - Storage: 20 GB
   - VPC: Same as EC2
   - Public access: No
   - VPC security group: Create new → `rds-sg`
   - Database name: `registrationdb`

3. **Configure Security Group:**
   - EC2 security group → RDS security group
   - Inbound rule: MySQL/Aurora (3306) from EC2 security group

4. **Update .env:**
   ```env
   DB_HOST=your-rds-endpoint.rds.amazonaws.com
   DB_USER=admin
   DB_PASSWORD=your-rds-password
   DB_NAME=registrationdb
   DB_PORT=3306
   ```

5. **Create Tables:**
   ```bash
   # From EC2, connect to RDS
   mysql -h your-rds-endpoint.rds.amazonaws.com -u admin -p
   
   # Run database.sql commands
   ```

---

## Domain Setup (Optional)

### Step 1: Purchase Domain
- Use Namecheap, GoDaddy, or Route 53

### Step 2: Configure DNS

**Using Route 53:**
1. Create hosted zone for your domain
2. Create A record:
   - Name: @ (or subdomain)
   - Type: A
   - Value: YOUR-EC2-PUBLIC-IP

**Using External Registrar:**
1. Go to DNS settings
2. Add A record:
   - Host: @ or www
   - Points to: YOUR-EC2-PUBLIC-IP
   - TTL: 3600

### Step 3: Update Nginx Config

```bash
sudo nano /etc/nginx/sites-available/registration-app
```

Change `server_name`:
```nginx
server_name yourdomain.com www.yourdomain.com;
```

```bash
sudo systemctl restart nginx
```

Wait 5-60 minutes for DNS propagation.

---

## SSL Certificate (Optional - Recommended)

### Free SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts:
# - Enter email
# - Agree to terms
# - Choose redirect (option 2)

# Test auto-renewal
sudo certbot renew --dry-run
```

Your site is now: `https://yourdomain.com` 🎉

---

## Troubleshooting

### Can't connect to EC2
```bash
# Check security group allows SSH from your IP
# Verify key file permissions
chmod 400 registration-app-key.pem
```

### Database connection failed
```bash
# Check MySQL is running
sudo systemctl status mysql

# Check credentials in .env
# Test connection
mysql -u appuser -p registrationdb
```

### App not accessible
```bash
# Check app is running
pm2 status

# Check logs
pm2 logs registration-app

# Check Nginx
sudo systemctl status nginx
sudo nginx -t
```

### Port 3000 blocked
```bash
# Check security group allows port 3000
# Or use Nginx on port 80
```

### Out of memory
```bash
# Add swap space
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## Maintenance Commands

```bash
# Update application code
cd ~/registration-app
git pull
npm install
pm2 restart registration-app

# Update system
sudo apt update && sudo apt upgrade -y

# Backup database
mysqldump -u appuser -p registrationdb > backup_$(date +%Y%m%d).sql

# View application logs
pm2 logs registration-app

# Monitor server
htop  # Install: sudo apt install htop -y
```

---

## Security Best Practices

1. **Keep software updated**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Configure firewall**
   ```bash
   sudo ufw allow 22
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw enable
   ```

3. **Regular backups**
   - Automate database backups
   - Use AWS snapshots for EC2

4. **Monitor logs**
   ```bash
   pm2 logs
   sudo tail -f /var/log/nginx/error.log
   ```

5. **Use environment variables**
   - Never commit passwords to Git
   - Use strong passwords

---

## Cost Optimization

1. **Use Free Tier**
   - t2.micro instance (12 months free)
   - 30 GB storage free

2. **Reserved Instances**
   - Save up to 75% for long-term

3. **Auto Scaling**
   - Scale down during low traffic

4. **Monitoring**
   - Set up billing alerts
   - Use CloudWatch

---

## Next Steps

- [ ] Set up automated backups
- [ ] Configure CloudWatch monitoring
- [ ] Add SSL certificate
- [ ] Set up custom domain
- [ ] Configure email notifications
- [ ] Add more security layers
- [ ] Set up CI/CD pipeline

---

**Congratulations! 🎉**

Your Registration App is now live on AWS!

**Support:**
- AWS Documentation: https://docs.aws.amazon.com
- Community Forums: https://forums.aws.amazon.com
- Stack Overflow: https://stackoverflow.com

---

Made with ❤️ for AWS deployment