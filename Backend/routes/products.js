// Backend/routes/products.js
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

const productController = safeRequire('controllers/productController') || {};
const authMiddleware = safeRequire('middleware/auth') || {};
const protect = authMiddleware && authMiddleware.protect ? authMiddleware.protect : (req, res, next) => res.status(401).json({ success: false, message: 'Auth middleware missing' });

// placeholders
const placeholder = (name) => (req, res) => {
  console.error(`❌ Handler "${name}" not implemented in controllers/productController.js`);
  return res.status(501).json({ success: false, message: `Not implemented: ${name}` });
};

// map handlers (try common names)
const listProducts = productController.listProducts || productController.getProducts || productController.getAll || placeholder('listProducts');
const getProduct = productController.getProduct || productController.getById || placeholder('getProduct');
const createProduct = productController.createProduct || productController.addProduct || placeholder('createProduct');
const updateProduct = productController.updateProduct || productController.editProduct || placeholder('updateProduct');
const deleteProduct = productController.deleteProduct || productController.removeProduct || placeholder('deleteProduct');

const router = express.Router();

// Example validation (you can adjust)
const productValidation = [
  body('name').optional().isLength({ min: 1 }).withMessage('Name required'),
  body('price').optional().isNumeric().withMessage('Price must be numeric')
];

// Public routes
router.get('/', listProducts);
router.get('/:id', getProduct);

// Protected product management routes
router.post('/', protect, productValidation, createProduct);
router.put('/:id', protect, productValidation, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
