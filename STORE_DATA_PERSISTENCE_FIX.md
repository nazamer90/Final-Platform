# Fix: Store Data Persistence - Public Data Source

## المشكلة الأساسية

المتاجر كانت تعتمد على `localStorage` لعرض البيانات، مما يعني:
- ❌ عند فتح رابط المتجر من متصفح جديد/جهاز جديد → لا تظهر البيانات
- ❌ بعد مسح "Site Data" → تختفي جميع الصور والمنتجات
- ❌ المتاجر ليست "public" حقيقياً

## الحل المُطبّق

### 1. Backend - إضافة Endpoint جديد

**الملف:** `backend/src/controllers/storeController.ts`

تم إضافة controller جديد:
```typescript
export const getStoreBySlug = async (req, res, next) => {
  // يجلب المتجر من قاعدة البيانات مع:
  // - معلومات المتجر (name, logo, description, etc.)
  // - جميع المنتجات مع صورها
  // - جميع السلايدرز
}
```

**الملف:** `backend/src/routes/storeRoutes.ts`

تم إضافة route:
```typescript
router.get('/:slug', getStoreBySlug);
```

**الـAPI الجديد:**
```
GET /api/stores/:slug
```

**مثال:**
```bash
curl https://final-platform-eshro.onrender.com/api/stores/centerhamoda
```

**الاستجابة:**
```json
{
  "success": true,
  "data": {
    "store": {
      "id": 25,
      "name": "center hamoda",
      "slug": "centerhamoda",
      "logo": "https://ishro.blob.central.azurecubic.com/...",
      ...
    },
    "products": [
      {
        "id": 100,
        "name": "منتج 1",
        "price": 145,
        "images": [
          "https://ishro.blob.central.azurecubic.com/..."
        ],
        ...
      }
    ],
    "sliders": [
      {
        "id": 1,
        "image": "https://ishro.blob.central.azurecubic.com/...",
        "title": "عرض خاص",
        ...
      },
      {
        "id": 2,
        ...
      },
      {
        "id": 3,
        ...
      }
    ],
    "stats": {
      "productsCount": 1,
      "slidersCount": 3
    }
  }
}
```

---

### 2. Frontend - جلب البيانات من السيرفر

**الملف:** `src/pages/StorePage.tsx`

**التعديلات:**

1. إضافة state جديد:
```typescript
const [serverStoreData, setServerStoreData] = useState<any>(null);
const [loadingStoreData, setLoadingStoreData] = useState(true);
```

2. إضافة function لجلب البيانات:
```typescript
const fetchStoreData = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || '/api';
    const response = await fetch(`${apiUrl}/stores/${storeSlug}`);
    
    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        setServerStoreData(result.data);
        
        // استخدام المنتجات من السيرفر
        if (result.data.products && result.data.products.length > 0) {
          setLiveProducts(result.data.products);
        }
      }
    }
  } catch (error) {
    console.warn('Failed to fetch store data from server, using local data:', error);
  } finally {
    setLoadingStoreData(false);
  }
};
```

3. استخدام البيانات من السيرفر أولاً:
```typescript
const store = serverStoreData?.store || localStore;
```

**الآن:**
- ✅ عند فتح `/centerhamoda` → يتم جلب البيانات من السيرفر
- ✅ الصور والمنتجات تظهر في أي متصفح
- ✅ لا يعتمد على localStorage
- ✅ المتجر "public" حقيقياً

---

## الفوائد

### قبل:
```javascript
// كان يعتمد فقط على:
const store = storesData.find(s => s.slug === storeSlug);
// من ملفات محلية/localStorage
```

### بعد:
```javascript
// يجلب من السيرفر أولاً:
const serverStoreData = await fetch(`/api/stores/${storeSlug}`);
const store = serverStoreData?.store || localStore;
// fallback على البيانات المحلية إذا فشل السيرفر
```

---

## ما يحدث الآن عند فتح المتجر:

### 1. المستخدم يفتح: `https://www.ishro.ly/centerhamoda`

### 2. الفرونت إند يقوم بـ:
```javascript
// Fetch store data from server
GET /api/stores/centerhamoda

// Response:
{
  store: {...},
  products: [...],
  sliders: [...]
}
```

### 3. عرض البيانات:
- ✅ الشعار من Azure Blob
- ✅ المنتجات مع صورها من Azure Blob  
- ✅ السلايدرز (3/3) من Azure Blob
- ✅ **كل شيء من السيرفر - لا اعتماد على localStorage!**

---

## اختبار بعد الـDeploy

### 1. انتظر اكتمال الـdeploy على:
- ✅ Render (Backend)
- ✅ Vercel (Frontend)

### 2. اختبر الـAPI مباشرة:
```bash
curl https://final-platform-eshro.onrender.com/api/stores/centerhamoda
```

**يجب أن يرجع 404** (لأن المتجر غير موجود بعد)

### 3. أنشئ المتجر من جديد:
```
https://www.ishro.ly/merchant/create-store
```

### 4. اختبر الـAPI مرة أخرى:
```bash
curl https://final-platform-eshro.onrender.com/api/stores/centerhamoda
```

**يجب أن يرجع 200** مع جميع البيانات

### 5. افتح في Incognito Mode:
```
https://www.ishro.ly/centerhamoda
```

**يجب أن تظهر:**
- ✅ الشعار
- ✅ جميع السلايدرز (3/3)
- ✅ جميع المنتجات مع صورها

### 6. افتح DevTools (F12):
```javascript
// Network Tab
// يجب أن ترى:
GET /api/stores/centerhamoda → 200 OK
```

---

## حذف متجر centerhamoda الحالي

⚠️ **مهم:** المتجر الحالي موجود في Production فقط (لا يوجد في الـcode)

### الخيار 1: من Render Shell (الأسهل)

```bash
# 1. اذهب إلى Render Dashboard
# 2. Service: final-platform-eshro → Shell
# 3. نفّذ:

curl -X POST http://localhost:5000/api/stores/cleanup-by-slug \
  -H "Content-Type: application/json" \
  -H "x-cleanup-secret: $STORE_CLEANUP_SECRET" \
  -d '{"storeSlug":"centerhamoda","deleteAzureAssets":true}'
```

### الخيار 2: من Terminal المحلي

```bash
export STORE_CLEANUP_SECRET='your-secret-from-render'

curl -X POST https://final-platform-eshro.onrender.com/api/stores/cleanup-by-slug \
  -H "Content-Type: application/json" \
  -H "x-cleanup-secret: $STORE_CLEANUP_SECRET" \
  -d '{"storeSlug":"centerhamoda","deleteAzureAssets":true}'
```

### بعد الحذف:

```javascript
// في Console المتصفح
localStorage.clear();
sessionStorage.clear();
location.reload(true);
```

---

## الخطوات بعد Merge الـPR

### 1. Merge PR #17

### 2. انتظر Auto-Deploy على:
- Render (backend)
- Vercel (frontend)

### 3. احذف المتجر القديم (إذا كان موجوداً):
```bash
# استخدم أحد الـscripts من workspace/
```

### 4. أنشئ المتجر من جديد:
```
https://www.ishro.ly/merchant/create-store
```

### 5. اختبر في Incognito Mode:
```
https://www.ishro.ly/centerhamoda
```

**✅ يجب أن يعمل بشكل كامل بدون الحاجة لـlocalStorage!**

---

## الفرق الأساسي

### قبل التعديل:
```
User opens /centerhamoda
└─> Frontend checks localStorage
    ├─> Found? → Display
    └─> Not found? → Empty page ❌
```

### بعد التعديل:
```
User opens /centerhamoda
└─> Frontend calls API: GET /api/stores/centerhamoda
    ├─> Found? → Display from server ✅
    └─> Not found? → Try localStorage → Display or 404
```

---

## ملاحظات مهمة

### Environment Variables على Render:
تأكد من وجود:
```env
AZURE_BLOB_BASE_URL=https://ishro.blob.central.azurecubic.com/ishro-assets
AZURE_SAS_VERSION=2019-12-12
STORE_CLEANUP_SECRET=<your-secret>
```

### Environment Variables على Vercel:
تأكد من وجود:
```env
VITE_API_URL=https://final-platform-eshro.onrender.com/api
```

---

## التحسينات المستقبلية (اختياري)

1. **Caching:** إضافة Redis cache للـAPI responses
2. **CDN:** استخدام CDN لتسريع تحميل الصور
3. **Lazy Loading:** تحميل المنتجات والسلايدرز بشكل تدريجي
4. **Service Worker:** cache البيانات offline

---

## الخلاصة

✅ **تم إصلاح المشكلة الأساسية:**
- المتاجر الآن تعمل كـ"public data source"
- البيانات يتم جلبها من السيرفر
- لا يعتمد على localStorage
- الصور تُحمّل من Azure Blob Storage مباشرة

🚀 **الخطوة التالية:**
- Merge PR #17
- احذف المتجر القديم
- أنشئ المتجر من جديد
- اختبر في Incognito Mode

📅 **التاريخ:** 2025-12-25
