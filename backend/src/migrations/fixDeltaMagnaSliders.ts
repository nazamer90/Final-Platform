import sequelize from '@config/database';
import Store from '@models/Store';
import StoreSlider from '@models/StoreSlider';
import logger from '@utils/logger';

const CORRECTED_SLIDERS = {
  'delta-store': [
    {
      title: 'مجموعة الأوشحة الفاخرة',
      subtitle: 'أناقة لا تضاهى',
      buttonText: 'تسوقي الآن',
      imagePath: '/assets/delta-store/sliders/slider1.webp',
      sortOrder: 0
    },
    {
      title: 'حجاب أنيق وعصري',
      subtitle: 'لكل المناسبات',
      buttonText: 'اكتشفي المزيد',
      imagePath: '/assets/delta-store/sliders/slider2.webp',
      sortOrder: 1
    },
    {
      title: 'إكسسوارات حجاب مميزة',
      subtitle: 'لمسة جمالية',
      buttonText: 'شاهدي التشكيلة',
      imagePath: '/assets/delta-store/sliders/slider3.webp',
      sortOrder: 2
    },
    {
      title: 'ملابس نسائية أنيقة',
      subtitle: 'أحدث الصيحات',
      buttonText: 'تسوقي الآن',
      imagePath: '/assets/delta-store/sliders/slider4.webp',
      sortOrder: 3
    },
    {
      title: 'تشكيلة صيفية مميزة',
      subtitle: 'خامة مريحة',
      buttonText: 'ابدئي التسوق',
      imagePath: '/assets/delta-store/sliders/slider5.webp',
      sortOrder: 4
    },
    {
      title: 'أحدث صيحات الموضة',
      subtitle: 'تألقي معنا',
      buttonText: 'اكتشفي المجموعة',
      imagePath: '/assets/delta-store/sliders/slider6.webp',
      sortOrder: 5
    }
  ],

  'magna-beauty': [
    {
      title: 'مكياج عصري أنيق',
      subtitle: 'جمالك يستحق',
      buttonText: 'تسوقي الآن',
      imagePath: '/assets/magna-beauty/sliders/slide1.webp',
      sortOrder: 0
    },
    {
      title: 'رموش أنيقة وعصرية',
      subtitle: 'نظرة ساحرة',
      buttonText: 'اكتشفي المزيد',
      imagePath: '/assets/magna-beauty/sliders/slide2.webp',
      sortOrder: 1
    },
    {
      title: 'إكسسوارات مميزة',
      subtitle: 'تكمل أناقتك',
      buttonText: 'شاهدي التشكيلة',
      imagePath: '/assets/magna-beauty/sliders/slide3.webp',
      sortOrder: 2
    },
    {
      title: 'عناية فائقة بالبشرة',
      subtitle: 'إشراقة دائمة',
      buttonText: 'استكشفي',
      imagePath: '/assets/magna-beauty/sliders/slide4.webp',
      sortOrder: 3
    },
    {
      title: 'تشكيلة عصرية مميزة',
      subtitle: 'لإطلالة خلابة',
      buttonText: 'ابدئي التسوق',
      imagePath: '/assets/magna-beauty/sliders/slide5.webp',
      sortOrder: 4
    }
  ]
};

export async function fixDeltaMagnaSliders() {
  try {
    logger.info('🔄 Starting Delta & Magna sliders fix...');

    const storesWithIssues = ['delta-store', 'magna-beauty'];

    for (const storeSlug of storesWithIssues) {
      const store = await Store.findOne({ where: { slug: storeSlug } });
      
      if (!store) {
        logger.warn(`⚠️ Store '${storeSlug}' not found in database`);
        continue;
      }

      logger.info(`🗑️  Deleting old sliders for '${storeSlug}'...`);
      const deletedCount = await StoreSlider.destroy({ where: { storeId: store.id } });
      logger.info(`   Deleted ${deletedCount} old sliders`);

      const newSliders = CORRECTED_SLIDERS[storeSlug as keyof typeof CORRECTED_SLIDERS];
      
      if (!newSliders) {
        logger.warn(`⚠️ No corrected sliders defined for '${storeSlug}'`);
        continue;
      }

      logger.info(`✨ Creating ${newSliders.length} new sliders for '${storeSlug}'...`);
      
      for (const sliderData of newSliders) {
        await StoreSlider.create({
          storeId: store.id,
          title: sliderData.title,
          subtitle: sliderData.subtitle,
          buttonText: sliderData.buttonText,
          imagePath: sliderData.imagePath,
          sortOrder: sliderData.sortOrder,
          metadata: {
            isActive: true,
            fixedAt: new Date().toISOString()
          }
        });
      }

      logger.info(`✅ Successfully fixed sliders for '${storeSlug}'`);
    }

    logger.info('✅ Delta & Magna sliders fix complete!');
    return { success: true };
  } catch (error) {
    logger.error('❌ Error fixing Delta & Magna sliders:', error);
    throw error;
  }
}

// Allow running as standalone script
if (require.main === module) {
  (async () => {
    try {
      await sequelize.authenticate();
      logger.info('✅ Database connected');
      
      await fixDeltaMagnaSliders();
      
      logger.info('✅ Migration completed successfully');
      process.exit(0);
    } catch (error) {
      logger.error('❌ Migration failed:', error);
      process.exit(1);
    }
  })();
}
