# 🎨 دليل نشر Frontend على Vercel - خطوة بخطوة

## 📋 جدول المحتويات
- [المتطلبات الأساسية](#المتطلبات-الأساسية)
- [الخطوة 1: إنشاء حساب على Vercel](#الخطوة-1-إنشاء-حساب-على-vercel)
- [الخطوة 2: تثبيت Vercel CLI (اختياري)](#الخطوة-2-تثبيت-vercel-cli-اختياري)
- [الخطوة 3: نشر المشروع](#الخطوة-3-نشر-المشروع)
- [الخطوة 4: إضافة المتغيرات البيئية](#الخطوة-4-إضافة-المتغيرات-البيئية)
- [الخطوة 5: ربط Frontend مع Backend](#الخطوة-5-ربط-frontend-مع-backend)
- [الخطوة 6: التحقق من النشر](#الخطوة-6-التحقق-من-النشر)
- [أوامر مفيدة](#أوامر-مفيدة)
- [استكشاف الأخطاء](#استكشاف-الأخطاء)

---

## المتطلبات الأساسية

قبل البدء، تأكدي من:
- ✅ المشروع موجود على GitHub
- ✅ حساب GitHub نشط
- ✅ Backend منشور على Fly.io (من الخطوة السابقة)
- ✅ معلومات اتصال MySQL من CPanel

---

## الخطوة 1: إنشاء حساب على Vercel

### 1.1 فتح موقع Vercel

1. افتحي المتصفح واذهبي إلى: https://vercel.com
2. اضغطي على **"Sign Up"**

### 1.2 التسجيل عبر GitHub (موصى به)

1. اضغطي على **"Continue with GitHub"**
2. سجلي الدخول إلى GitHub
3. اضغطي **"Authorize Vercel"**

✅ **تم! الحساب جاهز**

**ملاحظة:** Vercel مجاني 100% للمشاريع الشخصية - لا يطلب بطاقة ائتمان!

---

## الخطوة 2: تثبيت Vercel CLI (اختياري)

يمكنك النشر من Dashboard مباشرة، أو استخدام CLI

### 2.1 تثبيت Vercel CLI

#### Windows/macOS/Linux

```bash
npm install -g vercel
```

**أو باستخدام yarn:**
```bash
yarn global add vercel
```

### 2.2 تسجيل الدخول

```bash
vercel login
```

سيُطلب منك:
```
? How would you like to log in?
> GitHub
  GitLab
  Bitbucket
  Email
```

اختاري **GitHub** واضغطي `Enter`

سيفتح المتصفح - سجلي الدخول وأكدي.

---

## الخطوة 3: نشر المشروع

لديك خياران: **Dashboard** أو **CLI**

---

### 🎯 الطريقة 1: النشر من Dashboard (موصى به للمبتدئين)

#### 3.1 الذهاب إلى Dashboard

1. اذهبي إلى: https://vercel.com/dashboard
2. اضغطي على **"Add New"** → **"Project"**

#### 3.2 استيراد المشروع من GitHub

1. سترى قائمة بجميع مستودعاتك على GitHub
2. ابحثي عن المشروع (مثلاً: `eishro-platform`)
3. اضغطي **"Import"** بجانب المشروع

**إذا لم تجدي المشروع:**
- اضغطي **"Adjust GitHub App Permissions"**
- أعطي Vercel صلاحية الوصول للمستودع

#### 3.3 إعدادات المشروع

Vercel سيكتشف أنه مشروع **Vite** تلقائياً:

**Framework Preset:** `Vite`  
**Root Directory:** `./` (أو اختاري المجلد إذا كان Frontend في مجلد فرعي)

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```bash
dist
```

**Install Command:**
```bash
npm install
```

#### 3.4 إضافة المتغيرات البيئية (مهم!)

قبل النشر، أضيفي المتغيرات:

1. اضغطي على **"Environment Variables"**

2. أضيفي واحداً تلو الآخر:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://eishro-backend.fly.dev/api` |
| `VITE_BACKEND_URL` | `https://eishro-backend.fly.dev` |
| `VITE_FRONTEND_URL` | (اتركيه فارغاً - سيتم تحديثه لاحقاً) |
| `VITE_GOOGLE_CLIENT_ID` | `1034286241802-hkdlf7mua6img2vhdo6mhna8ghb3mmhg.apps.googleusercontent.com` |
| `VITE_MOAMALAT_HASH_ENDPOINT` | `https://eishro-backend.fly.dev` |
| `VITE_CORS_ORIGIN` | `https://eishro-backend.fly.dev` |

**كيفية الإضافة:**
- **Name:** أدخلي اسم المتغير
- **Value:** أدخلي القيمة
- **Environment:** اختاري `Production`
- اضغطي **"Add"**

3. كرري لجميع المتغيرات

#### 3.5 النشر

1. بعد إضافة جميع المتغيرات
2. اضغطي **"Deploy"**

سيحدث الآتي:

```
⏳ Building...
   npm install
   npm run build
   ✓ Built in 45s

⏳ Deploying...
   ✓ Deployed to production

✓ Deployment completed!
   https://eishro-platform-abc123.vercel.app
```

**الوقت المتوقع:** 1-3 دقائق

🎉 **مبروك! Frontend أصبح على الإنترنت!**

---

### 🎯 الطريقة 2: النشر من CLI (للمحترفين)

#### 3.1 الانتقال إلى مجلد المشروع

```bash
cd /path/to/your/project
```

#### 3.2 تنفيذ أمر Deploy

```bash
vercel --prod
```

سيُطرح عليك:

**السؤال 1:**
```
? Set up and deploy "~/project"? (Y/n)
```
**الإجابة:** `Y`

**السؤال 2:**
```
? Which scope do you want to deploy to?
  > Your Name (Hobby)
```
**الإجابة:** اختاري حسابك

**السؤال 3:**
```
? Link to existing project? (y/N)
```
**الإجابة:** `N` (مشروع جديد)

**السؤال 4:**
```
? What's your project's name?
```
**الإجابة:** `eishro-platform` (أو أي اسم تريدينه)

**السؤال 5:**
```
? In which directory is your code located?
```
**الإجابة:** `./` (أو المجلد الصحيح)

ثم:
```
✓ Linked to your-name/eishro-platform
✓ Inspect: https://vercel.com/...
✓ Production: https://eishro-platform-abc123.vercel.app
```

---

## الخطوة 4: إضافة المتغيرات البيئية

إذا لم تضيفي المتغيرات في الخطوة 3.4، أضيفيها الآن:

### 4.1 من Dashboard

1. اذهبي إلى: https://vercel.com/dashboard
2. اختاري المشروع `eishro-platform`
3. اضغطي **"Settings"**
4. من القائمة اليسرى، اضغطي **"Environment Variables"**
5. أضيفي المتغيرات:

#### المتغيرات المطلوبة:

```env
VITE_API_URL=https://eishro-backend.fly.dev/api
VITE_BACKEND_URL=https://eishro-backend.fly.dev
VITE_FRONTEND_URL=https://your-app.vercel.app
VITE_GOOGLE_CLIENT_ID=1034286241802-hkdlf7mua6img2vhdo6mhna8ghb3mmhg.apps.googleusercontent.com
VITE_GOOGLE_REDIRECT_URI=https://your-app.vercel.app/auth/google/callback
VITE_MOAMALAT_HASH_ENDPOINT=https://eishro-backend.fly.dev
VITE_CORS_ORIGIN=https://eishro-backend.fly.dev
VITE_MINIMAX_ENABLED=false
```

**لكل متغير:**
1. **Key:** أدخلي الاسم (مثل `VITE_API_URL`)
2. **Value:** أدخلي القيمة
3. **Environment:** حددي `Production`, `Preview`, `Development` (أو الكل)
4. اضغطي **"Save"**

### 4.2 من CLI (بديل)

```bash
vercel env add VITE_API_URL production
? What's the value of VITE_API_URL? https://eishro-backend.fly.dev/api
```

كرري لجميع المتغيرات.

### 4.3 إعادة النشر بعد إضافة المتغيرات

بعد إضافة المتغيرات، يجب إعادة النشر:

**من Dashboard:**
1. اذهبي إلى **"Deployments"**
2. اختاري آخر deployment
3. اضغطي **"⋯"** (ثلاث نقاط)
4. اضغطي **"Redeploy"**

**من CLI:**
```bash
vercel --prod
```

---

## الخطوة 5: ربط Frontend مع Backend

### 5.1 الحصول على Frontend URL

بعد النشر، ستحصلين على URL مثل:
```
https://eishro-platform-abc123.vercel.app
```

**نسخي هذا الرابط!**

### 5.2 تحديث Backend على Fly.io

الآن نحتاج إضافة Frontend URL في Backend:

```bash
fly secrets set FRONTEND_URL=https://eishro-platform-abc123.vercel.app
fly secrets set CORS_ORIGIN=https://eishro-platform-abc123.vercel.app
```

هذا سيسمح للـ Backend بقبول طلبات من Frontend (CORS).

### 5.3 تحديث Frontend URL في Vercel

ارجعي إلى Vercel Dashboard:

1. **Settings** → **Environment Variables**
2. ابحثي عن `VITE_FRONTEND_URL`
3. اضغطي **"Edit"**
4. أدخلي: `https://eishro-platform-abc123.vercel.app`
5. **Save**
6. **Redeploy**

---

## الخطوة 6: التحقق من النشر

### 6.1 فتح التطبيق

افتحي Frontend URL في المتصفح:
```
https://eishro-platform-abc123.vercel.app
```

يجب أن يفتح الموقع بدون أخطاء ✅

### 6.2 فحص اتصال API

افتحي **Developer Tools** (F12):

1. اذهبي إلى تبويب **"Network"**
2. قومي بأي عملية تستدعي API (مثل تسجيل دخول)
3. تحققي من الطلبات:
   - يجب أن ترى طلبات إلى: `https://eishro-backend.fly.dev/api/...`
   - Status: `200 OK`

✅ **إذا رأيت 200 OK، التطبيق يعمل بنجاح!**

### 6.3 فحص Console

في Developer Tools → **Console**:

- **لا يجب أن ترى:** CORS errors
- **لا يجب أن ترى:** API connection errors

إذا رأيت أخطاء، راجعي [استكشاف الأخطاء](#استكشاف-الأخطاء)

---

## أوامر مفيدة

### Vercel CLI

```bash
# عرض معلومات المشروع
vercel inspect

# عرض جميع Deployments
vercel ls

# عرض السجلات
vercel logs

# فتح Dashboard
vercel dashboard

# حذف deployment
vercel remove [deployment-url]

# إعادة نشر آخر deployment
vercel --prod

# نشر إلى Preview فقط (للتجربة)
vercel

# ربط مشروع موجود
vercel link
```

### إدارة Environment Variables

```bash
# عرض جميع المتغيرات
vercel env ls

# إضافة متغير جديد
vercel env add VARIABLE_NAME production

# حذف متغير
vercel env rm VARIABLE_NAME production

# سحب المتغيرات محلياً
vercel env pull .env.local
```

### Domain Management

```bash
# عرض النطاقات
vercel domains ls

# إضافة نطاق مخصص
vercel domains add yourdomain.com

# حذف نطاق
vercel domains rm yourdomain.com
```

---

## استكشاف الأخطاء

### 1. CORS Error

**الخطأ في Console:**
```
Access to fetch at 'https://eishro-backend.fly.dev/api/...' 
has been blocked by CORS policy
```

**الحل:**

1. تأكدي من إضافة Frontend URL في Backend:
```bash
fly secrets set CORS_ORIGIN=https://your-app.vercel.app
fly secrets set FRONTEND_URL=https://your-app.vercel.app
```

2. تحققي من ملف `app.ts` في Backend - يجب أن يحتوي على:
```typescript
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true
}
```

3. أعد نشر Backend:
```bash
fly deploy
```

---

### 2. API Connection Failed

**الخطأ في Console:**
```
Failed to fetch
net::ERR_CONNECTION_REFUSED
```

**الحل:**

1. تحققي من `VITE_API_URL` في Vercel:
   - Settings → Environment Variables
   - يجب أن يكون: `https://eishro-backend.fly.dev/api`

2. اختبري Backend مباشرة:
```
https://eishro-backend.fly.dev/health
```

إذا لم يعمل، Backend معطل:
```bash
fly logs
fly status
```

3. أعد نشر Frontend:
   - Deployments → Redeploy

---

### 3. Environment Variables Not Working

**الأعراض:**
- undefined في الكود
- API URLs خاطئة

**الحل:**

1. تحققي من أسماء المتغيرات - يجب أن تبدأ بـ `VITE_`

2. في Dashboard:
   - Settings → Environment Variables
   - تأكدي أن Environment = `Production`

3. بعد أي تعديل، يجب إعادة النشر (Redeploy)

---

### 4. Build Failed

**الخطأ:**
```
Error: Build failed with exit code 1
```

**الحل:**

1. راجعي Build Logs في Dashboard:
   - Deployments → اختاري Deployment → Build Logs

2. ابحثي عن الخطأ الفعلي:
   - Missing dependency? أضيفيها في `package.json`
   - TypeScript error? صححي الكود
   - Vite config issue? راجعي `vite.config.ts`

3. اختبري البناء محلياً:
```bash
npm run build
```

إذا فشل محلياً، صححي الخطأ أولاً.

---

### 5. Page Not Found (404)

**الأعراض:**
- الصفحة الرئيسية تعمل
- الصفحات الفرعية تعطي 404

**الحل:**

تحققي من `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

هذا ضروري لـ React Router!

---

### 6. Images Not Loading

**الأعراض:**
- الصور لا تظهر
- 404 على `/assets/...`

**الحل:**

1. تأكدي من أن الصور في مجلد `public/` أو `public/assets/`

2. في الكود، استخدمي المسارات الصحيحة:
```typescript
// ✅ صحيح
<img src="/assets/logo.png" />

// ❌ خطأ
<img src="./assets/logo.png" />
```

3. تحققي من Build Output:
   - Deployments → Build Logs
   - ابحثي عن: `Copying assets...`

---

## 🎯 الخلاصة

بعد إتمام هذه الخطوات:
✅ Frontend منشور على Vercel  
✅ متصل بـ Backend على Fly.io  
✅ SSL/HTTPS مفعّل تلقائياً  
✅ Auto-deployment من GitHub  

**URLs:**
```
Frontend: https://your-app.vercel.app
Backend: https://eishro-backend.fly.dev/api
```

---

## 📱 نطاق مخصص (Domain)

إذا أردت استخدام نطاقك الخاص (مثل `www.ishro.ly`):

### في Vercel:

1. **Settings** → **Domains**
2. أدخلي النطاق: `www.ishro.ly`
3. اضغطي **"Add"**
4. اتبعي التعليمات لإضافة DNS Records في CPanel:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

5. انتظري 5-10 دقائق للـ DNS propagation

✅ **الموقع سيعمل على النطاق الخاص بك!**

---

## 🔄 Auto-Deployment (النشر التلقائي)

**ميزة رائعة في Vercel:**

عند أي `git push` إلى GitHub:
- Vercel ينشر تلقائياً ✅
- Build تلقائي ✅
- Preview URL لكل فرع ✅

**لتعطيل Auto-Deploy:**
1. Settings → Git
2. أغلقي **"Automatic Deployments"**

---

## 📞 الدعم

- **Vercel Docs:** https://vercel.com/docs
- **Community:** https://github.com/vercel/vercel/discussions
- **Discord:** https://vercel.com/discord

---

**التالي:** [دليل إعداد MySQL من CPanel →](CPANEL_MYSQL_GUIDE.md)
