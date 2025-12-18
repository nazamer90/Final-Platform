import React, { useState, useEffect } from 'react';

interface Ad {
  id: string;
  templateId: string;
  title: string;
  description: string;
  imageUrl?: string;
  linkUrl?: string;
  isActive: boolean;
  placement?: 'banner' | 'between_products';
  createdAt: string;
  views: number;
  clicks: number;
  storeId?: number;
  textPosition?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  textColor?: string;
  textFont?: string;
  mainTextSize?: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  subTextSize?: 'xs' | 'sm' | 'base';
}

interface StoreAdsProps {
  storeId?: string | number;
  className?: string;
}

const getTextPositionClass = (position?: string): string => {
  switch (position) {
    case 'top-left':
      return 'top-4 left-4 text-left';
    case 'top-center':
      return 'top-4 left-1/2 -translate-x-1/2 text-center';
    case 'top-right':
      return 'top-4 right-4 text-right';
    case 'center-left':
      return 'top-1/2 left-4 -translate-y-1/2 text-left';
    case 'center':
      return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center';
    case 'center-right':
      return 'top-1/2 right-4 -translate-y-1/2 text-right';
    case 'bottom-left':
      return 'bottom-4 left-4 text-left';
    case 'bottom-center':
      return 'bottom-4 left-1/2 -translate-x-1/2 text-center';
    case 'bottom-right':
      return 'bottom-4 right-4 text-right';
    default:
      return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center';
  }
};

const getTemplateImage = (templateId?: string): string => {
  if (!templateId) return '/AdsForms/adv1.jpg';
  return `/AdsForms/${templateId}.jpg`;
};

const getMainTextSizeClass = (size?: string): string => {
  switch (size) {
    case 'sm':
      return 'text-sm';
    case 'base':
      return 'text-base';
    case 'lg':
      return 'text-lg';
    case 'xl':
      return 'text-xl';
    case '2xl':
      return 'text-2xl';
    default:
      return 'text-lg';
  }
};

const getSubTextSizeClass = (size?: string): string => {
  switch (size) {
    case 'xs':
      return 'text-xs';
    case 'sm':
      return 'text-sm';
    case 'base':
      return 'text-base';
    default:
      return 'text-base';
  }
};

const getFontClass = (font?: string): string => {
  switch (font) {
    case 'Cairo-Light':
      return 'font-light';
    case 'Cairo-ExtraLight':
      return 'font-extralight';
    case 'Cairo-Regular':
      return 'font-normal';
    case 'Cairo-Medium':
      return 'font-medium';
    case 'Cairo-SemiBold':
      return 'font-semibold';
    case 'Cairo-Bold':
      return 'font-bold';
    case 'Cairo-ExtraBold':
      return 'font-extrabold';
    case 'Cairo-Black':
      return 'font-black';
    default:
      return 'font-semibold';
  }
};

const StoreAds: React.FC<StoreAdsProps> = ({ storeId, className = '' }) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [bannerAds, setBannerAds] = useState<Ad[]>([]);
  const [betweenProductsAds, setBetweenProductsAds] = useState<Ad[]>([]);

  useEffect(() => {
    loadAds();

    const handleAdsUpdate = (event: CustomEvent) => {
      loadAds();
    };

    window.addEventListener('storeAdsUpdated', handleAdsUpdate as EventListener);

    return () => {
      window.removeEventListener('storeAdsUpdated', handleAdsUpdate as EventListener);
    };
  }, [storeId]);

  const loadAds = async () => {
    try {
      if (!storeId) {
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/ads/store/${storeId}`);
      
      if (response.ok) {
        const result = await response.json();
        
        const adsData = Array.isArray(result.data) ? result.data : [];
        const activeAds = adsData.filter((ad: Ad) => ad.isActive === true);
        
        const bannerAds = activeAds.filter(ad => ad.placement === 'banner' || ad.placement === 'floating' || !ad.placement);
        const betweenAds = activeAds.filter(ad => ad.placement === 'between_products' || ad.placement === 'grid');
        
        setAds(activeAds);
        setBannerAds(bannerAds);
        setBetweenProductsAds(betweenAds);
        localStorage.setItem(`eshro_store_ads_${storeId}`, JSON.stringify(activeAds));
        return;
      }
    } catch (error) {
      // Error loading ads from API - will use localStorage fallback
    }

    const storageKey = `eshro_store_ads_${storeId}`;
    const savedAds = localStorage.getItem(storageKey);
    if (savedAds) {
      try {
        const parsedAds = JSON.parse(savedAds);
        const activeAds = parsedAds.filter((ad: Ad) => ad.isActive === true);
        setAds(activeAds);
        setBannerAds(activeAds.filter(ad => ad.placement === 'banner' || ad.placement === 'floating' || !ad.placement));
        setBetweenProductsAds(activeAds.filter(ad => ad.placement === 'between_products' || ad.placement === 'grid'));
      } catch (error) {
        // Error parsing saved ads
      }
    }
  };

  const handleAdClick = (ad: Ad) => {
    if (ad.linkUrl) {
      if (ad.linkUrl.startsWith('http')) {
        window.open(ad.linkUrl, '_blank');
      } else {
        window.location.href = ad.linkUrl;
      }
    }
  };

  if (bannerAds.length === 0 && betweenProductsAds.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {bannerAds.length > 0 && (
        <div className="space-y-4">
          {bannerAds.map((ad, index) => {
            const adKey = ad.id || `banner-ad-${index}-${ad.title}`;
            const textColor = ad.textColor || '#ffffff';
            const positionClass = getTextPositionClass(ad.textPosition);
            const mainSizeClass = getMainTextSizeClass(ad.mainTextSize);
            const subSizeClass = getSubTextSizeClass(ad.subTextSize);
            const fontClass = getFontClass(ad.textFont);
            const backgroundSrc = ad.imageUrl || getTemplateImage(ad.templateId);

            return (
              <div
                key={adKey}
                className="relative w-full h-40 md:h-48 lg:h-56 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleAdClick(ad)}
              >
                <img
                  src={backgroundSrc}
                  alt={ad.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />

                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all" />
                <div className={`absolute ${positionClass} p-4 max-w-[90%]`} style={{ color: textColor }}>
                  <h3 className={`${fontClass} ${mainSizeClass} drop-shadow-lg mb-1 leading-tight`}>{ad.title}</h3>
                  {ad.description && (
                    <p className={`${fontClass} ${subSizeClass} opacity-90 line-clamp-2 drop-shadow-lg leading-snug`}>{ad.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {betweenProductsAds.length > 0 && (
        <div className="space-y-4" data-placement="between-products">
          {betweenProductsAds.map((ad, index) => {
            const adKey = ad.id || `between-ad-${index}-${ad.title}`;
            const textColor = ad.textColor || '#ffffff';
            const positionClass = getTextPositionClass(ad.textPosition);
            const mainSizeClass = getMainTextSizeClass(ad.mainTextSize);
            const subSizeClass = getSubTextSizeClass(ad.subTextSize);
            const fontClass = getFontClass(ad.textFont);
            const backgroundSrc = ad.imageUrl || getTemplateImage(ad.templateId);

            return (
              <div
                key={adKey}
                className="relative overflow-hidden rounded-2xl border-none shadow-2xl group w-full cursor-pointer"
                style={{ aspectRatio: '1920 / 450', minHeight: '220px' }}
                onClick={() => handleAdClick(ad)}
              >
                <img
                  src={backgroundSrc}
                  alt={ad.title}
                  className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className={`absolute ${positionClass} p-4 max-w-[90%]`} style={{ color: textColor }}>
                  <h3 className={`${fontClass} ${mainSizeClass} drop-shadow-lg mb-1 leading-tight`}>{ad.title}</h3>
                  {ad.description && (
                    <p className={`${fontClass} ${subSizeClass} drop-shadow-lg opacity-90 line-clamp-2 leading-snug`}>{ad.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StoreAds;
