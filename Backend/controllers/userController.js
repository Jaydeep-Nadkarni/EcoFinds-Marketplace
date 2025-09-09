const { validationResult } = require('express-validator');
const db = require('../config/database');

// @desc    Add product to cart
// @route   POST /api/users/cart
// @access  Private
const addToCart = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    // Check if product exists and is active
    const [product] = await db.execute(
      'SELECT id, name, price, discount_price, stock_quantity FROM products WHERE id = ? AND is_active = true',
      [productId]
    );

    if (product.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const productData = product[0];

    // Check stock availability
    if (productData.stock_quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock available'
      });
    }

    const price = productData.discount_price || productData.price;

    // Check if item already exists in cart
    const [existingItem] = await db.execute(
      'SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );

    if (existingItem.length > 0) {
      // Update existing item
      const newQuantity = existingItem[0].quantity + quantity;
      
      if (productData.stock_quantity < newQuantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock available for the total quantity'
        });
      }

      await db.execute(
        'UPDATE cart_items SET quantity = ?, price = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [newQuantity, price, existingItem[0].id]
      );
    } else {
      // Add new item
      await db.execute(
        'INSERT INTO cart_items (user_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [userId, productId, quantity, price]
      );
    }

    res.json({
      success: true,
      message: 'Product added to cart successfully'
    });

  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding product to cart'
    });
  }
};

// @desc    Get user's cart
// @route   GET /api/users/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const [cartItems] = await db.execute(`
      SELECT 
        ci.*,
        p.name,
        p.image_url,
        p.stock_quantity,
        p.price as current_price,
        p.discount_price as current_discount_price,
        CASE WHEN p.discount_price IS NOT NULL THEN p.discount_price ELSE p.price END as current_final_price,
        (ci.quantity * ci.price) as item_total
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ? AND p.is_active = true
      ORDER BY ci.created_at DESC
    `, [userId]);

    // Calculate totals
    let subtotal = 0;
    let totalItems = 0;

    cartItems.forEach(item => {
      subtotal += parseFloat(item.item_total);
      totalItems += item.quantity;
    });

    const taxRate = 0.1; // 10% tax
    const taxAmount = subtotal * taxRate;
    const total = subtotal + taxAmount;

    res.json({
      success: true,
      data: {
        items: cartItems,
        summary: {
          totalItems,
          subtotal: parseFloat(subtotal.toFixed(2)),
          taxAmount: parseFloat(taxAmount.toFixed(2)),
          total: parseFloat(total.toFixed(2))
        }
      }
    });

  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cart'
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/users/cart/:itemId
// @access  Private
const updateCartItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const userId = req.user.id;
    const { itemId } = req.params;
    const { quantity } = req.body;

    // Check if cart item exists and belongs to user
    const [cartItem] = await db.execute(`
      SELECT ci.*, p.stock_quantity, p.price, p.discount_price
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.id = ? AND ci.user_id = ? AND p.is_active = true
    `, [itemId, userId]);

    if (cartItem.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    const item = cartItem[0];

    // Check stock availability
    if (item.stock_quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock available'
      });
    }

    const price = item.discount_price || item.price;

    // Update cart item
    await db.execute(
      'UPDATE cart_items SET quantity = ?, price = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [quantity, price, itemId]
    );

    res.json({
      success: true,
      message: 'Cart item updated successfully'
    });

  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating cart item'
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/users/cart/:itemId
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;

    // Check if cart item exists and belongs to user
    const [cartItem] = await db.execute(
      'SELECT id FROM cart_items WHERE id = ? AND user_id = ?',
      [itemId, userId]
    );

    if (cartItem.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    // Remove item from cart
    await db.execute('DELETE FROM cart_items WHERE id = ?', [itemId]);

    res.json({
      success: true,
      message: 'Item removed from cart successfully'
    });

  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing item from cart'
    });
  }
};

// @desc    Clear user's cart
// @route   DELETE /api/users/cart
// @access  Private
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await db.execute('DELETE FROM cart_items WHERE user_id = ?', [userId]);

    res.json({
      success: true,
      message: 'Cart cleared successfully'
    });

  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Error clearing cart'
    });
  }
};

// @desc    Add product to wishlist
// @route   POST /api/users/wishlist
// @access  Private
const addToWishlist = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const userId = req.user.id;
    const { productId } = req.body;

    // Check if product exists
    const [product] = await db.execute(
      'SELECT id FROM products WHERE id = ? AND is_active = true',
      [productId]
    );

    if (product.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if already in wishlist
    const [existing] = await db.execute(
      'SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Product already in wishlist'
      });
    }

    // Add to wishlist
    await db.execute(
      'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)',
      [userId, productId]
    );

    res.json({
      success: true,
      message: 'Product added to wishlist successfully'
    });

  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding product to wishlist'
    });
  }
};

// @desc    Get user's wishlist
// @route   GET /api/users/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const [wishlistItems] = await db.execute(`
      SELECT 
        w.id as wishlist_id,
        w.created_at as added_at,
        p.*,
        c.name as category_name,
        CASE WHEN p.discount_price IS NOT NULL THEN p.discount_price ELSE p.price END as final_price
      FROM wishlist w
      JOIN products p ON w.product_id = p.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE w.user_id = ? AND p.is_active = true
      ORDER BY w.created_at DESC
    `, [userId]);

    res.json({
      success: true,
      data: { wishlist: wishlistItems }
    });

  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching wishlist'
    });
  }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/users/wishlist/:productId
// @access  Private
const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    // Check if item exists in wishlist
    const [wishlistItem] = await db.execute(
      'SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );

    if (wishlistItem.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found in wishlist'
      });
    }

    // Remove from wishlist
    await db.execute(
      'DELETE FROM wishlist WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );

    res.json({
      success: true,
      message: 'Product removed from wishlist successfully'
    });

  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing product from wishlist'
    });
  }
};

// @desc    Add product review
// @route   POST /api/users/reviews
// @access  Private
const addProductReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const userId = req.user.id;
    const { productId, rating, title, comment } = req.body;

    // Check if product exists
    const [product] = await db.execute(
      'SELECT id FROM products WHERE id = ? AND is_active = true',
      [productId]
    );

    if (product.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user has already reviewed this product
    const [existingReview] = await db.execute(
      'SELECT id FROM product_reviews WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );

    if (existingReview.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product'
      });
    }

    // Check if user has purchased this product
    const [purchase] = await db.execute(`
      SELECT oi.id 
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      WHERE o.user_id = ? AND oi.product_id = ? AND o.status = 'delivered'
      LIMIT 1
    `, [userId, productId]);

    const isVerifiedPurchase = purchase.length > 0;

    // Add review
    await db.execute(`
      INSERT INTO product_reviews (product_id, user_id, rating, title, comment, is_verified_purchase)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [productId, userId, rating, title, comment, isVerifiedPurchase]);

    // Update product rating
    await updateProductRating(productId);

    res.status(201).json({
      success: true,
      message: 'Review added successfully'
    });

  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding review'
    });
  }
};

// Helper function to update product rating
const updateProductRating = async (productId) => {
  try {
    const [ratingData] = await db.execute(`
      SELECT AVG(rating) as avg_rating, COUNT(*) as review_count
      FROM product_reviews
      WHERE product_id = ? AND is_active = true
    `, [productId]);

    const avgRating = ratingData[0].avg_rating || 0;
    const reviewCount = ratingData[0].review_count || 0;

    await db.execute(
      'UPDATE products SET rating = ?, review_count = ? WHERE id = ?',
      [parseFloat(avgRating.toFixed(2)), reviewCount, productId]
    );
  } catch (error) {
    console.error('Update product rating error:', error);
  }
};

// @desc    Get user's dashboard data
// @route   GET /api/users/dashboard
// @access  Private
const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get recent orders
    const [recentOrders] = await db.execute(`
      SELECT id, order_number, status, total_amount, created_at
      FROM orders
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 5
    `, [userId]);

    // Get cart items count
    const [cartCount] = await db.execute(
      'SELECT COUNT(*) as count FROM cart_items WHERE user_id = ?',
      [userId]
    );

    // Get wishlist items count
    const [wishlistCount] = await db.execute(
      'SELECT COUNT(*) as count FROM wishlist WHERE user_id = ?',
      [userId]
    );

    // Get order statistics
    const [orderStats] = await db.execute(`
      SELECT 
        COUNT(*) as total_orders,
        SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) as completed_orders,
        SUM(CASE WHEN status IN ('pending', 'confirmed', 'processing', 'shipped') THEN 1 ELSE 0 END) as active_orders,
        SUM(CASE WHEN status = 'delivered' THEN total_amount ELSE 0 END) as total_spent
      FROM orders
      WHERE user_id = ?
    `, [userId]);

    res.json({
      success: true,
      data: {
        recentOrders,
        stats: {
          cartItems: cartCount[0].count,
          wishlistItems: wishlistCount[0].count,
          totalOrders: orderStats[0].total_orders,
          completedOrders: orderStats[0].completed_orders,
          activeOrders: orderStats[0].active_orders,
          totalSpent: parseFloat(orderStats[0].total_spent || 0)
        }
      }
    });

  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data'
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  addProductReview,
  getDashboard
};