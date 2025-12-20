import { Response, NextFunction } from 'express';
import { AuthRequest, UserRole } from '@shared-types/index';
import User from '@models/User';
import Store from '@models/Store';
import { hashPassword, comparePassword, validatePasswordStrength } from '@utils/password';
import { generateToken, generateRefreshToken, verifyRefreshToken } from '@utils/jwt';
import { sendSuccess, sendCreated, sendError, sendUnauthorized } from '@utils/response';
import { generateUUID, slugify, validateEmail } from '@utils/helpers';
import logger from '@utils/logger';
import storeAutoPopulateService from '@services/storeAutoPopulateService';
import StoreSlider from '@models/StoreSlider';
import StoreAd from '@models/StoreAd';

export const register = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, firstName, lastName, phone, role = UserRole.CUSTOMER, storeName, storeCategory, storeDescription, storeSlug: requestedStoreSlug, subdomain } = req.body as any;

    if (!validateEmail(email)) {
      sendError(res, 'Invalid email format', 400, 'INVALID_EMAIL');
      return;
    }

    const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
    if (existingUser) {
      sendError(res, 'Email already registered', 409, 'EMAIL_EXISTS');
      return;
    }

    const passwordStrength = validatePasswordStrength(password);
    if (!passwordStrength.valid) {
      sendError(res, 'Password does not meet security requirements', 400, 'WEAK_PASSWORD', {
        requirements: passwordStrength.errors,
      });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const userId = generateUUID();
    let storeSlug: string | undefined;

    if (role === UserRole.MERCHANT) {
      const rawRequested = (requestedStoreSlug || subdomain || storeName || '').toString().trim();
      const normalizedRequested = rawRequested ? slugify(rawRequested) : '';
      const normalizedFromName = storeName ? slugify(storeName) : '';
      storeSlug = normalizedRequested || normalizedFromName || `store-${Date.now()}`;

      const existingUserSlug = await User.findOne({ where: { storeSlug } });
      const existingStoreSlug = await Store.findOne({ where: { slug: storeSlug } });
      if (existingUserSlug || existingStoreSlug) {
        storeSlug = `${storeSlug}-${Date.now()}`;
      }
    }

    const newUser = await User.create({
      id: userId,
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone,
      role,
      storeName: storeName?.trim(),
      storeSlug,
      storeCategory,
      storeDescription,
      merchantVerified: false,
    });

    // Create store and populate with categories/products for merchants
    if (role === UserRole.MERCHANT && storeName && storeCategory && storeSlug) {
      try {
        const store = await Store.create({
          merchantId: userId,
          name: storeName.trim(),
          slug: storeSlug,
          category: storeCategory,
          description: storeDescription,
          isActive: true,
        });

        // Auto-populate store with categories and products
        await storeAutoPopulateService.populateStore(store.id);

        // Seed minimal defaults so merchant dashboard works for every new store
        const existingSliderCount = await StoreSlider.count({ where: { storeId: store.id } });
        if (existingSliderCount === 0) {
          await StoreSlider.bulkCreate([
            {
              storeId: store.id,
              title: `مرحباً بك في متجر ${store.name}`,
              subtitle: 'اكتشف أحدث المنتجات والعروض',
              buttonText: 'تسوق الآن',
              imagePath: '/assets/default-slider.png',
              sortOrder: 0,
              metadata: { isActive: true },
            },
            {
              storeId: store.id,
              title: `عروض خاصة من ${store.name}`,
              subtitle: 'لا تفوت الفرصة',
              buttonText: 'شاهد العروض',
              imagePath: '/assets/default-slider.png',
              sortOrder: 1,
              metadata: { isActive: true },
            },
          ] as any);
        }

        const existingAdCount = await StoreAd.count({ where: { storeId: store.id } });
        if (existingAdCount === 0) {
          await StoreAd.create({
            storeId: store.id,
            templateId: 'banner_default',
            title: `مرحبا بك في متجر ${store.name}`,
            description: 'استمتع بأفضل العروض والمنتجات الحصرية',
            placement: 'banner',
            textPosition: 'center',
            textColor: '#ffffff',
            textFont: 'Cairo-SemiBold',
            mainTextSize: 'lg',
            subTextSize: 'base',
            isActive: true,
          } as any);
        }

        logger.info(`Store created, populated, and seeded for merchant: ${email}`);
      } catch (storeError) {
        logger.error('Error creating/populating store:', storeError);
        // Don't fail registration if store creation fails
      }
    }

    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });
    const refreshToken = generateRefreshToken(newUser.id);

    logger.info(`User registered: ${email} (${role})`);

    const userData = {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phone: newUser.phone,
      role: newUser.role,
      ...(role === UserRole.MERCHANT && {
        storeName: newUser.storeName,
        storeSlug: newUser.storeSlug,
        storeCategory: newUser.storeCategory,
      }),
    };

    sendCreated(res, {
      user: userData,
      token,
      refreshToken,
    });
  } catch (error) {
    logger.error('Registration error:', error);
    next(error);
  }
};

export const login = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      sendUnauthorized(res, 'Invalid email or password');
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      sendUnauthorized(res, 'Invalid email or password');
      return;
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = generateRefreshToken(user.id);

    await user.update({ lastLogin: new Date() });

    logger.info(`User logged in: ${email}`);

    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
      ...(user.role === UserRole.MERCHANT && {
        storeName: user.storeName,
        storeSlug: user.storeSlug,
        storeCategory: user.storeCategory,
        merchantVerified: user.merchantVerified,
      }),
    };

    sendSuccess(
      res,
      {
        user: userData,
        token,
        refreshToken,
      },
      200,
      'Login successful'
    );
  } catch (error) {
    logger.error('Login error:', error);
    next(error);
  }
};

export const refreshToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken: tokenFromBody } = req.body;

    if (!tokenFromBody) {
      sendUnauthorized(res, 'Refresh token is required');
      return;
    }

    const decoded = verifyRefreshToken(tokenFromBody);
    if (!decoded) {
      sendUnauthorized(res, 'Invalid or expired refresh token');
      return;
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      sendUnauthorized(res, 'User not found');
      return;
    }

    const newAccessToken = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const newRefreshToken = generateRefreshToken(user.id);

    logger.info(`Token refreshed for user: ${user.email}`);

    sendSuccess(res, {
      token: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    logger.error('Token refresh error:', error);
    next(error);
  }
};

export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      sendUnauthorized(res, 'User not authenticated');
      return;
    }

    const user = await User.findByPk(req.user.id, {
      attributes: {
        exclude: ['password'],
      },
    });

    if (!user) {
      sendError(res, 'User not found', 404, 'USER_NOT_FOUND');
      return;
    }

    sendSuccess(res, user);
  } catch (error) {
    logger.error('Get profile error:', error);
    next(error);
  }
};

export const logout = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      sendUnauthorized(res, 'User not authenticated');
      return;
    }

    logger.info(`User logged out: ${req.user.email}`);
    sendSuccess(res, null, 200, 'Logged out successfully');
  } catch (error) {
    logger.error('Logout error:', error);
    next(error);
  }
};
