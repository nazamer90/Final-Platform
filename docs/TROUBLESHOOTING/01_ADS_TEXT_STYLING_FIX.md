# مشكلة: نصوص الإعلانات لا تطبق التنسيق المختار

## المشكلة
عند إنشاء إعلان جديد واختيار:
- موضع النص (أعلى، أسفل، يسار، يمين)
- لون النص
- نوع الخط
- حجم النص الرئيسي والفرعي

لم تكن هذه التعديلات تظهر على المتجر. كان النص يظهر دائماً في المنتصف بنفس التنسيق الموحد.

## السبب الجذري
كانت هناك مشكلتان:

### 1. **مشكلة الـ Frontend (StoreAds.tsx)**
- وجود `text-center` مكتوب بشكل ثابت يلغي جميع فئات التموضع الديناميكية
- لم تكن الفئات الأفقية والعمودية تُطبق بشكل صحيح

### 2. **مشكلة الـ Backend (adController.ts)**
- البيانات كانت تُجلب من قاعدة البيانات بدون تحويل صحيح من `snake_case` إلى `camelCase`
- الحقول مثل `text_position`، `text_color`، `text_font` لم تكن تُعود بالشكل الصحيح

## الحل

### في Frontend (src/components/StoreAds.tsx)

#### 1. تحديث دالة getTextPositionClass()
```typescript
const getTextPositionClass = (position?: string): string => {
  switch (position) {
    case 'top-left':
      return 'top-0 left-0 text-right pt-2 pr-4';
    case 'top-center':
      return 'top-0 left-1/2 -translate-x-1/2 text-center pt-2 px-4';
    case 'top-right':
      return 'top-0 right-0 text-left pt-2 pl-4';
    case 'center-left':
      return 'top-1/2 -translate-y-1/2 left-0 text-right px-2 pr-4';
    case 'center':
      return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-4';
    case 'center-right':
      return 'top-1/2 -translate-y-1/2 right-0 text-left px-2 pl-4';
    case 'bottom-left':
      return 'bottom-0 left-0 text-right pb-2 pr-4';
    case 'bottom-center':
      return 'bottom-0 left-1/2 -translate-x-1/2 text-center pb-2 px-4';
    case 'bottom-right':
      return 'bottom-0 right-0 text-left pb-2 pl-4';
    default:
      return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-4';
  }
};
```

#### 2. إزالة `text-center` الثابت
```typescript
// قبل:
<div className={`absolute ${positionClass} text-center p-4`}>

// بعد:
<div className={`absolute ${positionClass} p-4`}>
```

#### 3. إضافة دوال تحويل الأحجام والخطوط
```typescript
const getMainTextSizeClass = (size?: string): string => {
  switch (size) {
    case 'sm': return 'text-sm';
    case 'base': return 'text-base';
    case 'lg': return 'text-lg';
    case 'xl': return 'text-xl';
    case '2xl': return 'text-2xl';
    default: return 'text-lg';
  }
};

const getSubTextSizeClass = (size?: string): string => {
  switch (size) {
    case 'xs': return 'text-xs';
    case 'sm': return 'text-sm';
    case 'base': return 'text-base';
    default: return 'text-base';
  }
};

const getFontClass = (font?: string): string => {
  switch (font) {
    case 'Cairo-Light': return 'font-light';
    case 'Cairo-ExtraLight': return 'font-extralight';
    case 'Cairo-Regular': return 'font-normal';
    case 'Cairo-Medium': return 'font-medium';
    case 'Cairo-SemiBold': return 'font-semibold';
    case 'Cairo-Bold': return 'font-bold';
    case 'Cairo-ExtraBold': return 'font-extrabold';
    case 'Cairo-Black': return 'font-black';
    default: return 'font-semibold';
  }
};
```

### في Backend (backend/src/controllers/adController.ts)

#### تحديث دالة getStoreAds()
```typescript
export const getStoreAds = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storeId } = req.params;
    const store = await findStoreByIdOrSlug(storeId);
    if (!store) {
      res.status(404).json({ success: false, error: 'Store not found' });
      return;
    }

    const ads = await StoreAd.findAll({
      where: { storeId: store.id, isActive: true },
      order: [['createdAt', 'DESC']],
    });

    // استخدام toJSON() لتحويل البيانات بشكل صحيح
    const plainAds = ads.map(ad => ad.toJSON());
    res.json({ success: true, data: plainAds });
  } catch (error) {
    logger.error('Error fetching store ads:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch ads' });
  }
};
```

## التحقق من الحل
بعد التطبيق، تأكد من أن:
1. ✅ النص يظهر في الموضع المختار
2. ✅ اللون المختار يظهر على النص
3. ✅ نوع الخط المختار يظهر
4. ✅ حجم النص الرئيسي والفرعي يختلف كما هو محدد
5. ✅ جميع 9 مواضع (top-left, top-center, ... إلخ) تعمل

## الملفات المعدلة
- `src/components/StoreAds.tsx` - الأسطر 28-104
- `backend/src/controllers/adController.ts` - الأسطر 37-58

## الحالة
✅ **تم الحل** - تاريخ: 2025-12-11

