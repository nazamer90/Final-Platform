const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

console.log('📝 Adding filtering functions...');

// Find the line with validOrders and add filtering functions after it
const filteringCode = `
  // Filtering functions for data isolation by merchant
  const filteredOrders = useMemo(() => {
    if (!currentMerchant?.id) return validOrders;
    return validOrders.filter(order => order?.storeId === currentMerchant.id);
  }, [validOrders, currentMerchant?.id]);

  const filteredFavorites = useMemo(() => {
    if (!currentMerchant?.id) return favorites;
    return favorites.filter(fav => fav?.storeId === currentMerchant.id);
  }, [favorites, currentMerchant?.id]);

  const filteredUnavailableItems = useMemo(() => {
    if (!currentMerchant?.id) return unavailableItems;
    return unavailableItems.filter(item => item?.storeId === currentMerchant.id);
  }, [unavailableItems, currentMerchant?.id]);
`;

// Insert after line 1243 (validOrders definition)
const targetLine = 'const validOrders = useMemo(() => orders.filter(order => order && order.id), [orders]);';
content = content.replace(
  targetLine,
  targetLine + filteringCode
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('✅ Filtering functions added successfully!');
