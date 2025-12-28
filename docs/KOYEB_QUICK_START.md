# ⚡ Koyeb - البدء السريع (10 دقائق)

## الخطوات السريعة فقط:

### 1️⃣ إنشاء حساب (2 دقائق)
```
https://www.koyeb.com → Sign up with GitHub
```

### 2️⃣ إنشاء Service (3 دقائق)
```
Dashboard → Create Service
├─ Git Repository: GitHub
├─ Repo: Eishro-Platform_V7
├─ Root Directory: ./backend ← مهم!
├─ Region: Germany (eu-fra)
└─ Create and Deploy
```

### 3️⃣ إضافة المتغيرات (3 دقائق)
```
Services → eishro-backend → Settings → Environment Variables
```

أضف:
```
# Database (من CPanel)
DB_HOST=mysql.your-domain.com
DB_PORT=3306
DB_NAME=eishro_production
DB_USER=eishro_user
DB_PASSWORD=your-password

# Security
NODE_ENV=production
PORT=8080
JWT_SECRET=random-string-32-chars-minimum
SESSION_SECRET=random-string-32-chars-minimum

# URLs
FRONTEND_URL=https://temporary.vercel.app
BACKEND_URL=https://eishro-backend.koyeb.app
CORS_ORIGIN=https://temporary.vercel.app

# Payment
MOAMALAT_MID=10081014649
MOAMALAT_TID=99179395
MOAMALAT_SECRET=3a488a89b3f7993476c252f017c488bb
MOAMALAT_ENV=production
```

### 4️⃣ اختبر (2 دقائق)
```
https://eishro-backend-xxxx.koyeb.app/health
```

يجب أن ترى:
```json
{"status": "ok"}
```

---

## ✅ تم! Backend على الإنترنت مجاناً

**التالي:** نشر Frontend على Vercel
