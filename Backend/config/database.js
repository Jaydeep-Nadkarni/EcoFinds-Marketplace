// Backend/config/database.js
require('dotenv').config();
const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'hackathon_ecommerce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000
};

const pool = mysql.createPool(dbConfig);

const testConnection = async () => {
  try {
    const conn = await pool.getConnection();
    conn.release();
    console.log('✅ Database connected successfully');
  } catch (err) {
    console.error('❌ Database connection failed:', err.message || err);
    process.exit(1);
  }
};

// safe initializer (do not create tables here if you already seeded)
(async () => {
  await testConnection();
})().catch(err => {
  console.error('DB init failed', err);
  process.exit(1);
});

module.exports = pool;
