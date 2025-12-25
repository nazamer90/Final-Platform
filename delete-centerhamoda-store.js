#!/usr/bin/env node

/**
 * Script to delete "center hamoda" store from both backend and frontend
 * This will:
 * 1. Delete the store from the database (via API)
 * 2. Delete store files from backend public/assets
 * 3. Delete store files from frontend public/assets
 * 4. Update stores index.json
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const BACKEND_URL = process.env.BACKEND_URL || 'https://final-platform-eshro.onrender.com/api';
const STORE_SLUG = 'centerhamoda';
const CLEANUP_SECRET = process.env.STORE_CLEANUP_SECRET || '';

async function deleteStoreFromBackend() {
  console.log('🗑️  Deleting store from backend database...');
  
  try {
    const response = await axios.post(
      `${BACKEND_URL}/stores/cleanup-by-slug`,
      {
        storeSlug: STORE_SLUG,
        deleteAzureAssets: true
      },
      {
        headers: {
          'x-cleanup-secret': CLEANUP_SECRET,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Backend deletion successful:', response.data);
    return true;
  } catch (error) {
    if (error.response) {
      console.error('❌ Backend deletion failed:', error.response.data);
      console.error('Status:', error.response.status);
    } else {
      console.error('❌ Backend deletion error:', error.message);
    }
    return false;
  }
}

function deleteDirectoryRecursive(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`✅ Deleted directory: ${dirPath}`);
    return true;
  } else {
    console.log(`⚠️  Directory not found: ${dirPath}`);
    return false;
  }
}

function deleteStoreFilesystem() {
  console.log('🗑️  Deleting store files from filesystem...');
  
  const backendAssetsDir = path.join(__dirname, 'backend', 'public', 'assets', STORE_SLUG);
  const frontendAssetsDir = path.join(__dirname, 'public', 'assets', STORE_SLUG);
  
  deleteDirectoryRecursive(backendAssetsDir);
  deleteDirectoryRecursive(frontendAssetsDir);
}

function updateStoresIndex() {
  console.log('📝 Updating stores index.json...');
  
  const indexPaths = [
    path.join(__dirname, 'backend', 'public', 'assets', 'stores', 'index.json'),
    path.join(__dirname, 'public', 'assets', 'stores', 'index.json')
  ];
  
  for (const indexPath of indexPaths) {
    try {
      if (fs.existsSync(indexPath)) {
        const stores = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
        const filteredStores = stores.filter(store => store.slug !== STORE_SLUG);
        
        if (stores.length !== filteredStores.length) {
          fs.writeFileSync(indexPath, JSON.stringify(filteredStores, null, 2));
          console.log(`✅ Updated: ${indexPath}`);
        } else {
          console.log(`⚠️  Store not found in: ${indexPath}`);
        }
      } else {
        console.log(`⚠️  Index file not found: ${indexPath}`);
      }
    } catch (error) {
      console.error(`❌ Error updating ${indexPath}:`, error.message);
    }
  }
}

async function main() {
  console.log('\n========================================');
  console.log('🗑️  DELETING STORE: center hamoda');
  console.log(`📍 Slug: ${STORE_SLUG}`);
  console.log('========================================\n');

  if (!CLEANUP_SECRET) {
    console.error('❌ STORE_CLEANUP_SECRET is not set!');
    console.log('ℹ️  You can set it as environment variable or update the script.');
    console.log('ℹ️  For now, I will skip backend deletion and only clean local files.\n');
  }

  // Delete from backend (database + Azure)
  if (CLEANUP_SECRET) {
    await deleteStoreFromBackend();
  } else {
    console.log('⚠️  Skipping backend deletion (no CLEANUP_SECRET)\n');
  }

  // Delete local filesystem files
  deleteStoreFilesystem();

  // Update index.json files
  updateStoresIndex();

  console.log('\n========================================');
  console.log('✅ DELETION COMPLETE');
  console.log('========================================\n');
  
  console.log('📋 Next steps:');
  console.log('1. Verify the store is deleted from the database');
  console.log('2. Check that files are removed from Azure Blob Storage');
  console.log('3. Clear browser localStorage/cache');
  console.log('4. Test creating a new store with the same name\n');
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
