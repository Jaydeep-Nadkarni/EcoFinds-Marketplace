import { useState } from "react";
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
  ChevronRightIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: 1,
    title: "MacBook Pro 2019 - 13 inch",
    price: 25000,
    originalPrice: 45000,
    condition: "Excellent",
    category: "Electronics",
    description: "A well-maintained laptop suitable for everyday tasks, programming, and light creative work. Includes original charger and box.",
    specifications: {
      processor: "Intel Core i5 8th Gen",
      ram: "8GB DDR4",
      storage: "256GB SSD",
      display: "13.3-inch Retina Display",
      battery: "82% capacity remaining"
    },
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    ],
    seller: {
      name: "TechReviver",
      verified: true,
      rating: 4.8,
      reviews: 42,
      itemsSold: 87,
      joinDate: "2022-03-15",
      responseRate: "95%",
      location: "Bangalore, India"
    },
    stats: {
      views: 287,
      likes: 15,
      createdAt: "2023-10-10"
    },
    shipping: {
      options: [
        { type: "standard", cost: 99, time: "3-5 days" },
        { type: "express", cost: 199, time: "1-2 days" },
        { type: "pickup", cost: 0, time: "Instant" }
      ]
    },
    returnPolicy: "7-day money back guarantee"
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const savings = product.originalPrice - product.price;
  const savingsPercentage = Math.round((savings / product.originalPrice) * 100);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500 mb-6">
        <a href="#" className="hover:text-amber-600">Home</a>
        <span className="mx-2">/</span>
        <a href="#" className="hover:text-amber-600">Electronics</a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden h-80 md:h-96">
            <img 
              src={product.images[selectedImage]} 
              alt={product.title}
              className="w-full h-full object-contain"
            />
            
            {product.images.length > 1 && (
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
                product.condition === "Excellent" ? "bg-green-100 text-green-800" :
                product.condition === "Good" ? "bg-amber-100 text-amber-800" :
                product.condition === "Fair" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
              }`}>
                {product.condition} Condition
              </span>
            </div>
          </div>
          
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? "border-amber-500" : "border-transparent"
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.title}</h1>
            
            <div className="flex items-center mt-2 space-x-2">
              <span className="text-sm text-gray-500 capitalize">{product.category}</span>
              <span className="text-gray-300">•</span>
              <div className="flex items-center text-sm text-gray-500">
                <EyeIcon className="w-4 h-4 mr-1" />
                <span>{product.stats.views} views</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center text-sm text-gray-500">
                <HeartIcon className="w-4 h-4 mr-1" />
                <span>{product.stats.likes} likes</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > 0 && (
                <span className="ml-3 text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
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
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
            <div className="flex items-start">
              <ArrowPathIcon className="w-5 h-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                By choosing this pre-loved item, you're helping reduce electronic waste and extending the life of quality products. ♻️
              </p>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Specifications</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <dl className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
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
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Seller Information */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-medium text-gray-900 mb-3">Seller Information</h3>
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 font-semibold">
                {product.seller.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-medium text-gray-900">{product.seller.name}</span>
                  {product.seller.verified && (
                    <ShieldCheckIcon className="w-4 h-4 text-blue-500 ml-1" />
                  )}
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  <span>{product.seller.location}</span>
                </div>
                <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <StarIcon className="w-4 h-4 text-amber-500 mr-1" />
                    {product.seller.rating} ({product.seller.reviews} reviews)
                  </span>
                  <span>{product.seller.itemsSold} items sold</span>
                  <span>{product.seller.responseRate} response rate</span>
                </div>
                <button className="mt-3 text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center">
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
              <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
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
                {product.returnPolicy}
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
            {product.shipping.options.map((option, index) => (
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
            {product.returnPolicy}. Item must be in original condition with all accessories included.
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