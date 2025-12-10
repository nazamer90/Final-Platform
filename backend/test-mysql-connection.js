const { Client } = require('pg');

const config = {
  host: process.env.DB_HOST || 'db.pwkgwjzakgibztwsvbjf.supabase.co',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '@Dm1ns$$2025',
  database: process.env.DB_NAME || 'postgres',
  ssl: { rejectUnauthorized: false },
};

console.log('🔍 Testing Supabase PostgreSQL Connection...');
console.log('━'.repeat(50));
console.log('Host:', config.host);
console.log('Port:', config.port);
console.log('User:', config.user);
console.log('Database:', config.database);
console.log('━'.repeat(50));
console.log('');

async function testConnection() {
  const client = new Client(config);
  try {
    console.log('⏳ Connecting to Supabase PostgreSQL...');
    await client.connect();
    
    console.log('✅ Connected successfully!');
    console.log('');

    console.log('📊 Testing database query...');
    const result = await client.query('SELECT 1 as test');
    console.log('✅ Query successful!');
    console.log('Query result:', result.rows);
    console.log('');

    console.log('🗄️  Getting database info...');
    const dbInfo = await client.query('SELECT current_database() as db_name');
    console.log('✅ Connected to database:', dbInfo.rows[0].db_name);
    console.log('');

    console.log('━'.repeat(50));
    console.log('🎉 All tests passed! Supabase PostgreSQL connection is working.');
    console.log('━'.repeat(50));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error:', error.message);
    console.error('');
    console.error('Troubleshooting:');
    console.error('1. Verify host: db.pwkgwjzakgibztwsvbjf.supabase.co');
    console.error('2. Verify port: 5432');
    console.error('3. Verify username: postgres');
    console.error('4. Verify password is correct');
    console.error('5. Check Supabase project settings');
    console.error('6. Ensure you have database access (check Supabase dashboard)');
    console.error('');
    console.error('Full error:');
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

testConnection();
