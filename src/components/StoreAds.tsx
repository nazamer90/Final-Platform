import React, { useState, useEffect } from 'react';
import { getApiUrl } from '@/utils/apiConfig';
import { getProxyImageUrl } from '@/utils/assetProxyUtil';

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

export const getTextPositionClass = (position?: string): string => {
  // In RTL: items-start is Right, items-end is Left
  switch (position) {
    case 'top-left':
      return 'items-end justify-start text-left';
    case 'top-center':
      return 'items-center justify-start text-center';
    case 'top-right':
      return 'items-start justify-start text-right';
    case 'center-left':
      return 'items-end justify-center text-left';
    case 'center':
      return 'items-center justify-center text-center';
    case 'center-right':
      return 'items-start justify-center text-right';
    case 'bottom-left':
      return 'items-end justify-end text-left';
    case 'bottom-center':
      return 'items-center justify-end text-center';
    case 'bottom-right':
      return 'items-start justify-end text-right';
    default:
      return 'items-center justify-center text-center';
  }
};

export const getMainTextSizeClass = (size?: string): string => {
  switch (size) {
    case 'sm':
      return 'text-sm md:text-base';
    case 'base':
      return 'text-base md:text-lg';
    case 'lg':
      return 'text-lg md:text-3xl';
    case 'xl':
      return 'text-xl md:text-5xl';
    case '2xl':
      return 'text-2xl md:text-7xl';
    default:
      return 'text-lg md:text-2xl';
  }
};

export const getSubTextSizeClass = (size?: string): string => {
  switch (size) {
    case 'xs':
      return 'text-xs md:text-sm';
    case 'sm':
      return 'text-sm md:text-base';
    case 'base':
      return 'text-base md:text-2xl';
    default:
      return 'text-base md:text-lg';
  }
};

export const getFontClass = (font?: string): string => {
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

      const response = await fetch(`${getApiUrl()}/ads/store/${storeId}`);
      
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
            
            return (
            <div
              key={adKey}
              className="relative w-full h-40 md:h-48 lg:h-56 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => handleAdClick(ad)}
            >
              {ad.imageUrl ? (
                <img
                  src={getProxyImageUrl(ad.imageUrl)}
                  alt={ad.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200">
                  <div className="text-center text-white">
                    <div className="text-sm md:text-base font-semibold mb-2">{ad.title}</div>
                    <div className="text-xs md:text-sm opacity-90">{ad.description}</div>
                  </div>
                </div>
              )}

              {ad.imageUrl && (
                <>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all" />
                  <div className={`absolute inset-0 flex flex-col ${positionClass} p-4`} style={{ color: ad.textColor || '#ffffff', maxWidth: '100%' }}>
                    <h3 className={`${fontClass} ${mainSizeClass} mb-1 drop-shadow-lg`}>{ad.title}</h3>
                    {ad.description && (
                      <p className={`${fontClass} ${subSizeClass} opacity-90 px-2 line-clamp-2 drop-shadow-lg`}>{ad.description}</p>
                    )}
                  </div>
                </>
              )}
            </div>
            );
          })}
        </div>
      )}

      {betweenProductsAds.length > 0 && (
        <div className="space-y-4" data-placement="between-products">
          {betweenProductsAds.map((ad, index) => {
            const adKey = ad.id || `between-ad-${index}-${ad.title}`;
            const textColor = ad.textColor || '#000000';
            const mainSizeClass = getMainTextSizeClass(ad.mainTextSize);
            const subSizeClass = getSubTextSizeClass(ad.subTextSize);
            const fontClass = getFontClass(ad.textFont);
            const positionClass = getTextPositionClass(ad.textPosition);
            
            return (
            <div
              key={adKey}
              className="w-full bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer relative min-h-[120px] group"
              onClick={() => handleAdClick(ad)}
            >
              {ad.imageUrl ? (
                <div className="relative w-full h-full min-h-[250px] md:min-h-[400px]">
                  <img
                    src={getProxyImageUrl(ad.imageUrl)}
                    alt={ad.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all" />
                  <div className={`absolute inset-0 flex flex-col ${positionClass} p-6 w-full`} style={{ color: ad.textColor || '#ffffff' }}>
                    <h4 className={`${fontClass} ${mainSizeClass} mb-2 drop-shadow-md`}>{ad.title}</h4>
                    {ad.description && (
                      <p className={`${fontClass} ${subSizeClass} opacity-90 line-clamp-3 drop-shadow-md`}>{ad.description}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-center p-6 md:p-10 gap-6 min-h-[200px]">
                  <div className="flex-1 text-center md:text-right" style={{ color: ad.textColor || '#000000' }}>
                    <h4 className={`${fontClass} ${mainSizeClass} mb-3`}>{ad.title}</h4>
                    {ad.description && (
                      <p className={`${fontClass} ${subSizeClass} line-clamp-2 opacity-80`}>{ad.description}</p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <button 
                      className="px-8 py-3 bg-white border-2 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all shadow-sm"
                      style={{ color: ad.textColor || '#000000', borderColor: ad.textColor || '#000000' }}
                    >
                      اكتشف المزيد
                    </button>
                  </div>
                </div>
              )}
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StoreAds;
