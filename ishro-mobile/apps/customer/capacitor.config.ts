import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ly.ishro.customer',
  appName: 'ishro',
  webDir: 'dist',
  server: {
    url: 'https://www.ishro.ly',
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
