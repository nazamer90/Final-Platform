# 🚀 دليل نشر Backend على Fly.io - خطوة بخطوة

## 📋 جدول المحتويات
- [المتطلبات الأساسية](#المتطلبات-الأساسية)
- [الخطوة 1: إنشاء حساب على Fly.io](#الخطوة-1-إنشاء-حساب-على-flyio)
- [الخطوة 2: تثبيت Fly CLI](#الخطوة-2-تثبيت-fly-cli)
- [الخطوة 3: تسجيل الدخول](#الخطوة-3-تسجيل-الدخول)
- [الخطوة 4: تجهيز المشروع](#الخطوة-4-تجهيز-المشروع)
- [الخطوة 5: إنشاء التطبيق على Fly.io](#الخطوة-5-إنشاء-التطبيق-على-flyio)
- [الخطوة 6: إضافة المتغيرات البيئية (Secrets)](#الخطوة-6-إضافة-المتغيرات-البيئية-secrets)
- [الخطوة 7: النشر الأول](#الخطوة-7-النشر-الأول)
- [الخطوة 8: التحقق من النشر](#الخطوة-8-التحقق-من-النشر)
- [أوامر مفيدة](#أوامر-مفيدة)
- [استكشاف الأخطاء](#استكشاف-الأخطاء)

---

## المتطلبات الأساسية

قبل البدء، تأكدي من توفر:
- ✅ حساب بريد إلكتروني
- ✅ بطاقة ائتمان (للتحقق فقط - الخطة المجانية لا تحتاج دفع)
- ✅ اتصال إنترنت مستقر
- ✅ Windows 10/11 أو macOS أو Linux
- ✅ Git مثبت على جهازك

---

## الخطوة 1: إنشاء حساب على Fly.io

### 1.1 فتح موقع Fly.io

1. افتحي المتصفح واذهبي إلى: https://fly.io
2. اضغطي على زر **"Sign Up"** (أو "Get Started")

![Fly.io Homepage](https://fly.io/docs/images/homepage.png)

### 1.2 إنشاء الحساب

يمكنك التسجيل بإحدى الطرق:
- **GitHub** (موصى به - أسرع)
- **Email**

#### الطريقة 1: التسجيل عبر GitHub

1. اضغطي على **"Sign up with GitHub"**
2. سجلي الدخول إلى حساب GitHub الخاص بك
3. اسمحي لـ Fly.io بالوصول إلى حسابك
4. ✅ تم! انتقلي إلى [الخطوة 1.3](#13-إضافة-بطاقة-ائتمان)

#### الطريقة 2: التسجيل عبر Email

1. اضغطي على **"Sign up with Email"**
2. أدخلي بريدك الإلكتروني
3. أدخلي كلمة مرور قوية (8 أحرف على الأقل)
4. اضغطي **"Sign Up"**
5. افتحي بريدك الإلكتروني وأكدي التسجيل

### 1.3 إضافة بطاقة ائتمان

**مهم:** Fly.io يطلب بطاقة ائتمان للتحقق فقط - **لن يتم الخصم منها في الخطة المجانية**

1. بعد التسجيل، سيطلب منك إضافة بطاقة
2. اذهبي إلى **"Billing"** أو **"Payment Methods"**
3. أدخلي معلومات البطاقة:
   - رقم البطاقة
   - تاريخ الانتهاء
   - CVV
   - الاسم على البطاقة

4. اضغطي **"Add Card"**

**الحدود المجانية:**
- 3 Virtual Machines (VMs)
- 3GB Storage
- 160GB Outbound Traffic شهرياً

**طالما لم تتجاوزي هذه الحدود، لن يتم خصم أي مبلغ!**

---

## الخطوة 2: تثبيت Fly CLI

Fly CLI هو برنامج سطر الأوامر للتحكم في تطبيقاتك على Fly.io

### 2.1 Windows (موصى به: PowerShell كمسؤول)

1. افتحي **PowerShell** كمسؤول:
   - اضغطي `Win + X`
   - اختاري **"Windows PowerShell (Admin)"**

2. نفذي الأمر التالي:

```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

3. انتظري حتى ينتهي التثبيت (حوالي دقيقة)

4. أغلقي PowerShell وافتحيها من جديد

5. تحققي من التثبيت:

```powershell
fly version
```

يجب أن تظهر نسخة Fly CLI مثل:
```
flyctl v0.x.xxx windows/amd64 Commit: xxxxxxx
```

### 2.2 macOS

1. افتحي Terminal

2. نفذي الأمر:

```bash
curl -L https://fly.io/install.sh | sh
```

3. أضيفي Fly CLI إلى PATH:

```bash
echo 'export PATH="$HOME/.fly/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

4. تحققي من التثبيت:

```bash
fly version
```

### 2.3 Linux

```bash
curl -L https://fly.io/install.sh | sh
```

ثم أضيفي إلى PATH:

```bash
echo 'export PATH="$HOME/.fly/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

---

## الخطوة 3: تسجيل الدخول

### 3.1 تسجيل الدخول عبر المتصفح (موصى به)

1. افتحي Terminal أو PowerShell

2. نفذي الأمر:

```bash
fly auth login
```

3. سيفتح المتصفح تلقائياً

4. سجلي الدخول بحساب Fly.io الذي أنشأتيه

5. اضغطي **"Authorize"**

6. ارجعي إلى Terminal - يجب أن ترى:
```
✓ Authentication token saved
```

### 3.2 تسجيل الدخول عبر Token (بديل)

إذا لم يعمل المتصفح:

```bash
fly auth token
```

اتبعي التعليمات لنسخ التوكن وإدخاله.

---

## الخطوة 4: تجهيز المشروع

### 4.1 التأكد من الملفات الضرورية

تأكدي من وجود هذه الملفات في مجلد المشروع:

```
project/
├── fly.toml              ✅ (تم إنشاؤه)
├── Dockerfile            ✅ (تم إنشاؤه)
├── .dockerignore         ✅ (تم إنشاؤه)
├── .env.fly.production   ✅ (تم إنشاؤه)
├── package.json          ✅
├── server.js أو app.ts   ✅
└── backend/              (إذا كان البكند في مجلد منفصل)
```

### 4.2 تعديل fly.toml (إذا لزم الأمر)

افتحي ملف `fly.toml` وعدلي:

```toml
app = "eishro-backend"  # غيري الاسم إلى اسم فريد (اختياري)
```

**ملاحظة:** اسم التطبيق يجب أن يكون فريداً على Fly.io

---

## الخطوة 5: إنشاء التطبيق على Fly.io

### 5.1 الانتقال إلى مجلد المشروع

```bash
cd /path/to/your/project
```

مثال:
```bash
cd C:\Users\YourName\Documents\eishro-platform
```

### 5.2 إطلاق التطبيق

```bash
fly launch
```

ستُطرح عليك عدة أسئلة:

#### السؤال 1: App Name

```
? Choose an app name (leave blank to generate one):
```

**الخيارات:**
- اتركيه فارغاً: Fly.io سيختار اسماً عشوائياً (مثل `eishro-backend-1234`)
- أو أدخلي اسماً: `eishro-backend` (إذا كان متاحاً)

**موصى به:** أدخلي اسماً واضحاً مثل `eishro-backend`

اضغطي `Enter`

#### السؤال 2: Organization

```
? Choose an organization:
  > Personal (أو اسم حسابك)
```

اختاري **Personal** واضغطي `Enter`

#### السؤال 3: Region

```
? Choose a region for deployment:
  Amsterdam (ams)
  Frankfurt (fra)  ← اختاري هذا (الأقرب لليبيا)
  London (lhr)
  Paris (cdg)
```

**اختاري:** `Frankfurt (fra)` (الأقرب لليبيا وأسرع)

استخدمي الأسهم ↑↓ للتنقل، ثم اضغطي `Enter`

#### السؤال 4: Postgres Database

```
? Would you like to set up a Postgresql database now? (y/N)
```

**أدخلي:** `N` (لأن لديك MySQL على CPanel)

#### السؤال 5: Redis Cache

```
? Would you like to set up an Upstash Redis database now? (y/N)
```

**أدخلي:** `N` (غير مطلوب حالياً)

#### السؤال 6: Deploy Now

```
? Would you like to deploy now? (y/N)
```

**أدخلي:** `N` (سنضيف المتغيرات البيئية أولاً)

---

سيقوم Fly.io بإنشاء ملف `fly.toml` (إذا لم يكن موجوداً) ويعرض:

```
✓ Created app eishro-backend in organization personal
✓ Wrote config file fly.toml
Your app is ready. Deploy with `fly deploy`
```

✅ **تم إنشاء التطبيق بنجاح!**

---

## الخطوة 6: إضافة المتغيرات البيئية (Secrets)

الآن نحتاج إضافة المتغيرات السرية (Database, JWT, etc.)

### 6.1 قائمة المتغيرات المطلوبة

افتحي ملف `.env.fly.production` وأعدي قائمة بالمتغيرات المهمة:

1. **Database (MySQL من CPanel)**
2. **JWT Secret**
3. **Session Secret**
4. **Frontend URL**
5. **Payment Gateway**

### 6.2 إضافة المتغيرات واحداً تلو الآخر

#### أ) Database Configuration

```bash
fly secrets set DB_HOST=your-cpanel-mysql-host.com
```

مثال:
```bash
fly secrets set DB_HOST=mysql.ishro.ly
```

انتظري حتى ترى:
```
✓ Setting secrets on eishro-backend
  DB_HOST: <redacted>
```

ثم أضيفي باقي متغيرات الـ Database:

```bash
fly secrets set DB_PORT=3306
fly secrets set DB_NAME=your_database_name
fly secrets set DB_USER=your_mysql_username
fly secrets set DB_PASSWORD=your_mysql_password
```

**مهم:** استبدلي القيم بالبيانات الحقيقية من CPanel!

#### ب) JWT & Security

```bash
fly secrets set JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-2025
fly secrets set SESSION_SECRET=your-session-secret-key-minimum-32-characters-2025
fly secrets set ENCRYPTION_KEY=your-64-character-hex-encryption-key-here
```

**نصيحة:** استخدمي مولد مفاتيح عشوائية:
```bash
# في PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

#### ج) URLs (سنحدثها لاحقاً)

```bash
fly secrets set FRONTEND_URL=https://your-app.vercel.app
fly secrets set BACKEND_URL=https://eishro-backend.fly.dev
fly secrets set CORS_ORIGIN=https://your-app.vercel.app
```

**ملاحظة:** بعد نشر Frontend على Vercel، سنحدث `FRONTEND_URL`

#### د) Payment Gateway (Moamalat)

```bash
fly secrets set MOAMALAT_MID=10081014649
fly secrets set MOAMALAT_TID=99179395
fly secrets set MOAMALAT_SECRET=3a488a89b3f7993476c252f017c488bb
fly secrets set MOAMALAT_ENV=production
```

#### هـ) Google OAuth (اختياري)

```bash
fly secrets set GOOGLE_CLIENT_ID=1034286241802-hkdlf7mua6img2vhdo6mhna8ghb3mmhg.apps.googleusercontent.com
fly secrets set GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
```

### 6.3 التحقق من المتغيرات

```bash
fly secrets list
```

سترى قائمة بجميع المتغيرات (القيم مخفية لأمان):

```
NAME                    DIGEST
DB_HOST                 abc123...
DB_NAME                 def456...
JWT_SECRET              ghi789...
...
```

---

## الخطوة 7: النشر الأول

### 7.1 تنفيذ أمر Deploy

```bash
fly deploy
```

سيحدث الآتي:

1. **Building Docker Image:**
```
==> Building image
--> Building image with Docker
...
[+] Building 45.2s
```

2. **Pushing to Fly.io:**
```
--> Pushing image to fly
...
image size: 234 MB
```

3. **Deploying:**
```
==> Deploying
--> Deploying image
--> Creating release
...
```

4. **Health Checks:**
```
--> Checking health
...
✓ 1 desired, 1 placed, 1 healthy
```

**الوقت المتوقع:** 2-5 دقائق

### 7.2 النشر ناجح!

عند النجاح، سترى:

```
✓ Deployment successful!
  https://eishro-backend.fly.dev
```

🎉 **مبروك! Backend أصبح على الإنترنت!**

---

## الخطوة 8: التحقق من النشر

### 8.1 فتح التطبيق

```bash
fly open
```

أو افتحي المتصفح واذهبي إلى:
```
https://eishro-backend.fly.dev
```

### 8.2 اختبار Health Endpoint

```bash
curl https://eishro-backend.fly.dev/health
```

أو افتحي في المتصفح:
```
https://eishro-backend.fly.dev/health
```

يجب أن ترى:
```json
{
  "status": "ok",
  "timestamp": "2025-12-10T12:34:56.789Z",
  "environment": "production"
}
```

✅ **إذا رأيت هذا، Backend يعمل بنجاح!**

### 8.3 عرض السجلات (Logs)

```bash
fly logs
```

سترى سجلات التطبيق الحية:
```
2025-12-10T12:34:56Z [info] Server listening on port 8080
2025-12-10T12:34:57Z [info] Database connected successfully
...
```

لإيقاف السجلات: اضغطي `Ctrl+C`

### 8.4 فتح Dashboard

```bash
fly dashboard
```

أو اذهبي إلى: https://fly.io/dashboard

ستجدي تطبيقك `eishro-backend` مع:
- Status: ✅ Running
- Region: fra (Frankfurt)
- Last deployed: منذ دقائق

---

## أوامر مفيدة

### إدارة التطبيق

```bash
# عرض معلومات التطبيق
fly status

# عرض الماكينات النشطة
fly machines list

# إعادة تشغيل التطبيق
fly apps restart eishro-backend

# إيقاف التطبيق مؤقتاً
fly scale count 0

# تشغيل التطبيق
fly scale count 1
```

### السجلات والتشخيص

```bash
# عرض السجلات الحية
fly logs

# عرض آخر 100 سجل
fly logs --history 100

# تصفية السجلات (errors فقط)
fly logs | grep error

# فتح SSH للتطبيق
fly ssh console
```

### التحديث والنشر

```bash
# نشر تحديث جديد
fly deploy

# نشر من فرع Git محدد
fly deploy --image registry.fly.io/eishro-backend:latest

# نشر مع عدم تنفيذ health checks
fly deploy --no-health-checks
```

### المتغيرات البيئية

```bash
# عرض جميع المتغيرات
fly secrets list

# إضافة متغير جديد
fly secrets set KEY=VALUE

# حذف متغير
fly secrets unset KEY

# تحديث عدة متغيرات دفعة واحدة
fly secrets set KEY1=VALUE1 KEY2=VALUE2 KEY3=VALUE3
```

### التخزين (Volumes)

```bash
# إنشاء Volume للتخزين الدائم
fly volumes create uploads_volume --size 3

# عرض جميع Volumes
fly volumes list

# حذف Volume
fly volumes delete vol_xxx
```

---

## استكشاف الأخطاء

### 1. التطبيق لا يبدأ (Health Checks Failed)

**الخطأ:**
```
✗ Health check failed
```

**الحل:**
1. تحققي من السجلات:
```bash
fly logs
```

2. تأكدي من أن `/health` endpoint موجود في Backend

3. تحققي من `fly.toml` - المنفذ يجب أن يكون `8080`

### 2. Database Connection Error

**الخطأ:**
```
Error: connect ETIMEDOUT
```

**الحل:**
1. تحققي من أن CPanel MySQL يسمح بـ Remote Access

2. تحققي من معلومات الاتصال:
```bash
fly secrets list
```

3. تأكدي من:
   - DB_HOST صحيح (مثل `mysql.yourdomain.com`)
   - DB_PORT هو `3306`
   - Username & Password صحيحين

4. في CPanel:
   - اذهبي إلى **Remote MySQL**
   - أضيفي `%` (السماح لجميع IPs)
   - أو أضيفي Fly.io IPs

### 3. "App Name Already Taken"

**الخطأ:**
```
Error: app name "eishro-backend" is already taken
```

**الحل:**
اختاري اسماً مختلفاً:
```bash
fly apps create eishro-backend-yourname
```

### 4. Build Failed

**الخطأ:**
```
Error: failed to build: ...
```

**الحل:**
1. تحققي من `Dockerfile`:
```bash
docker build -t test .
```

2. إذا فشل محلياً، فالمشكلة في Dockerfile

3. راجعي السجلات:
```bash
fly logs
```

### 5. Out of Memory

**الخطأ:**
```
OOMKilled: Out of memory
```

**الحل:**
زيادة الذاكرة (سيتطلب خطة مدفوعة):
```bash
fly scale memory 512
```

أو:
- قللي استهلاك الذاكرة في الكود
- قللي عدد المكتبات المثبتة

### 6. SSL/HTTPS Issues

**الخطأ:**
```
ERR_SSL_PROTOCOL_ERROR
```

**الحل:**
Fly.io يوفر SSL تلقائياً، لكن:
1. تأكدي من استخدام `https://` وليس `http://`
2. انتظري 5-10 دقائق بعد النشر الأول

---

## 🎯 الخلاصة

بعد إتمام هذه الخطوات:
✅ Backend منشور على Fly.io  
✅ Database متصل من CPanel  
✅ SSL/HTTPS مفعّل تلقائياً  
✅ التطبيق يعمل 24/7  

**URL التطبيق:**
```
https://eishro-backend.fly.dev
https://eishro-backend.fly.dev/api/health
```

---

## 📞 الدعم

إذا واجهتك أي مشكلة:

1. **Fly.io Docs:** https://fly.io/docs
2. **Community Forum:** https://community.fly.io
3. **Discord:** https://fly.io/discord

---

**التالي:** [دليل نشر Frontend على Vercel →](VERCEL_DEPLOYMENT_GUIDE_FINAL.md)
