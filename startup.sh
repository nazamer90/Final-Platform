#!/bin/bash

# EISHRO Platform Startup Script
# يتم تشغيل هذا الملف بعد رفع المشروع على CPanel

set -e

echo "═════════════════════════════════════════════════"
echo "   EISHRO Platform - Production Startup"
echo "═════════════════════════════════════════════════"
echo ""

# تحديد متغيرات البيئة
export NODE_ENV=production
export PORT=3000

echo "📦 Step 1: Installing Dependencies..."
npm install --production

echo ""
echo "📦 Step 2: Installing Backend Dependencies..."
cd backend
npm install --production
cd ..

echo ""
echo "📊 Step 3: Running Database Migrations..."
cd backend
npm run migrate || echo "⚠️  Migration warning (tables may already exist)"
cd ..

echo ""
echo "🔨 Step 4: Building Frontend..."
npm run build

echo ""
echo "📋 Step 5: Setting Permissions..."
chmod -R 755 dist/
chmod -R 755 uploads/
chmod -R 755 logs/

echo ""
echo "✅ Installation Complete!"
echo ""
echo "═════════════════════════════════════════════════"
echo "   Next Steps:"
echo "═════════════════════════════════════════════════"
echo "1. Copy .env.production to .env"
echo "   cp .env.production .env"
echo ""
echo "2. Update Database Credentials in .env"
echo "   - DB_PASSWORD"
echo "   - JWT_SECRET"
echo ""
echo "3. Start Backend with PM2:"
echo "   npm install -g pm2"
echo "   pm2 start ecosystem.config.js --env production"
echo ""
echo "4. Enable Reverse Proxy in CPanel:"
echo "   ProxyPass / http://localhost:3000/"
echo ""
echo "5. Enable SSL with AutoSSL"
echo ""
echo "═════════════════════════════════════════════════"
