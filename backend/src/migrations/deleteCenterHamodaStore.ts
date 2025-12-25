import { QueryInterface } from 'sequelize';
import { Op } from 'sequelize';
import logger from '../utils/logger';

/**
 * Migration to delete "center hamoda" store and all related data
 * This will run automatically on deployment
 */

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const storeSlug = 'centerhamoda';
    
    logger.info(`🗑️  Migration: Deleting store "${storeSlug}"...`);
    
    try {
      // Start a transaction
      const transaction = await queryInterface.sequelize.transaction();
      
      try {
        // Get store info
        const stores = await queryInterface.sequelize.query(
          `SELECT id, merchant_id FROM stores WHERE slug = :slug`,
          {
            replacements: { slug: storeSlug },
            type: queryInterface.sequelize.QueryTypes.SELECT,
            transaction
          }
        ) as any[];
        
        if (stores.length === 0) {
          logger.info(`ℹ️  Store "${storeSlug}" not found, skipping...`);
          await transaction.commit();
          return;
        }
        
        const store = stores[0];
        const storeId = store.id;
        const merchantId = store.merchant_id;
        
        logger.info(`Found store: id=${storeId}, merchant_id=${merchantId}`);
        
        // Delete in correct order (respecting foreign keys)
        
        // 1. Delete product_images
        const deletedProductImages = await queryInterface.sequelize.query(
          `DELETE FROM product_images 
           WHERE product_id IN (SELECT id FROM products WHERE store_id = :storeId)`,
          {
            replacements: { storeId },
            type: queryInterface.sequelize.QueryTypes.DELETE,
            transaction
          }
        );
        logger.info(`Deleted ${deletedProductImages} product images`);
        
        // 2. Delete products
        const deletedProducts = await queryInterface.sequelize.query(
          `DELETE FROM products WHERE store_id = :storeId`,
          {
            replacements: { storeId },
            type: queryInterface.sequelize.QueryTypes.DELETE,
            transaction
          }
        );
        logger.info(`Deleted ${deletedProducts} products`);
        
        // 3. Delete store_sliders
        const deletedSliders = await queryInterface.sequelize.query(
          `DELETE FROM store_sliders WHERE store_id = :storeId`,
          {
            replacements: { storeId },
            type: queryInterface.sequelize.QueryTypes.DELETE,
            transaction
          }
        );
        logger.info(`Deleted ${deletedSliders} sliders`);
        
        // 4. Delete store_ads
        const deletedAds = await queryInterface.sequelize.query(
          `DELETE FROM store_ads WHERE store_id = :storeId`,
          {
            replacements: { storeId },
            type: queryInterface.sequelize.QueryTypes.DELETE,
            transaction
          }
        );
        logger.info(`Deleted ${deletedAds} ads`);
        
        // 5. Delete unavailable_notifications
        const deletedNotifications = await queryInterface.sequelize.query(
          `DELETE FROM unavailable_notifications 
           WHERE store_slug = :storeSlug OR store_id = :storeId`,
          {
            replacements: { storeSlug, storeId },
            type: queryInterface.sequelize.QueryTypes.DELETE,
            transaction
          }
        );
        logger.info(`Deleted ${deletedNotifications} notifications`);
        
        // 6. Delete users associated with the store
        const deletedUsers = await queryInterface.sequelize.query(
          `DELETE FROM users 
           WHERE store_slug = :storeSlug OR id = :merchantId`,
          {
            replacements: { storeSlug, merchantId },
            type: queryInterface.sequelize.QueryTypes.DELETE,
            transaction
          }
        );
        logger.info(`Deleted ${deletedUsers} users`);
        
        // 7. Delete the store itself
        const deletedStores = await queryInterface.sequelize.query(
          `DELETE FROM stores WHERE id = :storeId`,
          {
            replacements: { storeId },
            type: queryInterface.sequelize.QueryTypes.DELETE,
            transaction
          }
        );
        logger.info(`Deleted ${deletedStores} stores`);
        
        // Commit the transaction
        await transaction.commit();
        
        logger.info(`✅ Successfully deleted store "${storeSlug}" and all related data`);
        
      } catch (error) {
        // Rollback on error
        await transaction.rollback();
        logger.error(`❌ Error deleting store, rolled back transaction:`, error);
        throw error;
      }
      
    } catch (error) {
      logger.error(`❌ Migration failed:`, error);
      // Don't throw - allow deployment to continue even if migration fails
      // This prevents deployment failures if the store is already deleted
    }
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    // No rollback for this migration
    // Once deleted, the store cannot be restored automatically
    logger.info('ℹ️  No rollback available for store deletion');
  }
};
