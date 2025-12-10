# 🚀 دليل نشر Backend على Koyeb - خطوة بخطوة

**التاريخ:** ديسمبر 10، 2025  
**الحالة:** جاهز 100%  
**الوقت المتوقع:** 30 دقيقة فقط

---

## 📋 المحتويات

1. [ما هو Koyeb؟](#ما-هو-koyeb)
2. [المتطلبات](#المتطلبات)
3. [الخطوة 1: إنشاء حساب](#الخطوة-1-إنشاء-حساب-koyeb)
4. [الخطوة 2: ربط GitHub](#الخطوة-2-ربط-github)
5. [الخطوة 3: إنشاء Service](#الخطوة-3-إنشاء-service)
6. [الخطوة 4: إضافة متغيرات البيئة](#الخطوة-4-إضافة-متغيرات-البيئة)
7. [الخطوة 5: النشر والاختبار](#الخطوة-5-النشر-والاختبار)
8. [استكشاف الأخطاء](#استكشاف-الأخطاء)

---

## ما هو Koyeb؟

**Koyeb** هي منصة نشر مجانية وسهلة لتطبيقات Node.js والـ Docker:

| الميزة | الوصف |
|--------|--------|
| 💰 **التكلفة** | مجاني دائم |
| ⚡ **الأداء** | سريع جداً |
| 🔄 **التحديث** | auto-deploy من GitHub |
| 📊 **الموثوقية** | uptime 99.9% |
| 🌍 **المناطق** | أوروبا، آسيا، أمريكا |

---

## المتطلبات

قبل البدء تأكد من:

- ✅ حساب بريد إلكتروني
- ✅ حساب **GitHub** مع المشروع
- ✅ بيانات CPanel MySQL جاهزة:
  - Host
  - Database Name
  - Username
  - Password
- ✅ VS Code أو أي محرر

**ملاحظة:** لا تحتاج بطاقة ائتمان! Koyeb مجاني تماماً

---

## الخطوة 1: إنشاء حساب Koyeb

### 1.1 افتح موقع Koyeb

اذهب إلى: **https://www.koyeb.com**

### 1.2 اضغط "Sign Up" أو "Get Started"

### 1.3 اختر طريقة التسجيل

**الأسهل:** اختر **"Sign up with GitHub"**

```
1. اضغط "Continue with GitHub"
2. سجل دخول حساب GitHub الخاص بك
3. اسمح لـ Koyeb بالوصول
4. ✅ تم التسجيل!
```

### 1.4 تحقق من البريد الإلكتروني (إذا لزم)

قد يطلب تأكيد البريد - افتحه وأكد.

---

## الخطوة 2: ربط GitHub

### 2.1 في لوحة Koyeb Dashboard

بعد التسجيل ستجد:

```
Dashboard → Services → Create a Service
```

### 2.2 اختر "Git Repository"

```
Deploy from Git → Select Git provider → GitHub
```

### 2.3 اختر مستودعك

```
Repository: Eishro-Platform_V7
Branch: main (أو أي branch تستخدمه)
```

### 2.4 اختر المجلد (Root Directory)

```
Root Directory: ./backend
```

**مهم جداً:** تأكد من اختيار `./backend` لأن كود Backend موجود فيه!

---

## الخطوة 3: إنشاء Service

### 3.1 نوع الخدمة (Service Type)

```
Build and Deploy from source code
```

اختر هذا الخيار (سيختار Dockerfile تلقائياً)

### 3.2 Builder

```
Builder: Dockerfile
```

Koyeb سيجد `Dockerfile` في مجلد `backend` تلقائياً

### 3.3 معلومات الـ Service

```
Service name: eishro-backend (أو أي اسم)
Instance type: Free (مجاني)
```

### 3.4 اختر Region (المنطقة)

```
Region: Germany (eu-fra) ← الأقرب لليبيا
```

أو اختر أقرب منطقة لك.

### 3.5 اضغط "Create and Deploy"

Koyeb سيبدأ النشر الآن! (قد يستغرق 3-5 دقائق)

---

## الخطوة 4: إضافة متغيرات البيئة

### 4.1 أثناء النشر أو بعده

في Dashboard:
```
Services → eishro-backend → Settings → Environment Variables
```

### 4.2 أضف المتغيرات واحداً تلو الآخر:

#### أ) بيانات قاعدة البيانات MySQL (من CPanel):

```
DB_HOST = mysql.your-domain.com
DB_PORT = 3306
DB_NAME = eishro_production
DB_USER = eishro_user
DB_PASSWORD = your-strong-password
```

**استبدل القيم بالبيانات الحقيقية من CPanel!**

#### ب) متغيرات الأمان:

```
NODE_ENV = production
PORT = 8080
```

#### ج) JWT و Security:

```
JWT_SECRET = very-long-random-string-min-32-characters-2025
JWT_EXPIRE = 7d
SESSION_SECRET = another-random-string-min-32-characters-2025
ENCRYPTION_KEY = 64-hex-character-string-for-aes256-encryption
```

**نصيحة:** استخدم مولد مفاتيح عشوائية:

في PowerShell:
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

#### د) URLs (مؤقت):

```
FRONTEND_URL = https://temporary.vercel.app
BACKEND_URL = https://eishro-backend.koyeb.app
CORS_ORIGIN = https://temporary.vercel.app
```

**ملاحظة:** سنحدث `FRONTEND_URL` بعد نشر Frontend على Vercel

#### هـ) بوابة الدفع (Moamalat):

```
MOAMALAT_MID = 10081014649
MOAMALAT_TID = 99179395
MOAMALAT_SECRET = 3a488a89b3f7993476c252f017c488bb
MOAMALAT_ENV = production
```

#### و) Google OAuth (اختياري):

إذا كان لديك:
```
GOOGLE_CLIENT_ID = your-client-id
GOOGLE_CLIENT_SECRET = your-client-secret
```

### 4.3 اضغط "Save"

Koyeb سيعيد تشغيل التطبيق بالمتغيرات الجديدة.

---

## الخطوة 5: النشر والاختبار

### 5.1 تحقق من حالة النشر

```
Dashboard → Services → eishro-backend → Logs
```

يجب أن ترى:
```
✓ Build successful
✓ Deployment successful
✓ Server is running
```

### 5.2 احصل على URL التطبيق

في Dashboard ستجد URL مثل:
```
https://eishro-backend-xxxx.koyeb.app
```

احفظ هذا URL! ستحتاجه لاحقاً.

### 5.3 اختبر Health Endpoint

افتح في المتصفح:
```
https://eishro-backend-xxxx.koyeb.app/health
```

يجب أن ترى:
```json
{
  "status": "ok",
  "timestamp": "2025-12-10T...",
  "environment": "production"
}
```

✅ **إذا رأيت هذا، Backend يعمل بنجاح!**

### 5.4 اختبر API endpoints

```
https://eishro-backend-xxxx.koyeb.app/api/products
https://eishro-backend-xxxx.koyeb.app/api/users/profile
```

---

## استكشاف الأخطاء

### المشكلة: Build Failed

**الحل:**
1. اذهب إلى: `Services → Logs`
2. ابحث عن الخطأ
3. تأكد من:
   - `Dockerfile` صحيح
   - `package.json` موجود
   - جميع المتطلبات مثبتة

### المشكلة: Database Connection Error

**الحل:**
1. تحقق من بيانات MySQL:
   ```
   DB_HOST صحيح؟
   DB_PORT = 3306؟
   Username و Password صحيحين؟
   ```

2. في CPanel:
   - اذهب إلى **Remote MySQL**
   - أضف `%` للسماح بجميع IPs
   - أو أضف IP الخادم

### المشكلة: "Deployment Timeout"

**الحل:**
- انتظر 5-10 دقائق
- إذا استمرت المشكلة، اضغط "Redeploy"

### المشكلة: Port Already in Use

**تأكد في `Dockerfile`:**
```dockerfile
EXPOSE 8080
```

و في المتغيرات:
```
PORT=8080
```

---

## 🎯 الخلاصة

بعد إتمام هذه الخطوات:

✅ Backend منشور على Koyeb  
✅ HTTPS مفعّل تلقائياً  
✅ auto-deploy من GitHub  
✅ Database متصل من CPanel  
✅ Server يعمل 24/7  

---

## 📞 الدعم

- **Koyeb Docs:** https://docs.koyeb.com
- **Community:** https://community.koyeb.com
- **Discord:** https://discord.gg/koyeb

---

## التالي: نشر Frontend على Vercel

بعد نشر Backend بنجاح:

1. اذهب إلى Vercel
2. استيراد Frontend (مجلد الـ root)
3. إضافة متغيرات البيئة:
   ```
   VITE_API_URL = https://eishro-backend-xxxx.koyeb.app/api
   VITE_BACKEND_URL = https://eishro-backend-xxxx.koyeb.app
   ```

**الفائدة:** كلاهما مجاني + auto-deploy من GitHub = حل مثالي! 🎉
