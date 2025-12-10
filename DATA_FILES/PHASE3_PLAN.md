# 📋 خطة المرحلة 3: تحسينات جودة الكود

## 🎯 الأهداف الرئيسية
1. ✅ إزالة الاستيرادات غير المستخدمة (50+ مكون)
2. ✅ تحديث فئات Tailwind CSS
3. ✅ نقل الأنماط المضمنة إلى ملفات CSS منفصلة
4. ✅ إضافة type attributes للأزرار
5. ✅ إصلاح تحذيرات إمكانية الوصول (ARIA)
6. ✅ إصلاح أخطاء الصيغة والفواصل

## 📁 الملفات المراد إصلاحها

### 🔧 المكونات الأساسية (UI Components) - 18 ملف
- src/components/ui/button.tsx ✅ (مصحح)
- src/components/ui/card.tsx ✅ (مصحح)
- src/components/ui/input.tsx ✅ (مصحح)
- src/components/ui/label.tsx ✅ (مصحح)
- src/components/ui/textarea.tsx ✅ (مصحح)
- src/components/ui/badge.tsx ✅ (مصحح)
- src/components/ui/select.tsx
- src/components/ui/tabs.tsx
- src/components/ui/checkbox.tsx
- src/components/ui/dialog.tsx
- src/components/ui/dropdown-menu.tsx
- src/components/ui/modal.tsx
- src/components/ui/popover.tsx
- src/components/ui/toast.tsx
- src/components/ui/carousel.tsx
- src/components/ui/pagination.tsx
- src/components/ui/calendar.tsx
- src/components/ui/date-picker.tsx

### 🏪 مكونات الصفحات (Pages) - 21 ملف
### 🛠️ مكونات الخدمات (Services) - 4 ملفات
### 🎨 مكونات أخرى (Other Components) - 50+ ملف

## 🔍 أنواع المشاكل المكتشفة
1. **Duplicate Imports**: استيرادات مكررة (مثل libyanCities)
2. **Unused Imports**: استيرادات غير مستخدمة
3. **Missing Type Attributes**: أزرار بدون type attribute
4. **Broken Tailwind Classes**: فئات مقسمة على أسطر
5. **Missing ARIA Labels**: نقص في labels إمكانية الوصول
6. **Formatting Issues**: مشاكل في الفاصل والفواصل

