import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  TrashIcon, 
  ArrowLeftIcon, 
  ShieldCheckIcon,
  ArrowPathIcon,
  TruckIcon,
  InformationCircleIcon 
} from "@heroicons/react/24/outline";
import cartService from "../services/cartService";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const data = await cartService.getCart();
      setCartItems(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch cart items');
      console.error('Error fetching cart items:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      await cartService.removeFromCart(id);
      setCartItems(cartItems.filter(item => item.product_id === id ? false : true));
    } catch (err) {
      setError(err.message || 'Failed to remove item from cart');
      console.error('Error removing item from cart:', err);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await cartService.updateCartItem(id, newQuantity);
      setCartItems(cartItems.map(item => 
        item.product_id === id ? { ...item, quantity: newQuantity } : item
      ));
    } catch (err) {
      setError(err.message || 'Failed to update cart item');
      console.error('Error updating cart item:', err);
    }
  };
  
  // Normalize cart item data to handle both API and legacy formats
  const normalizeCartItems = (items) => {
    return items.map(item => ({
      id: item.product_id || item.id,
      name: item.title || item.name,
      price: item.price,
      originalPrice: item.original_price || item.originalPrice,
      condition: item.condition_type || item.condition,
      seller: item.seller_name || item.seller,
      location: item.location,
      image: item.image_url || item.image,
      quantity: item.quantity
    }));
  };
  
  const normalizedCartItems = normalizeCartItems(cartItems);

  const subtotal = normalizedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = normalizedCartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Cart</h1>
        <span className="ml-2 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {normalizedCartItems.length} {normalizedCartItems.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loading message="Loading your cart..." />
        </div>
      ) : error ? (
        <div className="flex flex-col justify-center items-center h-64">
          <ErrorMessage message={error} />
          <button 
            onClick={() => fetchCartItems()} 
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : normalizedCartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <ArrowPathIcon className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Find some pre-loved treasures to add to your cart!</p>
          <Link to="/products" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {normalizedCartItems.map(item => (
                <div key={item.id} className="p-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex">
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                              item.condition === "Excellent" ? "bg-green-500" :
                              item.condition === "Good" ? "bg-green-500" :
                              item.condition === "Fair" ? "bg-yellow-500" : "bg-red-500"
                            }`}></span>
                            {item.condition} condition
                          </p>
                          <p className="text-xs text-gray-500 mt-1">Sold by: {item.seller} • {item.location}</p>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            disabled={item.quantity <= 1 || loading}
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            disabled={loading}
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">₹{item.price.toLocaleString()}</p>
                          {item.originalPrice > item.price && (
                            <p className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <button className="flex items-center text-green-600 hover:text-green-700 font-medium">
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Continue Shopping
              </button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sticky top-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">Order Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({normalizedCartItems.length} items)</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">You save</span>
                    <span className="font-medium text-green-600">₹{savings.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{shipping > 0 ? `₹${shipping}` : 'Free'}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <button 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg mt-6 transition-colors flex items-center justify-center"
                disabled={loading || normalizedCartItems.length === 0}
              >
                <ShieldCheckIcon className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </button>
              
              <div className="mt-4 text-xs text-gray-500 text-center">
                You won't be charged until the next step
              </div>
              
              {/* Sustainability message */}
              <div className="mt-6 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start">
                  <ArrowPathIcon className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-green-800">
                    By buying these pre-loved items, you've saved them from landfill and reduced your environmental impact. Thank you! ♻️
                  </p>
                </div>
              </div>
              
              {/* Trust badges */}
              <div className="mt-4 flex items-center justify-center space-x-4 text-gray-500">
                <div className="flex items-center text-xs">
                  <TruckIcon className="w-4 h-4 mr-1" />
                  <span>Secure delivery</span>
                </div>
                <div className="flex items-center text-xs">
                  <ShieldCheckIcon className="w-4 h-4 mr-1" />
                  <span>Buyer protection</span>
                </div>
              </div>
            </div>
            
            {/* Need help section */}
            <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-start">
                <InformationCircleIcon className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">Need help with your order?</h4>
                  <p className="text-xs text-gray-600 mt-1">Our support team is here to help with any questions about pre-loved items.</p>
                  <button className="text-xs text-green-600 hover:text-green-700 font-medium mt-2">
                    Contact support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}