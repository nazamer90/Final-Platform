# 🗄️ MySQL Database Setup Guide - EISHRO Platform

## Prerequisites

- MySQL 8.0 or later
- Node.js 18+
- npm 9+

## 1. Install MySQL

### Windows
```bash
# Download and install MySQL from https://dev.mysql.com/downloads/mysql/
# Or use Chocolatey
choco install mysql
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

### macOS
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

## 2. Create Database and User

```sql
-- Connect to MySQL as root
mysql -u root -p

-- Create database
CREATE DATABASE eishro_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user (replace 'your_password' with a strong password)
CREATE USER 'eishro_user'@'localhost' IDENTIFIED BY 'your_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON eishro_db.* TO 'eishro_user'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;

-- Exit
EXIT;
```

## 3. Configure Environment Variables

Create `.env` file in the backend directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=eishro_db
DB_USER=eishro_user
DB_PASSWORD=your_password
DB_LOGGING=false

# Security Configuration
ENCRYPTION_KEY=your-64-character-hex-encryption-key-here
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random-at-least-32-characters
BCRYPT_ROUNDS=12

# Other configurations...
NODE_ENV=development
PORT=3001
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

## 4. Generate Encryption Key

```bash
# Generate a secure 32-byte (64 hex characters) encryption key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 5. Run Database Migrations

```bash
cd backend

# Install dependencies
npm install

# Run migrations to create tables
npm run db:migrate

# Seed database with sample data
npm run db:seed
```

## 6. Verify Installation

```bash
# Test database connection
npm run dev

# Check logs for successful connection message
# ✅ Database connection established successfully
```

## 7. Database Backup Setup

### Automated Daily Backups

```bash
# Create backup
npm run db:backup

# List backups
npm run db:list

# Clean old backups (keep last 10)
npm run db:clean
```

### Manual Backup

```bash
# Full database backup
mysqldump -u eishro_user -p eishro_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore from backup
mysql -u eishro_user -p eishro_db < backup_file.sql
```

## 8. Security Configuration

### MySQL Security Best Practices

```sql
-- Connect as root and run:
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_strong_root_password';

-- Disable remote root login
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');

-- Remove anonymous users
DELETE FROM mysql.user WHERE User='';

-- Remove test database
DROP DATABASE IF EXISTS test;

-- Reload privileges
FLUSH PRIVILEGES;
```

### SSL/TLS Configuration

```ini
# my.cnf or my.ini
[mysqld]
ssl-ca=/path/to/ca.pem
ssl-cert=/path/to/server-cert.pem
ssl-key=/path/to/server-key.pem
require_secure_transport=ON
```

## 9. Performance Optimization

### MySQL Configuration (my.cnf)

```ini
[mysqld]
# Basic Settings
innodb_buffer_pool_size=1G
innodb_log_file_size=256M
max_connections=200

# UTF8 Support
character-set-server=utf8mb4
collation-server=utf8mb4_unicode_ci

# Query Cache
query_cache_size=256M
query_cache_type=1

# Performance
innodb_flush_log_at_trx_commit=2
innodb_flush_method=O_DIRECT
```

### Database Maintenance

```sql
-- Analyze tables for optimization
ANALYZE TABLE users, products, orders, payments;

-- Optimize tables
OPTIMIZE TABLE users, products, orders, payments;

-- Check for slow queries
SELECT * FROM performance_schema.events_statements_summary_by_digest
WHERE avg_timer_wait > 1000000000
ORDER BY avg_timer_wait DESC LIMIT 10;
```

## 10. Monitoring and Maintenance

### Health Check Queries

```sql
-- Database size
SELECT
  table_schema as 'Database',
  ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) as 'Size (MB)'
FROM information_schema.TABLES
WHERE table_schema = 'eishro_db'
GROUP BY table_schema;

-- Connection status
SHOW PROCESSLIST;

-- InnoDB status
SHOW ENGINE INNODB STATUS;
```

### Log Analysis

```bash
# Monitor error logs
tail -f /var/log/mysql/error.log

# Monitor general query log
tail -f /var/log/mysql/mysql.log
```

## 11. Troubleshooting

### Common Issues

#### Connection Refused
```bash
# Check if MySQL is running
sudo systemctl status mysql

# Start MySQL
sudo systemctl start mysql
```

#### Access Denied
```sql
-- Reset user password
ALTER USER 'eishro_user'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
```

#### Character Encoding Issues
```sql
-- Check database encoding
SELECT DEFAULT_CHARACTER_SET_NAME, DEFAULT_COLLATION_NAME
FROM information_schema.SCHEMATA
WHERE SCHEMA_NAME = 'eishro_db';

-- Convert to UTF8MB4 if needed
ALTER DATABASE eishro_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 12. Production Deployment

### Railway MySQL Setup

1. Add MySQL database to Railway project
2. Update environment variables in Railway
3. Run migrations: `npm run db:migrate`
4. Run seeds: `npm run db:seed`

### AWS RDS MySQL

1. Create RDS MySQL instance
2. Configure security groups
3. Update connection string
4. Enable automated backups
5. Set up read replicas for performance

## 13. Backup Strategy

### Daily Backups
- Full database backup every day at 2 AM
- Keep last 30 days of backups
- Store in encrypted S3 bucket

### Weekly Backups
- Full backup + transaction logs
- Keep last 12 weeks

### Monthly Backups
- Full backup for long-term retention
- Keep last 12 months

### Disaster Recovery
- Cross-region backup replication
- Point-in-time recovery capability
- Regular restore testing

---

## 📞 Support

For database-related issues:
- Check MySQL error logs: `/var/log/mysql/error.log`
- Verify connection settings in `.env`
- Test with: `mysql -u eishro_user -p eishro_db -e "SELECT 1"`

---

**Last Updated:** December 2024
**MySQL Version:** 8.0+
**EISHRO Version:** 7.0