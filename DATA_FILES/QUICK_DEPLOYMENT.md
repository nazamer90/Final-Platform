# ⚡ دليل النشر السريع - 30 دقيقة

## 🎯 نظرة سريعة

```
Frontend (Vercel) → Backend (Fly.io) → Database (CPanel MySQL)
```

---

## ✅ الخطوات (بالترتيب)

### 1️⃣ إعداد MySQL (10 دقائق)

**CPanel → MySQL Database Wizard:**

```
Database: eishro_production
User: eishro_user
Password: [Password Generator]
Privileges: ALL
```

**CPanel → Remote MySQL:**
```
Add Host: %
```

**احفظي:**
```
DB_HOST=yourdomain.com
DB_NAME=prefix_eishro_production
DB_USER=prefix_eishro_user
DB_PASSWORD=***
```

---

### 2️⃣ نشر Backend على Fly.io (15 دقيقة)

**أ) التسجيل وتثبيت CLI:**
```bash
# Windows (PowerShell Admin)
iwr https://fly.io/install.ps1 -useb | iex

# تسجيل الدخول
fly auth login
```

**ب) النشر:**
```bash
cd /path/to/project

fly launch
# App name: eishro-backend
# Region: Frankfurt (fra)
# Postgres: N
# Redis: N
# Deploy now: N

fly secrets set DB_HOST=yourdomain.com
fly secrets set DB_PORT=3306
fly secrets set DB_NAME=prefix_eishro_production
fly secrets set DB_USER=prefix_eishro_user
fly secrets set DB_PASSWORD=your_password
fly secrets set JWT_SECRET=your-32-char-secret
fly secrets set SESSION_SECRET=your-32-char-secret
fly secrets set MOAMALAT_MID=10081014649
fly secrets set MOAMALAT_TID=99179395
fly secrets set MOAMALAT_SECRET=3a488a89b3f7993476c252f017c488bb

fly deploy
```

**احفظي Backend URL:**
```
https://eishro-backend.fly.dev
```

**اختبر:**
```
https://eishro-backend.fly.dev/health
```

---

### 3️⃣ نشر Frontend على Vercel (5 دقائق)

**من Vercel Dashboard:**

1. https://vercel.com → Sign up with GitHub
2. **Add New** → **Project**
3. Import مستودع GitHub
4. **Environment Variables:**
   ```
   VITE_API_URL=https://eishro-backend.fly.dev/api
   VITE_BACKEND_URL=https://eishro-backend.fly.dev
   VITE_GOOGLE_CLIENT_ID=1034286241802-hkdlf7mua6img2vhdo6mhna8ghb3mmhg.apps.googleusercontent.com
   VITE_MOAMALAT_HASH_ENDPOINT=https://eishro-backend.fly.dev
   ```
5. **Deploy**

**احفظي Frontend URL:**
```
https://your-app.vercel.app
```

---

### 4️⃣ الربط النهائي (5 دقائق)

**حدثي Backend بـ Frontend URL:**
```bash
fly secrets set FRONTEND_URL=https://your-app.vercel.app
fly secrets set CORS_ORIGIN=https://your-app.vercel.app
```

**حدثي Frontend بـ Frontend URL:**
- Vercel → Settings → Environment Variables
- أضيفي:
  ```
  VITE_FRONTEND_URL=https://your-app.vercel.app
  VITE_GOOGLE_REDIRECT_URI=https://your-app.vercel.app/auth/google/callback
  ```
- Redeploy

---

## ✅ اختبار نهائي

1. افتحي: `https://your-app.vercel.app`
2. F12 → Console (لا أخطاء CORS)
3. سجلي دخول
4. اختبري وظيفة

✅ **جاهز!**

---

## 🆘 مشاكل؟

**CORS Error:**
```bash
fly secrets set CORS_ORIGIN=https://correct-url.vercel.app
```

**Database Error:**
- CPanel → Remote MySQL → تأكدي من `%`
- تحققي من DB_HOST

**Build Failed:**
- راجعي Logs في Dashboard

---

**التكلفة: 0$ شهرياً** 💰✅
