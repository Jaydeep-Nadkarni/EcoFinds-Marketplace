import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import productService from "../services/productService";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { 
  HeartIcon, 
  ShieldCheckIcon, 
  MapPinIcon, 
  StarIcon,
  ArrowPathIcon,
  TruckIcon,
  ChatBubbleLeftIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShoppingCartIcon,
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PlusIcon,
  CheckBadgeIcon,
  TagIcon,
  CalendarIcon,
  ClockIcon,
  ShareIcon,
  FlagIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const data = await productService.getProductById(productId);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch product details');
        console.error('Error fetching product details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  // Normalize product data to handle both API and legacy formats
  const normalizeProduct = (product) => {
    if (!product) return null;
    
    return {
      id: product.product_id || product.id,
      title: product.title,
      price: product.price,
      originalPrice: product.original_price || product.originalPrice,
      condition: product.condition_type || product.condition,
      category: product.category_name || product.category,
      description: product.description,
      specifications: product.specifications || {},
      images: product.images || [
        product.image_url || product.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'
      ],
      seller: {
        name: product.seller_name || product.seller?.name || 'Unknown Seller',
        verified: product.seller_verified || product.seller?.verified || false,
        rating: product.seller_rating || product.seller?.rating || 0,
        reviews: product.seller_reviews || product.seller?.reviews || 0,
        itemsSold: product.seller_items_sold || product.seller?.itemsSold || 0,
        joinDate: product.seller_join_date || product.seller?.joinDate || '',
        responseRate: product.seller_response_rate || product.seller?.responseRate || '',
        location: product.location || product.seller?.location || ''
      },
      stats: {
        views: product.views || product.stats?.views || 0,
        likes: product.likes || product.stats?.likes || 0,
        daysListed: product.days_listed || product.stats?.daysListed || 0
      },
      shipping: {
        options: product.shipping_options || product.shipping?.options || [
          { type: "standard", cost: 100, time: "3-5 days" },
          { type: "express", cost: 250, time: "1-2 days" },
          { type: "pickup", cost: 0, time: "Schedule pickup" }
        ]
      },
      returnPolicy: product.return_policy || product.returnPolicy || "7-day returns accepted"
    };
  };
  
  const normalizedProduct = normalizeProduct(product);

  const nextImage = () => {
    if (!normalizedProduct || !normalizedProduct.images || normalizedProduct.images.length === 0) return;
    setSelectedImage((prev) => (prev + 1) % normalizedProduct.images.length);
  };

  const prevImage = () => {
    if (!normalizedProduct || !normalizedProduct.images || normalizedProduct.images.length === 0) return;
    setSelectedImage((prev) => (prev - 1 + normalizedProduct.images.length) % normalizedProduct.images.length);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-96">
          <Loading message="Loading product details..." />
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col justify-center items-center h-96">
          <ErrorMessage message={error} />
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  if (!normalizedProduct) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-96">
          <p className="text-lg text-gray-600">Product not found</p>
        </div>
      </div>
    );
  }

  const savings = normalizedProduct.originalPrice - normalizedProduct.price;
  const savingsPercentage = Math.round((savings / normalizedProduct.originalPrice) * 100);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500 mb-6">
        <a href="#" className="hover:text-green-600">Home</a>
        <span className="mx-2">/</span>
        <a href="#" className="hover:text-green-600">Electronics</a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{normalizedProduct.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden h-80 md:h-96">
            <img 
              src={normalizedProduct.images[selectedImage]} 
              alt={normalizedProduct.title}
              className="w-full h-full object-contain"
            />
            
            {normalizedProduct.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </>
            )}
            
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-rose-50 transition-colors"
            >
              {isLiked ? (
                <HeartIconSolid className="w-6 h-6 text-rose-500" />
              ) : (
                <HeartIcon className="w-6 h-6 text-gray-600" />
              )}
            </button>
            
            <div className="absolute top-4 left-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                normalizedProduct.condition === "Excellent" ? "bg-green-100 text-green-800" :
                normalizedProduct.condition === "Good" ? "bg-green-100 text-green-800" :
                normalizedProduct.condition === "Fair" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
              }`}>
                {normalizedProduct.condition} Condition
              </span>
            </div>
          </div>
          
          {normalizedProduct.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {normalizedProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? "border-green-500" : "border-transparent"
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{normalizedProduct.title}</h1>
            
            <div className="flex items-center mt-2 space-x-2">
              <span className="text-sm text-gray-500 capitalize">{normalizedProduct.category}</span>
              <span className="text-gray-300">•</span>
              <div className="flex items-center text-sm text-gray-500">
                <EyeIcon className="w-4 h-4 mr-1" />
                <span>{normalizedProduct.stats.views} views</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center text-sm text-gray-500">
                <HeartIcon className="w-4 h-4 mr-1" />
                <span>{normalizedProduct.stats.likes} likes</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">₹{normalizedProduct.price.toLocaleString()}</span>
              {normalizedProduct.originalPrice > 0 && (
                <span className="ml-3 text-xl text-gray-500 line-through">₹{normalizedProduct.originalPrice.toLocaleString()}</span>
              )}
            </div>
            
            {savings > 0 && (
              <div className="flex items-center">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                  Save ₹{savings.toLocaleString()} ({savingsPercentage}%)
                </span>
              </div>
            )}
          </div>

          {/* Sustainability Badge */}
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex items-start">
              <ArrowPathIcon className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-green-800">
                By choosing this pre-loved item, you're helping reduce electronic waste and extending the life of quality products. ♻️
              </p>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Specifications</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <dl className="space-y-2">
                {Object.entries(normalizedProduct.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <dt className="text-sm text-gray-600 capitalize">{key}:</dt>
                    <dd className="text-sm font-medium text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700">{normalizedProduct.description}</p>
          </div>

          {/* Seller Information */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-medium text-gray-900 mb-3">Seller Information</h3>
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-semibold">
                {normalizedProduct.seller.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-medium text-gray-900">{normalizedProduct.seller.name}</span>
                  {normalizedProduct.seller.verified && (
                    <ShieldCheckIcon className="w-4 h-4 text-blue-500 ml-1" />
                  )}
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  <span>{normalizedProduct.seller.location}</span>
                </div>
                <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <StarIcon className="w-4 h-4 text-green-500 mr-1" />
                    {normalizedProduct.seller.rating} ({normalizedProduct.seller.reviews} reviews)
                  </span>
                  <span>{normalizedProduct.seller.itemsSold} items sold</span>
                  <span>{normalizedProduct.seller.responseRate} response rate</span>
                </div>
                <button className="mt-3 text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
                  <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
                  Contact Seller
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-200 pt-4 space-y-3">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-3 py-1 text-gray-800">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                <TruckIcon className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              <button className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                Buy Now
              </button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                <ShieldCheckIcon className="w-4 h-4 inline mr-1" />
                {normalizedProduct.returnPolicy}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping & Returns Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Shipping Options</h4>
          <div className="space-y-2">
            {normalizedProduct.shipping.options.map((option, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600 capitalize">{option.type}:</span>
                <span className="font-medium">
                  {option.cost === 0 ? 'Free' : `₹${option.cost}`} • {option.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Return Policy</h4>
          <p className="text-sm text-gray-600">
            {normalizedProduct.returnPolicy}. Item must be in original condition with all accessories included.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Sustainability Impact</h4>
          <p className="text-sm text-gray-600">
            This purchase prevents electronic waste and reduces the environmental impact of manufacturing new devices.
          </p>
        </div>
      </div>
    </div>
  );
}