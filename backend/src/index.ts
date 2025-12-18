import app from './app';
import sequelize, { testConnection, syncDatabase } from '@config/database';
import { initializeModels } from '@models/index';
import config from '@config/environment';
import logger from '@utils/logger';
import { populateSliders } from '@migrations/populateSliders';
import { fixSliderPaths } from '@migrations/fixSliderPaths';
import { addStoreAdColumns } from '@migrations/addStoreAdColumns';
import runMigrations from '@database/migrate';
import seedDatabase from '@database/seed';

const PORT = config.port;

const initializeDatabase = async (): Promise<void> => {
  try {
    logger.info('🔄 Initializing database models...');
    initializeModels();

    logger.info('🔗 Testing database connection...');
    let dbConnected = false;
    try {
      dbConnected = await testConnection();
      if (!dbConnected) {
        logger.warn('⚠️ Database connection failed, continuing without database');
        return;
      }
    } catch (dbError) {
      logger.warn('⚠️ Database error:', dbError);
      return;
    }

    if (dbConnected) {
      logger.info('📊 Synchronizing database schema...');
      try {
        await syncDatabase(false);
      } catch (error) {
        logger.error('❌ Database sync failed, aborting initialization:', error);
        return;
      }

          logger.info('🌱 Seeding database with initial data...');
          if (process.env.SEED_DB === 'true') {
         try {
        await seedDatabase();
         } catch (error) {
        logger.warn('⚠️ Database seeding failed, continuing:', error);
         }
          } else {
         logger.info('ℹ️ Skipping database seeding');
          }

                logger.info('🌱 Seeding database with initial data...');
                if (process.env.SEED_DB === 'true') {
             try {
          await seedDatabase();
             } catch (error) {
          logger.warn('⚠️ Database seeding failed, continuing:', error);
             }
                } else {
            logger.info('ℹ️ Skipping database seeding');
               }

      logger.info('📦 Fixing slider paths and populating default sliders for existing stores...');
      try {
        await fixSliderPaths();
        await populateSliders();
      } catch (error) {
        logger.warn('⚠️ Slider migration failed, continuing:', error);
      }

      logger.info('📦 Adding missing store_ads table columns...');
      try {
        await addStoreAdColumns();
      } catch (error) {
        logger.warn('⚠️ Store ads columns migration failed, continuing:', error);
      }
    }
  } catch (error) {
    logger.error('❌ Database initialization error:', error);
  }
};

const startServer = (): void => {
  try {
    const server = app.listen(PORT, '0.0.0.0', (): void => {
      logger.info('🚀 Starting EISHRO Backend Server...');
      logger.info(`📡 Environment: ${config.environment}`);
      logger.info(`🔌 Port: ${PORT}`);
      logger.info(`✅ Server is running on http://0.0.0.0:${PORT}`);
      logger.info(`🏥 Health check: http://localhost:${PORT}/health`);
      logger.info(`📚 API prefix: ${config.apiPrefix}`);
    });

    server.requestTimeout = 600000;
    server.headersTimeout = 600000;
    server.keepAliveTimeout = 65000;

    process.on('unhandledRejection', (reason: any, promise: Promise<any>): void => {
      logger.error('🔥 Unhandled Rejection at:', promise, 'reason:', reason);
    });

    process.on('uncaughtException', (error: Error): void => {
      logger.error('🔥 Uncaught Exception:', error);
      process.exit(1);
    });

    process.on('SIGTERM', async (): Promise<void> => {
      logger.info('SIGTERM received, shutting down gracefully...');
      server.close(async (): Promise<void> => {
        await sequelize.close();
        logger.info('✅ Server shut down successfully');
        process.exit(0);
      });
    });

    initializeDatabase();
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

if (!process.env.VERCEL) {
  startServer();
}

export default app;
