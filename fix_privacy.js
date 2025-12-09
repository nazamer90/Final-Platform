const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

console.log('📝 Reading App.tsx...');
console.log('File size:', content.length, 'characters');

// Fix 1: setOrders with storeId (Line 1837 and 3007)
console.log('\n✏️  Fix 1: Adding storeId to orders...');
const before1 = content.length;
content = content.replace(
  /setOrders\(prev => \[\.\.\.prev, orderData\]\);/g,
  'setOrders(prev => [...prev, { ...orderData, storeId: currentMerchant?.id || currentMerchant?.storeId }]);'
);
console.log('Changes made:', content.length - before1);

// Fix 2: setFavorites with storeId
console.log('\n✏️  Fix 2: Adding storeId to favorites...');
const before2 = content.length;

// Pattern 1: productWithDate
content = content.replace(
  /const productWithDate = \{\s*\.\.\.product,\s*addedDate: new Date\(\)\.toISOString\(\)\s*\};\s*setFavorites\(prev => \[\.\.\.prev, productWithDate\]\);/,
  `const productWithDate = {
                ...product,
                addedDate: new Date().toISOString(),
                storeId: currentMerchant?.id || currentMerchant?.storeId
              };
              setFavorites(prev => [...prev, productWithDate]);`
);

// Pattern 2: direct product
content = content.replace(
  /} else \{\s*setFavorites\(prev => \[\.\.\.prev, product\]\);/g,
  `} else {
              setFavorites(prev => [...prev, { ...product, storeId: currentMerchant?.id || currentMerchant?.storeId }]);`
);

console.log('Changes made:', content.length - before2);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('\n✅ All privacy fixes applied successfully!');
