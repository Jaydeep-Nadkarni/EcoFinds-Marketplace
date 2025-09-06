import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { 
  PlusIcon, 
  FunnelIcon, 
  ArrowsUpDownIcon,
  ViewColumnsIcon,
  Squares2X2Icon
} from "@heroicons/react/24/outline";

const dummyProducts = [
  { 
    id: 1, 
    title: "Vintage Wooden Chair", 
    price: 500,
    originalPrice: 1200,
    condition: "Good",
    seller: "EcoFurnitureLover",
    verifiedSeller: true,
    location: "Mumbai",
    imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    likes: 8,
    views: 124,
    category: "Furniture"
  },
  { 
    id: 2, 
    title: "MacBook Pro 2019", 
    price: 25000,
    originalPrice: 45000,
    condition: "Excellent",
    seller: "TechReviver",
    verifiedSeller: true,
    location: "Bangalore",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    likes: 15,
    views: 287,
    category: "Electronics"
  },
  { 
    id: 3, 
    title: "Leather Jacket", 
    price: 1200,
    originalPrice: 3000,
    condition: "Fair",
    seller: "FashionRecycler",
    verifiedSeller: false,
    location: "Delhi",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    likes: 6,
    views: 89,
    category: "Clothing"
  },
  { 
    id: 4, 
    title: "Camera Lens 50mm", 
    price: 3500,
    originalPrice: 6000,
    condition: "Excellent",
    seller: "PhotoGearHub",
    verifiedSeller: true,
    location: "Chennai",
    imageUrl: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    likes: 12,
    views: 156,
    category: "Electronics"
  },
  { 
    id: 5, 
    title: "Designer Handbag", 
    price: 1800,
    originalPrice: 5000,
    condition: "Good",
    seller: "LuxuryPreLoved",
    verifiedSeller: true,
    location: "Mumbai",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    likes: 9,
    views: 142,
    category: "Accessories"
  },
  { 
    id: 6, 
    title: "Vinyl Record Collection", 
    price: 2200,
    originalPrice: 3500,
    condition: "Good",
    seller: "RetroMelodies",
    verifiedSeller: false,
    location: "Kolkata",
    imageUrl: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    likes: 7,
    views: 98,
    category: "Entertainment"
  }
];

const categories = [
  { id: "all", name: "All Categories" },
  { id: "electronics", name: "Electronics" },
  { id: "furniture", name: "Furniture" },
  { id: "clothing", name: "Clothing & Accessories" },
  { id: "home", name: "Home & Kitchen" },
  { id: "books", name: "Books & Media" },
  { id: "sports", name: "Sports & Outdoor" },
  { id: "other", name: "Other" }
];

const conditions = [
  { id: "any", name: "Any Condition" },
  { id: "excellent", name: "Excellent" },
  { id: "good", name: "Good" },
  { id: "fair", name: "Fair" },
  { id: "poor", name: "Poor" }
];

const sortOptions = [
  { id: "newest", name: "Newest First" },
  { id: "price-low", name: "Price: Low to High" },
  { id: "price-high", name: "Price: High to Low" },
  { id: "popular", name: "Most Popular" }
];

export default function ProductListing() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("any");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = dummyProducts.filter(product => {
    // Category filter
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false;
    }
    
    // Condition filter
    if (selectedCondition !== "any" && product.condition.toLowerCase() !== selectedCondition) {
      return false;
    }
    
    // Price range filter
    if (priceRange.min && product.price < parseInt(priceRange.min)) {
      return false;
    }
    
    if (priceRange.max && product.price > parseInt(priceRange.max)) {
      return false;
    }
    
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "newest") return b.id - a.id;
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "popular") return b.views - a.views;
    return 0;
  });

  const totalSavings = dummyProducts.reduce((total, product) => {
    return total + (product.originalPrice - product.price);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Discover Pre-Loved Treasures</h1>
          <p className="text-gray-600 mt-1">
            {dummyProducts.length} items saving ₹{totalSavings.toLocaleString()} from landfill
          </p>
        </div>
        
        <Link
          to="/add-product"
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-lg flex items-center mt-4 md:mt-0 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-1" />
          List an Item
        </Link>
      </div>

      {/* Sustainability Banner */}
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-6">
        <div className="flex items-start">
          <div className="rounded-full bg-amber-100 p-2 mr-3 flex-shrink-0">
            <span className="text-amber-600 text-sm font-bold">♻️</span>
          </div>
          <div>
            <h3 className="font-medium text-amber-800">Shop Sustainably</h3>
            <p className="text-sm text-amber-700 mt-1">
              Every purchase gives quality items a new home and reduces waste. You've already saved {dummyProducts.length} items from landfill!
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
            >
              <FunnelIcon className="w-4 h-4 mr-1" />
              Filters
              {(selectedCategory !== "all" || selectedCondition !== "any" || priceRange.min || priceRange.max) && (
                <span className="ml-1.5 bg-amber-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                  !
                </span>
              )}
            </button>

            <div className="hidden md:block">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="hidden md:block">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 hidden md:block">
              {sortedProducts.length} of {dummyProducts.length} items
            </span>
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md ${viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-500"}`}
                aria-label="Grid view"
              >
                <Squares2X2Icon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md ${viewMode === "list" ? "bg-white shadow-sm" : "text-gray-500"}`}
                aria-label="List view"
              >
                <ViewColumnsIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <select 
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  {conditions.map(condition => (
                    <option key={condition.id} value={condition.id}>{condition.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button 
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedCondition("any");
                  setPriceRange({ min: "", max: "" });
                }}
                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                Clear all filters
              </button>
              
              <button 
                onClick={() => setShowFilters(false)}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile category and sort controls */}
      <div className="flex md:hidden gap-2 mb-4 overflow-x-auto pb-2">
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>

        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        >
          {sortOptions.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">
          Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'item' : 'items'}
        </p>
        
        {sortedProducts.length > 0 && (
          <div className="flex items-center text-sm text-gray-500">
            <ArrowsUpDownIcon className="w-4 h-4 mr-1" />
            Sorted by {sortOptions.find(opt => opt.id === sortBy)?.name}
          </div>
        )}
      </div>

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FunnelIcon className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your filters to find more pre-loved treasures.</p>
          <button 
            onClick={() => {
              setSelectedCategory("all");
              setSelectedCondition("any");
              setPriceRange({ min: "", max: "" });
            }}
            className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className={`grid ${
          viewMode === "grid" 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        } gap-6`}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} {...product} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
}