# قائمة فحص النشر الكاملة - EISHRO Platform

## ✅ الإعدادات التقنية (تم إكمالها):

- [x] تحديث `Dockerfile` بـ multi-stage build
- [x] إنشاء `.dockerignore` 
- [x] إنشاء `fly.toml` لإعدادات Fly.io
- [x] إنشاء ملفات البيئة المرجعية
- [x] فحص TypeScript - ✅ لا توجد أخطاء

---

## 📋 قبل النشر - تجهيز البيانات:

### CPanel MySQL:

- [ ] تسجيل الدخول لـ CPanel
- [ ] الدخول إلى MySQL Databases
- [ ] إنشاء قاعدة بيانات جديدة (أو استخدام الموجودة)
  - اسم قاعدة البيانات: `eishro_db`
- [ ] إنشاء مستخدم MySQL جديد
  - Username: `eshro_user`
  - Password: (اختر كلمة مرور قوية)
- [ ] إعطاء المستخدم كل الصلاحيات على قاعدة البيانات
- [ ] تفعيل Remote Access للـ MySQL
  - في CPanel → Remote MySQL
  - أضف IP addresses المسموح بها أو اترك فارغاً لـ allow all
- [ ] احفظ:
  - `DB_HOST`: (عادة يكون localhost أو الـ server address)
  - `DB_USER`: `eshro_user`
  - `DB_PASSWORD`: (الكلمة التي اخترتها)
  - `DB_NAME`: `eishro_db`

### توليد Keys الأمنية:

أو في Command Prompt في مجلد Backend:

```cmd
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

احفظ النتائج:
- [ ] `JWT_SECRET` ← (مفتاح JWT عشوائي 64 حرف)
- [ ] `JWT_REFRESH_SECRET` ← (مفتاح Refresh عشوائي 64 حرف)
- [ ] `SESSION_SECRET` ← (مفتاح Session عشوائي 64 حرف)
- [ ] `ENCRYPTION_KEY` ← (مفتاح تشفير عشوائي 64 حرف)

---

## 🚀 نشر Backend على Fly.io:

### المرحلة 1: إعداد Fly.io:

- [ ] إنشاء حساب Fly.io: https://fly.io
- [ ] تثبيت Fly CLI:
  ```cmd
  # Windows (PowerShell)
  iwr https://fly.io/install.ps1 -useb | iex
  
  # أو macOS/Linux:
  curl -L https://fly.io/install.sh | sh
  ```
- [ ] تسجيل الدخول:
  ```cmd
  fly auth signup
  ```
  أو إذا كان لديك حساب بالفعل:
  ```cmd
  fly auth login
  ```

### المرحلة 2: نشر التطبيق:

```cmd
# 1. الدخول لمجلد Backend
cd backend

# 2. إنشاء التطبيق (اختر اسم فريد)
fly launch

# سيسأل:
# App name? → eishro-platform (اختر اسم)
# Region? → fra (Frankfurt - الأقرب لليبيا)
# Database? → No (عندك MySQL على CPanel)
```

- [ ] تم إنشاء التطبيق بنجاح

### المرحلة 3: إضافة متغيرات البيئة:

```cmd
fly secrets set NODE_ENV=production
fly secrets set PORT=8080
fly secrets set DB_HOST=your-cpanel-host-or-localhost
fly secrets set DB_PORT=3306
fly secrets set DB_USER=eshro_user
fly secrets set DB_PASSWORD=your-password
fly secrets set DB_NAME=eishro_db
fly secrets set JWT_SECRET=your-jwt-secret-from-above
fly secrets set JWT_EXPIRE=7d
fly secrets set JWT_REFRESH_SECRET=your-refresh-secret-from-above
fly secrets set JWT_REFRESH_EXPIRE=30d
fly secrets set SESSION_SECRET=your-session-secret-from-above
fly secrets set ENCRYPTION_KEY=your-encryption-key-from-above
fly secrets set FRONTEND_URL=https://your-frontend.vercel.app
fly secrets set MOAMALAT_MID=10081014649
fly secrets set MOAMALAT_TID=99179395
fly secrets set MOAMALAT_SECRET=3a488a89b3f7993476c252f017c488bb
fly secrets set MOAMALAT_ENV=production
fly secrets set LOG_LEVEL=info
fly secrets set BCRYPT_ROUNDS=10
fly secrets set RATE_LIMIT_WINDOW_MS=900000
fly secrets set RATE_LIMIT_MAX_REQUESTS=100
fly secrets set ENABLE_2FA=true
fly secrets set ENABLE_CSRF_PROTECTION=true
fly secrets set MAX_CONCURRENT_SESSIONS=3
fly secrets set SESSION_TIMEOUT=1800000
fly secrets set MAX_LOGIN_ATTEMPTS=5
```

- [ ] تم إضافة جميع المتغيرات

### المرحلة 4: النشر:

```cmd
fly deploy
```

- [ ] انتظر حتى ينتهي النشر (~5-10 دقائق)
- [ ] تم النشر بنجاح ✅

### المرحلة 5: التحقق:

```cmd
# عرض السجلات
fly logs

# الدخول للتطبيق
fly open

# فحص الحالة
fly status
```

- [ ] التطبيق يعمل بدون أخطاء
- [ ] احفظ URL: `https://your-app.fly.dev`

---

## 🌐 نشر Frontend على Vercel:

### المرحلة 1: إعداد Vercel:

- [ ] إنشاء حساب Vercel: https://vercel.com
- [ ] ربط حساب GitHub (إن كان المشروع على GitHub)

### المرحلة 2: نشر التطبيق:

```cmd
# من مجلد المشروع الرئيسي
cd ..

# نشر على Vercel
vercel --prod
```

- [ ] اتبع التعليمات
- [ ] اختر المشروع الصحيح
- [ ] تم النشر بنجاح ✅

### المرحلة 3: إضافة متغيرات البيئة:

في Vercel Dashboard:
1. اذهب إلى Project Settings
2. البحث عن "Environment Variables"
3. أضف:
   - [ ] `VITE_API_URL` = `https://your-app.fly.dev/api`
   - [ ] `VITE_BACKEND_URL` = `https://your-app.fly.dev`

### المرحلة 4: إعادة النشر:

```cmd
vercel --prod
```

- [ ] تم تطبيق متغيرات البيئة
- [ ] التطبيق يعمل بنجاح ✅

---

## 🗄️ إعداد قاعدة البيانات (CPanel):

### إذا كنت تريد استخدام Fly.io مع CPanel MySQL عن بعد:

يجب أن يكون اتصال Fly.io بـ CPanel MySQL ممكناً:

1. في CPanel:
   - اذهب إلى "Remote MySQL"
   - أضف عنوان IP الخادم Fly.io
   - أو اترك "%" للسماح بجميع الاتصالات الخارجية

2. اختبر الاتصال من خط الأوامر:
   ```cmd
   mysql -h your-cpanel-host -u eshro_user -p eishro_db
   ```

- [ ] الاتصال يعمل بنجاح

---

## ✨ التحقق النهائي:

### Frontend:

- [ ] الموقع يحمل بسرعة
- [ ] الـ UI يظهر بشكل صحيح
- [ ] لا توجد أخطاء في Console
- [ ] HTTPS مفعّل ✅

### Backend:

- [ ] API endpoints تستجيب
- [ ] Sessions تعمل بشكل صحيح
- [ ] الملفات تُحمل بدون مشاكل
- [ ] Database متصلة بشكل صحيح

### الاتصال:

- [ ] Frontend يتصل بـ Backend بنجاح
- [ ] API requests تعمل بدون CORS errors
- [ ] البيانات تُحفظ في Database

---

## 📊 النتيجة النهائية:

```
✅ منصة EISHRO على الإنترنت
   ├─ Frontend: https://your-app.vercel.app
   ├─ Backend: https://your-app.fly.dev
   └─ Database: CPanel MySQL
   
💰 التكلفة: 0$ شهرياً
🌍 متاحة للجميع 24/7
🔒 مع HTTPS آمن
⚡ بأداء عالي
```

---

**تم إعداد المشروع بنجاح! 🎉**

للمزيد من التفاصيل، اقرأ الملفات:
- `DEPLOYMENT_SETUP.md`
- `FLY_DEPLOYMENT_GUIDE.md`
- `VERCEL_DEPLOYMENT_GUIDE_FINAL.md`
- `FAQ_DEPLOYMENT.md`
