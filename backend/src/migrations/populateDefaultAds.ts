import Store from '@models/Store';
import StoreAd from '@models/StoreAd';
import logger from '@utils/logger';

export const populateDefaultAds = async (): Promise<{ created: number }> => {
  const stores = await Store.findAll();
  let created = 0;

  for (const store of stores) {
    const existing = await StoreAd.findOne({ where: { storeId: store.id } });
    if (existing) {
      continue;
    }

    await StoreAd.create({
      storeId: store.id,
      templateId: 'banner_default',
      title: `مرحبا بك في متجر ${store.name}`,
      description: 'استمتع بأفضل العروض والمنتجات الحصرية',
      placement: 'banner',
      textPosition: 'center',
      textColor: '#ffffff',
      textFont: 'Cairo-SemiBold',
      mainTextSize: 'lg',
      subTextSize: 'base',
      isActive: true,
    } as any);

    created += 1;
  }

  logger.info(`✅ Default ads population complete: created=${created}`);
  return { created };
};
