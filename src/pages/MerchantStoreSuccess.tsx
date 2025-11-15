import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Home, Store } from 'lucide-react';

interface StoreData {
  id: string;
  storeNameAr: string;
  storeNameEn?: string;
  email: string;
  phone: string;
  subdomain: string;
  logoPreview?: string;
}

interface MerchantStoreSuccessProps {
  storeData: StoreData;
  onDashboard: () => void;
  onHome: () => void;
}

const MerchantStoreSuccess: React.FC<MerchantStoreSuccessProps> = ({
  storeData,
  onDashboard,
  onHome
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 relative overflow-hidden">
      {/* خلفية ديناميكية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* أيقونة النجاح */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-2">تم إنشاء متجرك بنجاح!</h1>
            <p className="text-lg text-gray-600 mb-8">مبروك على خطوتك الأولى نحو النجاح مع إشرو</p>
          </div>

          {/* بيانات المتجر */}
          <Card className="mb-8 border-2 border-green-200 shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* لوجو والاسم */}
                <div className="flex items-start gap-4 pb-6 border-b">
                  {storeData.logoPreview ? (
                    <img
                      src={storeData.logoPreview}
                      alt={storeData.storeNameAr}
                      className="w-24 h-24 object-contain rounded-lg bg-gray-100"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                      <Store className="h-12 w-12 text-white" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{storeData.storeNameAr}</h2>
                    {storeData.storeNameEn && (
                      <p className="text-gray-600">{storeData.storeNameEn}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                      الرابط: <span className="text-primary font-semibold">{storeData.subdomain}.eshro.ly</span>
                    </p>
                  </div>
                </div>

                {/* معلومات التواصل */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">البريد الإلكتروني</p>
                    <p className="font-semibold text-gray-900">{storeData.email}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">رقم الهاتف</p>
                    <p className="font-semibold text-gray-900">{storeData.phone}</p>
                  </div>
                </div>

                {/* معرف المتجر */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">معرف المتجر</p>
                  <p className="font-semibold text-gray-900 font-mono">{storeData.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* رسالة ترحيب */}
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ما الخطوات التالية؟</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold text-lg">✓</span>
                  <span>تم تفعيل متجرك وهو جاهز للبدء في البيع</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold text-lg">✓</span>
                  <span>يمكنك الآن إضافة المنتجات من لوحة التحكم</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold text-lg">✓</span>
                  <span>سيكون متجرك مرئياً للعملاء على منصة إشرو</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold text-lg">✓</span>
                  <span>استفد من أدوات التسويق والتحليلات المتقدمة</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* الأزرار */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={onDashboard}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white h-12 text-base font-semibold flex items-center justify-center gap-2"
            >
              <Store className="h-5 w-5" />
              الدخول لوحة التحكم
              <ArrowRight className="h-5 w-5" />
            </Button>

            <Button
              onClick={onHome}
              variant="outline"
              className="h-12 text-base font-semibold flex items-center justify-center gap-2"
            >
              <Home className="h-5 w-5" />
              العودة للرئيسية
            </Button>
          </div>

          {/* معلومات إضافية */}
          <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>ملاحظة مهمة:</strong> تم حفظ بيانات اعتماداتك. يمكنك استخدام بريدك الإلكتروني أو رابط المتجر وكلمة المرور للدخول إلى لوحة تحكم المتجر.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantStoreSuccess;
