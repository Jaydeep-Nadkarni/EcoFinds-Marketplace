import { useState } from "react";
import { 
  TrashIcon, 
  ArrowLeftIcon, 
  ShieldCheckIcon,
  ArrowPathIcon,
  TruckIcon,
  InformationCircleIcon 
} from "@heroicons/react/24/outline";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Vintage Wooden Chair",
      price: 500,
      originalPrice: 1200,
      condition: "Good",
      seller: "EcoFurnitureLover",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      quantity: 1
    },
    {
      id: 2,
      name: "Pre-owned Smartphone",
      price: 8500,
      originalPrice: 15000,
      condition: "Excellent",
      seller: "TechReviver",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      quantity: 1
    }
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Cart</h1>
        <span className="ml-2 bg-amber-100 text-amber-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <ArrowPathIcon className="w-12 h-12 text-amber-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Find some pre-loved treasures to add to your cart!</p>
          <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {cartItems.map(item => (
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
                              item.condition === "Good" ? "bg-amber-500" :
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
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
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
              <button className="flex items-center text-amber-600 hover:text-amber-700 font-medium">
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
                  <span className="text-gray-600">Subtotal</span>
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
              
              <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 rounded-lg mt-6 transition-colors flex items-center justify-center">
                <ShieldCheckIcon className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </button>
              
              <div className="mt-4 text-xs text-gray-500 text-center">
                You won't be charged until the next step
              </div>
              
              {/* Sustainability message */}
              <div className="mt-6 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-start">
                  <ArrowPathIcon className="w-5 h-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-amber-800">
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
                <InformationCircleIcon className="w-5 h-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">Need help with your order?</h4>
                  <p className="text-xs text-gray-600 mt-1">Our support team is here to help with any questions about pre-loved items.</p>
                  <button className="text-xs text-amber-600 hover:text-amber-700 font-medium mt-2">
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