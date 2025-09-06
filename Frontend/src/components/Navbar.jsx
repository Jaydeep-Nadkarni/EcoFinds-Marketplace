import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  ShoppingCartIcon, 
  UserIcon, 
  MagnifyingGlassIcon, 
  Bars3Icon,
  XMarkIcon,
  ArrowPathIcon,
  HeartIcon,
  EyeIcon
} from "@heroicons/react/24/outline";

// Updated Navbar for Second-Hand Platform
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartItems] = useState(3);

  return (
    <>
      <div className="bg-amber-600 text-white text-center py-2 px-4 text-sm">
        ♻️ Sustainable shopping - Give pre-loved items a new home! 
      </div>

      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                className="md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
              
              <Link to="/" className="flex items-center ml-2 md:ml-0">
                <div className="relative">
                  <svg className="w-8 h-8 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <ArrowPathIcon className="w-4 h-4 text-amber-800 absolute -bottom-1 -right-1 bg-amber-100 rounded-full p-0.5" />
                </div>
                <span className="font-bold text-xl text-gray-800">ReCircle</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200">
                Home
              </Link>
              <div className="relative group">
                <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200 flex items-center">
                  Categories
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <Link to="/category/clothing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">Clothing & Accessories</Link>
                    <Link to="/category/electronics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">Electronics & Gadgets</Link>
                    <Link to="/category/home" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">Home & Furniture</Link>
                    <Link to="/category/books" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50">Books & Media</Link>
                  </div>
                </div>
              </div>
              <Link to="/sell" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 transition-colors duration-200 flex items-center">
                <ArrowPathIcon className="h-4 w-4 mr-1" />
                Sell Items
              </Link>
              <Link to="/deals" className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200">
                Today's Deals
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button className="md:hidden rounded-md p-2 text-gray-700 hover:bg-amber-50 focus:outline-none" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>

              <div className="hidden md:block relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" placeholder="Find pre-loved items..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 w-64 transition-colors duration-200" />
              </div>

              <Link to="/favorites" className="hidden md:block relative rounded-md p-2 text-gray-700 hover:bg-amber-50 transition-colors duration-200">
                <HeartIcon className="h-6 w-6" />
              </Link>

              <Link to="/cart" className="relative rounded-md p-2 text-gray-700 hover:bg-amber-50 transition-colors duration-200">
                <ShoppingCartIcon className="h-6 w-6" />
                {cartItems > 0 && <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItems}</span>}
              </Link>

              <Link to="/login" className="hidden md:block rounded-md p-2 text-gray-700 hover:bg-amber-50 transition-colors duration-200">
                <UserIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {isSearchOpen && (
            <div className="md:hidden pb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" placeholder="Find pre-loved items..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 w-full transition-colors duration-200" />
              </div>
            </div>
          )}

          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-amber-50 rounded-md">
                <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-amber-100" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <div className="pt-2 pb-1">
                  <p className="px-3 text-xs font-semibold text-amber-800 uppercase tracking-wider">Categories</p>
                  <Link to="/category/clothing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-amber-100" onClick={() => setIsMenuOpen(false)}>
                    Clothing & Accessories
                  </Link>
                  <Link to="/category/electronics" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-amber-100" onClick={() => setIsMenuOpen(false)}>
                    Electronics & Gadgets
                  </Link>
                  <Link to="/category/home" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-amber-100" onClick={() => setIsMenuOpen(false)}>
                    Home & Furniture
                  </Link>
                </div>
                <Link to="/sell" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-amber-600 hover:bg-amber-700 mt-2" onClick={() => setIsMenuOpen(false)}>
                  Sell Your Items
                </Link>
                <Link to="/deals" className="block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-100" onClick={() => setIsMenuOpen(false)}>
                  Today's Deals
                </Link>
                <div className="pt-4 border-t border-amber-200">
                  <Link to="/favorites" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-amber-100" onClick={() => setIsMenuOpen(false)}>
                    My Favorites
                  </Link>
                  <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-amber-700 hover:bg-amber-100" onClick={() => setIsMenuOpen(false)}>
                    Login / Sign Up
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
