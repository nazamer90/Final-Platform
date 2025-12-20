import sequelize from '@config/database';
import Store from '@models/Store';
import User from '@models/User';
import logger from '@utils/logger';

const canonicalizeStoreSlug = (value: string): string => {
  const normalized = value.toString().trim().toLowerCase().replace(/\s+/g, '-');
  const alias: Record<string, string> = {
    sherine: 'sheirine',
    sheirin: 'sheirine',
    delta: 'delta-store',
    details: 'delta-store',
    detail: 'delta-store',
    megna: 'magna-beauty',
    magna: 'magna-beauty',
    magna_beauty: 'magna-beauty',
  };
  return alias[normalized] || normalized;
};

export const backfillMerchantStores = async (): Promise<{ created: number; updated: number } > => {
  const transaction = await sequelize.transaction();
  try {
    const merchants = await User.findAll({
      where: { role: 'merchant' as any },
      transaction,
    });

    let created = 0;
    let updated = 0;

    for (const merchant of merchants) {
      const rawSlug = (merchant as any).storeSlug;
      const rawName = (merchant as any).storeName;
      const rawCategory = (merchant as any).storeCategory;
      const rawDescription = (merchant as any).storeDescription;
      const rawLogo = (merchant as any).storeLogo;

      const slug = rawSlug ? canonicalizeStoreSlug(String(rawSlug)) : '';
      if (!slug) {
        continue;
      }

      const existingBySlug = await Store.findOne({ where: { slug }, transaction });
      if (existingBySlug) {
        const patch: Record<string, unknown> = {};
        if (!existingBySlug.merchantId) patch.merchantId = merchant.id;
        if (!existingBySlug.name && rawName) patch.name = rawName;
        if (!existingBySlug.category) patch.category = rawCategory || 'general';
        if (!existingBySlug.description && rawDescription) patch.description = rawDescription;
        if (!existingBySlug.logo && rawLogo) patch.logo = rawLogo;
        if (Object.keys(patch).length > 0) {
          await existingBySlug.update(patch, { transaction });
          updated += 1;
        }
        continue;
      }

      const existingByMerchant = await Store.findOne({ where: { merchantId: merchant.id }, transaction });
      if (existingByMerchant) {
        if (existingByMerchant.slug !== slug) {
          logger.warn(`⚠️ Merchant ${merchant.email} already has store ${existingByMerchant.slug}; skipping creation for ${slug}`);
        }
        continue;
      }

      await Store.create(
        {
          merchantId: merchant.id,
          name: rawName || slug,
          slug,
          category: rawCategory || 'general',
          description: rawDescription || null,
          logo: rawLogo || null,
          banner: null,
          isActive: true,
        } as any,
        { transaction }
      );

      created += 1;
    }

    await transaction.commit();
    logger.info(`✅ Store backfill complete: created=${created}, updated=${updated}`);
    return { created, updated };
  } catch (error) {
    await transaction.rollback();
    logger.error('❌ Store backfill failed:', error);
    throw error;
  }
};
