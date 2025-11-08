const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

function hexToBuffer(hex) {
  return Buffer.from(String(hex).trim(), 'hex');
}

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }));

// Health check
app.get('/health', (_, res) => res.send('OK'));

// Public config for frontend to discover MID/TID and environment
app.get('/api/moamalat/config', (req, res) => {
  const MID = process.env.MOAMALATPAY_MID || process.env.MOAMALAT_MID || '';
  const TID = process.env.MOAMALATPAY_TID || process.env.MOAMALAT_TID || '';
  const ENV = String(process.env.MOAMALATPAY_PRODUCTION).toLowerCase() === 'true' ? 'production' : 'sandbox';
  res.json({ MID, TID, ENV });
});

// Hash generation endpoint (server-side HMAC using secret hex key)
app.post('/api/moamalat/hash', (req, res) => {
  try {
    const { Amount, DateTimeLocalTrxn, MerchantId, MerchantReference, TerminalId } = req.body || {};
    if (!Amount || !DateTimeLocalTrxn || !MerchantId || !MerchantReference || !TerminalId) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const message =
      'Amount=' + Amount +
      '&DateTimeLocalTrxn=' + DateTimeLocalTrxn +
      '&MerchantId=' + MerchantId +
      '&MerchantReference=' + MerchantReference +
      '&TerminalId=' + TerminalId;

    const keyHex = process.env.MOAMALAT_SECRET_HEX || '';
    if (!keyHex) return res.status(500).json({ error: 'Missing MOAMALAT_SECRET_HEX' });

    const secureHash = crypto
      .createHmac('sha256', hexToBuffer(keyHex))
      .update(message, 'utf8')
      .digest('hex')
      .toUpperCase();

    return res.json({ secureHash });
  } catch (e) {
    console.error('Hash generation error:', e);
    return res.status(500).json({ error: 'Hash generation failed' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Moamalat hash server running on http://localhost:' + PORT);
});
