
import sequelize from './src/config/database';
import Store from './src/models/Store';
import User from './src/models/User';
import { Op } from 'sequelize';

async function cleanupStore() {
  try {
    await sequelize.authenticate();
    console.log('Connection established.');

    const targetSlug = 'center-hamoda';
    const targetName = 'Center Hamoda'; // Or Arabic name if used

    // 1. Find the store
    const store = await Store.findOne({
      where: {
        [Op.or]: [
            { slug: targetSlug },
            { slug: 'hamoda-center' },
            { name: { [Op.like]: '%hamoda%' } }
        ]
      }
    });

    if (store) {
      console.log(`Found store: ${store.name} (${store.slug}) - ID: ${store.id}`);
      
      // 2. Delete Store (Cascade should handle related items, but let's be safe)
      await Store.destroy({ where: { id: store.id } });
      console.log('Store deleted.');

      // 3. Find and Delete Merchant User if created solely for this store
      // This is tricky, usually we check if user has other stores. 
      // For now, let's just log if we find a user associated.
      if (store.merchantId) {
          const user = await User.findByPk(store.merchantId);
          if (user) {
              console.log(`Associated Merchant User found: ${user.email} (ID: ${user.id}).`);
              console.log('Deleting merchant user to allow clean recreate...');
              await User.destroy({ where: { id: user.id } });
              console.log('Merchant user deleted.');
          }
      }

    } else {
      console.log('Store not found in database.');
    }

  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    await sequelize.close();
  }
}

cleanupStore();
