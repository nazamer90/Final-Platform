const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  console.log('Building with TypeScript (transpile-only)...');
  
  // Compile with ts-node in transpile-only mode
  const tsNode = require.resolve('ts-node');
  const tsc = path.join(path.dirname(tsNode), '../typescript/bin/tsc');
  
  // Use tsc with minimal checking
  execSync('npx ts-node --transpile-only -p ./tsconfig.json --outDir dist src/index.ts', {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  console.log('✅ Build completed successfully');
  process.exit(0);
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
