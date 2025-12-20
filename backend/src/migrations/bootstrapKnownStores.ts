import Store from '@models/Store';
import User from '@models/User';
import logger from '@utils/logger';

const KNOWN_STORE_SLUGS = ['nawaem', 'sheirine', 'pretty', 'delta-store', 'magna-beauty', 'indeesh'] as const;

type KnownStoreSlug = (typeof KNOWN_STORE_SLUGS)[number];

const ensureUniqueEmail = async (baseEmail: string): Promise<string> => {
  const normalized = baseEmail.toLowerCase();
  const existing = await User.findOne({ where: { email: normalized } });
  if (!existing) {
    return normalized;
  }
  return `${normalized.split('@')[0]}-${Date.now()}@${normalized.split('@')[1]}`;
};

export const bootstrapKnownStores = async (): Promise<{ createdStores: number; createdUsers: number }> => {
  let createdStores = 0;
  let createdUsers = 0;

  for (const slug of KNOWN_STORE_SLUGS) {
    const existingStore = await Store.findOne({ where: { slug } });
    if (existingStore) {
      continue;
    }

    let merchant = await User.findOne({ where: { storeSlug: slug } });

    if (!merchant) {
      const email = await ensureUniqueEmail(`legacy+${slug}@ishro.local`);
      const password = `Legacy-${slug}-${Date.now()}`;

      merchant = await User.create({
        email,
        password,
        firstName: 'Legacy',
        lastName: 'Store',
        phone: '0000000000',
        role: 'merchant' as any,
        storeName: slug,
        storeSlug: slug,
        storeCategory: 'general',
        storeDescription: `Auto-created legacy merchant for ${slug}`,
        merchantVerified: true,
      } as any);

      createdUsers += 1;
      logger.info(`✅ Legacy merchant created for ${slug}: ${merchant.email}`);
    }

    await Store.create({
      merchantId: merchant.id,
      name: slug,
      slug,
      category: 'general',
      description: null,
      logo: null,
      banner: null,
      isActive: true,
    } as any);

    createdStores += 1;
    logger.info(`✅ Store bootstrapped: ${slug}`);
  }

  logger.info(`✅ Known stores bootstrap complete: createdStores=${createdStores}, createdUsers=${createdUsers}`);
  return { createdStores, createdUsers };
};
