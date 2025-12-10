# ✅ قائمة التحقق الجاهزة للطباعة

---

## 📋 المرحلة 1: إعداد MySQL (CPanel)

### الخطوات:
- [ ] 1.1 تسجيل الدخول لـ CPanel
- [ ] 1.2 MySQL Database Wizard → Create Database
- [ ] 1.3 Database Name: `eishro_production`
- [ ] 1.4 Create User: `eishro_user`
- [ ] 1.5 Password Generator → نسخ Password
- [ ] 1.6 ALL PRIVILEGES
- [ ] 1.7 Remote MySQL → Add Host: `%`
- [ ] 1.8 تدوين جميع المعلومات

### المعلومات المطلوبة:
```
DB_HOST: _________________________________
DB_PORT: 3306
DB_NAME: _________________________________
DB_USER: _________________________________
DB_PASSWORD: _____________________________
```

---

## 📋 المرحلة 2: نشر Backend (Fly.io)

### الخطوات:
- [ ] 2.1 التسجيل في Fly.io (https://fly.io)
- [ ] 2.2 إضافة بطاقة ائتمان (للتحقق)
- [ ] 2.3 تثبيت Fly CLI: `iwr https://fly.io/install.ps1 -useb | iex`
- [ ] 2.4 إعادة فتح PowerShell
- [ ] 2.5 `fly version` للتحقق
- [ ] 2.6 `fly auth login`
- [ ] 2.7 الانتقال لمجلد المشروع: `cd C:\path\to\project`
- [ ] 2.8 `fly launch`
  - [ ] App name: `eishro-backend`
  - [ ] Region: `Frankfurt (fra)`
  - [ ] Postgres: `N`
  - [ ] Redis: `N`
  - [ ] Deploy now: `N`
- [ ] 2.9 إضافة Database Secrets
- [ ] 2.10 إضافة Security Secrets
- [ ] 2.11 إضافة Payment Secrets
- [ ] 2.12 `fly secrets list` للتحقق
- [ ] 2.13 `fly deploy`
- [ ] 2.14 تدوين Backend URL
- [ ] 2.15 اختبار: `https://eishro-backend.fly.dev/health`
- [ ] 2.16 `fly logs` - تأكد من "Database connected"

### الأوامر الكاملة (نسخ ولصق):

```bash
fly secrets set DB_HOST=your-host.com
fly secrets set DB_PORT=3306
fly secrets set DB_NAME=prefix_eishro_production
fly secrets set DB_USER=prefix_eishro_user
fly secrets set DB_PASSWORD=your_password

fly secrets set JWT_SECRET=your-32-char-secret
fly secrets set SESSION_SECRET=your-32-char-secret
fly secrets set ENCRYPTION_KEY=your-64-char-key

fly secrets set MOAMALAT_MID=10081014649
fly secrets set MOAMALAT_TID=99179395
fly secrets set MOAMALAT_SECRET=3a488a89b3f7993476c252f017c488bb
fly secrets set MOAMALAT_ENV=production

fly deploy
```

### Backend URL:
```
https://______________________________.fly.dev
```

---

## 📋 المرحلة 3: نشر Frontend (Vercel)

### الخطوات:
- [ ] 3.1 التسجيل في Vercel (https://vercel.com)
- [ ] 3.2 Sign up with GitHub
- [ ] 3.3 Dashboard → Add New → Project
- [ ] 3.4 Import GitHub Repository
- [ ] 3.5 Framework: `Vite`
- [ ] 3.6 Root: `./`
- [ ] 3.7 Build: `npm run build`
- [ ] 3.8 Output: `dist`
- [ ] 3.9 إضافة Environment Variables (انظر الجدول)
- [ ] 3.10 Deploy
- [ ] 3.11 تدوين Frontend URL
- [ ] 3.12 فتح الموقع واختبار

### Environment Variables:

```env
VITE_API_URL=https://eishro-backend.fly.dev/api
VITE_BACKEND_URL=https://eishro-backend.fly.dev
VITE_GOOGLE_CLIENT_ID=1034286241802-hkdlf7mua6img2vhdo6mhna8ghb3mmhg.apps.googleusercontent.com
VITE_MOAMALAT_HASH_ENDPOINT=https://eishro-backend.fly.dev
VITE_CORS_ORIGIN=https://eishro-backend.fly.dev
VITE_MINIMAX_ENABLED=false
```

### Frontend URL:
```
https://______________________________.vercel.app
```

---

## 📋 المرحلة 4: الربط النهائي

### الخطوات:
- [ ] 4.1 تحديث Backend بـ Frontend URL:
  ```bash
  fly secrets set FRONTEND_URL=https://your-frontend.vercel.app
  fly secrets set CORS_ORIGIN=https://your-frontend.vercel.app
  ```
- [ ] 4.2 انتظار 30 ثانية
- [ ] 4.3 تحديث Frontend في Vercel:
  - [ ] Settings → Environment Variables
  - [ ] `VITE_FRONTEND_URL=https://your-frontend.vercel.app`
  - [ ] `VITE_GOOGLE_REDIRECT_URI=https://your-frontend.vercel.app/auth/google/callback`
- [ ] 4.4 Redeploy Frontend
- [ ] 4.5 انتظار 1 دقيقة

---

## 📋 المرحلة 5: الاختبار النهائي

### الاختبارات:
- [ ] 5.1 Backend Health: `https://eishro-backend.fly.dev/health` → `200 OK`
- [ ] 5.2 Frontend يفتح: `https://your-app.vercel.app` → يعمل
- [ ] 5.3 F12 → Console → لا CORS errors
- [ ] 5.4 F12 → Network → API calls → Status `200`
- [ ] 5.5 تسجيل حساب جديد → يعمل
- [ ] 5.6 تسجيل دخول → يعمل
- [ ] 5.7 عرض متاجر → يعمل
- [ ] 5.8 عرض منتج → يعمل
- [ ] 5.9 إضافة للسلة → يعمل
- [ ] 5.10 رفع صورة (للتاجر) → يعمل

---

## ✅ النشر ناجح إذا:

- [x] جميع الاختبارات أعلاه ✅
- [x] `fly logs` → لا errors
- [x] Vercel Dashboard → Last deployment ✅ Success
- [x] F12 Console → لا errors كثيرة
- [x] المنصة تعمل بسلاسة

---

## 🎉 تهانينا!

**إذا كل الاختبارات نجحت:**

✅ **منصة EISHRO منشورة وتعمل!**

**URLs:**
```
Frontend: https://____________________________
Backend: https://____________________________
API: https://____________________________/api
```

**التكلفة الشهرية:** 0$

---

## 📝 ملاحظات

استخدمي المساحات أدناه لتدوين أي ملاحظات:

```
____________________________________________________________

____________________________________________________________

____________________________________________________________

____________________________________________________________

____________________________________________________________
```

---

## 📞 الدعم

إذا علقت في أي خطوة:

1. **راجعي الدليل المفصل** للمرحلة
2. **راجعي FAQ_DEPLOYMENT.md**
3. **راجعي السجلات** (fly logs / vercel logs)
4. **اطلبي المساعدة** من Communities

---

**آخر تحديث:** ديسمبر 2025  
**الإصدار:** 1.0

---

# 🖨️ نصائح للطباعة

- اطبعي هذا الملف
- استخدمي قلم للتأشير على المهام المكتملة ✅
- دوني المعلومات المهمة في المساحات المخصصة
- احتفظي به كمرجع

---

**بالتوفيق! 🚀**
