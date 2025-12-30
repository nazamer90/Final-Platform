#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://wbakbuqvdbmweujkbzxn.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY is required!');
  console.log('ℹ️  Set it in environment: export SUPABASE_SERVICE_ROLE_KEY="your-key-here"');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const CORRECT_SLIDERS = {
  'delta-store': [
    { title: 'مجموعة الأوشحة الفاخرة', subtitle: 'أناقة لا تضاهى', buttonText: 'تسوقي الآن', imagePath: '/assets/delta-store/sliders/slider1.webp', sortOrder: 0, isActive: true },
    { title: 'حجاب أنيق وعصري', subtitle: 'لكل المناسبات', buttonText: 'اكتشفي المزيد', imagePath: '/assets/delta-store/sliders/slider2.webp', sortOrder: 1, isActive: true },
    { title: 'إكسسوارات حجاب مميزة', subtitle: 'لمسة جمالية', buttonText: 'شاهدي التشكيلة', imagePath: '/assets/delta-store/sliders/slider3.webp', sortOrder: 2, isActive: true },
    { title: 'ملابس نسائية أنيقة', subtitle: 'أحدث الصيحات', buttonText: 'تسوقي الآن', imagePath: '/assets/delta-store/sliders/slider4.webp', sortOrder: 3, isActive: true },
    { title: 'تشكيلة صيفية مميزة', subtitle: 'خامة مريحة', buttonText: 'ابدئي التسوق', imagePath: '/assets/delta-store/sliders/slider5.webp', sortOrder: 4, isActive: true },
    { title: 'أحدث صيحات الموضة', subtitle: 'تألقي معنا', buttonText: 'اكتشفي المجموعة', imagePath: '/assets/delta-store/sliders/slider6.webp', sortOrder: 5, isActive: true }
  ],
  'magna-beauty': [
    { title: 'مكياج عصري أنيق', subtitle: 'جمالك يستحق', buttonText: 'تسوقي الآن', imagePath: '/assets/magna-beauty/sliders/slide1.webp', sortOrder: 0, isActive: true },
    { title: 'رموش أنيقة وعصرية', subtitle: 'نظرة ساحرة', buttonText: 'اكتشفي المزيد', imagePath: '/assets/magna-beauty/sliders/slide2.webp', sortOrder: 1, isActive: true },
    { title: 'إكسسوارات مميزة', subtitle: 'تكمل أناقتك', buttonText: 'شاهدي التشكيلة', imagePath: '/assets/magna-beauty/sliders/slide3.webp', sortOrder: 2, isActive: true },
    { title: 'عناية فائقة بالبشرة', subtitle: 'إشراقة دائمة', buttonText: 'استكشفي', imagePath: '/assets/magna-beauty/sliders/slide4.webp', sortOrder: 3, isActive: true },
    { title: 'تشكيلة عصرية مميزة', subtitle: 'لإطلالة خلابة', buttonText: 'ابدئي التسوق', imagePath: '/assets/magna-beauty/sliders/slide5.webp', sortOrder: 4, isActive: true }
  ],
  'nawaem': [
    { title: 'اكتشف تشكيلة نواعم الحصرية', subtitle: 'أحدث الأزياء والعبايات الراقية', buttonText: 'تسوق الآن', imagePath: '/assets/nawaem/sliders/slider2.jpg', sortOrder: 0, isActive: true },
    { title: 'عروض حصرية من نواعم', subtitle: 'لا تفوت الفرصة - عروض محدودة', buttonText: 'شاهد العروض', imagePath: '/assets/nawaem/sliders/abaya3.jpg', sortOrder: 1, isActive: true },
    { title: 'حقائب يد فاخرة', subtitle: 'أفضل الماركات', buttonText: 'شاهد العروض', imagePath: '/assets/nawaem/sliders/bag2.jpg', sortOrder: 2, isActive: true },
    { title: 'حقائب عصرية مميزة', subtitle: 'ألوان جذابة', buttonText: 'شاهد العروض', imagePath: '/assets/nawaem/sliders/bag3-green.jpg', sortOrder: 3, isActive: true },
    { title: 'فساتين أنيقة', subtitle: 'لكل مناسبة خاصة', buttonText: 'شاهد العروض', imagePath: '/assets/nawaem/sliders/dress3.jpg', sortOrder: 4, isActive: true },
    { title: 'حقائب فخمة', subtitle: 'تصاميم راقية', buttonText: 'شاهد العروض', imagePath: '/assets/nawaem/sliders/handbag-black-1.jpg', sortOrder: 5, isActive: true },
    { title: 'مجموعة الحقائب الفاخرة', subtitle: 'أناقة لا مثيل لها', buttonText: 'شاهد العروض', imagePath: '/assets/nawaem/sliders/handbags-luxury-1.jpg', sortOrder: 6, isActive: true }
  ],
  'pretty': [
    { title: 'أناقة Pretty', subtitle: 'اكتشفي أحدث مجموعات الأزياء', buttonText: 'تسوقي الآن', imagePath: '/assets/pretty/sliders/slider10.webp', sortOrder: 0, isActive: true },
    { title: 'عروض Pretty', subtitle: 'تخفيضات كبيرة على المنتجات المختارة', buttonText: 'اعرضي الآن', imagePath: '/assets/pretty/sliders/slider11.webp', sortOrder: 1, isActive: true },
    { title: 'مجموعة جديدة من Pretty', subtitle: 'أحدث صيحات الموضة', buttonText: 'تعرفي عليها', imagePath: '/assets/pretty/sliders/slider14.webp', sortOrder: 2, isActive: true },
    { title: 'خصومات Pretty الحصرية', subtitle: 'اختاري من أفضل الأزياء', buttonText: 'استمتعي بالعروض', imagePath: '/assets/pretty/sliders/slider12.webp', sortOrder: 3, isActive: true },
    { title: 'Pretty - عالم الأناقة', subtitle: 'ملابس وإكسسوارات بجودة عالية', buttonText: 'ابدأي التسوق', imagePath: '/assets/pretty/sliders/slider13.webp', sortOrder: 4, isActive: true }
  ],
  'sherine': [
    { title: 'مجوهرات شيرين الفاخرة', subtitle: 'تألقي بأجمل المجوهرات والإكسسوارات', buttonText: 'استكشفي المجموعة', imagePath: '/assets/sherine/sliders/slider1.webp', sortOrder: 0, isActive: true },
    { title: 'عروض خاصة من شيرين', subtitle: 'أجمل المجوهرات بأسعار مميزة', buttonText: 'اطلعي على العروض', imagePath: '/assets/sherine/sliders/slider2.webp', sortOrder: 1, isActive: true },
    { title: 'أناقة وتألق من شيرين', subtitle: 'أجمل المجوهرات بأسعار مميزة', buttonText: 'اكتشف أسعارنا', imagePath: '/assets/sherine/sliders/slider3.webp', sortOrder: 2, isActive: true },
    { title: 'عروض خاصة من شيرين', subtitle: 'أجمل المجوهرات بأسعار مميزة', buttonText: 'أناقة لا مثيل لها', imagePath: '/assets/sherine/sliders/slider4.webp', sortOrder: 3, isActive: true }
  ]
};

async function fixSliders() {
  console.log('🚀 Starting direct Supabase slider fix...\n');

  try {
    // 1. Get all stores
    const { data: stores, error: storesError } = await supabase
      .from('stores')
      .select('id, slug, name')
      .in('slug', ['delta-store', 'magna-beauty', 'nawaem', 'pretty', 'sherine']);

    if (storesError) {
      console.error('❌ Error fetching stores:', storesError);
      return;
    }

    console.log(`📦 Found ${stores.length} stores:\n`);
    stores.forEach(s => console.log(`   - ${s.name} (${s.slug}) [ID: ${s.id}]`));
    console.log('');

    for (const store of stores) {
      const sliderData = CORRECT_SLIDERS[store.slug];
      
      if (!sliderData) {
        console.log(`⚠️  No slider data for '${store.slug}', skipping...`);
        continue;
      }

      console.log(`🔧 Fixing '${store.name}' (${store.slug})...`);

      // 2. Delete old sliders
      const { error: deleteError } = await supabase
        .from('store_sliders')
        .delete()
        .eq('storeId', store.id);

      if (deleteError) {
        console.error(`   ❌ Delete error:`, deleteError);
        continue;
      }

      console.log(`   🗑️  Deleted old sliders`);

      // 3. Insert new sliders
      const slidersToInsert = sliderData.map(slider => ({
        storeId: store.id,
        title: slider.title,
        subtitle: slider.subtitle,
        buttonText: slider.buttonText,
        imagePath: slider.imagePath,
        sortOrder: slider.sortOrder,
        metadata: { isActive: slider.isActive, fixedAt: new Date().toISOString() }
      }));

      const { data: inserted, error: insertError } = await supabase
        .from('store_sliders')
        .insert(slidersToInsert)
        .select();

      if (insertError) {
        console.error(`   ❌ Insert error:`, insertError);
        continue;
      }

      console.log(`   ✅ Created ${inserted.length} new sliders`);
    }

    console.log('\n✅ All sliders fixed successfully!');
    console.log('\nℹ️  Now test:');
    console.log('   - https://ishro.ly/delta-store');
    console.log('   - https://ishro.ly/magna-beauty');
    console.log('   - https://ishro.ly/nawaem');
    console.log('   - https://ishro.ly/pretty');
    console.log('   - https://ishro.ly/sheirine');

  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
}

// Run the fix
fixSliders().catch(console.error);
