import Store from '@models/Store';
import StoreSlider from '@models/StoreSlider';
import logger from '@utils/logger';

const INDEESH_SLIDERS = [
  {
    title: 'عالم انديش الفاخر',
    subtitle: 'احدث الملابس الإسلامية',
    buttonText: 'ابدأي التسوق',
    imagePath: '/assets/indeesh/sliders/1764003949480-48hujc-1.jpg',
    sortOrder: 0,
  },
  {
    title: 'تشكيلة انديش الجديدة',
    subtitle: 'تصاميم عصرية بجودة عالية',
    buttonText: 'استكشف الآن',
    imagePath: '/assets/indeesh/sliders/1764003949455-gvxg6e-7.jpg',
    sortOrder: 1,
  },
  {
    title: 'عروض انديش الخاصة',
    subtitle: 'منتجات أصلية بأسعار مميزة',
    buttonText: 'اكتشف العروض',
    imagePath: '/assets/indeesh/sliders/1764003949446-93ffbn-8.jpg',
    sortOrder: 2,
  },
  {
    title: 'أناقة انديش',
    subtitle: 'اختيارات مميزة لكل المناسبات',
    buttonText: 'تسوق الآن',
    imagePath: '/assets/indeesh/sliders/1764003949444-z43zxk-9.jpg',
    sortOrder: 3,
  },
  {
    title: 'اندیش - خصومات محدودة',
    subtitle: 'لا تفوت الفرصة',
    buttonText: 'شاهد المزيد',
    imagePath: '/assets/indeesh/sliders/1764003949431-7n5h5h-3.jpg',
    sortOrder: 4,
  },
] as const;

export const ensureIndeeshSliders = async (): Promise<{ changed: boolean; count: number } > => {
  const store = await Store.findOne({ where: { slug: 'indeesh' } });
  if (!store) {
    return { changed: false, count: 0 };
  }

  const existing = await StoreSlider.findAll({
    where: { storeId: store.id },
    order: [['sortOrder', 'ASC']],
  });

  const hasBrokenKnownPath = existing.some((s) => (s.imagePath || '').includes('khgvls'));

  if (existing.length >= 5 && !hasBrokenKnownPath) {
    return { changed: false, count: existing.length };
  }

  logger.warn(`⚠️ Rebuilding indeesh sliders (existing=${existing.length}, brokenPath=${hasBrokenKnownPath})`);

  await StoreSlider.destroy({ where: { storeId: store.id } });

  for (const slider of INDEESH_SLIDERS) {
    await StoreSlider.create({
      storeId: store.id,
      title: slider.title,
      subtitle: slider.subtitle,
      buttonText: slider.buttonText,
      imagePath: slider.imagePath,
      sortOrder: slider.sortOrder,
      metadata: { isActive: true },
    } as any);
  }

  return { changed: true, count: INDEESH_SLIDERS.length };
};
