import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  TruckIcon, 
  CheckBadgeIcon, 
  StarIcon,
  ArrowPathIcon,
  CalendarIcon,
  ShoppingBagIcon,
  ChatBubbleLeftRightIcon,
  EyeIcon
} from "@heroicons/react/24/outline";
import orderService from "../services/orderService";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function PreviousPurchases() {
  const [filter, setFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from API
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getUserOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  // Normalize order data to handle both API and legacy formats
  const normalizeOrders = (ordersData) => {
    return ordersData.map(order => ({
      id: order.order_id || order.id,
      date: order.order_date || order.date,
      items: (order.items || []).map(item => ({
        id: item.product_id || item.id,
        name: item.product_name || item.title || item.name,
        price: item.price,
        originalPrice: item.original_price || item.originalPrice,
        condition: item.condition_type || item.condition,
        seller: item.seller_name || item.seller,
        image: item.image_url || item.image,
        status: item.status,
        deliveredDate: item.delivered_date || item.deliveredDate,
        rating: item.rating,
        review: item.review,
        category: item.category
      })),
      total: order.total_amount || order.total,
      status: order.status,
      deliveryMethod: order.delivery_method || order.deliveryMethod,
      trackingNumber: order.tracking_number || order.trackingNumber,
      seller: order.seller_name || order.seller
    }));
  };

  const normalizedOrders = normalizeOrders(orders);
  
  // Static data for fallback/demo purposes
  const staticPurchases = [
    {
      id: "ORD-12345",
      date: "2023-10-15",
      items: [
        {
          id: 1,
          name: "Vintage Leather Bound Book Collection",
          price: 200,
          originalPrice: 500,
          condition: "Good",
          seller: "BookWormTreasures",
          image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
          status: "delivered",
          deliveredDate: "2023-10-18",
          rating: 5,
          review: "Beautiful collection, exactly as described!",
          category: "Books"
        }
      ],
      total: 200,
      status: "delivered",
      deliveryMethod: "Standard Shipping",
      trackingNumber: "TRK-789456123",
      seller: "BookWormTreasures"
    },
    {
      id: "ORD-12346",
      date: "2023-10-10",
      items: [
        {
          id: 2,
          name: "Solid Wood Dining Table",
          price: 5000,
          originalPrice: 12000,
          condition: "Excellent",
          seller: "VintageHomeFinds",
          image: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
          status: "delivered",
          deliveredDate: "2023-10-13",
          rating: 4,
          review: "Great quality, minor scratch but overall happy!",
          category: "Furniture"
        },
        {
          id: 3,
          name: "Set of 4 Dining Chairs",
          price: 2000,
          originalPrice: 6000,
          condition: "Good",
          seller: "VintageHomeFinds",
          image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
          status: "delivered",
          deliveredDate: "2023-10-13",
          rating: 4,
          review: "Comfortable and sturdy!",
          category: "Furniture"
        }
      ],
      total: 7000,
      status: "delivered",
      deliveryMethod: "Local Pickup",
      seller: "VintageHomeFinds"
    },
    {
      id: "ORD-12347",
      date: "2023-10-05",
      items: [
        {
          id: 4,
          name: "Wireless Bluetooth Headphones",
          price: 1500,
          originalPrice: 4000,
          condition: "Excellent",
          seller: "TechReviver",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
          status: "delivered",
          deliveredDate: "2023-10-08",
          rating: null,
          review: null,
          category: "Electronics"
        }
      ],
      total: 1500,
      status: "delivered",
      deliveryMethod: "Standard Shipping",
      trackingNumber: "TRK-321654987",
      seller: "TechReviver"
    }
  ];

  // Determine which data to use - API data or fallback to static data if needed
  const purchases = normalizedOrders.length > 0 ? normalizedOrders : staticPurchases;

  // Filter purchases based on selected filter
  const filteredPurchases = filter === "all" 
    ? purchases 
    : purchases.filter(purchase => purchase.status === filter);

  const getStatusBadge = (status) => {
    const statusConfig = {
      delivered: { color: "bg-green-100 text-green-800", icon: CheckBadgeIcon, text: "Delivered" },
      shipped: { color: "bg-blue-100 text-blue-800", icon: TruckIcon, text: "Shipped" },
      processing: { color: "bg-green-100 text-green-800", icon: ArrowPathIcon, text: "Processing" },
      cancelled: { color: "bg-red-100 text-red-800", icon: CheckBadgeIcon, text: "Cancelled" }
    };
    
    const config = statusConfig[status] || statusConfig.processing;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </span>
    );
  };

  const getConditionBadge = (condition) => {
    const conditionConfig = {
      excellent: { color: "bg-green-100 text-green-800", text: "Excellent" },
      good: { color: "bg-green-100 text-green-800", text: "Good" },
      fair: { color: "bg-yellow-100 text-yellow-800", text: "Fair" },
      poor: { color: "bg-red-100 text-red-800", text: "Poor" }
    };
    
    const config = conditionConfig[condition.toLowerCase()] || conditionConfig.good;
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-green-500 fill-green-500" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const totalSavings = purchases.reduce((total, purchase) => {
    return total + purchase.items.reduce((itemTotal, item) => {
      return itemTotal + (item.originalPrice - item.price);
    }, 0);
  }, 0);

  const totalItems = purchases.reduce((total, purchase) => total + purchase.items.length, 0);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex items-center mb-6">
        <ShoppingBagIcon className="w-8 h-8 text-green-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">Purchase History</h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-green-100 mr-3">
              <ShoppingBagIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-xl font-bold text-gray-900">{purchases.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-green-100 mr-3">
              <CheckBadgeIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Items Purchased</p>
              <p className="text-xl font-bold text-gray-900">{totalItems}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-blue-100 mr-3">
              <ArrowPathIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Savings</p>
              <p className="text-xl font-bold text-gray-900">₹{totalSavings.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sustainability Impact */}
      <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
        <div className="flex items-start">
          <ArrowPathIcon className="w-6 h-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-green-800 mb-1">Your Sustainability Impact ♻️</h3>
            <p className="text-sm text-green-700">
              By purchasing {totalItems} pre-loved items, you've saved them from landfill and reduced your carbon footprint. 
              Thank you for choosing sustainable shopping!
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-3">Filter by:</span>
          <div className="flex flex-wrap gap-2">
            {["all", "delivered", "shipped", "processing", "cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filter === status
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loading message="Loading your orders..." />
          </div>
        ) : error ? (
          <div className="flex flex-col justify-center items-center h-64">
            <ErrorMessage message={error} />
            <button 
              onClick={() => fetchOrders()} 
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredPurchases.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <ShoppingBagIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No purchases found</h3>
            <p className="text-gray-500">
              {filter === "all" 
                ? "You haven't made any purchases yet." 
                : `You don't have any ${filter} purchases.`}
            </p>
            <Link to="/products" className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors inline-block">
              Start Shopping
            </Link>
          </div>
        ) : (
          filteredPurchases.map((purchase) => (
            <div key={purchase.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Order Header */}
              <div className="border-b border-gray-100 p-4 bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <span className="font-medium text-gray-900 mr-3">Order {purchase.id}</span>
                    {getStatusBadge(purchase.status)}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <span>Ordered on {new Date(purchase.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4">
                {purchase.items.map((item) => (
                  <div key={item.id} className="flex py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <div className="flex items-center mt-1 space-x-2">
                            {getConditionBadge(item.condition)}
                            <span className="text-xs text-gray-500 capitalize">{item.category}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Sold by: {item.seller}</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">₹{item.price.toLocaleString()}</p>
                          {item.originalPrice > 0 && (
                            <p className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Item Status and Actions */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center text-xs text-gray-500">
                          {item.status === "delivered" && (
                            <>
                              <CheckBadgeIcon className="w-4 h-4 text-green-600 mr-1" />
                              <span>Delivered on {new Date(item.deliveredDate).toLocaleDateString()}</span>
                            </>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          {item.rating ? (
                            <div className="flex items-center">
                              {renderStars(item.rating)}
                              <span className="ml-1 text-xs text-gray-500">({item.rating})</span>
                            </div>
                          ) : (
                            <button className="text-xs text-green-600 hover:text-green-700 font-medium">
                              <ChatBubbleLeftRightIcon className="w-4 h-4 inline mr-1" />
                              Write Review
                            </button>
                          )}
                          <button className="text-xs text-gray-500 hover:text-gray-700">
                            <EyeIcon className="w-4 h-4 inline mr-1" />
                            View Item
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    {purchase.deliveryMethod} • {purchase.items.length} item{purchase.items.length !== 1 ? 's' : ''}
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-600 mr-2">Total:</span>
                    <span className="font-semibold text-gray-900">₹{purchase.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}