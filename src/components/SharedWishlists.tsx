import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Share2,
  Heart,
  Plus,
  Link,
  Copy,
  Mail,
  MessageCircle
} from 'lucide-react';

interface WishlistItem {
  id: number;
  product: any;
  addedBy: string;
  addedDate: string;
}

interface SharedWishlist {
  id: string;
  name: string;
  description: string;
  items: WishlistItem[];
  collaborators: string[];
  isPublic: boolean;
  shareUrl: string;
}

interface SharedWishlistsProps {
  onAddToCart: (productId: number) => void;
}

const SharedWishlists: React.FC<SharedWishlistsProps> = ({ onAddToCart }) => {
  const [wishlists, setWishlists] = useState<SharedWishlist[]>([
    {
      id: '1',
      name: 'قائمة الهدايا للأصدقاء',
      description: 'مجموعة من الهدايا المثالية للمناسبات',
      items: [
        {
          id: 1,
          product: {
            id: 101,
            name: 'حقيبة ظهر أنيقة',
            price: 89.99,
            image: '/api/placeholder/100/100'
          },
          addedBy: 'أحمد محمد',
          addedDate: '2025-01-15'
        },
        {
          id: 2,
          product: {
            id: 102,
            name: 'ساعة ذكية',
            price: 199.99,
            image: '/api/placeholder/100/100'
          },
          addedBy: 'فاطمة علي',
          addedDate: '2025-01-16'
        }
      ],
      collaborators: ['أحمد محمد', 'فاطمة علي', 'محمد حسن'],
      isPublic: true,
      shareUrl: 'https://eishro.com/wishlist/abc123'
    }
  ]);

  const [newWishlistName, setNewWishlistName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateWishlist = () => {
    if (newWishlistName.trim()) {
      const newWishlist: SharedWishlist = {
        id: Date.now().toString(),
        name: newWishlistName,
        description: '',
        items: [],
        collaborators: ['أنت'],
        isPublic: false,
        shareUrl: `https://eishro.com/wishlist/${Date.now()}`
      };
      setWishlists(prev => [...prev, newWishlist]);
      setNewWishlistName('');
      setShowCreateForm(false);
    }
  };

  const handleShareWishlist = (wishlist: SharedWishlist) => {
    navigator.clipboard.writeText(wishlist.shareUrl);
    alert('تم نسخ رابط القائمة!');
  };

  const handleAddCollaborator = (wishlistId: string, email: string) => {
    // محاكاة إضافة متعاون
    alert(`تم إرسال دعوة إلى ${email}`);
  };

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6" />
            قوائم المفضلة المشتركة
          </h2>
          <p className="text-gray-600 mt-1">
            أنشئ قوائم مشتركة مع أصدقائك وعائلتك
          </p>
        </div>
        <Button
          type="button"
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          إنشاء قائمة جديدة
        </Button>
      </div>

      {/* نموذج إنشاء قائمة جديدة */}
      {showCreateForm && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  اسم القائمة
                </label>
                <Input
                  value={newWishlistName}
                  onChange={(e) => setNewWishlistName(e.target.value)}
                  placeholder="مثال: قائمة الهدايا للأصدقاء"
                />
              </div>
              <div className="flex gap-3">
                <Button type="button" onClick={handleCreateWishlist}>
                  إنشاء القائمة
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* قوائم المفضلة */}
      <div className="grid gap-6">
        {wishlists.map(wishlist => (
          <Card key={wishlist.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    {wishlist.name}
                  </CardTitle>
                  <p className="text-gray-600 mt-1">{wishlist.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="secondary">
                      {wishlist.items.length} منتج
                    </Badge>
                    <Badge variant="outline">
                      {wishlist.collaborators.length} متعاون
                    </Badge>
                    {wishlist.isPublic && (
                      <Badge variant="default">
                        عامة
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleShareWishlist(wishlist)}
                    className="flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    مشاركة
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* المتعاونون */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">المتعاونون:</h4>
                <div className="flex flex-wrap gap-2">
                  {wishlist.collaborators.map(collaborator => (
                    <Badge key={collaborator} variant="outline">
                      {collaborator}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 mt-3">
                  <Input
                    placeholder="أدخل البريد الإلكتروني"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => handleAddCollaborator(wishlist.id, 'email@example.com')}
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    دعوة
                  </Button>
                </div>
              </div>

              {/* المنتجات */}
              {wishlist.items.length > 0 ? (
                <div>
                  <h4 className="font-medium mb-3">المنتجات:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlist.items.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium">{item.product.name}</h5>
                          <p className="text-sm text-gray-600">
                            {item.product.price} ريال
                          </p>
                          <p className="text-xs text-gray-500">
                            أضيف بواسطة {item.addedBy} في {item.addedDate}
                          </p>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => onAddToCart(item.product.id)}
                        >
                          إضافة للسلة
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>لا توجد منتجات في هذه القائمة بعد</p>
                  <p className="text-sm">ابدأ بإضافة بعض المنتجات المفضلة لديك!</p>
                </div>
              )}

              {/* رابط المشاركة */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-3">
                  <Link className="h-4 w-4 text-gray-500" />
                  <Input
                    value={wishlist.shareUrl}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleShareWishlist(wishlist)}
                    className="flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    نسخ
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* نصائح للاستخدام */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-medium text-blue-900 mb-3">نصائح للاستخدام الأمثل:</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• أنشئ قوائم منفصلة لمناسبات مختلفة (عيد ميلاد، زفاف، إلخ)</li>
            <li>• شارك القائمة مع أصدقائك للحصول على مساعدة في اختيار الهدايا</li>
            <li>• اجعل القائمة عامة لتسهيل المشاركة مع الجميع</li>
            <li>• تابع من أضاف أي منتج لتجنب التكرار</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SharedWishlists;