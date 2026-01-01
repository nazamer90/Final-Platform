import type { Product } from '@/data/storeProducts';
import { nawaemProducts } from '@/data/stores/nawaem/products';
import { sheirineProducts } from '@/data/stores/sheirine/products';
import { prettyProducts } from '@/data/stores/pretty/products';
import { deltaProducts } from '@/data/stores/delta-store/products';
import { magnaBeautyProducts } from '@/data/stores/magna-beauty/products';
import { indeeshProducts } from '@/data/stores/indeesh/products';

const storesProductsMap: Record<string, Product[]> = {
  'nawaem': nawaemProducts,
  'sheirine': sheirineProducts,
  'pretty': prettyProducts,
  'delta-store': deltaProducts,
  'magna-beauty': magnaBeautyProducts,
  'indeesh': indeeshProducts
};

interface StoreData {
  id: number;
  storeId: number;
  slug: string;
  name: string;
  nameAr: string;
  nameEn: string;
  description: string;
  icon: string;
  color: string;
  logo: string;
  categories: string[];
  products: Product[];
  sliderImages?: any[];
}

interface StoreIndex {
  slug: string;
  name: string;
  nameAr: string;
  nameEn: string;
  description: string;
  logo: string;
  categories: string[];
  productsCount: number;
  lastUpdated: string;
}

const cachedStores: Map<string, StoreData> = new Map();
let cachedStoreIndex: StoreIndex[] = [];
let cacheInitialized = false;

function getApiBase(): string {
  if (typeof window !== 'undefined' && (window as any).__API_BASE__) {
    return (window as any).__API_BASE__;
  }
  return import.meta.env.VITE_API_URL?.replace('/api', '') || import.meta.env.VITE_MOAMALAT_HASH_ENDPOINT || 'http://localhost:5000';
}

function persistStoreCache(slug: string, store: StoreData): void {
  if (typeof localStorage === 'undefined') {
    return;
  }
  try {
    const storePayload = {
      storeData: {
        id: store.storeId,
        storeId: store.storeId,
        storeSlug: slug,
        name: store.name,
        nameAr: store.nameAr,
        nameEn: store.nameEn,
        description: store.description,
        logo: store.logo,
        categories: store.categories,
        status: 'active'
      }
    };
    localStorage.setItem(`eshro_store_files_${slug}`, JSON.stringify(storePayload));
    localStorage.setItem(`store_products_${slug}`, JSON.stringify(store.products || []));
    localStorage.setItem(`store_sliders_${slug}`, JSON.stringify(store.sliderImages || []));
  } catch {
  }
}

async function fetchStoreFromPublicApi(slug: string): Promise<StoreData | null> {
  if (typeof fetch !== 'function') {
    return null;
  }
  const apiUrl = import.meta.env.VITE_API_URL || '/api';
  try {
    const response = await fetch(`${apiUrl}/stores/public/${encodeURIComponent(slug)}`, { cache: 'no-store' }).catch(() => null);
    if (!response?.ok) {
      return null;
    }
    const payload = await response.json().catch(() => null);
    const data = payload?.data ?? payload;
    if (!data?.store) {
      return null;
    }
    const storeInfo = data.store;
    const normalizedProducts = Array.isArray(data.products) ? data.products : [];
    const normalizedSliders = Array.isArray(data.sliders)
      ? data.sliders.map((slider: any, idx: number) => {
          const image = slider.image || slider.imageUrl || slider.imagePath || '';
          return {
            ...slider,
            id: slider.id || `slider_${idx}`,
            image,
            imageUrl: slider.imageUrl || image
          };
        })
      : [];
    const normalizedStore: StoreData = {
      id: storeInfo.id ?? storeInfo.storeId ?? 0,
      storeId: storeInfo.id ?? storeInfo.storeId ?? 0,
      slug,
      name: storeInfo.name ?? storeInfo.nameAr ?? slug,
      nameAr: storeInfo.nameAr ?? storeInfo.name ?? slug,
      nameEn: storeInfo.nameEn ?? storeInfo.name ?? slug,
      description: storeInfo.description ?? '',
      icon: storeInfo.icon || '🏪',
      color: storeInfo.color || 'from-blue-400 to-blue-600',
      logo: storeInfo.logo || '/assets/default-store.png',
      categories: Array.isArray(storeInfo.categories)
        ? storeInfo.categories
        : storeInfo.category
          ? [storeInfo.category]
          : [],
      products: normalizedProducts,
      sliderImages: normalizedSliders
    };
    cachedStores.set(slug, normalizedStore);
    persistStoreCache(slug, normalizedStore);
    return normalizedStore;
  } catch {
    return null;
  }
}

function loadStoreFromLocalStorage(slug: string): StoreData | null {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return null;
  }

  try {
    const storeFilesKey = `eshro_store_files_${slug}`;
    const storeKey = `store_${slug}`;
    
    let storeFilesData = localStorage.getItem(storeFilesKey);
    
    if (!storeFilesData) {
      const legacyStore = localStorage.getItem(storeKey);
      if (legacyStore) {
        try {
          const legacyParsed = JSON.parse(legacyStore);
          storeFilesData = JSON.stringify({ storeData: legacyParsed });
        } catch {
          return null;
        }
      } else {
        return null;
      }
    }

    const parsed = JSON.parse(storeFilesData);
    if (!parsed.storeData) {
      return null;
    }

    const storeData = parsed.storeData;
    const productsData = localStorage.getItem(`store_products_${slug}`);
    const slidersData = localStorage.getItem(`store_sliders_${slug}`);

    const finalStoreData: StoreData = {
      id: storeData.id || storeData.storeId || 0,
      storeId: storeData.storeId || storeData.id || 0,
      slug: slug,
      name: storeData.name || storeData.storeName || slug,
      nameAr: storeData.nameAr || storeData.storeName || slug,
      nameEn: storeData.nameEn || storeData.storeNameEn || slug,
      description: storeData.description || '',
      icon: storeData.icon || '🏪',
      color: storeData.color || 'from-blue-400 to-blue-600',
      logo: storeData.logo || '/assets/default-store.png',
      categories: storeData.categories || [],
      products: productsData ? JSON.parse(productsData) : storeData.products || [],
      sliderImages: slidersData ? JSON.parse(slidersData) : storeData.sliderImages || []
    };

    return finalStoreData;
  } catch (error) {
    return null;
  }
}

async function initializeCache(): Promise<void> {
  if (cacheInitialized) return;
  cachedStoreIndex = Object.keys(storesProductsMap).map(slug => ({
    slug: slug,
    name: slug,
    nameAr: slug,
    nameEn: slug,
    description: '',
    logo: '/assets/default-store.png',
    categories: [],
    productsCount: storesProductsMap[slug]?.length || 0,
    lastUpdated: new Date().toISOString()
  }));
  cacheInitialized = true;
}

export async function loadStoreBySlug(slug: string): Promise<StoreData | null> {
  if (cachedStores.has(slug)) {
    return cachedStores.get(slug) || null;
  }
  
  const products = storesProductsMap[slug];
  
  if (products && Array.isArray(products)) {
    const storeData: StoreData = {
      id: 0,
      storeId: 0,
      slug: slug,
      name: slug,
      nameAr: slug,
      nameEn: slug,
      description: '',
      icon: '🏪',
      color: 'from-blue-400 to-blue-600',
      logo: '/assets/default-store.png',
      categories: [],
      products: products,
      sliderImages: []
    };
    
    cachedStores.set(slug, storeData);
    return storeData;
  }
  
  const localStoreData = loadStoreFromLocalStorage(slug);
  if (localStoreData) {
    cachedStores.set(slug, localStoreData);
    return localStoreData;
  }

  const apiStoreData = await fetchStoreFromPublicApi(slug);
  if (apiStoreData) {
    return apiStoreData;
  }

  return null;
}

export async function getStoreProducts(slug: string): Promise<Product[]> {
  const store = await loadStoreBySlug(slug);
  return store?.products || [];
}

export async function getStoreSliderImages(slug: string): Promise<any[]> {
  const store = await loadStoreBySlug(slug);
  return store?.sliderImages || [];
}

export async function getStoreConfig(slug: string): Promise<any> {
  const store = await loadStoreBySlug(slug);
  if (!store) return null;
  
  return {
    storeId: store.storeId,
    slug: store.slug,
    name: store.name,
    nameAr: store.nameAr,
    nameEn: store.nameEn,
    description: store.description,
    icon: store.icon,
    color: store.color,
    logo: store.logo,
    categories: store.categories
  };
}

export async function getAllStoreProducts(): Promise<Product[]> {
  const allProducts: Product[] = [];
  
  Object.values(storesProductsMap).forEach(products => {
    if (Array.isArray(products)) {
      allProducts.push(...products);
    }
  });
  
  return allProducts;
}

export function clearStoreCache(): void {
  cachedStores.clear();
  cachedStoreIndex = [];
  cacheInitialized = false;
}
