import React, { useState } from "react";
import { 
  FunnelIcon,
  XMarkIcon,
  MapPinIcon
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const categories = [
  { id: "all", name: "All Categories" },
  { id: "clothing", name: "Clothing & Accessories" },
  { id: "electronics", name: "Electronics & Gadgets" },
  { id: "home", name: "Home & Furniture" },
  { id: "books", name: "Books & Media" },
  { id: "sports", name: "Sports & Outdoor" },
  { id: "toys", name: "Toys & Games" },
  { id: "other", name: "Other Items" }
];

const conditions = [
  { id: "any", name: "Any Condition" },
  { id: "excellent", name: "Excellent" },
  { id: "good", name: "Good" },
  { id: "fair", name: "Fair" },
  { id: "poor", name: "Poor" }
];

const SearchBar = ({ value, onChange, onSearch }) => {
  const [expanded, setExpanded] = useState(false);
  const [category, setCategory] = useState("all");
  const [condition, setCondition] = useState("any");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      query: value,
      category,
      condition,
      location,
      priceMin: priceRange.min,
      priceMax: priceRange.max
    });
  };

  const clearFilters = () => {
    setCategory("all");
    setCondition("any");
    setLocation("");
    setPriceRange({ min: "", max: "" });
  };

  const hasActiveFilters = category !== "all" || condition !== "any" || location || priceRange.min || priceRange.max;

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-stretch">
          {/* Category dropdown */}
          <div className="relative md:w-48 flex-shrink-0">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-l-lg md:rounded-r-none border-r-0 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-700 cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 极速电竞官网 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Search input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Find pre-loved items near you..."
              value={value}
              onChange={onChange}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 md:rounded-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Search button */}
          <button
            type="submit"
            className="px-4 py-2.5 bg-green-600 text-white font-medium rounded-r-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Search
          </button>

          {/* Filter toggle button */}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className={`px-3 py-2.5 ml-2 border border-gray-300 rounded-lg flex items-center ${hasActiveFilters ? 'bg-green-100 text-green-700 border-green-300' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            <FunnelIcon className="h-5 w-5 mr-1" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1.5 bg-green-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                !
              </span>
            )}
          </button>
        </div>

        {/* Expanded filters */}
        {expanded && (
          <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Refine Your Search</h3>
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Clear all
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Condition filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {conditions.map((cond) => (
                    <option key={cond.id} value={cond.id}>{cond.name}</option>
                  ))}
                </select>
              </div>

              {/* Price range filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                    className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                    className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              {/* Sort by filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="relevance">Relevance</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                onClick={() => setExpanded(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          {category !== "all" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Category: {categories.find(c => c.id === category)?.name}
              <button
                onClick={() => setCategory("all")}
                className="ml-1.5 rounded-full flex-shrink-0 flex items-center justify-center text-green-600 hover:bg-green-200 hover:text-green-900"
              >
                <XMarkIcon className="h-3.5 w-3.5" />
              </button>
            </span>
          )}
          
          {condition !== "any" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Condition: {conditions.find(c => c.id === condition)?.name}
              <button
                onClick={() => setCondition("any")}
                className="ml-1.5 rounded-full flex-shrink-0 flex items-center justify-center text-blue-600 hover:bg-blue-200 hover:text-blue-900"
              >
                <XMarkIcon className="h-3.5 w-3.5" />
              </button>
            </span>
          )}
          
          {location && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Location: {location}
              <button
                onClick={() => setLocation("")}
                className="ml-1.5 rounded-full flex-shrink-0 flex items-center justify-center text-green-600 hover:bg-green-200 hover:text-green-900"
              >
                <XMarkIcon className="h-3.5 w-3.5" />
              </button>
            </span>
          )}
          
          {(priceRange.min || priceRange.max) && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Price: {priceRange.min || "0"} - {priceRange.max || "∞"}
              <button
                onClick={() => setPriceRange({ min: "", max: "" })}
                className="ml-1.5 rounded-full flex-shrink-0 flex items-center justify-center text-purple-600 hover:bg-purple-200 hover:text-purple-900"
              >
                <XMarkIcon className="h-3.5 w-3.5" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;