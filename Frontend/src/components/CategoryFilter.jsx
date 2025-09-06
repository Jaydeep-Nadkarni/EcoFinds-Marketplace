import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const categories = [
  { name: "All", icon: "🛍️", count: 128 },
  { name: "Clothing", icon: "👕", count: 42 },
  { name: "Electronics", icon: "📱", count: 36 },
  { name: "Books", icon: "📚", count: 24 },
  { name: "Home", icon: "🏠", count: 31 },
  { name: "Beauty", icon: "💄", count: 19 },
  { name: "Sports", icon: "⚽", count: 15 },
  { name: "Toys", icon: "🧸", count: 22 }
];

const CategoryFilter = ({ selected, onSelect }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Shop by Category</h2>
        <div className="relative md:hidden">
          <button
            className="flex items-center justify-between w-48 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <span>{selected || "Select Category"}</span>
            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
          </button>
          
          {showMobileMenu && (
            <div className="absolute right-0 z-10 w-48 mt-1 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="py-1">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    className={`block w-full text-left px-4 py-2 text-sm ${selected === cat.name ? "bg-indigo-100 text-indigo-700" : "text-gray-700 hover:bg-gray-100"}`}
                    onClick={() => {
                      onSelect(cat.name);
                      setShowMobileMenu(false);
                    }}
                  >
                    <span className="mr-2">{cat.icon}</span>
                    {cat.name}
                    <span className="ml-2 text-xs text-gray-500">({cat.count})</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hidden md:block">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`flex items-center px-4 py-2 rounded-full border transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 ${selected === cat.name 
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md" 
                : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400 hover:shadow-sm"}`}
              onClick={() => onSelect(cat.name)}
            >
              <span className="mr-2 text-base">{cat.icon}</span>
              <span className="font-medium">{cat.name}</span>
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${selected === cat.name 
                ? "bg-indigo-700 text-indigo-100" 
                : "bg-gray-100 text-gray-600"}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected category indicator */}
      {selected && selected !== "All" && (
        <div className="flex items-center mt-4">
          <span className="text-sm text-gray-600">Showing products in:</span>
          <span className="ml-2 px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full">
            {selected}
          </span>
          <button 
            className="ml-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            onClick={() => onSelect("All")}
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;