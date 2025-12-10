# 🚀 Koyeb Environment Setup - متغيرات البيئة الكاملة

## متغيرات البيئة المطلوبة على Koyeb

انسخ وعدّل بيانات MySQL من CPanel وأضفها إلى Koyeb. اتبع هذه الخطوات:

### 1. **في لوحة تحكم Koyeb**, انتقل إلى:
- الخدمة (Service) → الإعدادات (Settings) → متغيرات البيئة (Environment Variables)

### 2. **أضف هذه المتغيرات بالضبط:**

```bash
# ========================================
# DATABASE CONFIGURATION (من CPanel)
# ========================================
DB_DIALECT=mysql
DB_HOST=102.213.180.22
DB_PORT=3306
DB_USER=ishro_user
DB_PASSWORD=@Dm1ns$$2025
DB_NAME=ishroly_u7eundf
DB_LOGGING=false

# ========================================
# SERVER CONFIGURATION
# ========================================
NODE_ENV=production
PORT=8000
API_PREFIX=/api

# ========================================
# JWT CONFIGURATION
# ========================================
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRE=30d

# ========================================
# FRONTEND URL
# ========================================
FRONTEND_URL=https://ishro.ly
FRONTEND_PRODUCTION_URL=https://ishro.ly

# ========================================
# MOAMALAT PAYMENT GATEWAY
# ========================================
MOAMALAT_MID=10081014649
MOAMALAT_TID=99179395
MOAMALAT_SECRET=3a488a89b3f7993476c252f017c488bb
MOAMALAT_ENV=production

# ========================================
# LOGGING
# ========================================
LOG_LEVEL=info
LOG_FILE=logs/app.log

# ========================================
# SECURITY
# ========================================
BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# ========================================
# SESSION CONFIGURATION
# ========================================
SESSION_SECRET=your_session_secret_key_64_hex_characters_change_in_production

# ========================================
# SECURITY FEATURES
# ========================================
ENABLE_2FA=true
ENABLE_DEVICE_FINGERPRINTING=true
ENABLE_CSRF_PROTECTION=true
ENABLE_XSS_PROTECTION=true
ENABLE_SQL_INJECTION_PREVENTION=true
MAX_CONCURRENT_SESSIONS=3
SESSION_TIMEOUT=1800000
TWO_FA_TIMEOUT=300000
ACCOUNT_LOCKOUT_DURATION=900000
MAX_LOGIN_ATTEMPTS=5
```

## ✅ التحقق من النشر

بعد نشر المتغيرات، تحقق من:

1. **فحص الـ Health Check:**
   ```bash
   curl https://eishro-backend-xxxx.koyeb.app/health
   ```

2. **استجابة ناجحة:**
   ```json
   {
     "status": "ok",
     "timestamp": "2025-12-10T22:45:38.000Z",
     "environment": "production"
   }
   ```

3. **فحص الاتصال بقاعدة البيانات:**
   ```bash
   curl https://eishro-backend-xxxx.koyeb.app/api/health/db
   ```

## 📋 ملاحظات مهمة

- **عدم تغيير PORT**: يجب أن يبقى `8000` (هذا هو المنفذ الافتراضي في Koyeb)
- **MySQL HOST**: `102.213.180.22` يجب أن يكون قابلاً للوصول من Koyeb (تحقق من الجدار الناري في CPanel)
- **كلمة المرور**: `@Dm1ns$$2025` (تحتوي على أحرف خاصة، تأكد من عدم تغييرها)
- **NODE_ENV**: يجب أن يكون `production` دائماً على Koyeb

## 🔧 تجميع الملفات المحدثة

```bash
# 1. بناء Docker image محلياً
docker build -t eishro-backend .

# 2. اختبار محلياً
docker run -e DB_HOST=102.213.180.22 \
  -e DB_USER=ishro_user \
  -e DB_PASSWORD="@Dm1ns\$\$2025" \
  -e DB_NAME=ishroly_u7eundf \
  -p 8000:8000 \
  eishro-backend

# 3. اختبار Health Check
curl http://localhost:8000/health
```

## 🐛 حل المشاكل

### مشكلة: Health Check يفشل
**السبب**: قد تكون database غير متصلة
**الحل**: تحقق من متغيرات البيئة في Koyeb وتأكد من الاتصال بـ MySQL

### مشكلة: CORS Errors
**السبب**: النطاق غير مدرج في قائمة السماح
**الحل**: تم إضافة `ishro.ly` و `www.ishro.ly` إلى `app.ts` بالفعل

### مشكلة: Container يتوقف بعد النشر
**السبب**: قد يكون هناك خطأ في التشغيل
**الحل**: تحقق من السجلات (Logs) في لوحة Koyeb
