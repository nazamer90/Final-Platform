// Google OAuth Express server
// Handles Google OAuth callback and token exchange

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (_req, res) => {
  res.json({
    status: 'running',
    message: 'Eishro Google OAuth server is running',
    endpoints: {
      callback: '/auth/google/callback',
      health: '/'
    }
  });
});

// Google OAuth callback endpoint
app.get('/auth/google/callback', async (req, res) => {
  const { code, state, error } = req.query;
  console.log('Google OAuth callback params:', { code, state, error });

  if (error) {
    console.error('Google OAuth error:', error);
    return res.status(400).json({
      success: false,
      error: error,
      message: 'Google OAuth failed'
    });
  }

  if (!code) {
    console.error('No authorization code received');
    return res.status(400).json({
      success: false,
      error: 'no_code',
      message: 'No authorization code received from Google'
    });
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/google/callback'
    });

    const { access_token, refresh_token, id_token, expires_in } = tokenResponse.data;

    // Get user info from Google
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    const userInfo = userInfoResponse.data;

    console.log('Google OAuth successful for user:', userInfo.email);

    // Create a simple JWT-like token (in production, use proper JWT library)
    const userToken = Buffer.from(JSON.stringify({
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture,
      access_token,
      expires_in: Date.now() + (expires_in * 1000)
    })).toString('base64');

    // Redirect to frontend with token
    const frontendUrl = `http://localhost:3000/auth/callback?token=${userToken}&provider=google`;
    res.redirect(frontendUrl);

  } catch (tokenError) {
    console.error('Token exchange error:', tokenError.response?.data || tokenError.message);
    res.status(500).json({
      success: false,
      error: 'token_exchange_failed',
      message: 'Failed to exchange authorization code for tokens'
    });
  }
});

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});
