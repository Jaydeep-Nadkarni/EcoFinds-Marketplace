import api from './api';

const productService = {
  // Get all products with optional filters
  getAllProducts: async (filters = {}) => {
    try {
      const response = await api.get('/products', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch products' };
    }
  },

  // Get product by ID
  getProductById: async (productId) => {
    try {
      const response = await api.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch product details' };
    }
  },

  // Create a new product
  createProduct: async (productData) => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create product' };
    }
  },

  // Update a product
  updateProduct: async (productId, productData) => {
    try {
      const response = await api.put(`/products/${productId}`, productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update product' };
    }
  },

  // Delete a product
  deleteProduct: async (productId) => {
    try {
      const response = await api.delete(`/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete product' };
    }
  },

  // Get products by seller ID
  getProductsBySeller: async (sellerId) => {
    try {
      const response = await api.get(`/products/seller/${sellerId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch seller products' };
    }
  },

  // Get products by category
  getProductsByCategory: async (categoryId) => {
    try {
      const response = await api.get(`/products/category/${categoryId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch category products' };
    }
  },

  // Search products
  searchProducts: async (query) => {
    try {
      const response = await api.get(`/products/search`, { params: { query } });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to search products' };
    }
  },

  // Upload product image
  uploadProductImage: async (productId, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await api.post(`/products/${productId}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to upload product image' };
    }
  },
};

export default productService;