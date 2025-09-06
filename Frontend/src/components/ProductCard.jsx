import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  HeartIcon, 
  ArrowPathIcon,
  EyeIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/outline";
import { 
  HeartIcon as HeartIconSolid 
} from "@heroicons/react/24/solid";

export default function ProductCard({ 
  id, 
  title, 
  price, 
  originalPrice, 
  condition, 
  category,
  seller,
  verifiedSeller,
  location,
  imageUrl,
  likes = 23,
  views = 156
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const conditionColors = {
    'Excellent': 'bg-green-100 text-green-800',
    'Good': 'bg-blue-100 text-blue-800',
    'Fair': 'bg-amber-100 text-amber-800',
    'Poor': 'bg-red-100 text-red-800'
  };

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleImageError = () => {
    setImageError(true);
  };

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden">
      <Link to={`/product/${id}`} className="block">
        {/* Image container */}
        <div className="relative h-48 overflow-hidden bg-gray-100 flex justify-center items-center">
          {imageUrl && !imageError ? (
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={handleImageError}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <ArrowPathIcon className="w-10 h-10 mb-2" />
              <span className="text-sm">Pre-loved item</span>
            </div>
          )}
          
          {/* Condition badge */}
          {condition && (
            <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${conditionColors[condition] || 'bg-gray-100 text-gray-800'}`}>
              {condition} condition
            </div>
          )}
          
          {/* Discount badge */}
          {discount > 0 && (
            <div className="absolute top-3 right-3 px-2 py-1 bg-amber-600 text-white rounded-full text-xs font-bold">
              {discount}% OFF
            </div>
          )}
          
          {/* Quick actions */}
          <button 
            onClick={toggleLike}
            className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-rose-50 transition-colors"
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            {isLiked ? (
              <HeartIconSolid className="w-5 h-5 text-rose-500" />
            ) : (
              <HeartIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Product details */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium text-gray-900 line-clamp-2 text-sm leading-tight group-hover:text-amber-700 transition-colors">
              {title}
            </h3>
          </div>
          
          {/* Category */}
          {category && (
            <p className="text-xs text-gray-500 mb-2 capitalize">{category}</p>
          )}
          
          {/* Pricing */}
          <div className="flex items-center mb-2">
            <span className="text-lg font-bold text-gray-900">₹{price.toLocaleString()}</span>
            {originalPrice && originalPrice > price && (
              <span className="ml-2 text-sm text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>
            )}
          </div>
          
          {/* Seller info */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-amber-800">{seller?.charAt(0) || 'U'}</span>
              </div>
              <div>
                <p className="text-xs text-gray-700">
                  {seller || 'Unknown seller'}
                  {verifiedSeller && (
                    <CheckBadgeIcon className="w-3 h-3 text-blue-500 inline ml-1" />
                  )}
                </p>
                {location && (
                  <p className="text-xs text-gray-500">{location}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Engagement metrics */}
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <div className="flex items-center">
              <HeartIcon className="w-3 h-3 mr-1" />
              <span>{likes}</span>
            </div>
            <div className="flex items-center">
              <EyeIcon className="w-3 h-3 mr-1" />
              <span>{views} views</span>
            </div>
          </div>
        </div>
        
        {/* Sustainability badge */}
        <div className="absolute top-40 left-3">
          <div className="bg-white rounded-full p-1 shadow-sm">
            <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
              <ArrowPathIcon className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      </Link>
      
      {/* Quick view overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
}