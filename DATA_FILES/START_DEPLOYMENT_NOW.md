# 🚀 ابدئي النشر الآن - خطوة بخطوة

## ✅ قبل البدء

- [ ] اطبعي هذا الدليل أو افتحيه في تبويب منفصل
- [ ] جهزي ورقة وقلم لتدوين المعلومات المهمة
- [ ] احضري معلومات CPanel (Username, Password, Domain)
- [ ] تأكدي من اتصال إنترنت مستقر
- [ ] احضري مشروباً ☕ - سيستغرق ~30 دقيقة

---

## 📝 ورقة تدوين المعلومات

انسخي هذا وأكملي البيانات أثناء العمل:

```
=== معلومات CPanel MySQL ===
DB_HOST: ___________________________
DB_PORT: 3306
DB_NAME: ___________________________
DB_USER: ___________________________
DB_PASSWORD: _______________________

=== معلومات Fly.io ===
App Name: eishro-backend
Backend URL: https://______________.fly.dev

=== معلومات Vercel ===
Frontend URL: https://______________.vercel.app

=== Secrets مهمة ===
JWT_SECRET: _______________________________________
SESSION_SECRET: ___________________________________
ENCRYPTION_KEY: ___________________________________
```

---

## 🎯 الخطوات (نفذيها بالترتيب)

---

## 📍 المرحلة 1: إعداد Database (15 دقيقة)

### ✅ الخطوة 1.1: تسجيل الدخول لـ CPanel

1. افتحي المتصفح
2. اذهبي إلى: `https://yourdomain.com:2083`
3. أدخلي Username & Password
4. اضغطي **Log in**

✅ **دخلت CPanel؟** انتقلي للخطوة التالية

---

### ✅ الخطوة 1.2: إنشاء Database

1. في CPanel، ابحثي عن **"Databases"**
2. اضغطي على **"MySQL Database Wizard"**
3. **Create a Database:**
   ```
   Database Name: eishro_production
   ```
4. اضغطي **"Next Step"**

📝 **اكتبي Database Name الكامل:**
```
DB_NAME: _____________________________
```

---

### ✅ الخطوة 1.3: إنشاء User

1. **Create Database Users:**
   ```
   Username: eishro_user
   ```

2. اضغطي **"Password Generator"**
3. **نسخي Password!** (اضغطي أيقونة النسخ)

📝 **اكتبي هنا:**
```
DB_USER: _____________________________
DB_PASSWORD: _________________________
```

4. اضغطي **"Create User"**

---

### ✅ الخطوة 1.4: ربط User بـ Database

1. **Add User to Database**
2. اختاري User و Database من القوائم
3. **Privileges:** حددي **"ALL PRIVILEGES"** (أو اضغطي Select All)
4. اضغطي **"Make Changes"**
5. اضغطي **"Next Step"**

✅ **تم! Database جاهزة**

---

### ✅ الخطوة 1.5: تفعيل Remote Access

1. في CPanel، ابحثي عن **"Remote MySQL"**
2. **Add Access Host:**
   ```
   Host: %
   ```
3. اضغطي **"Add Host"**

✅ **يجب أن ترى:** `%` في قائمة Access Hosts

---

### ✅ الخطوة 1.6: الحصول على DB_HOST

**DB_HOST عادة واحد من:**
- `yourdomain.com` (جربي هذا أولاً)
- `mysql.yourdomain.com`
- `localhost` (إذا Backend على نفس السيرفر)

📝 **اكتبي:**
```
DB_HOST: _____________________________
```

**إذا لم تعرفي:** راسلي دعم الاستضافة واطلبي "Remote MySQL Host"

---

## 🔵 المرحلة 2: نشر Backend على Fly.io (20 دقيقة)

### ✅ الخطوة 2.1: إنشاء حساب Fly.io

1. افتحي: https://fly.io
2. **Sign Up** → **Continue with GitHub**
3. سجلي الدخول لـ GitHub
4. **Authorize Fly.io**
5. **أضيفي بطاقة ائتمان** (للتحقق - لن يُخصم)

✅ **حساب جاهز؟** انتقلي للخطوة التالية

---

### ✅ الخطوة 2.2: تثبيت Fly CLI

**افتحي PowerShell كمسؤول:**

1. اضغطي `Win + X`
2. اختاري **"Windows PowerShell (Admin)"**
3. نفذي:

```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

4. انتظري حتى ترى:
```
flyctl was installed successfully!
```

5. **أغلقي وافتحي PowerShell من جديد**

6. تحققي:
```bash
fly version
```

✅ **يجب أن ترى رقم إصدار**

---

### ✅ الخطوة 2.3: تسجيل الدخول

```bash
fly auth login
```

سيفتح المتصفح:
1. سجلي الدخول
2. اضغطي **"Continue"**
3. ارجعي إلى PowerShell

✅ **يجب أن ترى:** `successfully logged in as you@email.com`

---

### ✅ الخطوة 2.4: الانتقال لمجلد المشروع

```bash
cd C:\Users\YourName\path\to\eishro-project
```

**استبدلي المسار بمسار مشروعك الحقيقي!**

تحققي:
```bash
dir
```

يجب أن ترى:
```
fly.toml
Dockerfile
package.json
...
```

---

### ✅ الخطوة 2.5: إطلاق التطبيق

```bash
fly launch
```

**الأسئلة والإجابات:**

#### السؤال 1:
```
? Choose an app name (leave blank to generate one):
```
**اكتبي:** `eishro-backend` (أو اتركيه فارغاً)

📝 **اكتبي App Name:**
```
App Name: _____________________________
```

#### السؤال 2:
```
? Choose an organization:
```
**اختاري:** `Personal` (استخدمي الأسهم ثم Enter)

#### السؤال 3:
```
? Choose a region:
```
**اختاري:** `Frankfurt, Germany (fra)` (الأقرب لليبيا)

#### السؤال 4:
```
? Would you like to set up a Postgresql database now?
```
**اكتبي:** `N` (لديك MySQL)

#### السؤال 5:
```
? Would you like to set up an Upstash Redis database now?
```
**اكتبي:** `N`

#### السؤال 6:
```
? Would you like to deploy now?
```
**اكتبي:** `N` (سنضيف Secrets أولاً)

✅ **يجب أن ترى:** `Your app is ready. Deploy with fly deploy`

---

### ✅ الخطوة 2.6: إضافة Database Secrets

**نسخي هذه الأوامر وعدليها بمعلوماتك:**

```bash
fly secrets set DB_HOST=your-cpanel-host.com
```

انتظري حتى ترى: `✓ Setting secrets on eishro-backend`

ثم:

```bash
fly secrets set DB_PORT=3306
fly secrets set DB_NAME=prefix_eishro_production
fly secrets set DB_USER=prefix_eishro_user
fly secrets set DB_PASSWORD=your_password_here
```

**استبدلي:**
- `prefix_eishro_production` → Database Name الكامل
- `prefix_eishro_user` → User الكامل
- `your_password_here` → Password الذي نسخته
- `your-cpanel-host.com` → DB_HOST

---

### ✅ الخطوة 2.7: إضافة Security Secrets

**ولّدي مفاتيح عشوائية:**

**في PowerShell:**
```powershell
# JWT Secret
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

انسخي الناتج واستخدميه:

```bash
fly secrets set JWT_SECRET=<الناتج-هنا>
```

**كرري لـ:**
```bash
fly secrets set SESSION_SECRET=<ناتج-جديد>
```

**Encryption Key (64 حرف):**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
```

```bash
fly secrets set ENCRYPTION_KEY=<الناتج-هنا>
```

---

### ✅ الخطوة 2.8: إضافة Payment Secrets

```bash
fly secrets set MOAMALAT_MID=10081014649
fly secrets set MOAMALAT_TID=99179395
fly secrets set MOAMALAT_SECRET=3a488a89b3f7993476c252f017c488bb
fly secrets set MOAMALAT_ENV=production
```

---

### ✅ الخطوة 2.9: إضافة URLs مؤقتة

```bash
fly secrets set FRONTEND_URL=https://temporary.vercel.app
fly secrets set CORS_ORIGIN=https://temporary.vercel.app
```

(سنحدثها بعد نشر Frontend)

---

### ✅ الخطوة 2.10: التحقق من Secrets

```bash
fly secrets list
```

يجب أن ترى جميع المتغيرات:
```
DB_HOST
DB_NAME
DB_USER
JWT_SECRET
MOAMALAT_MID
...
```

✅ **كل شيء موجود؟** انتقلي للخطوة التالية

---

### ✅ الخطوة 2.11: النشر!

```bash
fly deploy
```

**انتظري... سترى:**

```
==> Building image
...
==> Pushing image to fly
...
==> Deploying
...
✓ Deployment successful!
```

**الوقت:** 3-5 دقائق (أول مرة)

📝 **اكتبي Backend URL:**
```
https://______________________________.fly.dev
```

---

### ✅ الخطوة 2.12: اختبار Backend

```bash
fly open
```

أو افتحي في المتصفح:
```
https://eishro-backend.fly.dev/health
```

**يجب أن ترى:**
```json
{
  "status": "ok",
  "timestamp": "...",
  "environment": "production"
}
```

✅ **Backend يعمل!**

**راجعي السجلات:**
```bash
fly logs
```

ابحثي عن:
```
✓ Database connected successfully
✓ Server listening on port 8080
```

✅ **Database متصلة!**

---

## 🎨 المرحلة 3: نشر Frontend على Vercel (10 دقائق)

### ✅ الخطوة 3.1: إنشاء حساب Vercel

1. افتحي: https://vercel.com
2. **Sign Up** → **Continue with GitHub**
3. **Authorize Vercel**

✅ **حساب جاهز!**

---

### ✅ الخطوة 3.2: استيراد المشروع

1. Dashboard: https://vercel.com/dashboard
2. **Add New** → **Project**
3. ابحثي عن مستودع GitHub
4. اضغطي **"Import"** بجانبه

**إذا لم تجديه:**
- **Adjust GitHub App Permissions**
- حددي Repository
- **Save**

---

### ✅ الخطوة 3.3: إعدادات Project

**Framework Preset:** `Vite` (يكتشف تلقائياً)

**Root Directory:** `./`

**Build Command:** `npm run build`

**Output Directory:** `dist`

✅ **لا تغيري شيء** - الإعدادات صحيحة

---

### ✅ الخطوة 3.4: إضافة Environment Variables

**مهم جداً!** أضيفي هذه المتغيرات:

1. اضغطي **"Environment Variables"**

2. أضيفي واحداً تلو الآخر:

**استبدلي `eishro-backend` باسم تطبيقك الحقيقي!**

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://eishro-backend.fly.dev/api` |
| `VITE_BACKEND_URL` | `https://eishro-backend.fly.dev` |
| `VITE_GOOGLE_CLIENT_ID` | `1034286241802-hkdlf7mua6img2vhdo6mhna8ghb3mmhg.apps.googleusercontent.com` |
| `VITE_MOAMALAT_HASH_ENDPOINT` | `https://eishro-backend.fly.dev` |
| `VITE_CORS_ORIGIN` | `https://eishro-backend.fly.dev` |
| `VITE_MINIMAX_ENABLED` | `false` |

**كيفية الإضافة:**
- **Key:** الاسم من الجدول
- **Value:** القيمة (عدليها!)
- **Environments:** حددي `Production`
- اضغطي **"Add"**

**كرري لجميع المتغيرات**

✅ **أضفت جميع المتغيرات؟** انتقلي للخطوة التالية

---

### ✅ الخطوة 3.5: Deploy Frontend

1. اضغطي **"Deploy"**
2. انتظري...

سترى:
```
Building...
Deploying...
✓ Deployment completed
```

**الوقت:** 1-3 دقائق

3. عند الانتهاء، اضغطي **"Visit"**

📝 **اكتبي Frontend URL:**
```
https://______________________________.vercel.app
```

---

### ✅ الخطوة 3.6: اختبار Frontend

افتحي Frontend في المتصفح.

**اضغطي F12** (Developer Tools):

**في Console:**
- ❌ **لا يجب أن ترى:** أخطاء حمراء كثيرة
- ⚠️ **قد ترى:** CORS errors (سنحلها الآن)

✅ **الموقع يفتح؟** انتقلي للمرحلة التالية

---

## 🔗 المرحلة 4: الربط النهائي (5 دقائق)

### ✅ الخطوة 4.1: تحديث Backend بـ Frontend URL

ارجعي إلى PowerShell:

```bash
fly secrets set FRONTEND_URL=https://your-frontend-url.vercel.app
fly secrets set CORS_ORIGIN=https://your-frontend-url.vercel.app
```

**استبدلي `your-frontend-url` بالـ URL الحقيقي!**

انتظري 30 ثانية (Backend سيعيد التشغيل)

---

### ✅ الخطوة 4.2: تحديث Frontend بـ Frontend URL

في Vercel Dashboard:

1. اختاري المشروع
2. **Settings** → **Environment Variables**
3. أضيفي متغيرين جديدين:

| Key | Value |
|-----|-------|
| `VITE_FRONTEND_URL` | `https://your-frontend-url.vercel.app` |
| `VITE_GOOGLE_REDIRECT_URI` | `https://your-frontend-url.vercel.app/auth/google/callback` |

**استبدلي القيم!**

4. **Save**

---

### ✅ الخطوة 4.3: إعادة نشر Frontend

1. في Vercel → **Deployments**
2. اختاري آخر deployment
3. **⋯** (ثلاث نقاط) → **"Redeploy"**
4. **Redeploy**

انتظري 1 دقيقة...

✅ **Deployment Successful**

---

## 🎉 المرحلة 5: الاختبار النهائي (5 دقائق)

### ✅ الخطوة 5.1: اختبار Backend

افتحي في المتصفح:
```
https://eishro-backend.fly.dev/health
```

**يجب أن ترى:**
```json
{"status": "ok", ...}
```

✅ **Backend يعمل**

---

### ✅ الخطوة 5.2: اختبار Frontend

افتحي:
```
https://your-app.vercel.app
```

**اضغطي F12 → Console**

- ✅ **لا أخطاء CORS** (أو قليلة جداً)
- ✅ **الموقع يفتح بدون مشاكل**

---

### ✅ الخطوة 5.3: اختبار API Connection

في Frontend:

1. اضغطي F12 → **Network** tab
2. قومي بأي عملية (مثلاً: عرض متاجر)
3. في Network tab، ابحثي عن request إلى:
   ```
   https://eishro-backend.fly.dev/api/...
   ```
4. اضغطي عليه
5. **Status:** يجب أن يكون `200 OK`

✅ **Frontend متصل بـ Backend!**

---

### ✅ الخطوة 5.4: اختبار Database

في Frontend:

1. سجلي حساب جديد (أو سجلي دخول)
2. إذا نجح → Database تعمل ✅
3. أضيفي منتج (إذا كنت Merchant)
4. إذا حُفظ → Database تعمل ✅

---

## 🎊 تهانينا!

### ✅ إذا وصلت لهنا:

✅ Backend منشور على Fly.io  
✅ Frontend منشور على Vercel  
✅ Database على CPanel متصلة  
✅ CORS يعمل بدون مشاكل  
✅ SSL/HTTPS مفعّل  
✅ المنصة تعمل 24/7  

**منصة EISHRO جاهزة للاستخدام! 🚀**

---

## 📋 معلوماتك النهائية

**احفظي هذه المعلومات:**

```
=== URLs ===
Frontend: https://______________________________.vercel.app
Backend: https://______________________________.fly.dev
API: https://______________________________.fly.dev/api
Health: https://______________________________.fly.dev/health

=== Dashboards ===
Fly.io: https://fly.io/dashboard
Vercel: https://vercel.com/dashboard
CPanel: https://yourdomain.com:2083

=== Commands ===
Fly logs: fly logs
Fly status: fly status
Vercel logs: vercel logs
Update Backend: fly deploy
Update Frontend: git push (تلقائي)
```

---

## 🔧 الخطوات التالية (اختياري)

### 1. إضافة نطاق مخصص
- Vercel → Domains → أضيفي `www.ishro.ly`
- CPanel → DNS → CNAME record

### 2. إعداد Monitoring
- Fly.io Dashboard → Metrics
- Vercel Dashboard → Analytics

### 3. Backup منتظم
- CPanel → Backup → Schedule
- أو استخدمي Cron job

### 4. تحسين الأداء
- تفعيل Caching
- ضغط الصور
- Lazy loading

---

## 🆘 مشاكل؟

### إذا واجهتك أي مشكلة:

1. **راجعي الأدلة المفصلة:**
   - [@FLY_DEPLOYMENT_GUIDE.md](FLY_DEPLOYMENT_GUIDE.md)
   - [@VERCEL_DEPLOYMENT_GUIDE_FINAL.md](VERCEL_DEPLOYMENT_GUIDE_FINAL.md)
   - [@CPANEL_MYSQL_GUIDE.md](CPANEL_MYSQL_GUIDE.md)

2. **راجعي FAQ:**
   - [@FAQ_DEPLOYMENT.md](FAQ_DEPLOYMENT.md)

3. **راجعي السجلات:**
   ```bash
   fly logs
   ```

4. **اطلبي المساعدة:**
   - Fly.io Community
   - Vercel Discord

---

**بالتوفيق! 🌟**
