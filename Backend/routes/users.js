// Backend/routes/users.js
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

const userController = safeRequire('controllers/userController') || {};
const authMiddleware = safeRequire('middleware/auth') || {};
const protect = authMiddleware && authMiddleware.protect ? authMiddleware.protect : (req, res, next) => res.status(401).json({ success: false, message: 'Auth middleware missing' });

const placeholder = (name) => (req, res) => {
  console.error(`❌ Handler "${name}" not implemented in controllers/userController.js`);
  return res.status(501).json({ success: false, message: `Not implemented: ${name}` });
};

const getUsers = userController.getUsers || userController.listUsers || placeholder('getUsers');
const getUserById = userController.getUser || userController.getUserById || placeholder('getUserById');
const updateUser = userController.updateUser || userController.editUser || placeholder('updateUser');
const deleteUser = userController.deleteUser || userController.removeUser || placeholder('deleteUser');

const router = express.Router();

// Validation examples
const updateValidation = [
  body('firstName').optional().isString(),
  body('lastName').optional().isString()
];

// Admin/protected routes
router.get('/', protect, getUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateValidation, updateUser);
router.delete('/:id', protect, deleteUser);

module.exports = router;
