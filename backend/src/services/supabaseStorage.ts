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

console.log('Supabase env:', {
  url: process.env.SUPABASE_URL,
  bucket: process.env.SUPABASE_STORAGE_BUCKET,
  hasServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
});

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

export const listSupabaseObjects = async (params: {
  prefix: string;
  limit?: number;
  offset?: number;
}): Promise<Array<{ name?: string }> | null> => {
  const { url, serviceRoleKey, bucket } = getSupabaseEnv();
  if (!url || !serviceRoleKey || !bucket) {
    return null;
  }

  const prefix = (params.prefix || '').replace(/^\/+/, '');
  const limit = typeof params.limit === 'number' ? params.limit : 1000;
  const offset = typeof params.offset === 'number' ? params.offset : 0;

  const endpoint = `${url}/storage/v1/object/list/${bucket}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${serviceRoleKey}`,
      apikey: serviceRoleKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      prefix,
      limit,
      offset,
      sortBy: { column: 'name', order: 'asc' },
    }),
  }).catch(() => null);

  if (!response || !response.ok) {
    const text = await response?.text().catch(() => '');
    throw new Error(`Supabase list failed (${response?.status ?? 'unknown'}): ${text}`);
  }

  const payload = await response.json().catch(() => null);
  if (!Array.isArray(payload)) {
    return [];
  }
  return payload as Array<{ name?: string }>;
};

export const removeSupabaseObjects = async (objectPaths: string[]): Promise<boolean | null> => {
  const { url, serviceRoleKey, bucket } = getSupabaseEnv();
  if (!url || !serviceRoleKey || !bucket) {
    return null;
  }

  const paths = (objectPaths || [])
    .map((p) => (p || '').trim().replace(/^\/+/, ''))
    .filter(Boolean);
  if (paths.length === 0) {
    return true;
  }

  const endpoint = `${url}/storage/v1/object/remove/${bucket}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${serviceRoleKey}`,
      apikey: serviceRoleKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ prefixes: paths }),
  }).catch(() => null);

  if (!response || !response.ok) {
    const text = await response?.text().catch(() => '');
    throw new Error(`Supabase remove failed (${response?.status ?? 'unknown'}): ${text}`);
  }

  return true;
};

export const deleteSupabasePrefix = async (prefix: string): Promise<{ deleted: number } | null> => {
  const { url, serviceRoleKey, bucket } = getSupabaseEnv();
  if (!url || !serviceRoleKey || !bucket) {
    return null;
  }

  const normalizedPrefix = (prefix || '').trim().replace(/^\/+/, '').replace(/\/+$/, '');
  if (!normalizedPrefix) {
    return { deleted: 0 };
  }

  let offset = 0;
  const limit = 1000;
  let deleted = 0;

  for (let page = 0; page < 50; page++) {
    const listed = await listSupabaseObjects({ prefix: normalizedPrefix, limit, offset });
    if (!listed) {
      return null;
    }

    const objectPaths = listed
      .map((o: any) => {
        const name = (o?.name || '').toString();
        if (!name) return '';
        const base = normalizedPrefix.endsWith('/') ? normalizedPrefix.slice(0, -1) : normalizedPrefix;
        return `${base}/${name}`;
      })
      .filter(Boolean);

    if (objectPaths.length === 0) {
      break;
    }

    for (let i = 0; i < objectPaths.length; i += 100) {
      const chunk = objectPaths.slice(i, i + 100);
      await removeSupabaseObjects(chunk);
      deleted += chunk.length;
    }

    if (listed.length < limit) {
      break;
    }
    offset += limit;
  }

  return { deleted };
};
