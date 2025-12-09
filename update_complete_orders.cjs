const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

console.log('📝 Updating CompleteOrdersPage with filtered data...');

// Replace the data passed to CompleteOrdersPageLazy
content = content.replace(
  /<CompleteOrdersPageLazy\s*orders={validOrders}\s*favorites={favorites}\s*unavailableItems={unavailableItems}/,
  '<CompleteOrdersPageLazy\n        orders={filteredOrders}\n        favorites={filteredFavorites}\n        unavailableItems={filteredUnavailableItems}'
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('✅ CompleteOrdersPage updated with filtered data!');
