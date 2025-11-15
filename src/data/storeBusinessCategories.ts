// فئات النشاط التجاري للمتاجر
export interface BusinessCategory {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  color: string;
}

export const storeBusinessCategories: BusinessCategory[] = [
  {
    id: 'clothing',
    name: '👗 الأزياء والملابس',
    nameEn: 'Clothing & Fashion',
    description: 'ملابس وأزياء رجالي ونسائي وأطفال',
    icon: '👗',
    color: 'bg-pink-500'
  },
  {
    id: 'electronics',
    name: '📱 الإلكترونيات',
    nameEn: 'Electronics',
    description: 'أجهزة إلكترونية وهواتف وأكسسوارات',
    icon: '📱',
    color: 'bg-blue-500'
  },
  {
    id: 'food_beverages',
    name: '🍔 الأطعمة والمشروبات',
    nameEn: 'Food & Beverages',
    description: 'أطعمة ومشروبات وتوابل وخضروات',
    icon: '🍔',
    color: 'bg-orange-500'
  },
  {
    id: 'beauty_care',
    name: '💄 الجمال والعناية',
    nameEn: 'Beauty & Care',
    description: 'مستحضرات العناية والجمال والعطور',
    icon: '💄',
    color: 'bg-purple-500'
  },
  {
    id: 'home_garden',
    name: '🏠 المنزل والحديقة',
    nameEn: 'Home & Garden',
    description: 'أدوات المنزل والحديقة والديكور',
    icon: '🏠',
    color: 'bg-green-500'
  },
  {
    id: 'sports_fitness',
    name: '⚽ الرياضة واللياقة',
    nameEn: 'Sports & Fitness',
    description: 'معدات رياضية وملابس رياضية',
    icon: '⚽',
    color: 'bg-red-500'
  },
  {
    id: 'books_culture',
    name: '📚 الكتب والثقافة',
    nameEn: 'Books & Culture',
    description: 'كتب وقصص ومنتجات ثقافية وتعليمية',
    icon: '📚',
    color: 'bg-indigo-500'
  },
  {
    id: 'toys_kids',
    name: '🧸 الألعاب والأطفال',
    nameEn: 'Toys & Kids',
    description: 'ألعاب وملابس أطفال وحضانات',
    icon: '🧸',
    color: 'bg-cyan-500'
  },
  {
    id: 'cars_vehicles',
    name: '🚗 السيارات والمركبات',
    nameEn: 'Cars & Vehicles',
    description: 'أكسسوارات سيارات ودراجات ومركبات',
    icon: '🚗',
    color: 'bg-gray-500'
  },
  {
    id: 'health_medicine',
    name: '⚕️ الصحة والطب',
    nameEn: 'Health & Medicine',
    description: 'أدوية وفيتامينات ومعدات طبية',
    icon: '⚕️',
    color: 'bg-rose-500'
  },
  // الفئات الجديدة المضافة
  {
    id: 'appliances',
    name: '🔌 مواد كهرومنزلية',
    nameEn: 'Home Appliances',
    description: 'أجهزة منزلية كهربائية وأدوات',
    icon: '🔌',
    color: 'bg-yellow-600'
  },
  {
    id: 'electrical',
    name: '⚡ مواد كهربائية',
    nameEn: 'Electrical Materials',
    description: 'مواد كهربائية وتوصيلات وأسلاك',
    icon: '⚡',
    color: 'bg-yellow-500'
  },
  {
    id: 'building_materials',
    name: '🏗️ مواد بناء',
    nameEn: 'Building Materials',
    description: 'مواد البناء والإنشاءات والأساسات',
    icon: '🏗️',
    color: 'bg-amber-700'
  },
  {
    id: 'furniture_decor',
    name: '🛋️ أثاث وديكورات',
    nameEn: 'Furniture & Decor',
    description: 'أثاث وديكور وتزيينات المنزل',
    icon: '🛋️',
    color: 'bg-amber-600'
  },
  {
    id: 'carpets_textiles',
    name: '🧶 مفروشات وسجاد',
    nameEn: 'Carpets & Textiles',
    description: 'سجاد وستائر ومفروشات وأقمشة',
    icon: '🧶',
    color: 'bg-slate-500'
  },
  {
    id: 'food_items',
    name: '🌾 مواد غذائية',
    nameEn: 'Food Items',
    description: 'مواد غذائية جافة وحبوب وزيوت',
    icon: '🌾',
    color: 'bg-yellow-700'
  },
  {
    id: 'food_supplements',
    name: '💊 مكملات غذائية',
    nameEn: 'Food Supplements',
    description: 'فيتامينات ومكملات غذائية وعضوية',
    icon: '💊',
    color: 'bg-lime-600'
  },
  {
    id: 'healthy_food',
    name: '🥗 أغذية صحية',
    nameEn: 'Healthy Food',
    description: 'منتجات غذائية صحية وعضوية طبيعية',
    icon: '🥗',
    color: 'bg-green-600'
  },
  {
    id: 'cleaning_supplies',
    name: '🧹 مواد تنظيف',
    nameEn: 'Cleaning Supplies',
    description: 'منظفات ومطهرات وأدوات التنظيف',
    icon: '🧹',
    color: 'bg-sky-500'
  }
];

// دالة البحث عن فئة معينة
export const getBusinessCategory = (categoryId: string): BusinessCategory | undefined => {
  return storeBusinessCategories.find(cat => cat.id === categoryId);
};

// دالة الحصول على الفئات حسب الاسم العربي
export const getBusinessCategoryByName = (name: string): BusinessCategory | undefined => {
  return storeBusinessCategories.find(cat => cat.name.includes(name));
};

// دالة الحصول على فئات العرض في القائمة المنسدلة
export const getBusinessCategoryOptions = () => {
  return storeBusinessCategories.map(cat => ({
    value: cat.id,
    label: cat.name,
    icon: cat.icon
  }));
};
