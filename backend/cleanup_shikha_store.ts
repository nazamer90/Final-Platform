/**
 * Script to manually clean up shikha store data from database
 */
import sequelize from './src/config/database';
import Store from './src/models/Store';
import User from './src/models/User';
import StoreSlider from './src/models/StoreSlider';
import StoreAd from './src/models/StoreAd';
import UnavailableNotification from './src/models/UnavailableNotification';
import { Op } from 'sequelize';
import logger from './src/utils/logger';

const STORE_SLUG = 'shikha';

async function cleanupShikhaStore() {
  try {
    console.log(`\n🧹 Starting cleanup for store: ${STORE_SLUG}\n`);

    await sequelize.authenticate();
    console.log('✅ Database connection established\n');

    const store = await Store.findOne({ where: { slug: STORE_SLUG } });
    
    if (!store) {
      console.log(`⚠️ No store record found for slug: ${STORE_SLUG}`);
      console.log('This is expected if the store creation failed during database transaction.\n');
    } else {
      console.log(`📍 Found store record:`, {
        id: store.id,
        name: store.name,
        slug: store.slug,
        merchantId: store.merchantId
      });

      console.log(`\n🗑️ Deleting related records...\n`);

      const deletedSliders = await StoreSlider.destroy({ 
        where: { storeId: store.id } 
      });
      console.log(`  ✅ Deleted ${deletedSliders} slider(s)`);

      if (sequelize.models.Product) {
        const deletedProducts = await sequelize.models.Product.destroy({ 
          where: { storeId: store.id } 
        });
        console.log(`  ✅ Deleted ${deletedProducts} product(s)`);
      }

      const deletedAds = await StoreAd.destroy({ 
        where: { storeId: store.id } 
      });
      console.log(`  ✅ Deleted ${deletedAds} ad(s)`);

      const deletedNotifications = await UnavailableNotification.destroy({ 
        where: { 
          [Op.or]: [
            { storeSlug: STORE_SLUG }, 
            { storeId: store.id }
          ] 
        } 
      });
      console.log(`  ✅ Deleted ${deletedNotifications} notification(s)`);

      const deletedStore = await Store.destroy({ 
        where: { id: store.id } 
      });
      console.log(`  ✅ Deleted ${deletedStore} store record(s)\n`);

      if (store.merchantId) {
        const merchant = await User.findByPk(store.merchantId);
        if (merchant && merchant.role === 'merchant') {
          await merchant.destroy();
          console.log(`  ✅ Deleted merchant user (ID: ${store.merchantId})\n`);
        }
      }
    }

    console.log(`\n🎉 Cleanup completed successfully for ${STORE_SLUG}\n`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
}

cleanupShikhaStore();
