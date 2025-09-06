/* controllers/authController.js */
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database'); // mysql2/promise pool

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_dev_secret';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
}

exports.register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, phone, address, city, state, zipCode, country } = req.body;
    if (!username || !email || !password) return res.status(400).json({ success: false, message: 'username, email and password are required' });

    const [existsByEmail] = await pool.query('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);
    if (existsByEmail.length) return res.status(400).json({ success: false, message: 'Email already in use' });

    const [existsByUsername] = await pool.query('SELECT id FROM users WHERE username = ? LIMIT 1', [username]);
    if (existsByUsername.length) return res.status(400).json({ success: false, message: 'Username already taken' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const [result] = await pool.query(
      `INSERT INTO users (username, email, password, first_name, last_name, phone, address, city, state, zip_code, country)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [username, email, hashed, firstName || null, lastName || null, phone || null, address || null, city || null, state || null, zipCode || null, country || 'India']
    );

    const userId = result.insertId;
    const token = signToken({ id: userId, email, username });

    return res.status(201).json({
      success: true,
      data: { id: userId, username, email, firstName, lastName },
      token
    });
  } catch (err) {
    console.error('register error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });

    const [rows] = await pool.query('SELECT id, username, email, password, first_name, last_name, role FROM users WHERE email = ? LIMIT 1', [email]);
    if (!rows.length) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = signToken({ id: user.id, email: user.email, role: user.role });
    return res.json({
      success: true,
      data: { id: user.id, username: user.username, email: user.email, firstName: user.first_name, lastName: user.last_name },
      token
    });
  } catch (err) {
    console.error('login error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getMe = async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const [rows] = await pool.query('SELECT id, username, email, first_name, last_name, phone, address, city, state, zip_code, country, role FROM users WHERE id = ? LIMIT 1', [req.user.id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'User not found' });
    return res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('getMe error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const allowed = ['firstName','lastName','phone','address','city','state','zipCode','country'];
    const data = {};
    for (const k of allowed) if (Object.prototype.hasOwnProperty.call(req.body, k)) {
      const col = k === 'firstName' ? 'first_name' : (k === 'lastName' ? 'last_name' : (k === 'zipCode' ? 'zip_code' : k));
      data[col] = req.body[k];
    }
    const sets = Object.keys(data).map(k => `${k} = ?`).join(', ');
    const vals = Object.keys(data).map(k => data[k]);
    if (!sets) return res.status(400).json({ success: false, message: 'No valid fields provided' });
    await pool.query(`UPDATE users SET ${sets}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [...vals, req.user.id]);
    const [rows] = await pool.query('SELECT id, username, email, first_name, last_name, phone, address, city, state, zip_code, country FROM users WHERE id = ? LIMIT 1', [req.user.id]);
    return res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('updateProfile error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return res.status(400).json({ success: false, message: 'Both current and new passwords are required' });
    const [rows] = await pool.query('SELECT password FROM users WHERE id = ? LIMIT 1', [req.user.id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'User not found' });
    const isMatch = await bcrypt.compare(currentPassword, rows[0].password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);
    await pool.query('UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [hashed, req.user.id]);
    return res.json({ success: true, message: 'Password updated' });
  } catch (err) {
    console.error('changePassword error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.logout = async (req, res) => {
  return res.json({ success: true, message: 'Logged out (client should drop the token)' });
};
