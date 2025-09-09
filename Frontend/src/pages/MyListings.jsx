import { useState } from "react";
import { 
  EyeIcon, 
  PencilIcon, 
  TrashIcon, 
  ArrowPathIcon,
  PlusIcon,
  ChartBarIcon,
  ArchiveBoxXMarkIcon,
  FunnelIcon,
  ArrowsPointingOutIcon
} from "@heroicons/react/24/outline";

export default function MyListings() {
  const [listings, setListings] = useState([
    {
      id: 1,
      title: "Vintage Leather Sofa",
      price: 2000,
      originalPrice: 8000,
      condition: "Good",
      status: "active",
      views: 124,
      likes: 8,
      createdAt: "2023-10-15",
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aaa4c4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      category: "Furniture"
    },
    {
      id: 2,
      title: "Canon DSLR Camera",
      price: 12500,
      originalPrice: 25000,
      condition: "Excellent",
      status: "sold",
      views: 287,
      likes: 15,
      createdAt: "2023-09-22",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      category: "Electronics",
      soldDate: "2023-10-18",
      soldPrice: 12000
    },
    {
      id: 3,
      title: "Designer Handbag",
      price: 3500,
      originalPrice: 12000,
      condition: "Fair",
      status: "draft",
      views: 0,
      likes: 0,
      createdAt: "2023-10-20",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      category: "Accessories"
    },
    {
      id: 4,
      title: "Vintage Record Player",
      price: 4500,
      originalPrice: 0,
      condition: "Good",
      status: "active",
      views: 67,
      likes: 3,
      createdAt: "2023-10-05",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      category: "Electronics"
    }
  ]);

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedItems, setSelectedItems] = useState([]);

  const filteredListings = listings.filter(listing => {
    if (filter === "all") return true;
    return listing.status === filter;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "popular") return b.views - a.views;
    return 0;
  });

  const toggleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === sortedListings.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(sortedListings.map(item => item.id));
    }
  };

  const deleteListing = (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      setListings(listings.filter(listing => listing.id !== id));
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    }
  };

  const deleteSelected = () => {
    if (selectedItems.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedItems.length} item(s)?`)) {
      setListings(listings.filter(listing => !selectedItems.includes(listing.id)));
      setSelectedItems([]);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", text: "Active" },
      sold: { color: "bg-blue-100 text-blue-800", text: "Sold" },
      draft: { color: "bg-gray-100 text-gray-800", text: "Draft" },
      expired: { color: "bg-red-100 text-red-800", text: "Expired" }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const getConditionBadge = (condition) => {
    const conditionConfig = {
      excellent: { color: "bg-green-100 text-green-800", text: "Excellent" },
      good: { color: "bg-green-100 text-green-800", text: "Good" },
      fair: { color: "bg-yellow-100 text-yellow-800", text: "Fair" },
      poor: { color: "bg-red-100 text-red-800", text: "Poor" }
    };
    
    const config = conditionConfig[condition.toLowerCase()] || conditionConfig.good;
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const totalListings = listings.length;
  const activeListings = listings.filter(l => l.status === "active").length;
  const soldListings = listings.filter(l => l.status === "sold").length;
  const draftListings = listings.filter(l => l.status === "draft").length;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <ArchiveBoxXMarkIcon className="w-8 h-8 text-green-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">My Listings</h1>
          <span className="ml-3 bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {totalListings} items
          </span>
        </div>
        
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors">
          <PlusIcon className="w-5 h-5 mr-1" />
          List New Item
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-green-100 mr-3">
              <ArchiveBoxXMarkIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Listed</p>
              <p className="text-xl font-bold text-gray-900">{totalListings}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-green-100 mr-3">
              <EyeIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-xl font-bold text-gray-900">{activeListings}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-blue-100 mr-3">
              <ChartBarIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sold</p>
              <p className="text-xl font-bold text-gray-900">{soldListings}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="rounded-full p-2 bg-gray-100 mr-3">
              <ArrowPathIcon className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Drafts</p>
              <p className="text-xl font-bold text-gray-900">{draftListings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex items-center">
              <FunnelIcon className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-700">Filter:</span>
            </div>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Listings</option>
              <option value="active">Active</option>
              <option value="sold">Sold</option>
              <option value="draft">Drafts</option>
            </select>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            {selectedItems.length > 0 && (
              <button 
                onClick={deleteSelected}
                className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium"
              >
                <TrashIcon className="w-4 h-4 mr-1" />
                Delete Selected ({selectedItems.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 gap-4">
        {sortedListings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <ArchiveBoxXMarkIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
            <p className="text-gray-500">
              {filter === "all" 
                ? "You haven't listed any items yet." 
                : `You don't have any ${filter} listings.`}
            </p>
            <button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center transition-colors">
              <PlusIcon className="w-4 h-4 mr-1" />
              List Your First Item
            </button>
          </div>
        ) : (
          sortedListings.map(listing => (
            <div key={listing.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex">
                <div className="flex-shrink-0 w-24 h-24 bg-gray-200 relative">
                  <img 
                    src={listing.image} 
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    {getStatusBadge(listing.status)}
                  </div>
                  
                  {listing.status === "sold" && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <span className="text-white font-bold text-sm bg-red-600 px-2 py-1 rounded">SOLD</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{listing.title}</h3>
                      <div className="flex items-center mt-1 space-x-2">
                        {getConditionBadge(listing.condition)}
                        <span className="text-xs text-gray-500 capitalize">{listing.category}</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <span className="text-lg font-bold text-gray-900">₹{listing.price.toLocaleString()}</span>
                        {listing.originalPrice > 0 && listing.originalPrice > listing.price && (
                          <span className="ml-2 text-sm text-gray-500 line-through">₹{listing.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(listing.id)}
                          onChange={() => toggleSelectItem(listing.id)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <EyeIcon className="w-4 h-4 mr-1" />
                        <span>{listing.views} views</span>
                      </div>
                      <div className="flex items-center">
                        <HeartIcon className="w-4 h-4 mr-1" />
                        <span>{listing.likes} likes</span>
                      </div>
                      <span>Listed on {new Date(listing.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" title="View listing">
                        <ArrowsPointingOutIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteListing(listing.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors" 
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {listing.status === "sold" && listing.soldDate && (
                    <div className="mt-2 text-xs text-green-600 font-medium">
                      Sold on {new Date(listing.soldDate).toLocaleDateString()} 
                      {listing.soldPrice && ` for ₹${listing.soldPrice.toLocaleString()}`}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bulk Actions Bar */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-3 flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-4">
            {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center space-x-2">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Activate
            </button>
            <button className="text-sm text-gray-600 hover:text-gray-800 font-medium">
              Deactivate
            </button>
            <button 
              onClick={deleteSelected}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper component for heart icon
function HeartIcon({ className = "w-5 h-5" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}