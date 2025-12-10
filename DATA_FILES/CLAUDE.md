# إصلاح الإعلانات - ملخص التغييرات

## المشكلة الأساسية
الإعلانات لم تكن تظهر في المتجر الأمامي لأن:
1. **عدم تطابق قاعدة البيانات**: SQLite مقابل MySQL syntax
2. **عدم وجود البيانات الأساسية**: جداول فارغة عند التشغيل الأول
3. **عدم تطابق أسماء الأعمدة**: camelCase في TypeScript vs snake_case في الجداول

## الحلول المطبقة

### 1️⃣ تحديث Database Migration (`backend/src/database/migrate.ts`)
- ✅ دعم كلا من SQLite و MySQL
- ✅ تقسيم الكود إلى دالتي `createTablesMySQL()` و `createTablesSQLite()`
- ✅ معالجة الفروقات بين قاعدتي البيانات

### 2️⃣ Automatic Seeding (`backend/src/database/seed.ts`)
- ✅ إضافة 5 متاجر رئيسية تلقائياً:
  - nawaem (نواعم)
  - sheirine (شيرين)
  - pretty
  - delta-store
  - magna-beauty
- ✅ إضافة merchant لكل متجر تلقائياً

### 3️⃣ Server Startup (`backend/src/index.ts`)
- ✅ تشغيل migrations تلقائياً عند البدء
- ✅ seeding تلقائي للبيانات الأساسية

### 4️⃣ Field Mappings في النماذج
تصحيح تعيين الأعمدة من camelCase إلى snake_case:

**StoreAd Model** (`backend/src/models/StoreAd.ts`):
- `storeId` → `store_id`
- `templateId` → `template_id`
- `imageUrl` → `image_url`
- `linkUrl` → `link_url`
- `isActive` → `is_active`

**Store Model** (`backend/src/models/Store.ts`):
- `merchantId` → `merchant_id`
- `isActive` → `is_active`

**User Model** (`backend/src/models/User.ts`):
- `firstName` → `first_name`
- `lastName` → `last_name`
- `storeName` → `store_name`
- `storeSlug` → `store_slug`
- `storeCategory` → `store_category`
- `storeDescription` → `store_description`
- `storeLogo` → `store_logo`
- `merchantVerified` → `merchant_verified`
- `lastLogin` → `last_login`

## كيفية التشغيل

### للتطوير المحلي (SQLite):
```bash
cd backend
npm install
npm start
```

السيرفر سيقوم تلقائياً بـ:
1. إنشاء جداول SQLite
2. ملء البيانات الأساسية (المتاجر والـ merchants)
3. تشغيل تحديثات الـ sliders

### للإنتاج (MySQL):
تأكد من تعيين متغيرات البيئة:
```env
NODE_ENV=production
DATABASE_URL=mysql://user:password@host:3306/db
```

## اختبار الإعلانات

1. **انتقل إلى لوحة Merchant**
2. **اختر أي متجر** (مثل Nawaem)
3. **أضف إعلاناً جديداً**:
   - اختر قالب
   - أدخل العنوان والوصف
   - اختر نوع الوضع (Floating/Banner أو Between Products)
   - انشر الإعلان

4. **تحقق من الظهور في المتجر**:
   - انتقل إلى المتجر الأمامي
   - يجب أن تظهر الإعلانات في الأعلى

## API Endpoints

### إنشاء إعلان:
```
POST /api/ads/store/{storeId}
Body: {
  templateId: "adv1",
  title: "عنوان الإعلان",
  description: "وصف الإعلان",
  placement: "banner" | "between_products",
  imageUrl: "url"
}
```

### جلب الإعلانات:
```
GET /api/ads/store/{storeId}
```

## متغيرات البيئة المهمة

```env
# للتطوير
VITE_API_URL=http://localhost:5000/api

# للإنتاج
VITE_API_URL=https://your-backend-url/api
```

## الملفات المعدلة

1. ✅ `backend/src/database/migrate.ts` - دعم SQLite + MySQL
2. ✅ `backend/src/database/seed.ts` - إضافة 5 متاجر
3. ✅ `backend/src/index.ts` - تشغيل migrations و seeding
4. ✅ `backend/src/models/StoreAd.ts` - تصحيح field mappings
5. ✅ `backend/src/models/Store.ts` - تصحيح field mappings
6. ✅ `backend/src/models/User.ts` - تصحيح field mappings

## ملاحظات مهمة

- ✅ **المتاجر تُنشأ تلقائياً** عند بدء السيرفر
- ✅ **قاعدة البيانات تدعم كلا النوعين** (SQLite للتطوير, MySQL للإنتاج)
- ✅ **الإعلانات تُحفظ في قاعدة البيانات** وليس في localStorage فقط
- ⚠️ لا تحتاج لحذف قاعدة البيانات - سيتم التعامل مع الجداول الموجودة

## Troubleshooting

### الإعلانات لا تظهر:
1. تأكد من أن السيرفر يعمل على `localhost:5000`
2. افتح DevTools (F12) وتحقق من Network tab
3. تأكد من أن الاستجابة لـ GET `/api/ads/store/{storeId}` تحتوي على البيانات

### أخطاء قاعدة البيانات:
1. جرب حذف `database.sqlite` وإعادة التشغيل
2. تأكد من أن المسار إلى SQLite صحيح

### المتجر لم يُعثر عليه:
1. استخدم slug صحيح: `nawaem`, `sheirine`, `pretty`, `delta-store`, `magna-beauty`
2. تأكد من أن API يرجع الخطأ `404 Store not found` مع slug خاطئ
