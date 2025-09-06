// Backend/controllers/orderController.js
/**
 * Simple orders controller using mysql2/promise pool.
 * - createOrder: transactional (uses connection.beginTransaction / commit / rollback)
 * - getOrders: list orders for a user (or all if admin flag provided)
 * - getOrderById: fetch single order with items
 * - cancelOrder: sets status to cancelled (simple example)
 *
 * Adjust SQL names/columns to match your schema if necessary.
 */

const pool = require('../config/database');

exports.createOrder = async (req, res) => {
  const userId = req.user && req.user.id;
  if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

  // Expect body: { items: [{ product_id, quantity, price }], shipping_address: {...}, payment_method, total_amount }
  const { items, shipping_address, payment_method, total_amount } = req.body;
  if (!Array.isArray(items) || !items.length) return res.status(400).json({ success: false, message: 'No items provided' });

  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Insert order
    const [orderRes] = await connection.query(
      `INSERT INTO orders (user_id, order_number, status, total_amount, payment_method, shipping_address, created_at, updated_at)
       VALUES (?, ?, 'pending', ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [userId, `ORD-${Date.now()}-${Math.floor(Math.random()*1000)}`, total_amount || 0, payment_method || null, JSON.stringify(shipping_address || {})]
    );
    const orderId = orderRes.insertId;

    // Insert order items
    for (const it of items) {
      const productId = it.product_id;
      const qty = Number(it.quantity || 1);
      const price = Number(it.price || 0);

      await connection.query(
        `INSERT INTO order_items (order_id, product_id, product_name, product_image, quantity, price, total, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
        [orderId, productId, it.product_name || null, it.product_image || null, qty, price, (qty * price)]
      );

      // Optionally reduce product stock (uncomment if you want)
      // await connection.query(`UPDATE products SET stock_quantity = GREATEST(0, stock_quantity - ?) WHERE id = ?`, [qty, productId]);
    }

    await connection.commit();

    const [orderRow] = await pool.query('SELECT * FROM orders WHERE id = ? LIMIT 1', [orderId]);

    return res.status(201).json({ success: true, message: 'Order created', data: orderRow[0] });
  } catch (err) {
    console.error('createOrder error', err);
    if (connection) {
      try {
        await connection.rollback();
      } catch (rbErr) {
        console.error('rollback error', rbErr);
      }
    }
    return res.status(500).json({ success: false, message: 'Error creating order' });
  } finally {
    if (connection) connection.release();
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    // if admin, you might allow listing all orders; here we filter by user
    const [rows] = await pool.query('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    return res.json({ success: true, data: rows });
  } catch (err) {
    console.error('getOrders error', err);
    return res.status(500).json({ success: false, message: 'Error fetching orders' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user && req.user.id;

    const [orders] = await pool.query('SELECT * FROM orders WHERE id = ? AND user_id = ? LIMIT 1', [orderId, userId]);
    if (!orders.length) return res.status(404).json({ success: false, message: 'Order not found' });

    const [items] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [orderId]);

    return res.json({ success: true, data: { order: orders[0], items } });
  } catch (err) {
    console.error('getOrderById error', err);
    return res.status(500).json({ success: false, message: 'Error fetching order' });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user && req.user.id;

    const [orders] = await pool.query('SELECT * FROM orders WHERE id = ? AND user_id = ? LIMIT 1', [orderId, userId]);
    if (!orders.length) return res.status(404).json({ success: false, message: 'Order not found' });

    await pool.query('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', ['cancelled', orderId]);

    return res.json({ success: true, message: 'Order cancelled' });
  } catch (err) {
    console.error('cancelOrder error', err);
    return res.status(500).json({ success: false, message: 'Error cancelling order' });
  }
};
