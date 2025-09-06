import React, { useState, useRef, useEffect } from 'react';
import { 
  UserIcon, 
  Cog6ToothIcon, 
  HeartIcon, 
  ArrowRightOnRectangleIcon, 
  BellIcon,
  ShoppingBagIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const UserAvatar = ({ 
  user = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: null,
    seller: true,
    verified: true,
    itemsSold: 12,
    rating: 4.8
  },
  notificationCount = 3,
  messageCount = 2
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-800 relative border-2 border-white hover:border-amber-200 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {user.avatar ? (
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="font-semibold text-sm">{getInitials(user.name)}</span>
        )}
        
        {/* Notification indicator */}
        {(notificationCount > 0 || messageCount > 0) && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center">
            {notificationCount > 0 && (
              <span className="absolute bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
            {messageCount > 0 && (
              <span className="absolute bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center -right-2 -bottom-2">
                {messageCount}
              </span>
            )}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {/* User info section */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-semibold text-lg">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    getInitials(user.name)
                  )}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
                
                {user.seller && (
                  <div className="flex items-center mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      <ShieldCheckIcon className="h-3 w-3 mr-1" />
                      Seller
                    </span>
                    {user.verified && (
                      <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Verified
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick stats for sellers */}
          {user.seller && (
            <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
              <div className="flex justify-between text-xs">
                <div className="text-center">
                  <p className="font-medium text-gray-900">{user.itemsSold}</p>
                  <p className="text-gray-500">Items Sold</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-900">{user.rating}</p>
                  <p className="text-gray-500">Rating</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-900">98%</p>
                  <p className="text-gray-500">Positive</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation links */}
          <div className="py-1">
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <UserIcon className="h-5 w-5 mr-3 text-gray-400" />
              Your Profile
            </Link>
            
            <Link
              to="/listings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingBagIcon className="h-5 w-5 mr-3 text-gray-400" />
              Your Listings
            </Link>
            
            <Link
              to="/favorites"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <HeartIcon className="h-5 w-5 mr-3 text-gray-400" />
              Favorites
            </Link>
            
            <Link
              to="/messages"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 relative"
              onClick={() => setIsOpen(false)}
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5 mr-3 text-gray-400" />
              Messages
              {messageCount > 0 && (
                <span className="ml-auto bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {messageCount}
                </span>
              )}
            </Link>
            
            <Link
              to="/notifications"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 relative"
              onClick={() => setIsOpen(false)}
            >
              <BellIcon className="h-5 w-5 mr-3 text-gray-400" />
              Notifications
              {notificationCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Link>
          </div>

          {/* Seller specific options */}
          {user.seller && (
            <div className="py-1 border-t border-gray-100">
              <Link
                to="/sell"
                className="flex items-center px-4 py-2 text-sm text-amber-700 hover:bg-amber-50"
                onClick={() => setIsOpen(false)}
              >
                <PlusCircleIcon className="h-5 w-5 mr-3" />
                Sell an Item
              </Link>
            </div>
          )}

          {/* Settings and logout */}
          <div className="py-1 border-t border-gray-100">
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <Cog6ToothIcon className="h-5 w-5 mr-3 text-gray-400" />
              Settings
            </Link>
            
            <button
              onClick={() => {
                // Handle logout logic
                setIsOpen(false);
              }}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3 text-gray-400" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;