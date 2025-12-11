import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
import logger from '@utils/logger';
import { isProduction } from './environment';

if (!isProduction) {
  dotenv.config();
}

const DB_DIALECT = (process.env.DB_DIALECT || 'sqlite') as 'postgres' | 'mysql' | 'sqlite';

let sequelize: Sequelize;

if (DB_DIALECT === 'postgres') {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (databaseUrl) {
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
      ssl: isProduction ? { rejectUnauthorized: false } : false,
    });
  } else {
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
      ssl: isProduction ? { rejectUnauthorized: false } : false,
    };
    
    sequelize = new Sequelize(
      process.env.DB_NAME || 'postgres',
      process.env.DB_USER || 'postgres',
      process.env.DB_PASSWORD || '',
      postgresConfig
    );
  }
} else if (DB_DIALECT === 'mysql') {
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
