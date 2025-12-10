import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, X, Check, AlertCircle, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { adTemplates, type AdTemplate, type PublishedAd } from '@/data/adTemplates';

interface AdsManagementViewProps {
  storeData: any;
  setStoreData: (data: any) => void;
  onSave: () => void;
}

interface AdDraft {
  templateId: string;
  title: string;
  description: string;
  textPosition?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | undefined;
  textColor?: string | undefined;
  textFont?: 'Cairo-Regular' | 'Cairo-Light' | 'Cairo-ExtraLight' | 'Cairo-Medium' | 'Cairo-SemiBold' | 'Cairo-Bold' | 'Cairo-ExtraBold' | 'Cairo-Black' | undefined;
  mainTextSize?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | undefined;
  subTextSize?: 'xs' | 'sm' | 'base' | undefined;
}

interface AdWithPlacement extends PublishedAd {
  placement?: string;
}

interface DisplayMode {
  id: string;
  label: string;
  description: string;
  columns?: number;
}

const DISPLAY_MODES: DisplayMode[] = [
  {
    id: 'banner',
    label: 'شريط إعلاني',
    description: 'إعلان في رأس الصفحة',
    columns: 1,
  },
  {
    id: 'between_products',
    label: 'بين المنتجات',
    description: 'إعلان يظهر بين قائمة المنتجات',
    columns: 1,
  },
];

const ADS_TEMPLATES = [
  { id: 'adv1', name: 'قالب 1' },
  { id: 'adv2', name: 'قالب 2' },
  { id: 'adv3', name: 'قالب 3' },
  { id: 'adv4', name: 'قالب 4' },
  { id: 'adv5', name: 'قالب 5' },
  { id: 'adv6', name: 'قالب 6' },
  { id: 'adv7', name: 'قالب 7' },
  { id: 'adv8', name: 'قالب 8' },
  { id: 'adv9', name: 'قالب 9' },
  { id: 'adv10', name: 'قالب 10' },
  { id: 'adv11', name: 'قالب 11' },
];

const AdsManagementView: React.FC<AdsManagementViewProps> = ({
  storeData,
  setStoreData,
  onSave
}) => {
  const [step, setStep] = useState<'list' | 'step1' | 'step2' | 'step3'>('list');
  const [adDraft, setAdDraft] = useState<AdDraft>({
    templateId: '',
    title: '',
    description: '',
    textFont: 'Cairo-SemiBold',
    mainTextSize: 'lg',
    subTextSize: 'base',
  });
  const [selectedDisplayMode, setSelectedDisplayMode] = useState<string>('');
  const [publishedAds, setPublishedAds] = useState<AdWithPlacement[]>([]);

  const loadPublishedAds = async () => {
    const storeId = storeData?.slug || storeData?.storeSlug || storeData?.id;
    if (!storeId) return;
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/ads/store/${storeId}`);
      
      if (response.ok) {
        const result = await response.json();
        setPublishedAds(result.data);
        localStorage.setItem(`eshro_store_ads_${storeId}`, JSON.stringify(result.data));
        return;
      }
    } catch (error) {
      // Error loading ads - will fall back to localStorage
    }
    
    const storageKey = `eshro_store_ads_${storeId}`;
    const savedAds = localStorage.getItem(storageKey);
    if (savedAds) {
      try {
        setPublishedAds(JSON.parse(savedAds));
      } catch {}
    }
  };

  useEffect(() => {
    loadPublishedAds();
  }, [storeData?.slug, storeData?.storeSlug, storeData?.id]);

  const showNotification = (message: string, type: 'success' | 'error') => {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 5000);
  };

  const resetForm = () => {
    setAdDraft({ 
      templateId: '', 
      title: '', 
      description: '',
      textFont: 'Cairo-SemiBold',
      mainTextSize: 'lg',
      subTextSize: 'base',
    });
    setSelectedDisplayMode('');
  };

  const handleStep1Continue = () => {
    if (!adDraft.title.trim()) {
      showNotification('يرجى إدخال عنوان الإعلان', 'error');
      return;
    }
    if (!adDraft.description.trim()) {
      showNotification('يرجى إدخال نص الإعلان', 'error');
      return;
    }
    setStep('step2');
  };

  const handleTemplateSelect = (templateId: string) => {
    setAdDraft({ ...adDraft, templateId });
    setStep('step3');
  };

  const handlePublishAd = async () => {
    const storeId = storeData?.slug || storeData?.storeSlug || storeData?.id;
    
    if (!storeId) {
      showNotification('معرف المتجر غير صحيح', 'error');
      return;
    }

    if (typeof storeId !== 'string' && typeof storeId !== 'number') {
      showNotification('معرف المتجر بصيغة غير صحيحة', 'error');
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/ads/store/${storeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: adDraft.templateId,
          title: adDraft.title,
          description: adDraft.description,
          placement: selectedDisplayMode,
          textPosition: adDraft.textPosition || 'center',
          textColor: adDraft.textColor || '#ffffff',
          textFont: adDraft.textFont || 'Cairo-SemiBold',
          mainTextSize: adDraft.mainTextSize || 'lg',
          subTextSize: adDraft.subTextSize || 'base'
        })
      });

      if (response.ok) {
        const result = await response.json();
        const newAd: AdWithPlacement = {
          id: result.data?.id || `ad-${Date.now()}`,
          templateId: adDraft.templateId,
          layout: 'between_products',
          title: adDraft.title,
          description: adDraft.description,
          isActive: true,
          placement: selectedDisplayMode,
          createdAt: result.data?.createdAt || new Date().toISOString(),
          views: 0,
          clicks: 0,
        };

        const updatedAds = [...publishedAds, newAd];
        setPublishedAds(updatedAds);
        const finalStoreId = storeData?.slug || storeData?.storeSlug || storeData?.id;
        localStorage.setItem(`eshro_store_ads_${finalStoreId}`, JSON.stringify(updatedAds));
        
        window.dispatchEvent(new CustomEvent('storeAdsUpdated', {
          detail: { storeId, ads: updatedAds }
        }));
        
        showNotification('تم نشر الإعلان بنجاح!', 'success');
        setStep('list');
        resetForm();
        onSave();
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData.error || errorData.message || response.statusText || 'فشل النشر بدون تفاصيل';
        console.error('Create ad error:', errorData);
        showNotification(`فشل النشر: ${errorMsg}`, 'error');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'خطأ غير معروف';
      console.error('Create ad exception:', error);
      showNotification(`حدث خطأ في النشر: ${errorMessage}`, 'error');
    }
  };

  const handleDeleteAd = async (adId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الإعلان؟')) {
      return;
    }

    const storeId = storeData?.slug || storeData?.storeSlug || storeData?.id;
    if (!storeId) {
      showNotification('معرف المتجر غير صحيح', 'error');
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/ads/store/${storeId}/${adId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedAds = publishedAds.filter(ad => ad.id !== String(adId));
        setPublishedAds(updatedAds);
        const finalStoreId = storeData?.slug || storeData?.storeSlug || storeData?.id;
        localStorage.setItem(`eshro_store_ads_${finalStoreId}`, JSON.stringify(updatedAds));
        
        window.dispatchEvent(new CustomEvent('storeAdsUpdated', {
          detail: { storeId, ads: updatedAds }
        }));
        
        showNotification('تم حذف الإعلان بنجاح', 'success');
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData.error || errorData.message || response.statusText || 'فشل الحذف بدون تفاصيل';
        console.error('Delete ad error:', errorData);
        showNotification(`فشل الحذف: ${errorMsg}`, 'error');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'خطأ غير معروف';
      console.error('Delete ad exception:', error);
      showNotification(`حدث خطأ أثناء الحذف: ${errorMessage}`, 'error');
    }
  };

  if (step === 'list') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">إدارة الإعلانات</h2>
            <p className="text-gray-600 mt-1">إنشاء وإدارة إعلانات متجرك بسهولة</p>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setStep('step1');
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <Plus className="h-4 w-4 ml-2" />
            إعلان جديد
          </Button>
        </div>

        {publishedAds.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="py-12">
              <div className="text-center">
                <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد إعلانات منشورة</h3>
                <p className="text-gray-600 mb-6">ابدأ بإنشاء إعلانك الأول للمتجر</p>
                <Button
                  onClick={() => {
                    resetForm();
                    setStep('step1');
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 ml-2" />
                  إنشاء إعلان
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publishedAds.map((ad) => {
              const template = adTemplates.find(t => t.id === ad.templateId);
              return (
              <Card key={ad.id} className="overflow-hidden hover:shadow-lg transition">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
                  {template?.previewImage ? (
                    <img 
                      src={template.previewImage} 
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-gray-700 px-4">
                      <p className="font-semibold text-lg">{ad.title}</p>
                      <p className="text-sm mt-2 opacity-75">{ad.description}</p>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge className={ad.isActive ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}>
                      {ad.isActive ? 'مفعل' : 'معطل'}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2 mb-4">
                    <p className="text-sm"><strong>القالب:</strong> {ad.templateId}</p>
                    <p className="text-sm"><strong>الموضع:</strong> {ad.placement}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>👁 {ad.views} مشاهدة</span>
                      <span>🔗 {ad.clicks} نقرة</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteAd(ad.id)}
                  >
                    حذف الإعلان
                  </Button>
                </CardContent>
              </Card>
            );
            })}
          </div>
        )}
      </div>
    );
  }

  if (step === 'step1') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold">1</span>
              <span className="text-gray-600">اختيار النص</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">الخطوة 1: أدخل عنوان ونص الإعلان</h2>
            <p className="text-gray-600 mt-1">سيتم اختيار القالب في الخطوة التالية</p>
          </div>
          <Button variant="outline" onClick={() => setStep('list')}>
            <X className="h-4 w-4 ml-2" />
            إلغاء
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-6">
            <div>
              <Label>عنوان الإعلان</Label>
              <Input
                value={adDraft.title}
                onChange={(e) => setAdDraft({ ...adDraft, title: e.target.value })}
                placeholder="مثال: عرض خاص على المنتجات الجديدة"
                maxLength={100}
              />
              <p className="text-xs text-gray-500 mt-1">
                {adDraft.title.length} / 100
              </p>
            </div>

            <div>
              <Label>نص الإعلان (الوصف)</Label>
              <Textarea
                value={adDraft.description}
                onChange={(e) => setAdDraft({ ...adDraft, description: e.target.value })}
                placeholder="اكتب نص الإعلان بتفاصيل واضحة..."
                rows={6}
                maxLength={300}
              />
              <p className="text-xs text-gray-500 mt-1">
                {adDraft.description.length} / 300
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div>
                <Label htmlFor="textPosition">موضع النص على القالب</Label>
                <select
                  id="textPosition"
                  aria-label="موضع النص على القالب"
                  value={adDraft.textPosition || 'center'}
                  onChange={(e) => setAdDraft({ ...adDraft, textPosition: e.target.value as AdDraft['textPosition'] })}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="top-left">أعلى اليسار</option>
                  <option value="top-center">أعلى الوسط</option>
                  <option value="top-right">أعلى اليمين</option>
                  <option value="center-left">يسار الوسط</option>
                  <option value="center" selected>الوسط</option>
                  <option value="center-right">يمين الوسط</option>
                  <option value="bottom-left">أسفل اليسار</option>
                  <option value="bottom-center">أسفل الوسط</option>
                  <option value="bottom-right">أسفل اليمين</option>
                </select>
              </div>

              <div>
                <Label htmlFor="textColor">لون النص</Label>
                <div className="flex gap-2 items-center">
                  <input
                    id="textColor"
                    type="color"
                    value={adDraft.textColor || '#ffffff'}
                    onChange={(e) => setAdDraft({ ...adDraft, textColor: e.target.value })}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                    aria-label="لون النص"
                  />
                  <span className="text-sm text-gray-600">{adDraft.textColor || '#ffffff'}</span>
                </div>
              </div>

              <div>
                <Label htmlFor="textFont">خط النص</Label>
                <select
                  id="textFont"
                  aria-label="خط النص"
                  value={adDraft.textFont || 'Cairo-SemiBold'}
                  onChange={(e) => setAdDraft({ ...adDraft, textFont: e.target.value as AdDraft['textFont'] })}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="Cairo-Regular">Cairo Regular</option>
                  <option value="Cairo-Light">Cairo Light</option>
                  <option value="Cairo-ExtraLight">Cairo Extra Light</option>
                  <option value="Cairo-Medium">Cairo Medium</option>
                  <option value="Cairo-SemiBold" selected>Cairo SemiBold</option>
                  <option value="Cairo-Bold">Cairo Bold</option>
                  <option value="Cairo-ExtraBold">Cairo Extra Bold</option>
                  <option value="Cairo-Black">Cairo Black</option>
                </select>
              </div>

              <div>
                <Label htmlFor="mainTextSize">حجم النص الرئيسي</Label>
                <select
                  id="mainTextSize"
                  aria-label="حجم النص الرئيسي"
                  value={adDraft.mainTextSize || 'lg'}
                  onChange={(e) => setAdDraft({ ...adDraft, mainTextSize: e.target.value as AdDraft['mainTextSize'] })}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="sm">صغير</option>
                  <option value="base">عادي</option>
                  <option value="lg" selected>كبير</option>
                  <option value="xl">أكبر</option>
                  <option value="2xl">الأكبر</option>
                </select>
              </div>

              <div>
                <Label htmlFor="subTextSize">حجم النص الفرعي</Label>
                <select
                  id="subTextSize"
                  aria-label="حجم النص الفرعي"
                  value={adDraft.subTextSize || 'base'}
                  onChange={(e) => setAdDraft({ ...adDraft, subTextSize: e.target.value as AdDraft['subTextSize'] })}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="xs">صغير جداً</option>
                  <option value="sm">صغير</option>
                  <option value="base" selected>عادي</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                بعد النقر على "متابعة"، ستختار القالب المناسب من 11 قالب احترافي
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleStep1Continue}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <ArrowRight className="h-4 w-4 ml-2" />
                متابعة إلى الخطوة 2
              </Button>
              <Button
                variant="outline"
                onClick={() => setStep('list')}
              >
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'step2') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold">2</span>
              <span className="text-gray-600">اختيار القالب</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">الخطوة 2: اختر قالب احترافي</h2>
            <p className="text-gray-600 mt-1">اختر من 11 قالب احترافي - يتم الانتقال للخطوة التالية فوراً</p>
          </div>
          <Button variant="outline" onClick={() => setStep('list')}>
            <X className="h-4 w-4 ml-2" />
            إلغاء
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ADS_TEMPLATES.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleTemplateSelect(template.id)}
              className="cursor-pointer"
            >
              <Card className="hover:shadow-lg transition border-2 hover:border-blue-400 h-full overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={`/AdsForms/${template.id}.jpg`}
                    alt={template.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                    <Button
                      className="bg-white text-gray-900 hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTemplateSelect(template.id);
                      }}
                    >
                      اختيار هذا القالب
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h4 className="font-semibold text-gray-900 text-center">{template.name}</h4>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setStep('step1')}
            className="flex-1"
          >
            رجوع
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'step3') {
    const selectedMode = DISPLAY_MODES.find(m => m.id === selectedDisplayMode);
    const selectedTemplate = ADS_TEMPLATES.find(t => t.id === adDraft.templateId);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold">3</span>
              <span className="text-gray-600">طريقة العرض والنشر</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">الخطوة 3: اختر طريقة العرض</h2>
            <p className="text-gray-600 mt-1">اختر من أين سيظهر الإعلان في متجرك</p>
          </div>
          <Button variant="outline" onClick={() => setStep('list')}>
            <X className="h-4 w-4 ml-2" />
            إلغاء
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ملخص الإعلان</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">العنوان</p>
                    <p className="text-gray-900 font-medium">{adDraft.title}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">القالب</p>
                    <p className="text-gray-900 font-medium">{selectedTemplate?.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold">النص</p>
                    <p className="text-gray-900 text-sm">{adDraft.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>اختر طريقة العرض</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {DISPLAY_MODES.map((mode) => (
                  <div
                    key={mode.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                      selectedDisplayMode === mode.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedDisplayMode(mode.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                          selectedDisplayMode === mode.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedDisplayMode === mode.id && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{mode.label}</p>
                        <p className="text-sm text-gray-600 mt-1">{mode.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>معاينة الإعلان</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-6 flex flex-col items-center justify-center min-h-96">
                  <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <img
                        src={`/AdsForms/${adDraft.templateId}.jpg`}
                        alt={adDraft.templateId}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{adDraft.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3">{adDraft.description}</p>
                  </div>
                  {selectedMode && (
                    <p className="text-xs text-gray-600 mt-6 text-center">
                      ✓ سيظهر كـ: <strong>{selectedMode.label}</strong>
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
              <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">
                كل شيء جاهز! انقر على "نشر الإعلان" لنشر إعلانك على متجرك
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handlePublishAd}
            disabled={!selectedDisplayMode}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50"
          >
            <Check className="h-4 w-4 ml-2" />
            نشر الإعلان
          </Button>
          <Button
            variant="outline"
            onClick={() => setStep('step2')}
            className="flex-1"
          >
            رجوع
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default AdsManagementView;
