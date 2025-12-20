import sequelize from '@config/database';
import Store from '@models/Store';
import StoreSlider from '@models/StoreSlider';
import logger from '@utils/logger';

const DEFAULT_SLIDERS: Record<string, Array<{ title: string; subtitle: string; buttonText: string; imagePath: string; sortOrder: number }>> = {
  sheirine: [
    {
      title: 'مجوهرات شيرين الفاخرة',
      subtitle: 'تألقي بأجمل المجوهرات والإكسسوارات',
      buttonText: 'استكشفي المجموعة',
      imagePath: '/assets/sherine/sliders/slider1.webp',
      sortOrder: 0
    },
    {
      title: 'عروض خاصة من شيرين',
      subtitle: 'أجمل المجوهرات بأسعار مميزة',
      buttonText: 'اطلعي على العروض',
      imagePath: '/assets/sherine/sliders/slider2.webp',
      sortOrder: 1
    },
    {
      title: 'أناقة وتألق من شيرين',
      subtitle: 'أجمل المجوهرات بأسعار مميزة',
      buttonText: 'اكتشف أسعارنا',
      imagePath: '/assets/sherine/sliders/slider3.webp',
      sortOrder: 1
    },
    {
      title: 'عروض خاصة من شيرين',
      subtitle: 'أجمل المجوهرات بأسعار مميزة',
      buttonText: 'أناقة لا مثيل لها',
      imagePath: '/assets/sherine/sliders/slider4.webp',
      sortOrder: 1
    }
  ],
  nawaem: [
    {
      title: 'اكتشف تشكيلة نواعم الحصرية',
      subtitle: 'أحدث الأزياء والعبايات الراقية',
      buttonText: 'تسوق الآن',
      imagePath: '/assets/nawaem/sliders/slider2.jpg',
      sortOrder: 0
    },
    {
      title: 'عروض حصرية من نواعم',
      subtitle: 'لا تفوت الفرصة - عروض محدودة',
      buttonText: 'شاهد العروض',
      imagePath: '/assets/nawaem/sliders/abaya3.jpg',
      sortOrder: 1
    },
    {
      title: 'عروض حصرية من نواعم',
      subtitle: 'لا تفوت الفرصة - عروض محدودة',
      buttonText: 'شاهد العروض',
      imagePath: '/assets/nawaem/sliders/bag2.jpg',
      sortOrder: 1
    },
    {
      title: 'عروض حصرية من نواعم',
      subtitle: 'لا تفوت الفرصة - عروض محدودة',
      buttonText: 'شاهد العروض',
      imagePath: '/assets/nawaem/sliders/bag3-green.jpg',
      sortOrder: 1
    },
    {
      title: 'عروض حصرية من نواعم',
      subtitle: 'لا تفوت الفرصة - عروض محدودة',
      buttonText: 'شاهد العروض',
      imagePath: '/assets/nawaem/sliders/dress3.jpg',
      sortOrder: 1
    },
    {
      title: 'عروض حصرية من نواعم',
      subtitle: 'لا تفوت الفرصة - عروض محدودة',
      buttonText: 'شاهد العروض',
      imagePath: '/assets/nawaem/sliders/handbag-black-1.jpg',
      sortOrder: 1
    },
    {
      title: 'عروض حصرية من نواعم',
      subtitle: 'لا تفوت الفرصة - عروض محدودة',
      buttonText: 'شاهد العروض',
      imagePath: '/assets/nawaem/sliders/handbags-luxury-1.jpg',
      sortOrder: 1
    }
  ],

  pretty: [
    {
      title: 'أناقة Pretty',
      subtitle: 'اكتشفي أحدث مجموعات الأزياء',
      buttonText: 'تسوقي الآن',
      imagePath: '/assets/pretty/sliders/slider10.webp',
      sortOrder: 0
    },
    {
      title: 'عروض Pretty',
      subtitle: 'تخفيضات كبيرة على المنتجات المختارة',
      buttonText: 'اعرضي الآن',
      imagePath: '/assets/pretty/sliders/slider11.webp',
      sortOrder: 1
    },
    {
      title: 'مجموعة جديدة من Pretty',
      subtitle: 'أحدث صيحات الموضة',
      buttonText: 'تعرفي عليها',
      imagePath: '/assets/pretty/sliders/slider14.webp',
      sortOrder: 1
    },
    {
      title: 'خصومات Pretty الحصرية',
      subtitle: 'اختاري من أفضل الأزياء',
      buttonText: 'استمتعي بالعروض',
      imagePath: '/assets/pretty/sliders/slider12.webp',
      sortOrder: 1
    },
    {
      title: 'Pretty - عالم الأناقة',
      subtitle: 'ملابس وإكسسوارات بجودة عالية',
      buttonText: 'ابدأي التسوق',
      imagePath: '/assets/pretty/sliders/slider13.webp',
      sortOrder: 1
    }
  ],

  'delta-store': [
    {
      title: 'ديلتا ستور - أفضل الإلكترونيات',
      subtitle: 'احصلي على أحدث المنتجات الإلكترونية',
      buttonText: 'ابدأي الآن',
      imagePath: '/assets/delta-store/sliders/slider1.jpg',
      sortOrder: 0
    },
    {
      title: 'عروض ديلتا الحصرية',
      subtitle: 'تخفيضات على أفضل الماركات',
      buttonText: 'شاهد العروض',
      imagePath: '/assets/delta-store/sliders/slider2.jpg',
      sortOrder: 1
    },
    {
      title: 'تقنيات جديدة من ديلتا',
      subtitle: 'استمتعي بأحدث الابتكارات',
      buttonText: 'اكتشفي المزيد',
      imagePath: '/assets/delta-store/sliders/slider3.jpg',
      sortOrder: 1
    },
    {
      title: 'ديلتا - جودة وأمان',
      subtitle: 'منتجات أصلية بضمان',
      buttonText: 'ابدأ التسوق',
      imagePath: '/assets/delta-store/sliders/slider4.jpg',
      sortOrder: 1
    },
    {
      title: 'أحدث الموديلات في ديلتا',
      subtitle: 'اختر من أفضل الماركات العالمية',
      buttonText: 'تسوق الآن',
      imagePath: '/assets/delta-store/sliders/slider5.jpg',
      sortOrder: 1
    }
  ],

  'magna-beauty': [
    {
      title: 'مغنا بيوتي - جمالك أولويتنا',
      subtitle: 'منتجات عناية وتجميل فاخرة',
      buttonText: 'اكتشفي المنتجات',
      imagePath: '/assets/magna-beauty/sliders/slider1.jpg',
      sortOrder: 0
    },
    {
      title: 'عروض مغنا الجمالية',
      subtitle: 'عناية فاخرة بأسعار مميزة',
      buttonText: 'تسوقي الآن',
      imagePath: '/assets/magna-beauty/sliders/slider2.jpg',
      sortOrder: 1
    },
    {
      title: 'منتجات طبيعية من مغنا',
      subtitle: 'الجمال الطبيعي يبدأ من هنا',
      buttonText: 'تعرفي عليها',
      imagePath: '/assets/magna-beauty/sliders/slider3.jpg',
      sortOrder: 1
    },
    {
      title: 'مغنا - رعاية شاملة',
      subtitle: 'حلول جمالية متكاملة',
      buttonText: 'استكشفي',
      imagePath: '/assets/magna-beauty/sliders/slider4.jpg',
      sortOrder: 1
    },
    {
      title: 'عناية بشرتك مع مغنا',
      subtitle: 'منتجات آمنة وفعالة',
      buttonText: 'ابدأ الآن',
      imagePath: '/assets/magna-beauty/sliders/slider5.jpg',
      sortOrder: 1
    }
  ],

  indeesh: [
    {
      title: 'عالم اندیش الفاخر',
      subtitle: 'احدث الملابس الإسلامية',
      buttonText: 'ابدأي التسوق',
      imagePath: '/assets/indeesh/sliders/1764003949480-khgvls-1.jpg',
      sortOrder: 0
    },
    {
      title: 'عروض انديش الخاصة',
      subtitle: 'منتجات أصلية بأسعار مميزة',
      buttonText: 'اكتشف العروض',
      imagePath: '/assets/indeesh/sliders/1764003949480-48hujc-1.jpg',
      sortOrder: 1
    }
  ]
};

async function checkTableExists(dialect: string, tableName: string): Promise<boolean> {
  try {
    if (dialect === 'postgres') {
      const result: any = await sequelize.query(`
        SELECT to_regclass('public.${tableName}') as name;
      `, { raw: true });
      return (result?.[0]?.[0] as any)?.name !== null;
    } else if (dialect === 'mysql') {
      const result: any = await sequelize.query(`
        SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES 
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = '${tableName}';
      `, { raw: true });
      return (result?.[0] as any)?.length > 0;
    } else if (dialect === 'sqlite') {
      const result: any = await sequelize.query(`
        SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';
      `, { raw: true });
      return (result?.[0] as any)?.length > 0;
    }
    return true;
  } catch (error) {
    logger.warn(`⚠️ Error checking if table ${tableName} exists:`, error);
    return false;
  }
}

export async function populateSliders() {
  try {
    logger.info('🔄 Starting slider population for existing stores...');

    const dialect = ((sequelize as any).options).dialect || 'sqlite';
    const tableExists = await checkTableExists(dialect, 'store_sliders');
    
    if (!tableExists) {
      logger.warn('⚠️ Table store_sliders does not exist yet, skipping slider population');
      return { success: true, skipped: true };
    }

    const stores = await Store.findAll({
      attributes: ['id', 'slug', 'name']
    });

    logger.info(`📦 Found ${stores.length} stores to process`);

    let totalSliders = 0;

    for (const store of stores) {
      const storeSlug = store.slug?.toLowerCase() || '';
      const existingSliders = await StoreSlider.count({ where: { storeId: store.id } });

      if (existingSliders > 0) {
        logger.info(`✅ Store '${storeSlug}' already has ${existingSliders} sliders, skipping...`);
        continue;
      }

      let defaultSliders = DEFAULT_SLIDERS[storeSlug];

      if (!defaultSliders) {
        defaultSliders = [
          {
            title: `مرحباً بك في متجر ${store.name}`,
            subtitle: 'اكتشف العروض والمنتجات الجديدة',
            buttonText: 'تسوق الآن',
            imagePath: `/assets/${storeSlug}/sliders/default-slider-1.svg`,
            sortOrder: 0
          },
          {
            title: `عروض حصرية من ${store.name}`,
            subtitle: 'لا تفوت الفرصة',
            buttonText: 'شاهد العروض',
            imagePath: `/assets/${storeSlug}/sliders/default-slider-2.svg`,
            sortOrder: 1
          }
        ];
        logger.warn(`⚠️ No default sliders defined for store '${storeSlug}', using generic defaults`);
      }

      try {
        for (const sliderData of defaultSliders) {
          await StoreSlider.create({
            storeId: store.id,
            title: sliderData.title,
            subtitle: sliderData.subtitle,
            buttonText: sliderData.buttonText,
            imagePath: sliderData.imagePath,
            sortOrder: sliderData.sortOrder,
            metadata: {
              isActive: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          });
          totalSliders++;
        }
        logger.info(`✅ Added ${defaultSliders.length} sliders to store '${storeSlug}'`);
      } catch (error) {
        logger.error(`❌ Error adding sliders to store '${storeSlug}':`, error);
      }
    }

    logger.info(`✅ Slider population complete! Added ${totalSliders} sliders total`);
    return { success: true, totalSliders, storesProcessed: stores.length };
  } catch (error) {
    logger.error('❌ Error during slider population:', error);
    throw error;
  }
}

if (require.main === module) {
  (async () => {
    try {
      await populateSliders();
      logger.info('✅ Migration completed successfully');
      process.exit(0);
    } catch (error) {
      logger.error('❌ Migration failed:', error);
      process.exit(1);
    }
  })();
}
