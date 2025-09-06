import api from './api';

const wishlistService = {
  // Get user's wishlist
  getWishlist: async () => {
    try {
      const response = await api.get('/wishlist');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch wishlist' };
    }
  },

  // Add item to wishlist
  addToWishlist: async (productId) => {
    try {
      const response = await api.post('/wishlist', { productId });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add item to wishlist' };
    }
  },

  // Remove item from wishlist
  removeFromWishlist: async (productId) => {
    try {
      const response = await api.delete(`/wishlist/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to remove item from wishlist' };
    }
  },

  // Check if item is in wishlist
  isInWishlist: async (productId) => {
    try {
      const response = await api.get(`/wishlist/check/${productId}`);
      return response.data.inWishlist;
    } catch (error) {
      return false;
    }
  },
};

export default wishlistService;