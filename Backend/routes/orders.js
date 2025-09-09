// Backend/routes/orders.js
const express = require('express');
const { body } = require('express-validator');
const path = require('path');

function safeRequire(relPath) {
  try {
    return require(path.join(__dirname, '..', relPath));
  } catch (err) {
    console.warn(`⚠️ safeRequire failed for ${relPath}: ${err.code || err.message}`);
    return null;
  }
}

// Try load controller and auth middleware
const orderController = safeRequire('controllers/orderController') || {};
const authMiddleware = safeRequire('middleware/auth') || {};

// Pull controller handlers (use fallback names)
const createOrder = orderController.createOrder || (() => (req, res) => {
  console.error('❌ Handler "createOrder" not implemented in controllers/orderController.js');
  return res.status(501).json({ success: false, message: 'Not implemented: createOrder' });
})();

const getOrders = orderController.getOrders || (() => (req, res) => {
  console.error('❌ Handler "getOrders" not implemented in controllers/orderController.js');
  return res.status(501).json({ success: false, message: 'Not implemented: getOrders' });
})();

// support both getOrder (Claude) and getOrderById (your controller)
const getOrder = orderController.getOrder || orderController.getOrderById || (() => (req, res) => {
  console.error('❌ Handler "getOrder" / "getOrderById" not implemented in controllers/orderController.js');
  return res.status(501).json({ success: false, message: 'Not implemented: getOrder' });
})();

const cancelOrder = orderController.cancelOrder || (() => (req, res) => {
  console.error('❌ Handler "cancelOrder" not implemented in controllers/orderController.js');
  return res.status(501).json({ success: false, message: 'Not implemented: cancelOrder' });
})();

const getAllOrders = orderController.getAllOrders || (() => (req, res) => {
  console.error('❌ Handler "getAllOrders" not implemented in controllers/orderController.js');
  return res.status(501).json({ success: false, message: 'Not implemented: getAllOrders' });
})();

const updateOrderStatus = orderController.updateOrderStatus || (() => (req, res) => {
  console.error('❌ Handler "updateOrderStatus" not implemented in controllers/orderController.js');
  return res.status(501).json({ success: false, message: 'Not implemented: updateOrderStatus' });
})();

// Auth middleware: protect must exist; authorize optional
const protect = (authMiddleware && authMiddleware.protect) ? authMiddleware.protect : (req, res, next) => {
  console.warn('⚠️ protect middleware missing — requests will be treated as unauthorized');
  return res.status(401).json({ success: false, message: 'Auth middleware missing' });
};

// if authorize exists in middleware/auth use it, otherwise provide a fallback authorize('role') middleware
let authorize;
if (authMiddleware && typeof authMiddleware.authorize === 'function') {
  authorize = authMiddleware.authorize;
} else {
  authorize = (role) => (req, res, next) => {
    // fallback: require req.user.role === role
    if (!req.user || !req.user.role) {
      return res.status(403).json({ success: false, message: 'Forbidden: missing role' });
    }
    if (req.user.role !== role) {
      return res.status(403).json({ success: false, message: 'Forbidden: insufficient privileges' });
    }
    return next();
  };
}

// Validation rules (kept from Claude)
const createOrderValidation = [
  body('shippingAddress')
    .notEmpty()
    .withMessage('Shipping address is required'),
  body('shippingAddress.fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required'),
  body('shippingAddress.address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),
  body('shippingAddress.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('shippingAddress.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  body('shippingAddress.zipCode')
    .trim()
    .notEmpty()
    .withMessage('Zip code is required'),
  body('shippingAddress.phone')
    .isMobilePhone('any')
    .withMessage('Valid phone number is required'),
  body('paymentMethod')
    .optional()
    .isIn(['cod', 'card', 'upi', 'netbanking'])
    .withMessage('Invalid payment method'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes must be less than 500 characters')
];

const updateOrderStatusValidation = [
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'])
    .withMessage('Invalid order status')
];

const router = express.Router();

// All routes require authentication
router.use(protect);

// User routes
router.post('/', createOrderValidation, createOrder);
router.get('/', getOrders);
router.get('/:id', getOrder);
router.put('/:id/cancel', cancelOrder);

// Admin routes (uses authorize fallback if middleware/auth.authorize missing)
router.get('/admin/all', authorize('admin'), getAllOrders);
router.put('/admin/:id/status', authorize('admin'), updateOrderStatusValidation, updateOrderStatus);

module.exports = router;
