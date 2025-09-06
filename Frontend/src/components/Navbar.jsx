import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  HomeIcon,
  ShoppingCartIcon,
  PlusCircleIcon,
  ClipboardDocumentListIcon,
  UserIcon
} from "@heroicons/react/24/outline";
import SearchBar from "./SearchBar";

function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // Helper to check if link is active
  const isActive = (path) => location.pathname === path;

  // Base navigation items (always shown)
  const baseNavItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
  ];

  // Auth-required navigation items
  const authNavItems = [
    { path: '/add-product', label: 'Sell', icon: PlusCircleIcon },
    { path: '/cart', label: 'Cart', icon: ShoppingCartIcon },
    { path: '/my-listings', label: 'My Listings', icon: ClipboardDocumentListIcon },
    { path: '/profile', label: 'Profile', icon: UserIcon },
  ];

  // Combine nav items based on auth state
  const navItems = isAuthenticated 
    ? [...baseNavItems, ...authNavItems]
    : baseNavItems;

  return (
    <nav className="bg-white shadow px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src="/logo.png" alt="EcoFinds" className="h-8" />
          <span className="font-bold text-green-700 text-xl">EcoFinds</span>
        </Link>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
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

        {/* Search Bar */}
        <div className="flex-grow max-w-md">
          <SearchBar 
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Auth Button */}
        {!isAuthenticated && (
          <Link 
            to="/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center p-2 rounded-md text-xs
              ${isActive(path) 
                ? 'text-green-600' 
                : 'text-gray-600 hover:text-green-600'
              }`}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
