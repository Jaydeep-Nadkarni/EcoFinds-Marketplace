import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  HomeIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  PlusCircleIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon
} from "@heroicons/react/24/outline";

function Navbar({ onSearch, onFilter }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    condition: "",
    sortBy: "newest"
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  // Helper to check if link is active
  const isActive = (path) => location.pathname === path;

  // Base navigation items (always shown)
  const baseNavItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/products', label: 'Products', icon: ShoppingCartIcon },
  ];

  // Auth-required navigation items - conditionally show based on user role
  const authNavItems = [
    { path: '/cart', label: 'Cart', icon: ShoppingBagIcon },
    ...(user?.role === 'seller' || user?.role === 'admin' ? [
      { path: '/add-product', label: 'Sell', icon: PlusCircleIcon },
      { path: '/my-listings', label: 'Listings', icon: ClipboardDocumentListIcon },
    ] : []),
    { path: '/dashboard', label: 'Dashboard', icon: UserIcon },
  ];

  // Combine nav items based on auth state
  const navItems = isAuthenticated() 
    ? [...baseNavItems, ...authNavItems]
    : baseNavItems;
    
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (onSearch) onSearch(query);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...filters,
      [filterType]: value
    };
    setFilters(newFilters);
    if (onFilter) onFilter(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      category: "",
      priceRange: "",
      condition: "",
      sortBy: "newest"
    };
    setFilters(resetFilters);
    if (onFilter) onFilter(resetFilters);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-white shadow-sm px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">EF</span>
              </div>
              <span className="font-bold text-green-700 text-xl hidden sm:block">EcoFinds</span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-grow max-w-md mx-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Search for pre-loved items..."
              />
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive(path) 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Filter Button - Desktop */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="hidden md:flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5" />
            <span>Filters</span>
          </button>

          {/* Auth Button - Desktop */}
          {!isAuthenticated() ? (
            <div className="hidden md:block">
              <Link 
                to="/login"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="hidden md:block">
              <button 
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                Logout
              </button>
            </div>
          )}

          {/* Cart Icon - Mobile */}
          {isAuthenticated() && (
            <Link 
              to="/cart" 
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              <span className="absolute top-1 right-1 bg-green-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">3</span>
            </Link>
          )}
        </div>

        {/* Search Bar - Mobile */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Search for pre-loved items..."
            />
          </div>
        </div>

        {/* Filter Button - Mobile */}
        <div className="mt-3 flex justify-between items-center md:hidden">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-green-50 hover:text-green-600 transition-colors"
          >
            <FunnelIcon className="w-4 h-4" />
            <span>Filters</span>
          </button>
          
          <div className="text-xs text-gray-500">
            {filters.category || filters.priceRange || filters.condition ? 'Filters applied' : 'No filters'}
          </div>
        </div>
      </nav>

      {/* Filter Section */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 py-4 px-4 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-800">Filter Products</h3>
              <button 
                onClick={clearFilters}
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Clear all
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                <select 
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  <option value="clothing">Clothing</option>
                  <option value="electronics">Electronics</option>
                  <option value="furniture">Furniture</option>
                  <option value="books">Books</option>
                  <option value="sports">Sports</option>
                </select>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Price Range</label>
                <select 
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Any Price</option>
                  <option value="0-25">Under $25</option>
                  <option value="25-50">$25 to $50</option>
                  <option value="50-100">$50 to $100</option>
                  <option value="100+">Over $100</option>
                </select>
              </div>
              
              {/* Condition Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Condition</label>
                <select 
                  value={filters.condition}
                  onChange={(e) => handleFilterChange('condition', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Any Condition</option>
                  <option value="new">New</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>
              
              {/* Sort By Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Sort By</label>
                <select 
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
            
            {/* Active Filters Display */}
            {(filters.category || filters.priceRange || filters.condition) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {filters.category && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Category: {filters.category}
                    <button 
                      onClick={() => handleFilterChange('category', '')}
                      className="ml-1 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.priceRange && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Price: {filters.priceRange}
                    <button 
                      onClick={() => handleFilterChange('priceRange', '')}
                      className="ml-1 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.condition && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Condition: {filters.condition}
                    <button 
                      onClick={() => handleFilterChange('condition', '')}
                      className="ml-1 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Mobile Sidebar Menu */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">EF</span>
              </div>
              <span className="font-bold text-green-700 text-xl">EcoFinds</span>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 rounded-md text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          
          {!isAuthenticated && (
            <Link 
              to="/login"
              className="block w-full text-center py-2 px-4 text-sm font-medium rounded-full text-white bg-green-600 hover:bg-green-700 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors
                    ${isActive(path) 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-6 h-6" />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;