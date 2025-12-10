# 📋 جميع الأوامر المطلوبة - نسخ ولصق

## 🔧 تثبيت الأدوات

### Windows (PowerShell كمسؤول):
```powershell
# تثبيت Fly CLI
iwr https://fly.io/install.ps1 -useb | iex

# تثبيت Vercel CLI (اختياري)
npm install -g vercel
```

### macOS/Linux:
```bash
# تثبيت Fly CLI
curl -L https://fly.io/install.sh | sh

# تثبيت Vercel CLI (اختياري)
npm install -g vercel
```

---

## 🚀 Fly.io Backend Deployment

### 1. تسجيل الدخول
```bash
fly auth login
```

### 2. إنشاء التطبيق
```bash
cd /path/to/your/project
fly launch
```

### 3. إضافة Secrets (Database)
```bash
fly secrets set DB_HOST=your-cpanel-host.com
fly secrets set DB_PORT=3306
fly secrets set DB_NAME=prefix_eishro_production
fly secrets set DB_USER=prefix_eishro_user
fly secrets set DB_PASSWORD=your_password_here
```

### 4. إضافة Secrets (Security)
```bash
fly secrets set JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-2025
fly secrets set SESSION_SECRET=your-session-secret-key-minimum-32-characters-2025
fly secrets set ENCRYPTION_KEY=your-64-character-hex-encryption-key-here-for-data
```

### 5. إضافة Secrets (Payment)
```bash
fly secrets set MOAMALAT_MID=10081014649
fly secrets set MOAMALAT_TID=99179395
fly secrets set MOAMALAT_SECRET=3a488a89b3f7993476c252f017c488bb
fly secrets set MOAMALAT_ENV=production
```

### 6. إضافة Secrets (URLs - سيتم تحديثها لاحقاً)
```bash
fly secrets set FRONTEND_URL=https://temporary.vercel.app
fly secrets set CORS_ORIGIN=https://temporary.vercel.app
```

### 7. النشر
```bash
fly deploy
```

### 8. التحقق
```bash
fly status
fly logs
fly open
```

### 9. اختبار Health Endpoint
```bash
curl https://eishro-backend.fly.dev/health
```

---

## 🎨 Vercel Frontend Deployment

### الطريقة 1: من Dashboard (موصى به)

1. https://vercel.com/dashboard
2. **Add New** → **Project**
3. Import GitHub Repository
4. أضيفي Environment Variables:

```env
VITE_API_URL=https://eishro-backend.fly.dev/api
VITE_BACKEND_URL=https://eishro-backend.fly.dev
VITE_GOOGLE_CLIENT_ID=1034286241802-hkdlf7mua6img2vhdo6mhna8ghb3mmhg.apps.googleusercontent.com
VITE_MOAMALAT_HASH_ENDPOINT=https://eishro-backend.fly.dev
VITE_CORS_ORIGIN=https://eishro-backend.fly.dev
VITE_MINIMAX_ENABLED=false
```

5. **Deploy**

### الطريقة 2: من CLI

```bash
cd /path/to/your/project
vercel login
vercel --prod
```

---

## 🔗 الربط النهائي (بعد نشر Frontend)

### حدثي Backend بـ Frontend URL

بعد الحصول على Frontend URL من Vercel (مثلاً: `https://eishro-platform-abc123.vercel.app`):

```bash
fly secrets set FRONTEND_URL=https://eishro-platform-abc123.vercel.app
fly secrets set CORS_ORIGIN=https://eishro-platform-abc123.vercel.app
```

### حدثي Frontend بـ Frontend URL

في Vercel Dashboard → Settings → Environment Variables:

```env
VITE_FRONTEND_URL=https://eishro-platform-abc123.vercel.app
VITE_GOOGLE_REDIRECT_URI=https://eishro-platform-abc123.vercel.app/auth/google/callback
```

ثم **Redeploy**.

---

## 🔍 أوامر المراقبة والصيانة

### Fly.io

```bash
# السجلات الحية
fly logs

# السجلات السابقة (آخر 100)
fly logs --history 100

# حالة التطبيق
fly status

# قائمة الماكينات
fly machines list

# Dashboard
fly dashboard

# قائمة Secrets
fly secrets list

# SSH إلى Server
fly ssh console

# إعادة تشغيل
fly apps restart eishro-backend

# إيقاف مؤقت
fly scale count 0

# تشغيل
fly scale count 1
```

### Vercel

```bash
# معلومات المشروع
vercel inspect

# قائمة Deployments
vercel ls

# السجلات
vercel logs

# Dashboard
vercel dashboard

# إعادة نشر
vercel --prod

# قائمة Environment Variables
vercel env ls
```

---

## 🔄 التحديثات

### تحديث Backend

```bash
# 1. عدلي الكود
git add .
git commit -m "Update backend"
git push

# 2. انشري على Fly.io
fly deploy

# 3. راقبي السجلات
fly logs
```

### تحديث Frontend

```bash
# 1. عدلي الكود
git add .
git commit -m "Update frontend"
git push

# Vercel سينشر تلقائياً!
# أو يدوياً:
vercel --prod
```

---

## 🔧 إضافة/تحديث Secrets

### Fly.io
```bash
# إضافة secret جديد
fly secrets set NEW_KEY=new_value

# تحديث secret موجود
fly secrets set EXISTING_KEY=updated_value

# حذف secret
fly secrets unset KEY_NAME

# إضافة عدة secrets دفعة واحدة
fly secrets set KEY1=value1 KEY2=value2 KEY3=value3
```

### Vercel
```bash
# إضافة variable جديد
vercel env add VARIABLE_NAME production

# حذف variable
vercel env rm VARIABLE_NAME production
```

---

## 🧪 اختبار الاتصال

### Backend Health
```bash
curl https://eishro-backend.fly.dev/health
```

### Backend API
```bash
curl https://eishro-backend.fly.dev/api/stores
```

### Frontend
```
افتحي في المتصفح: https://your-app.vercel.app
F12 → Console (تحققي من عدم وجود أخطاء)
F12 → Network (تحققي من API calls)
```

---

## 🗄️ إدارة Database

### phpMyAdmin (CPanel)
```
CPanel → phpMyAdmin → اختاري Database
```

### Backup
```bash
# من SSH في Fly.io
fly ssh console
mysqldump -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME > backup.sql
```

### Restore
```bash
mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME < backup.sql
```

---

## 🆘 الإصلاحات السريعة

### مشكلة CORS
```bash
fly secrets set FRONTEND_URL=https://correct-url.vercel.app
fly secrets set CORS_ORIGIN=https://correct-url.vercel.app
```

### مشكلة Database Connection
```bash
# تحقق من المتغيرات
fly secrets list

# حدثي DB_HOST
fly secrets set DB_HOST=mysql.yourdomain.com
```

### إعادة تشغيل كاملة
```bash
# Fly.io
fly apps restart eishro-backend

# Vercel - من Dashboard
Deployments → Redeploy
```

---

## 📞 الدعم

- **Fly.io:** https://community.fly.io
- **Vercel:** https://vercel.com/docs
- **MySQL/CPanel:** دعم مزود الاستضافة

---

## 📊 URLs النهائية

```
Frontend: https://your-app.vercel.app
Backend: https://eishro-backend.fly.dev
API: https://eishro-backend.fly.dev/api
Health: https://eishro-backend.fly.dev/health

Fly Dashboard: https://fly.io/dashboard
Vercel Dashboard: https://vercel.com/dashboard
CPanel: https://yourdomain.com:2083
```

---

**التكلفة الشهرية: 0$** 💰✅
