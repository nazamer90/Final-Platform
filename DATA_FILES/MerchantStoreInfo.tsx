import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Store, Upload, Image as ImageIcon } from 'lucide-react';

interface MerchantStoreInfoProps {
  onBack: () => void;
  onNext: (data: StoreInfoData) => void;
  initialData?: StoreInfoData | undefined;
}

export interface StoreInfoData {
  storeNameAr: string;
  storeNameEn: string;
  description: string;
  logo: File | null;
  logoPreview: string;
  category: string;
  subdomain: string;
}

const STORE_CATEGORIES = [
  { id: 'fashion', name: 'الأزياء والملابس', icon: '👗' },
  { id: 'electronics', name: 'الإلكترونيات', icon: '📱' },
  { id: 'home_appliances', name: 'مواد كهرومنزلية', icon: '⚡' },
  { id: 'electrical', name: 'كهربائية', icon: '🔌' },
  { id: 'building', name: 'مواد بناء', icon: '🏗️' },
  { id: 'furniture', name: 'أثاث', icon: '🛋️' },
  { id: 'furnishings', name: 'مفروشات', icon: '🛏️' },
  { id: 'food', name: 'مواد غذائية', icon: '🍔' },
  { id: 'supplements', name: 'مكملات', icon: '💊' },
  { id: 'healthy_food', name: 'أغذية صحية', icon: '🥗' },
  { id: 'cleaning', name: 'مواد تنظيف', icon: '🧹' },
  { id: 'beauty', name: 'الجمال والعناية', icon: '💄' },
  { id: 'sports', name: 'الرياضة واللياقة', icon: '⚽' },
];

const MerchantStoreInfo: React.FC<MerchantStoreInfoProps> = ({
  onBack,
  onNext,
  initialData
}) => {
  const [formData, setFormData] = useState<StoreInfoData>(
    initialData || {
      storeNameAr: '',
      storeNameEn: '',
      description: '',
      logo: null,
      logoPreview: '',
      category: '',
      subdomain: ''
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.storeNameAr.trim()) {
      newErrors.storeNameAr = 'اسم المتجر بالعربية مطلوب';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'وصف المتجر مطلوب';
    }

    if (!formData.category) {
      newErrors.category = 'اختيار فئة المتجر مطلوب';
    }

    if (!formData.subdomain.trim()) {
      newErrors.subdomain = 'رابط المتجر مطلوب';
    } else if (!/^[a-z0-9-]+$/.test(formData.subdomain)) {
      newErrors.subdomain = 'يجب أن يحتوي على أحرف إنجليزية صغيرة وأرقام و - فقط';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, logo: 'يجب أن يكون الملف صورة' }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, logo: 'حجم الصورة يجب ألا يتجاوز 5 ميجابايت' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          logo: file,
          logoPreview: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
      setErrors(prev => ({ ...prev, logo: '' }));
    }
  };

  const handleSubdomainChange = (value: string) => {
    const cleanValue = value.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 30);
    setFormData(prev => ({ ...prev, subdomain: cleanValue }));
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <header className="p-4 border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            رجوع
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Store className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">إشرو</span>
          </div>
          
          <div className="w-20"></div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Store className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">معلومات المتجر</h1>
            <p className="text-slate-600 mb-6">أكمل تفاصيل متجرك</p>

            <div className="max-w-md mx-auto mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-600">الخطوة 3 من 3</span>
                <span className="text-sm font-medium text-primary">100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8 space-y-6">
              {/* أسماء المتجر */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeNameAr">اسم المتجر بالعربية *</Label>
                  <Input
                    id="storeNameAr"
                    placeholder="مثال: متجر إشرو"
                    value={formData.storeNameAr}
                    onChange={(e) => setFormData(prev => ({ ...prev, storeNameAr: e.target.value }))}
                    className={errors.storeNameAr ? 'border-red-500' : ''}
                  />
                  {errors.storeNameAr && <p className="text-xs text-red-500">{errors.storeNameAr}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeNameEn">اسم المتجر بالإنجليزية</Label>
                  <Input
                    id="storeNameEn"
                    placeholder="Example: Eshro Store"
                    value={formData.storeNameEn}
                    onChange={(e) => setFormData(prev => ({ ...prev, storeNameEn: e.target.value }))}
                  />
                </div>
              </div>

              {/* الوصف */}
              <div className="space-y-2">
                <Label htmlFor="description">وصف المتجر *</Label>
                <Textarea
                  id="description"
                  placeholder="اشرح عن متجرك والمنتجات التي تقدمها..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
              </div>

              {/* اللوجو */}
              <div className="space-y-2">
                <Label>لوجو المتجر</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  {formData.logoPreview ? (
                    <div className="flex flex-col items-center gap-4">
                      <img
                        src={formData.logoPreview}
                        alt="لوجو المتجر"
                        className="w-32 h-32 object-contain"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('logo-input')?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        تغيير الصورة
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="flex flex-col items-center gap-4 cursor-pointer"
                      onClick={() => document.getElementById('logo-input')?.click()}
                    >
                      <ImageIcon className="h-12 w-12 text-gray-300" />
                      <div>
                        <p className="font-semibold text-gray-700">اضغط لاختيار الصورة</p>
                        <p className="text-sm text-gray-500">أو اسحب الصورة هنا</p>
                      </div>
                    </div>
                  )}
                  <input
                    id="logo-input"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                    aria-label="اختر صورة شعار المتجر"
                  />
                </div>
                {errors.logo && <p className="text-xs text-red-500">{errors.logo}</p>}
              </div>

              {/* فئة المتجر */}
              <div className="space-y-2">
                <Label>فئة المتجر *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {STORE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFormData(prev => ({ ...prev, category: cat.id }))}
                      className={`p-3 rounded-lg border-2 transition-all text-center ${
                        formData.category === cat.id
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <span className="text-2xl mb-1 block">{cat.icon}</span>
                      <span className="text-xs font-medium">{cat.name}</span>
                    </button>
                  ))}
                </div>
                {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
              </div>

              {/* رابط المتجر */}
              <div className="space-y-2">
                <Label htmlFor="subdomain">رابط المتجر *</Label>
                <div className="space-y-1">
                  <Input
                    id="subdomain"
                    placeholder="my-store"
                    value={formData.subdomain}
                    onChange={(e) => handleSubdomainChange(e.target.value)}
                    className={errors.subdomain ? 'border-red-500' : ''}
                  />
                  <div className="text-xs text-gray-500">
                    الرابط النهائي: <span className="text-primary font-semibold">{formData.subdomain || 'my-store'}.eshro.ly</span>
                  </div>
                </div>
                {errors.subdomain && <p className="text-xs text-red-500">{errors.subdomain}</p>}
              </div>
            </CardContent>
          </Card>

          {/* أزرار التنقل */}
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              رجوع
            </Button>

            <Button
              onClick={handleNext}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600"
            >
              إنشاء المتجر
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantStoreInfo;
