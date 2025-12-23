import { Router } from 'express';
import {
  BlobSASPermissions,
  SASProtocol,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters
} from '@azure/storage-blob';
import logger from '@utils/logger';
import { sendError, sendSuccess } from '@utils/response';

type SasFileRequest = {
  blobName: string;
  contentType?: string;
};

const router = Router();

const encodeBlobPath = (blobName: string) =>
  blobName
    .split('/')
    .map((p) => encodeURIComponent(p))
    .join('/');

const isValidBlobName = (blobName: string) => {
  if (!blobName) return false;
  if (blobName.startsWith('/')) return false;
  if (blobName.includes('..')) return false;
  if (blobName.includes('\\')) return false;
  if (blobName.includes('//')) return false;
  if (!blobName.startsWith('stores/')) return false;
  return true;
};

router.post('/sas', async (req, res) => {
  try {
    const accountName = (process.env.AZURE_STORAGE_ACCOUNT_NAME || '').trim();
    const accountKey = (process.env.AZURE_STORAGE_ACCOUNT_KEY || '').trim();
    const containerName = (process.env.AZURE_STORAGE_CONTAINER || '').trim();
    const baseUrlRaw = (process.env.AZURE_BLOB_BASE_URL || '').trim();

    if (!accountName || !accountKey || !containerName || !baseUrlRaw) {
      return sendError(
        res,
        'Azure storage is not configured on server',
        500,
        'AZURE_NOT_CONFIGURED'
      );
    }

    const files = (req.body?.files || []) as SasFileRequest[];
    const requestedExpiry = Number(req.body?.expiresInSeconds || 0);
    const expiresInSeconds =
      requestedExpiry && Number.isFinite(requestedExpiry)
        ? Math.min(Math.max(requestedExpiry, 60), 3600)
        : 900;

    if (!Array.isArray(files) || files.length === 0) {
      return sendError(res, 'files[] is required', 400, 'VALIDATION_ERROR');
    }

    if (files.length > 50) {
      return sendError(res, 'Too many files requested', 400, 'VALIDATION_ERROR');
    }

    for (const f of files) {
      if (!isValidBlobName(f?.blobName)) {
        return sendError(res, `Invalid blobName: ${f?.blobName}`, 400, 'VALIDATION_ERROR');
      }
    }

    const baseUrl = baseUrlRaw.replace(/\/+$/, '');
    const credential = new StorageSharedKeyCredential(accountName, accountKey);

    const startsOn = new Date(Date.now() - 5 * 60 * 1000);
    const expiresOn = new Date(Date.now() + expiresInSeconds * 1000);

    const out = files.map((f) => {
      const publicUrl = `${baseUrl}/${encodeBlobPath(f.blobName)}`;

      const sas = generateBlobSASQueryParameters(
        {
          containerName,
          blobName: f.blobName,
          permissions: BlobSASPermissions.parse('rcw'),
          protocol: SASProtocol.Https,
          startsOn,
          expiresOn,
          ...(f.contentType ? { contentType: f.contentType } : {})
        },
        credential
      ).toString();

      const uploadUrl = `${publicUrl}?${sas}`;

      return {
        blobName: f.blobName,
        publicUrl,
        uploadUrl,
        expiresAt: expiresOn.toISOString()
      };
    });

    logger.info(`✅ Issued ${out.length} Azure SAS URL(s)`);

    return sendSuccess(res, {
      files: out
    });
  } catch (error: any) {
    logger.error('❌ Failed to generate SAS URLs:', error);
    return sendError(res, 'Failed to generate SAS URLs', 500, 'SAS_GENERATION_FAILED');
  }
});

export default router;
