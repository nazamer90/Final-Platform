# خطوات سريعة لحل مشكلة VERCEL CORS 🚀

## تم حل المشكلة في الكود ✅
الملفات التالية تم تحديثها تلقائياً:
- ✅ `src/components/AdsManagementView.tsx`
- ✅ `src/services/api.ts`
- ✅ `.env.production` (جديد)
- ✅ `backend/.env.production` (جديد)

---

## اتبع هذه الخطوات فقط على Vercel Dashboard 👇

### 1️⃣ للـ Frontend Project

اذهب إلى: **Settings → Environment Variables**

أضف هذا المتغير:
```
VITE_API_URL = https://eishro-backend-git-main-bennoubas-projects.vercel.app/api
```

⚠️ **هام**: استبدل النطاق بـ Backend URL الحقيقي الخاص بك

---

### 2️⃣ للـ Backend Project

اذهب إلى: **Settings → Environment Variables**

أضف أو حدّث هذا المتغير:
```
FRONTEND_URL = https://frontend-1hwwx89js-bennoubas-projects.vercel.app
```

⚠️ **هام**: استبدل النطاق بـ Frontend URL الحقيقي الخاص بك

---

### 3️⃣ انشر التحديثات

```bash
# في الكود المحلي:
git add .
git commit -m "Fix CORS errors on Vercel"
git push origin main
```

انتظر إعادة البناء والنشر على Vercel (حوالي 2-3 دقائق)

---

### 4️⃣ اختبر الحل

1. افتح Merchant Dashboard على Vercel
2. اذهب إلى **قسم الإعلانات**
3. أنشئ إعلان جديد
4. اضغط **نشر الإعلان**

يجب أن ترى رسالة نجاح! ✅

---

## إذا لم تنجح المحاولة 🔧

**اختبر الكود محلياً أولاً**:
```bash
npm run dev
# تحقق من أن كل شيء يعمل على http://localhost:5173
```

ثم انظر للـ "Network" tab في Developer Console للتحقق من الـ URLs والأخطاء.

---

## ملخص الـ URLs

| الموقع | URL | ملاحظة |
|--------|-----|--------|
| Frontend | https://frontend-1hwwx89js-bennoubas-projects.vercel.app | غيّر إذا لزم |
| Backend | https://final-platform-gamma.vercel.app | غيّر إذا لزم |
| API Endpoint | `/api/ads/store/{storeId}` | لا تغيّر |

---

## جاهز! 🎉
بعد اتباع الخطوات أعلاه، يجب أن تختفي الأخطاء ويعمل كل شيء بشكل صحيح!

للمزيد من التفاصيل، اقرأ: `VERCEL_CORS_FIX.md`
