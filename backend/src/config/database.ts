import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
import logger from '@utils/logger';
import { isProduction } from './environment';

if (!isProduction) {
  dotenv.config();
}

const hasDatabaseUrl = !!process.env.DATABASE_URL;
let DB_DIALECT: 'postgres' | 'mysql' | 'sqlite';

if (hasDatabaseUrl) {
  DB_DIALECT = 'postgres';
  logger.info('✅ DATABASE_URL detected: using postgres');
} else {
  DB_DIALECT = (process.env.DB_DIALECT || 'sqlite') as 'postgres' | 'mysql' | 'sqlite';
  logger.info(`ℹ️ Using dialect from env: ${DB_DIALECT}`);
}

let sequelize: Sequelize;

if (DB_DIALECT === 'postgres') {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (databaseUrl) {
    logger.info('🔌 Connecting to Postgres via DATABASE_URL');
    sequelize = new Sequelize(databaseUrl, {
      dialect: 'postgres',
      logging: process.env.DB_LOGGING === 'true' ? console.log : false,
      define: {
        timestamps: true,
        underscored: false,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      dialectOptions: isProduction ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      } : undefined,
    });
  } else {
    logger.info('🔌 Connecting to Postgres via individual env variables');
    const postgresConfig: any = {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      dialect: 'postgres',
      logging: process.env.DB_LOGGING === 'true' ? console.log : false,
      define: {
        timestamps: true,
        underscored: false,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    };
    
    if (isProduction) {
      postgresConfig.dialectOptions = {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      };
    }
    
    sequelize = new Sequelize(
      process.env.DB_NAME || 'postgres',
      process.env.DB_USER || 'postgres',
      process.env.DB_PASSWORD || '',
      postgresConfig
    );
  }
} else if (DB_DIALECT === 'mysql') {
  logger.info('🔌 Connecting to MySQL');
  sequelize = new Sequelize(
    process.env.DB_NAME || 'eishro_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      dialect: 'mysql',
      logging: process.env.DB_LOGGING === 'true' ? console.log : false,
      define: {
        timestamps: true,
        underscored: false,
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  );
} else {
  logger.info('🔌 Connecting to SQLite');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(process.cwd(), 'database.sqlite'),
    logging: process.env.DB_LOGGING === 'true' ? console.log : false,
    define: {
      timestamps: true,
      underscored: false,
    },
  });
}

export const testConnection = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    logger.info('✅ Database connection established successfully');
    return true;
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    return false;
  }
};

export const syncDatabase = async (force = false): Promise<void> => {
  try {
    await sequelize.sync({ force });
    logger.info('✅ Database synchronized successfully');
  } catch (error) {
    logger.error('❌ Database synchronization failed:', error);
    throw error;
  }
};

export default sequelize;
