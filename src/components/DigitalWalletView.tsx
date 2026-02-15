import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
  CreditCard,
  Smartphone,
  Building,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Eye,
  EyeOff,
  Copy,
  Download,
  Filter,
  Calendar,
  Activity,
  Shield,
  Zap,
  Star,
  Crown,
  Gem,
  Heart,
  ShoppingCart,
  Timer,
  Percent,
  Calculator,
  Send,
  History,
  Settings,
  Bell,
  ChevronRight,
  Sparkles,
  Rocket,
  Target,
  Award,
  Coins,
  Banknote,
} from 'lucide-react';

interface DigitalWalletViewProps {
  storeData: any;
  setStoreData: (data: any) => void;
  onSave: () => void;
}

export const DigitalWalletView: React.FC<DigitalWalletViewProps> = ({
  storeData,
  setStoreData,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState('نظرة عامة');
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [amount, setAmount] = useState('');

  // Wallet data
  const walletData = {
    totalBalance: 45750.50,
    availableBalance: 42300.25,
    pendingBalance: 3450.25,
    currency: 'د.ل'
  };

  // Payment methods - Using actual logo images
  const paymentMethods = [
    {
      id: 'saddad',
      name: 'سداد',
      transactions: 142,
      amount: 18500.50,
      status: 'نشط',
      icon: '/assets/partners/payment/sadad.png',
      iconType: 'image',
      iconSize: 'w-16 h-16'
    },
    {
      id: 'mobikash',
      name: 'موبي كاش',
      transactions: 89,
      amount: 12750.25,
      status: 'نشط',
      icon: '/assets/partners/payment/mobicash.png',
      iconType: 'image',
      iconSize: 'w-16 h-16'
    },
    {
      id: 'edufly',
      name: 'ادفعلي',
      transactions: 67,
      amount: 9890.75,
      status: 'نشط',
      icon: '/assets/partners/payment/edfali.png',
      iconType: 'image',
      iconSize: 'w-16 h-16'
    },
    {
      id: 'bank_transfer',
      name: 'تحويل بنكي',
      transactions: 201,
      amount: 28650.00,
      status: 'نشط',
      icon: '/assets/partners/banks/Libyan-islamic.png',
      iconType: 'image',
      iconSize: 'w-16 h-16'
    }
  ];

  // Recent transactions
  const recentTransactions = [
    {
      id: 1,
      type: 'income',
      description: 'دفعة من طلب #1234',
      method: 'تحويل بنكي',
      amount: 1200.00,
      date: '2024-12-15',
      status: 'مكتمل'
    },
    {
      id: 2,
      type: 'expense',
      description: 'رسوم الشحن - أرامكس',
      method: 'محفظة',
      amount: -45.50,
      date: '2024-12-15',
      status: 'مكتمل'
    },
    {
      id: 3,
      type: 'income',
      description: 'دفعة من طلب #1235',
      method: 'سداد',
      amount: 850.25,
      date: '2024-12-14',
      status: 'قيد الانتظار'
    },
    {
      id: 4,
      type: 'expense',
      description: 'عمولة منصة إشرو',
      method: 'محفظة',
      amount: -142.50,
      date: '2024-12-14',
      status: 'مكتمل'
    },
    {
      id: 5,
      type: 'income',
      description: 'دفعة من طلب #1236',
      method: 'موبي كاش',
      amount: 2150.00,
      date: '2024-12-13',
      status: 'مكتمل'
    }
  ];

  // Predefined amounts for quick selection
  const quickAmounts = [50, 100, 200, 500, 1000];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header احترافي متطور */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 rounded-3xl p-8 text-white shadow-2xl"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full translate-y-32 -translate-x-32 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full animate-pulse"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl border border-white/20">
                <Wallet className="h-8 w-8 text-green-300 drop-shadow-lg" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-emerald-100 to-green-100 bg-clip-text text-transparent">
                  💰 المحفظة الرقمية
                </h1>
                <p className="text-emerald-100/90 text-lg font-medium">
                  إدارة الأموال والمعاملات المالية
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-left rtl-text">
                <div className="text-sm text-emerald-100 mb-1 rtl-text">الرصيد المتاح</div>
                <div className="text-2xl font-bold rtl-text">{walletData.availableBalance.toLocaleString()} {walletData.currency}</div>
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-xl border border-white/20">
                <DollarSign className="h-6 w-6 text-white drop-shadow-sm" />
              </div>
            </div>
          </div>
        </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="نظرة عامة">نظرة عامة</TabsTrigger>
          <TabsTrigger value="المعاملات">المعاملات</TabsTrigger>
          <TabsTrigger value="إضافة أموال">إضافة أموال</TabsTrigger>
        </TabsList>

        <TabsContent value="نظرة عامة" className="space-y-6">
          {/* Balance Cards متطورة مع RTL */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 hover:shadow-2xl transition-shadow transition-transform duration-300 group transform hover:scale-105">
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full -translate-y-16 -translate-x-16 group-hover:scale-125 transition-transform duration-300 animate-pulse"></div>
                <CardContent className="p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-left rtl-text">
                      <p className="text-sm font-medium text-blue-700 mb-1 rtl-text">إجمالي الرصيد</p>
                      <p className="text-3xl font-bold text-blue-800 rtl-text">{walletData.totalBalance.toLocaleString()} {walletData.currency}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg border border-blue-200/50">
                      <DollarSign className="h-6 w-6 text-white drop-shadow-sm" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-20 h-1 bg-blue-200 rounded-full overflow-hidden">
                      <div className="w-4/5 h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></div>
                    </div>
                    <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full rtl-text">
                      +5.2% من الشهر الماضي
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200 hover:shadow-2xl transition-all duration-300 group transform hover:scale-105">
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-full -translate-y-16 -translate-x-16 group-hover:scale-125 transition-transform duration-300 animate-pulse"></div>
                <CardContent className="p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-left rtl-text">
                      <p className="text-sm font-medium text-emerald-700 mb-1 rtl-text">الرصيد المتاح</p>
                      <p className="text-3xl font-bold text-emerald-800 rtl-text">{walletData.availableBalance.toLocaleString()} {walletData.currency}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg border border-emerald-200/50">
                      <CheckCircle className="h-6 w-6 text-white drop-shadow-sm" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-20 h-1 bg-emerald-200 rounded-full overflow-hidden">
                      <div className="w-5/6 h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"></div>
                    </div>
                    <div className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full rtl-text">
                      متاح للاستخدام
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200 hover:shadow-2xl transition-all duration-300 group transform hover:scale-105">
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full -translate-y-16 -translate-x-16 group-hover:scale-125 transition-transform duration-300 animate-pulse"></div>
                <CardContent className="p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-left rtl-text">
                      <p className="text-sm font-medium text-amber-700 mb-1 rtl-text">قيد الانتظار</p>
                      <p className="text-3xl font-bold text-amber-800 rtl-text">{walletData.pendingBalance.toLocaleString()} {walletData.currency}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg border border-amber-200/50">
                      <Clock className="h-6 w-6 text-white drop-shadow-sm" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-20 h-1 bg-amber-200 rounded-full overflow-hidden">
                      <div className="w-2/6 h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                    </div>
                    <div className="text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full rtl-text">
                      في انتظار التأكيد
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions متطورة مع RTL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 border-slate-200 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-slate-400/20 to-gray-500/20 rounded-full -translate-y-16 -translate-x-16 animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-zinc-400/20 to-slate-500/20 rounded-full translate-y-12 translate-x-12 animate-pulse"></div>
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-gray-600 rounded-xl flex items-center justify-center shadow-lg border border-slate-200/50">
                    <Zap className="h-6 w-6 text-white drop-shadow-sm" />
                  </div>
                  <div>
                    <span className="bg-gradient-to-l from-slate-700 to-gray-700 bg-clip-text text-transparent font-bold">
                      العمليات السريعة
                    </span>
                    <p className="text-sm text-slate-600 mt-1 font-normal">
                      أدوات سريعة لإدارة محفظتك
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    className="relative overflow-hidden bg-gradient-to-l from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-6 h-auto group"
                    onClick={() => setShowAddMoney(true)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-l from-white/20 to-transparent"></div>
                    <div className="absolute top-0 left-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 -translate-x-8 group-hover:scale-150 transition-transform duration-300"></div>
                    <div className="relative flex flex-col items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shadow-lg border border-white/30">
                        <Plus className="h-5 w-5 text-white drop-shadow-sm" />
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-white">إضافة أموال</div>
                        <div className="text-xs text-emerald-100">شحن المحفظة</div>
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="relative overflow-hidden border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 p-6 h-auto group transform hover:scale-105"
                  >
                    <div className="absolute top-0 right-0 w-12 h-12 bg-blue-100/50 rounded-full translate-y-4 translate-x-4 group-hover:scale-125 transition-transform duration-300"></div>
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg border border-blue-200/50">
                        <Send className="h-5 w-5 text-white drop-shadow-sm" />
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-blue-800">إرسال</div>
                        <div className="text-xs text-blue-600">تحويل الأموال</div>
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="relative overflow-hidden border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 p-6 h-auto group transform hover:scale-105"
                  >
                    <div className="absolute top-0 right-0 w-12 h-12 bg-purple-100/50 rounded-full translate-y-4 translate-x-4 group-hover:scale-125 transition-transform duration-300"></div>
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg border border-purple-200/50">
                        <ArrowDownLeft className="h-5 w-5 text-white drop-shadow-sm" />
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-purple-800">استلام</div>
                        <div className="text-xs text-purple-600">تلقي الأموال</div>
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Methods متطورة مع RTL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 border-violet-200 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-violet-400/20 to-purple-500/20 rounded-full -translate-y-16 -translate-x-16 animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-violet-500/20 rounded-full translate-y-12 translate-x-12 animate-pulse"></div>
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-3 text-2xl rtl-text">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg border border-violet-200/50">
                    <CreditCard className="h-6 w-6 text-white drop-shadow-sm" />
                  </div>
                  <div className="rtl-text">
                    <span className="font-bold rtl-text text-gray-800">
                      💳 طرق الدفع المربوطة
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-4">
                {paymentMethods.map((method, index) => (
                  <motion.div
                    key={method.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-100 shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:scale-105"
                  >
                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-violet-400/10 to-purple-400/10 rounded-full -translate-y-10 -translate-x-10 group-hover:scale-125 transition-transform duration-300"></div>

                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-32 h-32 flex items-center justify-center overflow-hidden">
                          {method.iconType === 'image' ? (
                            <img
                              src={method.icon}
                              alt={method.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {

                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.innerHTML = '<span class="text-3xl">🏦</span>';
                              }}
                            />
                          ) : (
                            <span className={method.iconSize}>{method.icon}</span>
                          )}
                        </div>
                        <div className="text-right rtl-text">
                          <p className="text-violet-600 text-sm mb-2 rtl-text">{method.transactions} معاملة هذا الشهر</p>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <Badge className="bg-green-100 text-green-700 px-3 py-1 shadow-sm rtl-text">
                              {method.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="text-right rtl-text">
                        <div className="text-2xl font-bold text-violet-900 mb-1 rtl-text">
                          {method.amount.toLocaleString()} {walletData.currency}
                        </div>
                        <div className="text-sm text-violet-600 rtl-text">إجمالي المعاملات</div>
                        <Progress
                          value={(method.amount / Math.max(...paymentMethods.map(m => m.amount))) * 100}
                          className="mt-2 h-2 bg-violet-100 w-24"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="المعاملات" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 border-rose-200 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-400/20 to-pink-500/20 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-rose-500/20 rounded-full translate-y-12 -translate-x-12 animate-pulse"></div>
              <CardHeader className="relative">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-3 text-2xl rtl-text">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg border border-rose-200/50">
                      <History className="h-6 w-6 text-white drop-shadow-sm" />
                    </div>
                    <div className="rtl-text">
                      <span className="font-bold rtl-text text-gray-800">
                        📊 المعاملات الأخيرة
                      </span>
                    </div>
                  </CardTitle>
                  <div className="flex gap-2 rtl-text">
                    <Button variant="outline" size="sm" className="border-rose-200 hover:bg-rose-50 hover:border-rose-300 shadow-sm hover:shadow-md transition-all duration-300 rtl-text">
                      <Filter className="h-4 w-4 ml-2" />
                      تصفية
                    </Button>
                    <Button variant="outline" size="sm" className="border-rose-200 hover:bg-rose-50 hover:border-rose-300 shadow-sm hover:shadow-md transition-all duration-300 rtl-text">
                      عرض الكل
                      <ChevronRight className="h-4 w-4 mr-2" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-rose-100 shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:scale-105"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-rose-400/10 to-pink-400/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-125 transition-transform duration-300"></div>

                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border ${
                          transaction.type === 'income'
                            ? 'bg-gradient-to-br from-emerald-400 to-green-500 border-emerald-200/50'
                            : 'bg-gradient-to-br from-red-400 to-rose-500 border-red-200/50'
                        }`}>
                          {transaction.type === 'income' ? (
                            <ArrowUpRight className="h-7 w-7 text-white drop-shadow-sm" />
                          ) : (
                            <ArrowDownLeft className="h-7 w-7 text-white drop-shadow-sm" />
                          )}
                        </div>
                        <div className="text-right rtl-text">
                          <h3 className="font-bold text-gray-800 text-lg mb-1 rtl-text">{transaction.description}</h3>
                          <div className="flex items-center gap-3 mb-2 rtl-text">
                            <Badge className={`rtl-text ${
                              transaction.method === 'سداد' ? 'bg-blue-100 text-blue-700' :
                              transaction.method === 'موبي كاش' ? 'bg-green-100 text-green-700' :
                              transaction.method === 'ادفعلي' ? 'bg-purple-100 text-purple-700' :
                              'bg-gray-100 text-gray-700'
                            } px-3 py-1 shadow-sm flex items-center gap-1`}>
                              {transaction.method === 'سداد' ? (
                                <img src="/assets/partners/payment/sadad.png" alt="سداد" className="w-4 h-4"
                                     onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                              ) : transaction.method === 'موبي كاش' ? (
                                <img src="/assets/partners/payment/mobicash.png" alt="موبي كاش" className="w-4 h-4"
                                     onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                              ) : transaction.method === 'ادفعلي' ? (
                                <img src="/assets/partners/payment/edfali.png" alt="ادفعلي" className="w-4 h-4"
                                     onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                              ) : transaction.method === 'تحويل بنكي' ? (
                                <img src="/assets/partners/banks/Libyan-islamic.png" alt="تحويل بنكي" className="w-4 h-4"
                                     onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                              ) : null}
                              {transaction.method}
                            </Badge>
                            <span className="text-sm text-gray-600 rtl-text">{transaction.date}</span>
                          </div>
                          <div className="flex items-center gap-2 rtl-text">
                            <Badge className={`rtl-text ${
                              transaction.status === 'مكتمل' ? 'bg-green-100 text-green-700' :
                              transaction.status === 'قيد الانتظار' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            } px-3 py-1 shadow-sm`}>
                              {transaction.status}
                            </Badge>
                            <div className={`w-2 h-2 rounded-full animate-pulse ${
                              transaction.status === 'مكتمل' ? 'bg-green-500' :
                              transaction.status === 'قيد الانتظار' ? 'bg-yellow-500' :
                              'bg-gray-400'
                            }`}></div>
                          </div>
                        </div>
                      </div>

                      <div className="text-right rtl-text">
                        <div className={`text-2xl font-bold mb-1 rtl-text ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'income' ? '+' : ''}{transaction.amount.toLocaleString()} {walletData.currency}
                        </div>
                        <div className="text-sm text-gray-600 rtl-text">
                          {transaction.type === 'income' ? 'دخل' : 'خصم'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="إضافة أموال" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 border-cyan-200 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-400/20 to-cyan-500/20 rounded-full translate-y-12 -translate-x-12 animate-pulse"></div>
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-3 text-2xl rtl-text">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg border border-cyan-200/50">
                    <Plus className="h-6 w-6 text-white drop-shadow-sm" />
                  </div>
                  <div className="rtl-text">
                    <span className="font-bold rtl-text text-gray-800">
                      💰 إضافة أموال إلى المحفظة
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button
                      variant={paymentMethod === 'credit_card' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('credit_card')}
                      className={`relative overflow-hidden p-6 h-auto w-full flex flex-col items-center gap-4 transition-all duration-300 transform hover:scale-105 ${
                        paymentMethod === 'credit_card'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl shadow-cyan-500/25'
                          : 'border-2 border-cyan-200 hover:border-cyan-300 hover:bg-cyan-50'
                      }`}
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full translate-y-4 translate-x-4 animate-pulse"></div>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border ${
                        paymentMethod === 'credit_card'
                          ? 'bg-white/20 border-white/30'
                          : 'bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-200/50'
                      }`}>
                        <CreditCard className={`h-7 w-7 drop-shadow-sm ${paymentMethod === 'credit_card' ? 'text-white' : 'text-white'}`} />
                      </div>
                      <div className="text-center">
                        <div className={`font-bold text-lg ${paymentMethod === 'credit_card' ? 'text-white' : 'text-cyan-800'}`}>
                          💳 بطاقات ائتمانية
                        </div>
                        <div className={`text-sm ${paymentMethod === 'credit_card' ? 'text-cyan-100' : 'text-cyan-600'}`}>
                          دفع سريع وآمن
                        </div>
                      </div>
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      variant={paymentMethod === 'instant_payment' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('instant_payment')}
                      className={`relative overflow-hidden p-6 h-auto w-full flex flex-col items-center gap-4 transition-all duration-300 transform hover:scale-105 ${
                        paymentMethod === 'instant_payment'
                          ? 'bg-gradient-to-r from-emerald-500 to-green-600 shadow-2xl shadow-emerald-500/25'
                          : 'border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50'
                      }`}
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full translate-y-4 translate-x-4 animate-pulse"></div>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border ${
                        paymentMethod === 'instant_payment'
                          ? 'bg-white/20 border-white/30'
                          : 'bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-200/50'
                      }`}>
                        <Zap className={`h-7 w-7 drop-shadow-sm ${paymentMethod === 'instant_payment' ? 'text-white' : 'text-white'}`} />
                      </div>
                      <div className="text-center">
                        <div className={`font-bold text-lg ${paymentMethod === 'instant_payment' ? 'text-white' : 'text-emerald-800'}`}>
                          ⚡ دفع فوري
                        </div>
                        <div className={`text-sm ${paymentMethod === 'instant_payment' ? 'text-emerald-100' : 'text-emerald-600'}`}>
                          معالجة سريعة
                        </div>
                      </div>
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      variant={paymentMethod === 'bank_transfer' ? 'default' : 'outline'}
                      onClick={() => setPaymentMethod('bank_transfer')}
                      className={`relative overflow-hidden p-6 h-auto w-full flex flex-col items-center gap-4 transition-all duration-300 transform hover:scale-105 ${
                        paymentMethod === 'bank_transfer'
                          ? 'bg-gradient-to-r from-violet-500 to-purple-600 shadow-2xl shadow-violet-500/25'
                          : 'border-2 border-violet-200 hover:border-violet-300 hover:bg-violet-50'
                      }`}
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full translate-y-4 translate-x-4 animate-pulse"></div>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border ${
                        paymentMethod === 'bank_transfer'
                          ? 'bg-white/20 border-white/30'
                          : 'bg-gradient-to-br from-violet-500 to-purple-600 border-violet-200/50'
                      }`}>
                        <Building className={`h-7 w-7 drop-shadow-sm ${paymentMethod === 'bank_transfer' ? 'text-white' : 'text-white'}`} />
                      </div>
                      <div className="text-center">
                        <div className={`font-bold text-lg ${paymentMethod === 'bank_transfer' ? 'text-white' : 'text-violet-800'}`}>
                          🏦 تحويل مصرفي
                        </div>
                        <div className={`text-sm ${paymentMethod === 'bank_transfer' ? 'text-violet-100' : 'text-violet-600'}`}>
                          تحويل تقليدي
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                </div>

              {paymentMethod === 'credit_card' && (
                <div className="space-y-6 rtl-text">
                  <div className="rtl-text">
                    <Label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2 rtl-text">
                      المبلغ
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="أدخل المبلغ"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="rtl-input text-right"
                      style={{ direction: 'rtl', textAlign: 'right' }}
                    />
                  </div>

                  <div className="rtl-text">
                    <Label className="block text-sm font-medium text-gray-700 mb-3 rtl-text">
                      اختر مبلغ سريع
                    </Label>
                    <div className="grid grid-cols-5 gap-2">
                      {quickAmounts.map((quickAmount) => (
                        <Button
                          key={quickAmount}
                          variant="outline"
                          onClick={() => setAmount(quickAmount.toString())}
                          className="text-sm"
                        >
                          {quickAmount} {walletData.currency}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {amount && (
                     <div className="p-4 bg-blue-50 rounded-lg rtl-text">
                       <p className="text-sm text-blue-800 rtl-text">
                         رصيد محفظتك الجديد سيكون: <span className="font-bold rtl-text">{(walletData.availableBalance + parseFloat(amount)).toLocaleString()} {walletData.currency}</span>
                       </p>
                     </div>
                   )}

                  <div className="flex gap-4 rtl-text">
                    <Button className="flex-1 rtl-text">تأكيد الطلب</Button>
                    <Button variant="outline" className="flex-1 rtl-text">إلغاء</Button>
                  </div>
                </div>
              )}

              {paymentMethod === 'bank_transfer' && (
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg rtl-text">
                    <h4 className="font-medium text-gray-900 mb-2 rtl-text">بيانات حساب المحفظة</h4>
                    <p className="text-sm text-gray-600 mb-4 rtl-text">سيتم إعلامك عند استلام التحويل</p>

                    <div className="space-y-3 rtl-text">
                      <div className="rtl-text">
                        <Label className="block text-sm font-medium text-gray-700 mb-1 rtl-text">اسم صاحب الحساب</Label>
                        <p className="text-sm bg-white p-2 rounded border rtl-text">{storeData?.nameAr || storeData?.name || 'متجر إشرو'}</p>
                      </div>
                      <div className="rtl-text">
                        <Label className="block text-sm font-medium text-gray-700 mb-1 rtl-text">اسم المصرف</Label>
                        <p className="text-sm bg-white p-2 rounded border rtl-text">مصرف الجمهورية</p>
                      </div>
                      <div className="rtl-text">
                        <Label className="block text-sm font-medium text-gray-700 mb-1 rtl-text">رقم الآيبان (IBAN)</Label>
                        <p className="text-sm bg-white p-2 rounded border font-mono rtl-text">LY2030100819000001276041</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg rtl-text">
                    <h4 className="font-medium text-blue-900 mb-2 rtl-text">بيانات حساب صاحب المتجر</h4>
                    <p className="text-sm text-blue-700 mb-3 rtl-text">في حالة التحويل إلى حساب موثّق، سيتم إيداع مبلغ التحويل في المحفظة تلقائياً.</p>

                    <div className="space-y-3 rtl-text">
                      <div className="rtl-text">
                        <Label className="block text-sm font-medium text-gray-700 mb-1 rtl-text">اسم صاحب الحساب</Label>
                        <p className="text-sm bg-white p-2 rounded border rtl-text">{storeData?.nameAr || storeData?.name || 'متجر إشرو'}</p>
                      </div>
                      <div className="rtl-text">
                        <Label className="block text-sm font-medium text-gray-700 mb-1 rtl-text">اسم المصرف</Label>
                        <p className="text-sm bg-white p-2 rounded border rtl-text">مصرف الجمهورية</p>
                      </div>
                      <div className="rtl-text">
                        <Label className="block text-sm font-medium text-gray-700 mb-1 rtl-text">رقم الآيبان (IBAN)</Label>
                        <p className="text-sm bg-white p-2 rounded border font-mono rtl-text">LY4380000296608010756115</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 rtl-text">
                     <Button className="flex-1 rtl-text">تأكيد الطلب</Button>
                     <Button variant="outline" className="flex-1 rtl-text">إلغاء</Button>
                  </div>
                </div>
              )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
};
