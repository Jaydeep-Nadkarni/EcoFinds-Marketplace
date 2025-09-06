// Backend/test-db.js
require('dotenv').config();
const db = require('./config/database');

(async () => {
  try {
    const [users] = await db.query('SELECT COUNT(*) AS cnt FROM users;');
    const [products] = await db.query('SELECT COUNT(*) AS cnt FROM products;');
    console.log('users count =', users[0].cnt);
    console.log('products count =', products[0].cnt);

    const [rows] = await db.query('SELECT id, username, email FROM users LIMIT 1;');
    console.log('example user:', rows[0] || '(none)');

    process.exit(0);
  } catch (err) {
    console.error('DB test error:', err);
    process.exit(1);
  }
})();
