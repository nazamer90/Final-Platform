import sequelize from '@config/database';
import Store from '@models/Store';
import StoreSlider from '@models/StoreSlider';
import logger from '@utils/logger';

export async function fixSliderPaths() {
  try {
    logger.info('🔄 Starting slider path fix...');

    const dialect = ((sequelize as any).options).dialect || 'sqlite';
    
    const tableExists = await checkTableExists(dialect, 'store_sliders');
    if (!tableExists) {
      logger.warn('⚠️ Table store_sliders does not exist yet, skipping slider path fix');
      return { success: true, skipped: true };
    }

    const stores = await Store.findAll({
      attributes: ['id', 'slug', 'name']
    });

    logger.info(`📦 Found ${stores.length} stores`);

    const storesWithOldPaths = ['nawaem', 'sherine', 'pretty', 'delta-store', 'magna-beauty'];

    for (const store of stores) {
      const storeSlug = store.slug?.toLowerCase() || '';

      if (storesWithOldPaths.includes(storeSlug)) {
        const sliderCount = await StoreSlider.count({ where: { storeId: store.id } });
        
        if (sliderCount > 0) {
          logger.info(`🗑️  Deleting ${sliderCount} old sliders for '${storeSlug}'`);
          await StoreSlider.destroy({ where: { storeId: store.id } });
        }
      }
    }

    logger.info('✅ Slider path fix complete! Now run populateSliders migration.');
    return { success: true };
  } catch (error) {
    logger.warn('⚠️ Slider migration failed, continuing:', error);
    return { success: false, error };
  }
}

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

if (require.main === module) {
  (async () => {
    try {
      await fixSliderPaths();
      logger.info('✅ Migration completed successfully');
      process.exit(0);
    } catch (error) {
      logger.error('❌ Migration failed:', error);
      process.exit(1);
    }
  })();
}
