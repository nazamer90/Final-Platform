import fetch from 'node-fetch';

const BASE_URL = 'https://final-platform-eshro.onrender.com/api';

async function listStores() {
  console.log(`Listing all stores from ${BASE_URL}...`);
  try {
    const response = await fetch(`${BASE_URL}/stores/list`);
    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      return;
    }
    const data = await response.json();
    if (data.success && Array.isArray(data.data.stores)) {
        const stores = data.data.stores;
        console.log(`Found ${stores.length} stores.`);
        const hamodaStores = stores.filter(s => s.slug.includes('hamoda') || s.name.includes('حمودة'));
        if (hamodaStores.length > 0) {
            console.log('Found these hamoda stores:', JSON.stringify(hamodaStores, null, 2));
        } else {
            console.log('No stores matching "hamoda" found in the list.');
        }
    } else {
        console.log('Unexpected response structure:', JSON.stringify(data, null, 2));
    }

  } catch (error) {
    console.error('Fetch error:', error);
  }
}

listStores();
