# 🎨 دليل نشر الفرونتند على Vercel

## 📍 المتطلبات

- ✅ Koyeb Backend يعمل بنجاح
- ✅ رابط Koyeb: `https://eishro-backend-xxxx.koyeb.app`
- ✅ حساب Vercel
- ✅ GitHub account

---

## 🔍 البحث عن الفرونتند

### الخطوة 1: تحديد موقع الفرونتند

```bash
# البحث عن ملف package.json للفرونتند
find . -name "package.json" -type f | grep -i frontend

# أو ابحث عن ملفات React/Vue
find . -name "vite.config.*" -o -name "next.config.*"
```

### الخطوة 2: التحقق من نوع الفرونتند

تحقق من وجود:
- `vite.config.ts/js` → **Vite** (الأفضل)
- `next.config.js` → **Next.js**
- `nuxt.config.ts` → **Nuxt**
- `package.json` مع `"react"` → **React**

---

## 🚀 خطوات النشر على Vercel

### الخطوة 1: تسجيل الدخول إلى Vercel

```bash
# تثبيت Vercel CLI (اختياري)
npm install -g vercel

# سجل دخول
vercel login
```

أو اذهب مباشرة إلى https://vercel.com

### الخطوة 2: ربط GitHub

1. في https://vercel.com/new
2. اختر "GitHub" أسفل "Create a new Project"
3. اتبع خطوات الترخيص
4. اختر المشروع `Final-Platform` (أو اسم المشروع)

### الخطوة 3: تحديد إعدادات النشر

**في لوحة Vercel:**
1. **Project Name**: `eishro-frontend` (أو ما تفضل)
2. **Framework**: اختر النوع المناسب (Vite/React/Next.js)
3. **Root Directory**: إذا كان الفرونتند في مجلد `frontend/`، حدد ذلك

### الخطوة 4: متغيرات البيئة على Vercel

في خطوات الإعداد، أضف:

```
VITE_API_URL=https://eishro-backend-xxxx.koyeb.app
VITE_API_PREFIX=/api
VITE_APP_NAME=EISHRO
VITE_NODE_ENV=production
```

أو بعد النشر:
1. اذهب إلى Project Settings
2. Environment Variables
3. أضف المتغيرات

---

## 🌐 ربط النطاق ishro.ly

### الخطوة 1: شراء النطاق (إذا لم تفعل)

اختر مسجل نطاقات مثل:
- Namecheap
- GoDaddy  
- Domain.com
- أي مسجل نطاقات آخر

### الخطوة 2: إضافة النطاق إلى Vercel

**في لوحة Vercel:**
1. الذهاب إلى Project → Domains
2. أضف النطاق: `ishro.ly`
3. أضف أيضاً: `www.ishro.ly`

### الخطوة 3: تحديث DNS

Vercel سيعطيك Nameservers:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
ns3.vercel-dns.com
ns4.vercel-dns.com
```

**في مسجل النطاق الخاص بك:**
1. اذهب إلى DNS Settings
2. غيّر Nameservers إلى nameservers Vercel
3. أو أضف CNAME record يشير إلى Vercel

### الخطوة 4: انتظر التحديث

قد يستغرق 24-48 ساعة للتحديث الكامل

---

## ✅ اختبار الفرونتند

```bash
# 1. اختبر محلياً أولاً
npm run dev

# 2. افتح http://localhost:5173 (أو الرقم الصحيح)

# 3. تأكد من الاتصال بـ API
curl https://eishro-backend-xxxx.koyeb.app/health

# 4. بعد النشر على Vercel
curl https://ishro.ly

# يجب أن ترى صفحة HTML من الفرونتند
```

---

## 🔧 تحديث متغيرات API

إذا تغير رابط الـ API Koyeb:

**في ملف البيئة:**
```bash
# في الفرونتند
VITE_API_URL=https://eishro-backend-xxxx.koyeb.app
```

**في Vercel Dashboard:**
1. Project Settings → Environment Variables
2. حدث `VITE_API_URL`
3. أعد النشر

---

## 📋 قائمة التحقق

- [ ] اختر موقع الفرونتند
- [ ] تحقق من نوع الفرونتند (Vite/React/Next.js)
- [ ] سجل دخول إلى Vercel
- [ ] ربط GitHub repo
- [ ] أضف متغيرات البيئة
- [ ] النشر الأول يعمل
- [ ] Health Check يستجيب
- [ ] API endpoints تعمل
- [ ] أضف النطاق ishro.ly
- [ ] اختبر النطاق

---

## 🎨 بعد النشر - تخصيصات إضافية

### تحسين الأداء

في `vite.config.ts`:
```typescript
export default {
  build: {
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  }
}
```

### إضافة سياسة الأمان

في `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## 🔄 العودة إلى Koyeb

إذا احتجت لتحديث الـ API endpoint:

1. حدث `VERCEL_FRONTEND_SETUP.md` مع رابط جديد
2. حدث متغيرات Vercel
3. أعد النشر

---

## 📊 المراقبة

**Vercel Analytics:**
1. Dashboard → Analytics
2. عرض الأداء والأخطاء

**Backend Logs:**
1. Koyeb Dashboard → Logs
2. تتبع مشاكل الـ API

---

## 🎉 النتيجة النهائية

```
ishro.ly → Vercel Frontend
         ↓ (API calls)
      Backend Koyeb
         ↓
    MySQL on CPanel
```

---

## 🆘 حل المشاكل

### مشكلة: CORS errors
```
❌ Access to XMLHttpRequest blocked by CORS
```

**الحل:**
- تم تحديث `backend/src/app.ts` بـ ishro.ly بالفعل
- أعد نشر الـ Backend على Koyeb

### مشكلة: API غير متصل
```
❌ Cannot reach API: https://eishro-backend-xxxx.koyeb.app
```

**الحل:**
- تحقق من رابط Koyeb الصحيح
- تأكد من وجود Health Check: `curl https://eishro-backend-xxxx.koyeb.app/health`
- حدث `VITE_API_URL` في Vercel

### مشكلة: النطاق لا يعمل
```
❌ ishro.ly shows 404 or error
```

**الحل:**
- انتظر 24-48 ساعة لتحديث DNS
- تحقق من إعدادات DNS في مسجل النطاق
- تأكد من إضافة النطاق في Vercel Domains

---

## 📞 معلومات سريعة

- **Vercel Dashboard**: https://vercel.com/dashboard
- **DNS Checker**: https://mxtoolbox.com/
- **API URL**: https://eishro-backend-xxxx.koyeb.app
- **Frontend URL**: https://ishro.ly

---

**محدث**: 10 ديسمبر 2025
**الحالة**: ✅ جاهز للنشر على Vercel
