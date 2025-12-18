import { Request, Response } from 'express';
import crypto from 'crypto';
import StoreSlider from '@models/StoreSlider';
import Store from '@models/Store';
import logger from '@utils/logger';

export const getStoreSliders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storeId } = req.params;

    let store = await Store.findByPk(storeId);
    if (!store) {
      store = await Store.findOne({
        where: { slug: storeId }
      });
    }
    if (!store) {
      store = await Store.findOne({
        where: { merchantId: storeId }
      });
    }
    if (!store) {
      res.status(404).json({ success: false, error: 'Store not found' });
      return;
    }

    const sliders = await StoreSlider.findAll({
      where: { storeId: store.id },
      order: [['sortOrder', 'ASC']],
    });

    res.json({ success: true, data: sliders.map(s => s.toJSON()) });
  } catch (error) {
    logger.error('Error fetching store sliders:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch sliders' });
  }
};

export const createStoreSlider = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storeId } = req.params;
    const { title, subtitle, buttonText, imagePath, sortOrder, metadata } = req.body;

    if (!title || !imagePath) {
      res.status(400).json({ success: false, error: 'title and imagePath are required' });
      return;
    }

    let store = await Store.findByPk(storeId);
    if (!store) {
      store = await Store.findOne({
        where: { slug: storeId }
      });
    }
    if (!store) {
      store = await Store.findOne({
        where: { merchantId: storeId }
      });
    }
    if (!store) {
      res.status(404).json({ success: false, error: 'Store not found' });
      return;
    }

    const isDataImage = typeof imagePath === 'string' && imagePath.startsWith('data:image/');
    const sliderId = isDataImage ? crypto.randomUUID() : undefined;
    const resolvedImagePath = isDataImage && sliderId ? `/api/sliders/image/${sliderId}` : imagePath;
    const resolvedMetadata = (() => {
      const base = (metadata && typeof metadata === 'object') ? metadata : {};
      if (isDataImage) {
        return { ...base, imageData: imagePath };
      }
      return Object.keys(base).length ? base : null;
    })();

    const slider = await StoreSlider.create({
      ...(sliderId ? { id: sliderId } : {}),
      storeId: store.id,
      title: title.slice(0, 255),
      subtitle: subtitle ? subtitle.slice(0, 512) : undefined,
      buttonText: buttonText ? buttonText.slice(0, 128) : undefined,
      imagePath: resolvedImagePath,
      sortOrder: sortOrder || 0,
      metadata: resolvedMetadata,
    });

    logger.info(`Slider created for store ${storeId}: ${slider.id}`);
    res.status(201).json({ success: true, data: slider });
  } catch (error) {
    logger.error('Error creating store slider:', error);
    res.status(500).json({ success: false, error: 'Failed to create slider' });
  }
};

export const updateStoreSlider = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storeId, sliderId } = req.params;
    const { title, subtitle, buttonText, imagePath, sortOrder, metadata } = req.body;

    let store = await Store.findByPk(storeId);
    if (!store) {
      store = await Store.findOne({
        where: { slug: storeId }
      });
    }
    if (!store) {
      store = await Store.findOne({
        where: { merchantId: storeId }
      });
    }
    if (!store) {
      res.status(404).json({ success: false, error: 'Store not found' });
      return;
    }

    const slider = await StoreSlider.findOne({
      where: { id: sliderId, storeId: store.id },
    });

    if (!slider) {
      res.status(404).json({ success: false, error: 'Slider not found' });
      return;
    }

    const isDataImage = typeof imagePath === 'string' && imagePath.startsWith('data:image/');
    const nextMetadataBase = (metadata !== undefined && metadata && typeof metadata === 'object')
      ? metadata
      : ((slider.metadata && typeof slider.metadata === 'object') ? slider.metadata : {});
    const nextMetadata = isDataImage ? { ...nextMetadataBase, imageData: imagePath } : nextMetadataBase;
    const nextImagePath = isDataImage ? `/api/sliders/image/${slider.id}` : imagePath;

    await slider.update({
      ...(title && { title: title.slice(0, 255) }),
      ...(subtitle !== undefined && { subtitle: subtitle ? subtitle.slice(0, 512) : null }),
      ...(buttonText !== undefined && { buttonText: buttonText ? buttonText.slice(0, 128) : null }),
      ...(imagePath && { imagePath: nextImagePath }),
      ...(sortOrder !== undefined && { sortOrder }),
      ...(metadata !== undefined || isDataImage ? { metadata: Object.keys(nextMetadata).length ? nextMetadata : null } : {}),
    });

    logger.info(`Slider updated: ${sliderId}`);
    res.json({ success: true, data: slider });
  } catch (error) {
    logger.error('Error updating store slider:', error);
    res.status(500).json({ success: false, error: 'Failed to update slider' });
  }
};

export const deleteStoreSlider = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storeId, sliderId } = req.params;

    let store = await Store.findByPk(storeId);
    if (!store) {
      store = await Store.findOne({
        where: { slug: storeId }
      });
    }
    if (!store) {
      store = await Store.findOne({
        where: { merchantId: storeId }
      });
    }
    if (!store) {
      res.status(404).json({ success: false, error: 'Store not found' });
      return;
    }

    const slider = await StoreSlider.findOne({
      where: { id: sliderId, storeId: store.id },
    });

    if (!slider) {
      res.status(404).json({ success: false, error: 'Slider not found' });
      return;
    }

    await slider.destroy();

    logger.info(`Slider deleted: ${sliderId}`);
    res.json({ success: true, message: 'Slider deleted successfully' });
  } catch (error) {
    logger.error('Error deleting store slider:', error);
    res.status(500).json({ success: false, error: 'Failed to delete slider' });
  }
};

export const bulkDeleteStoreSliders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storeId } = req.params;
    const { sliderIds } = req.body;

    if (!sliderIds || !Array.isArray(sliderIds)) {
      res.status(400).json({ success: false, error: 'sliderIds must be an array' });
      return;
    }

    let store = await Store.findByPk(storeId);
    if (!store) {
      store = await Store.findOne({
        where: { slug: storeId }
      });
    }
    if (!store) {
      store = await Store.findOne({
        where: { merchantId: storeId }
      });
    }
    if (!store) {
      res.status(404).json({ success: false, error: 'Store not found' });
      return;
    }

    const deleted = await StoreSlider.destroy({
      where: { storeId: store.id, id: sliderIds },
    });

    logger.info(`${deleted} sliders deleted for store ${storeId}`);
    res.json({ success: true, message: `${deleted} sliders deleted` });
  } catch (error) {
    logger.error('Error bulk deleting store sliders:', error);
    res.status(500).json({ success: false, error: 'Failed to delete sliders' });
  }
};

export const updateSlidersOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storeId } = req.params;
    const { sliders } = req.body;

    if (!Array.isArray(sliders)) {
      res.status(400).json({ success: false, error: 'sliders must be an array' });
      return;
    }

    let store = await Store.findByPk(storeId);
    if (!store) {
      store = await Store.findOne({
        where: { slug: storeId }
      });
    }
    if (!store) {
      store = await Store.findOne({
        where: { merchantId: storeId }
      });
    }
    if (!store) {
      res.status(404).json({ success: false, error: 'Store not found' });
      return;
    }

    for (const slider of sliders) {
      await StoreSlider.update(
        { sortOrder: slider.sortOrder },
        { where: { id: slider.id, storeId: store.id } }
      );
    }

    logger.info(`Sliders order updated for store ${storeId}`);
    res.json({ success: true, message: 'Sliders order updated successfully' });
  } catch (error) {
    logger.error('Error updating sliders order:', error);
    res.status(500).json({ success: false, error: 'Failed to update sliders order' });
  }
};

export const getSliderImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sliderId } = req.params as any;

    const slider = await StoreSlider.findByPk(sliderId);
    if (!slider) {
      res.status(404).send('Not found');
      return;
    }

    const meta: any = slider.metadata || {};
    const imageData: any = meta?.imageData;

    if (typeof imageData !== 'string' || !imageData.startsWith('data:image/')) {
      res.status(404).send('Not found');
      return;
    }

    const commaIndex = imageData.indexOf(',');
    if (commaIndex === -1) {
      res.status(400).send('Invalid image');
      return;
    }

    const header = imageData.slice(0, commaIndex);
    const base64 = imageData.slice(commaIndex + 1);
    const mimeMatch = header.match(/^data:([^;]+);base64$/);
    const contentType = mimeMatch?.[1] || 'image/png';

    const buffer = Buffer.from(base64, 'base64');
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(buffer);
  } catch (error) {
    logger.error('Error serving slider image:', error);
    res.status(500).send('Error');
  }
};

export const uploadSliderImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storeId } = req.params;

    if (!req.file) {
      res.status(400).json({ success: false, error: 'No file uploaded' });
      return;
    }

    let store = await Store.findByPk(storeId);
    if (!store) {
      store = await Store.findOne({
        where: { slug: storeId }
      });
    }
    if (!store) {
      store = await Store.findOne({
        where: { merchantId: storeId }
      });
    }
    if (!store) {
      res.status(404).json({ success: false, error: 'Store not found' });
      return;
    }

    const imagePath = `/assets/${storeId}/sliders/${req.file.filename}`;

    logger.info(`Slider image uploaded for store ${storeId}: ${req.file.filename}`);
    res.status(201).json({
      success: true,
      data: {
        filename: req.file.filename,
        imagePath: imagePath,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    logger.error('Error uploading slider image:', error);
    res.status(500).json({ success: false, error: 'Failed to upload image' });
  }
};

