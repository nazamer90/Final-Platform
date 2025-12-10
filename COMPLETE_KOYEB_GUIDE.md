# 🚀 دليل النشر الكامل على Koyeb - EISHRO Platform

## 📍 نقطة البداية

أنت في المرحلة الرابعة من النشر:
- ✅ Health Check جاهز
- ✅ متغيرات البيئة محدثة  
- ✅ MySQL connection config جاهز
- 🔄 بناء Docker image (حالياً)

---

## 🔧 المرحلة 4: بناء واختبار Docker image محلياً

### الخطوة 4.1: التحقق من Docker

```bash
docker --version
# Output: Docker version 20.10.0 or later
```

### الخطوة 4.2: بناء الصورة

```bash
cd backend
docker build -t eishro-backend:latest .

# أثناء البناء سترى:
# Step 1/10 : FROM node:18-alpine AS builder
# ...
# Successfully tagged eishro-backend:latest
```

### الخطوة 4.3: التحقق من الصورة

```bash
docker images | grep eishro-backend
# eishro-backend   latest   xxxxxxx   1 minute ago   2.5GB
```

### الخطوة 4.4: تشغيل الحاوية

```bash
docker run \
  --name eishro-backend-test \
  -e NODE_ENV=production \
  -e PORT=8000 \
  -e DB_HOST=102.213.180.22 \
  -e DB_PORT=3306 \
  -e DB_USER=ishro_user \
  -e DB_PASSWORD=@Dm1ns\$\$2025 \
  -e DB_NAME=ishroly_u7eundf \
  -e DB_DIALECT=mysql \
  -e JWT_SECRET=your_secret_key \
  -e SESSION_SECRET=your_session_secret \
  -p 8000:8000 \
  eishro-backend:latest
```

### الخطوة 4.5: اختبار من نافذة جديدة

```bash
# اختبر Health Check
curl http://localhost:8000/health

# النتيجة المتوقعة:
# {"status":"ok","timestamp":"2025-12-10T22:45:38.000Z","environment":"production"}

# اختبر API
curl http://localhost:8000/api/health

# يجب أن ترى استجابة من API
```

### الخطوة 4.6: عرض السجلات

```bash
docker logs eishro-backend-test -f

# اضغط Ctrl+C للإيقاف
```

### الخطوة 4.7: إيقاف الحاوية

```bash
docker stop eishro-backend-test
docker rm eishro-backend-test
```

---

## 🌐 المرحلة 5: النشر على Koyeb

### المتطلبات:
- ✅ حساب Koyeb
- ✅ المشروع على GitHub
- ✅ Docker image يعمل محلياً

### الخطوة 5.1: الدفع إلى GitHub

```bash
cd /path/to/project

# إضافة الملفات الجديدة
git add backend/test-mysql-connection.js \
         backend/.env.example \
         backend/app.ts \
         KOYEB_ENVIRONMENT_SETUP.md \
         RUN_TESTS.md \
         KOYEB_DEPLOYMENT_READY.md \
         COMPLETE_KOYEB_GUIDE.md

# إنشاء commit
git commit -m "
feat: Prepare for Koyeb deployment with CPanel MySQL

Changes:
- Add CORS support for ishro.ly domain
- Update MySQL connection credentials from CPanel
- Add MySQL connection test script
- Add comprehensive deployment guides
- Update environment configuration for production

Database Configuration:
- Host: 102.213.180.22
- Database: ishroly_u7eundf
- User: ishro_user

Testing:
- Test local MySQL connection with: node test-mysql-connection.js
- Test Docker image: docker build -t eishro-backend .
- Follow COMPLETE_KOYEB_GUIDE.md for full deployment

Co-authored-by: EISHRO Team <dev@eishro.ly>
"

# دفع إلى الفرع الرئيسي
git push origin main
```

### الخطوة 5.2: تسجيل الدخول إلى Koyeb

1. اذهب إلى https://app.koyeb.com
2. سجل دخولك بحسابك
3. اختر الخدمة الموجودة أو أنشئ خدمة جديدة

### الخطوة 5.3: إضافة متغيرات البيئة

**في لوحة Koyeb:**
1. انتقل إلى الخدمة
2. اختر "Settings" → "Environment Variables"
3. أضف كل متغير من هذه القائمة:

```ini
# Database
DB_DIALECT=mysql
DB_HOST=102.213.180.22
DB_PORT=3306
DB_USER=ishro_user
DB_PASSWORD=@Dm1ns$$2025
DB_NAME=ishroly_u7eundf
DB_LOGGING=false

# Server
NODE_ENV=production
PORT=8000
API_PREFIX=/api

# JWT (استخدم قيماً آمنة)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRE=30d

# Frontend
FRONTEND_URL=https://ishro.ly
FRONTEND_PRODUCTION_URL=https://ishro.ly

# Payment Gateway
MOAMALAT_MID=10081014649
MOAMALAT_TID=99179395
MOAMALAT_SECRET=3a488a89b3f7993476c252f017c488bb
MOAMALAT_ENV=production

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log

# Security
BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
SESSION_SECRET=your_session_secret_key_64_hex_characters
ENABLE_2FA=true
ENABLE_DEVICE_FINGERPRINTING=true
ENABLE_CSRF_PROTECTION=true
ENABLE_XSS_PROTECTION=true
ENABLE_SQL_INJECTION_PREVENTION=true
```

### الخطوة 5.4: النشر

بعد إضافة جميع المتغيرات:
1. اضغط "Save"
2. سيبدأ النشر تلقائياً
3. يمكنك مراقبة التقدم في "Deployments"

### الخطوة 5.5: التحقق من النشر

```bash
# استبدل eishro-backend-xxxx برابط خدمتك
KOYEB_URL=https://eishro-backend-xxxx.koyeb.app

# اختبر Health Check
curl $KOYEB_URL/health

# النتيجة:
# {"status":"ok","timestamp":"2025-12-10T22:45:38.000Z","environment":"production"}

# اختبر API
curl $KOYEB_URL/api/stores
```

### الخطوة 5.6: مراقبة السجلات

في لوحة Koyeb:
1. انتقل إلى الخدمة
2. اختر "Logs"
3. راقب السجلات المباشرة للتحقق من أي أخطاء

---

## 🔍 حل المشاكل الشائعة

### المشكلة 1: Health Check فشل
```
❌ Status: Health check failed
```

**الحل:**
```bash
# 1. تحقق من المتغيرات
curl https://eishro-backend-xxxx.koyeb.app/health

# 2. تحقق من السجلات في Koyeb
# 3. تأكد من وجود جميع المتغيرات البيئية
# 4. تحقق من الاتصال بـ MySQL
```

### المشكلة 2: خطأ في الاتصال بـ MySQL
```
❌ ER_ACCESS_DENIED_ERROR: Access denied for user 'ishro_user'
```

**الحل:**
```bash
# 1. تحقق من بيانات الاتصال
# 2. اختبر محلياً: node test-mysql-connection.js
# 3. تأكد من أن IP الخادم مسموح به في CPanel
# 4. قد تحتاج إلى إضافة IP Koyeb في whitelist
```

### المشكلة 3: Container يتوقف بعد البدء
```
❌ Container exited with code 1
```

**الحل:**
```bash
# 1. انظر إلى السجلات للتفاصيل
# 2. تأكد من أن PORT=8000 موجود
# 3. تحقق من أخطاء البناء في البرنامج
# 4. حاول البناء محلياً: docker build -t eishro-backend .
```

### المشكلة 4: CORS errors
```
❌ Access to XMLHttpRequest blocked by CORS policy
```

**الحل:**
- تم إضافة `ishro.ly` و `www.ishro.ly` إلى CORS بالفعل
- إذا أضفت نطاق جديد، حدث `backend/src/app.ts` وأضفه إلى قائمة `allowedOrigins`

---

## ✅ قائمة التحقق النهائية

- [ ] اختبر الاتصال بـ MySQL محلياً
- [ ] بناء Docker image بنجاح
- [ ] اختبر الحاوية محلياً
- [ ] دفع جميع التغييرات إلى GitHub
- [ ] أضفت جميع متغيرات البيئة على Koyeb
- [ ] النشر على Koyeb بنجاح
- [ ] Health Check يستجيب مع `{"status":"ok"}`
- [ ] API endpoint يعمل
- [ ] قاعدة البيانات متصلة بنجاح
- [ ] السجلات لا تظهر أخطاء

---

## 🎉 النجاح!

إذا وصلت إلى هنا، فإن Backend جاهز على Koyeb!

**الخطوة التالية: نشر الفرونتند على Vercel**

انتقل إلى `VERCEL_SETUP.md` لتشغيل واجهة المستخدم.

---

## 📞 معلومات سريعة

- **Koyeb Dashboard**: https://app.koyeb.com
- **Backend URL**: https://eishro-backend-xxxx.koyeb.app
- **GitHub Repository**: https://github.com/bennouba/Final-Platform
- **API Documentation**: https://eishro-backend-xxxx.koyeb.app/api

---

## 🛠️ أوامر مفيدة

```bash
# بناء الصورة
docker build -t eishro-backend:latest .

# تشغيل الحاوية
docker run -p 8000:8000 eishro-backend:latest

# مسح الحاويات القديمة
docker prune

# عرض السجلات المباشرة
docker logs -f <container-id>

# اختبار الاتصال بـ MySQL
node test-mysql-connection.js
```

---

## 📚 ملفات مرجعية

- `KOYEB_ENVIRONMENT_SETUP.md` - تفاصيل متغيرات البيئة
- `RUN_TESTS.md` - خطوات الاختبار
- `KOYEB_DEPLOYMENT_READY.md` - ملخص سريع
- `backend/test-mysql-connection.js` - اختبار MySQL
- `backend/app.ts` - تكوين CORS

---

**محدث**: 10 ديسمبر 2025
**الحالة**: ✅ جاهز للنشر على Koyeb
