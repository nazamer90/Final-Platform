import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ly.ishro.merchant',
  appName: 'ishro-merchant',
  webDir: 'dist',
  server: {
    url: 'https://www.ishro.ly/merchant/login',
    cleartext: false,
    androidScheme: 'https'
  },
  allowNavigation: [
    'www.ishro.ly',
    'final-platform-eshro.onrender.com',
    '*.moamalat.net',
    'pgw.moamalat.net',
    'tnpg.moamalat.net',
    'npg.moamalat.net'
  ]
};

export default config;
