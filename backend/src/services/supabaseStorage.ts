import fs from 'fs';
import { promises as fsPromises } from 'fs';

const encodeObjectPath = (objectPath: string): string => {
  return objectPath
    .split('/')
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/');
};

const getSupabaseEnv = () => {
  const url = (process.env.SUPABASE_URL || '').trim().replace(/\/+$/, '');
  const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
  const bucket = (process.env.SUPABASE_STORAGE_BUCKET || 'ishro-assets').trim();

  return { url, serviceRoleKey, bucket };
};

export const isSupabasePublicReadEnabled = (): boolean => {
  const { url, bucket } = getSupabaseEnv();
  return Boolean(url && bucket);
};

export const isSupabaseStorageEnabled = (): boolean => {
  const { url, serviceRoleKey, bucket } = getSupabaseEnv();
  return Boolean(url && serviceRoleKey && bucket);
};

export const getSupabasePublicUrlForObject = (objectPath: string): string => {
  const { url, bucket } = getSupabaseEnv();
  const encoded = encodeObjectPath(objectPath);
  return `${url}/storage/v1/object/public/${bucket}/${encoded}`;
};

export const uploadFileToSupabaseStorage = async (params: {
  objectPath: string;
  localFilePath: string;
  contentType?: string;
}): Promise<{ publicUrl: string } | null> => {
  const { url, serviceRoleKey, bucket } = getSupabaseEnv();
  if (!url || !serviceRoleKey || !bucket) {
    return null;
  }

  const { objectPath, localFilePath, contentType } = params;
  if (!objectPath || !localFilePath) {
    return null;
  }

  if (!fs.existsSync(localFilePath)) {
    throw new Error(`Local file not found: ${localFilePath}`);
  }

  const encoded = encodeObjectPath(objectPath);
  const endpoint = `${url}/storage/v1/object/${bucket}/${encoded}`;

  const body = await fsPromises.readFile(localFilePath);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${serviceRoleKey}`,
      apikey: serviceRoleKey,
      'x-upsert': 'true',
      'content-type': contentType || 'application/octet-stream',
    },
    body,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Supabase upload failed (${response.status}): ${text}`);
  }

  return { publicUrl: getSupabasePublicUrlForObject(objectPath) };
};

export const uploadJsonToSupabaseStorage = async (params: {
  objectPath: string;
  json: any;
}): Promise<{ publicUrl: string } | null> => {
  const { url, serviceRoleKey, bucket } = getSupabaseEnv();
  if (!url || !serviceRoleKey || !bucket) {
    return null;
  }

  const encoded = encodeObjectPath(params.objectPath);
  const endpoint = `${url}/storage/v1/object/${bucket}/${encoded}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${serviceRoleKey}`,
      apikey: serviceRoleKey,
      'x-upsert': 'true',
      'content-type': 'application/json',
    },
    body: JSON.stringify(params.json),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Supabase JSON upload failed (${response.status}): ${text}`);
  }

  return { publicUrl: getSupabasePublicUrlForObject(params.objectPath) };
};

export const fetchPublicStoreJsonFromSupabase = async (storeSlug: string): Promise<any | null> => {
  const { url, bucket } = getSupabaseEnv();
  if (!url || !bucket) {
    return null;
  }

  const objectPath = `stores/${storeSlug}/store.json`;
  const publicUrl = getSupabasePublicUrlForObject(objectPath);

  const response = await fetch(publicUrl, { method: 'GET' }).catch(() => null);
  if (!response || !response.ok) {
    return null;
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
};
