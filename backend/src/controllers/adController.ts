import { Request, Response } from 'express';
import StoreAd from '@models/StoreAd';
import Store from '@models/Store';
import logger from '@utils/logger';

const findStoreByIdOrSlug = async (storeIdentifier: string): Promise<any> => {
  const numericId = parseInt(storeIdentifier, 10);
  
  if (!isNaN(numericId)) {
    const store = await Store.findByPk(numericId);
    if (store) {
      logger.info(`[findStoreByIdOrSlug] Found store by ID: ${numericId}`);
      return store;
    }
  }
  
  let store = await Store.findOne({
    where: { slug: storeIdentifier }
  });
  if (store) {
    logger.info(`[findStoreByIdOrSlug] Found store by slug: ${storeIdentifier} (ID: ${store.id})`);
    return store;
  }
  
  store = await Store.findOne({
    where: { name: storeIdentifier }
  });
  if (store) {
    logger.info(`[findStoreByIdOrSlug] Found store by name: ${storeIdentifier} (ID: ${store.id})`);
    return store;
  }
  
  logger.warn(`[findStoreByIdOrSlug] Store not found for identifier: ${storeIdentifier}`);
  return null;
};

export const getStoreAds = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storeId } = req.params;

    const store = await findStoreByIdOrSlug(storeId);
    if (!store) {
      res.status(404).json({ success: false, error: 'Store not found' });
      return;
    }

    const ads = await StoreAd.findAll({
      where: { storeId: store.id, isActive: true },
      order: [['createdAt', 'DESC']],
    });

    const plainAds = ads.map(ad => ad.toJSON());
    res.json({ success: true, data: plainAds });
  } catch (error) {
    logger.error('Error fetching store ads:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch ads' });
  }
};

export const createStoreAd = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storeId } = req.params;
    const { templateId, title, description, placement, imageUrl, linkUrl, textPosition, textColor, textFont, mainTextSize, subTextSize } = req.body;

    logger.info(`[createStoreAd] Creating ad for store: ${storeId}, template: ${templateId}`);

    if (!templateId || !title || !description || !placement) {
      logger.warn(`[createStoreAd] Missing required fields`);
      res.status(400).json({ success: false, error: 'Missing required fields: templateId, title, description, placement' });
      return;
    }

    const store = await findStoreByIdOrSlug(storeId);
    if (!store) {
      logger.warn(`[createStoreAd] Store not found: ${storeId}`);
      res.status(404).json({ success: false, error: 'Store not found' });
      return;
    }

    const ad = await StoreAd.create({
      storeId: store.id,
      templateId,
      title: title.slice(0, 100),
      description: description.slice(0, 1000),
      imageUrl: imageUrl || null,
      linkUrl: linkUrl || null,
      placement,
      textPosition: textPosition || 'center',
      textColor: textColor || '#ffffff',
      textFont: textFont || 'Cairo-SemiBold',
      mainTextSize: mainTextSize || 'lg',
      subTextSize: subTextSize || 'base',
      isActive: true,
    });

    const plainAd = ad.toJSON();
    logger.info(`[createStoreAd] Ad created: ${plainAd.id}`);
    res.status(201).json({ success: true, data: plainAd });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`[createStoreAd] Error: ${errorMessage}`, error);
    res.status(500).json({ success: false, error: `Failed to create ad: ${errorMessage}` });
  }
};

export const updateStoreAd = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storeId, adId } = req.params;
    const { templateId, title, description, placement, isActive, textPosition, textColor, textFont, mainTextSize, subTextSize } = req.body;

    const store = await findStoreByIdOrSlug(storeId);
    if (!store) {
      res.status(404).json({ success: false, error: 'Store not found' });
      return;
    }

    const numericAdId = parseInt(adId, 10);
    const ad = await StoreAd.findOne({
      where: { id: numericAdId, storeId: store.id },
    });

    if (!ad) {
      res.status(404).json({ success: false, error: 'Ad not found' });
      return;
    }

    await ad.update({
      ...(templateId && { templateId }),
      ...(title && { title: title.slice(0, 100) }),
      ...(description && { description: description.slice(0, 1000) }),
      ...(placement && { placement }),
      ...(textPosition && { textPosition }),
      ...(textColor && { textColor }),
      ...(textFont && { textFont }),
      ...(mainTextSize && { mainTextSize }),
      ...(subTextSize && { subTextSize }),
      ...(isActive !== undefined && { isActive }),
    });

    const plainAd = ad.toJSON();
    logger.info(`[updateStoreAd] Ad updated: ${adId}`);
    res.json({ success: true, data: plainAd });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`[updateStoreAd] Error: ${errorMessage}`, error);
    res.status(500).json({ success: false, error: `Failed to update ad: ${errorMessage}` });
  }
};

export const deleteStoreAd = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storeId, adId } = req.params;

    logger.info(`[deleteStoreAd] Deleting ad ${adId} from store ${storeId}`);

    const store = await findStoreByIdOrSlug(storeId);
    if (!store) {
      logger.warn(`[deleteStoreAd] Store not found: ${storeId}`);
      res.status(404).json({ success: false, error: 'Store not found' });
      return;
    }

    const numericAdId = parseInt(adId, 10);
    if (isNaN(numericAdId)) {
      logger.warn(`[deleteStoreAd] Invalid ad ID: ${adId}`);
      res.status(400).json({ success: false, error: 'Invalid ad ID' });
      return;
    }

    const ad = await StoreAd.findOne({
      where: { id: numericAdId, storeId: store.id },
    });

    if (!ad) {
      logger.warn(`[deleteStoreAd] Ad not found: ${adId} for store ${store.id}`);
      res.status(404).json({ success: false, error: 'Ad not found' });
      return;
    }

    await ad.destroy();

    logger.info(`[deleteStoreAd] Ad deleted successfully: ${adId}`);
    res.json({ success: true, message: 'Ad deleted successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`[deleteStoreAd] Error: ${errorMessage}`, error);
    res.status(500).json({ success: false, error: `Failed to delete ad: ${errorMessage}` });
  }
};

export const bulkDeleteStoreAds = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storeId } = req.params;
    const { adIds } = req.body;

    if (!adIds || !Array.isArray(adIds)) {
      res.status(400).json({ success: false, error: 'adIds must be an array' });
      return;
    }

    const store = await findStoreByIdOrSlug(storeId);
    if (!store) {
      res.status(404).json({ success: false, error: 'Store not found' });
      return;
    }

    const numericAdIds = adIds.map((id: string | number) => parseInt(String(id), 10));

    const deleted = await StoreAd.destroy({
      where: { storeId: store.id, id: numericAdIds },
    });

    logger.info(`[bulkDeleteStoreAds] ${deleted} ads deleted for store ${storeId}`);
    res.json({ success: true, message: `${deleted} ads deleted` });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`[bulkDeleteStoreAds] Error: ${errorMessage}`, error);
    res.status(500).json({ success: false, error: `Failed to delete ads: ${errorMessage}` });
  }
};
