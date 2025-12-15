import sequelize from '@config/database';
import logger from '@utils/logger';

export async function addStoreAdColumns() {
  try {
    logger.info('🔄 Starting migration: adding missing columns to store_ads table...');

    const dialect = ((sequelize as any).options).dialect;

    if (dialect === 'sqlite') {
      await addStoreAdColumnsSQLite();
    } else if (dialect === 'mysql') {
      await addStoreAdColumnsMySQL();
    } else if (dialect === 'postgres') {
      await addStoreAdColumnsPostgres();
    } else {
      throw new Error(`Unsupported database dialect: ${dialect}`);
    }

    logger.info('✅ Migration completed: store_ads table columns added successfully');
    return { success: true };
  } catch (error) {
    logger.error('❌ Error during store_ads migration:', error);
    throw error;
  }
}

async function addStoreAdColumnsMySQL(): Promise<void> {
  const columns = [
    { name: 'text_position' },
    { name: 'text_color' },
    { name: 'text_font' },
    { name: 'main_text_size' },
    { name: 'sub_text_size' },
  ];

  for (const column of columns) {
    try {
      await sequelize.query(`
        ALTER TABLE store_ads
        ADD COLUMN IF NOT EXISTS ${column.name} VARCHAR(50) DEFAULT NULL;
      `);
      logger.info(`✅ Column ${column.name} added to store_ads table (or already exists)`);
    } catch (error) {
      logger.warn(`⚠️ Failed to add column ${column.name}: ${error}`);
    }
  }

  try {
    await sequelize.query(`
      ALTER TABLE store_ads
      MODIFY COLUMN text_position ENUM('top-left', 'top-center', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right') DEFAULT 'center';
    `);
    logger.info('✅ text_position column type updated');
  } catch (error) {
    logger.warn('⚠️ Failed to modify text_position type:', error);
  }

  try {
    await sequelize.query(`
      ALTER TABLE store_ads
      MODIFY COLUMN text_color VARCHAR(7) DEFAULT '#ffffff';
    `);
    logger.info('✅ text_color column updated');
  } catch (error) {
    logger.warn('⚠️ Failed to modify text_color:', error);
  }

  try {
    await sequelize.query(`
      ALTER TABLE store_ads
      MODIFY COLUMN text_font VARCHAR(50) DEFAULT 'Cairo-SemiBold';
    `);
    logger.info('✅ text_font column updated');
  } catch (error) {
    logger.warn('⚠️ Failed to modify text_font:', error);
  }

  try {
    await sequelize.query(`
      ALTER TABLE store_ads
      MODIFY COLUMN main_text_size ENUM('sm', 'base', 'lg', 'xl', '2xl') DEFAULT 'lg';
    `);
    logger.info('✅ main_text_size column type updated');
  } catch (error) {
    logger.warn('⚠️ Failed to modify main_text_size type:', error);
  }

  try {
    await sequelize.query(`
      ALTER TABLE store_ads
      MODIFY COLUMN sub_text_size ENUM('xs', 'sm', 'base') DEFAULT 'base';
    `);
    logger.info('✅ sub_text_size column type updated');
  } catch (error) {
    logger.warn('⚠️ Failed to modify sub_text_size type:', error);
  }
}

async function addStoreAdColumnsSQLite(): Promise<void> {
  const columnsToAdd = [
    { name: 'text_position', definition: "TEXT DEFAULT 'center'" },
    { name: 'text_color', definition: "VARCHAR(7) DEFAULT '#ffffff'" },
    { name: 'text_font', definition: "VARCHAR(50) DEFAULT 'Cairo-SemiBold'" },
    { name: 'main_text_size', definition: "TEXT DEFAULT 'lg'" },
    { name: 'sub_text_size', definition: "TEXT DEFAULT 'base'" },
  ];

  for (const column of columnsToAdd) {
    try {
      await sequelize.query(`
        ALTER TABLE store_ads
        ADD COLUMN ${column.name} ${column.definition};
      `);
      logger.info(`✅ Column ${column.name} added to store_ads table`);
    } catch (error: any) {
      if (error.message && error.message.includes('duplicate column')) {
        logger.info(`ℹ️ Column ${column.name} already exists in store_ads table`);
      } else {
        logger.warn(`⚠️ Error adding column ${column.name}: ${error.message}`);
      }
    }
  }
}

async function addStoreAdColumnsPostgres(): Promise<void> {
  const dialect = ((sequelize as any).options).dialect || 'postgres';
  const tableExists = await checkTableExists(dialect, 'store_ads');
  
  if (!tableExists) {
    logger.warn('⚠️ Table store_ads does not exist yet, skipping column additions');
    return;
  }

  const columnsToAdd = [
    { name: 'text_position', definition: "TEXT DEFAULT 'center'" },
    { name: 'text_color', definition: "VARCHAR(7) DEFAULT '#ffffff'" },
    { name: 'text_font', definition: "VARCHAR(50) DEFAULT 'Cairo-SemiBold'" },
    { name: 'main_text_size', definition: "TEXT DEFAULT 'lg'" },
    { name: 'sub_text_size', definition: "TEXT DEFAULT 'base'" },
  ];

  for (const col of columnsToAdd) {
    try {
      await sequelize.query(`
        ALTER TABLE store_ads
        ADD COLUMN IF NOT EXISTS ${col.name} ${col.definition};
      `);
      logger.info(`✅ Column ${col.name} added to store_ads table (or already exists)`);
    } catch (error) {
      logger.warn(`⚠️ Failed to add column ${col.name}: ${error}`);
    }
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
      await addStoreAdColumns();
      logger.info('✅ Migration completed successfully');
      process.exit(0);
    } catch (error) {
      logger.error('❌ Migration failed:', error);
      process.exit(1);
    }
  })();
}
