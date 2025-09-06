import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import productService from "../services/productService";
import categoryService from "../services/categoryService";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";
import { 
  PlusIcon, 
  FunnelIcon, 
  ArrowsUpDownIcon,
  ViewColumnsIcon,
  Squares2X2Icon
} from "@heroicons/react/24/outline";

const ProductListing = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ id: "all", name: "All Categories" }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [condition, setCondition] = useState("");

  // Fetch products and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch products
        const productsData = await productService.getAllProducts();
        setProducts(productsData);
        
        // Fetch categories
        const categoriesData = await categoryService.getAllCategories();
        setCategories([
          { id: "all", name: "All Categories" },
          ...categoriesData.map(cat => ({
            id: cat.category_id.toString(),
            name: cat.name
          }))
        ]);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products based on search query, category, price range, and condition
  useEffect(() => {
    if (searchQuery) {
      const fetchSearchResults = async () => {
        setLoading(true);
        try {
          const results = await productService.searchProducts(searchQuery);
          setProducts(results);
        } catch (err) {
          setError(err.message || 'Failed to search products');
        } finally {
          setLoading(false);
        }
      };
      
      fetchSearchResults();
    }
  }, [searchQuery]);

  // Filter products by category
  const handleCategoryChange = async (categoryId) => {
    setActiveCategory(categoryId);
    setLoading(true);
    
    try {
      let filteredProducts;
      
      if (categoryId === "all") {
        filteredProducts = await productService.getAllProducts();
      } else {
        filteredProducts = await productService.getProductsByCategory(categoryId);
      }
      
      setProducts(filteredProducts);
    } catch (err) {
      setError(err.message || 'Failed to filter products');
    } finally {
      setLoading(false);
    }
  };

  // Apply filters (price range, condition)
  const applyFilters = async () => {
    setLoading(true);
    
    try {
      // In a real implementation, you would call an API with these filters
      // For now, we'll simulate by fetching all products and filtering client-side
      const allProducts = await productService.getAllProducts();
      
      let filteredProducts = allProducts;
      
      // Filter by category if not "all"
      if (activeCategory !== "all") {
        filteredProducts = filteredProducts.filter(p => p.category_id.toString() === activeCategory);
      }
      
      // Filter by price range
      if (priceRange.min) {
        filteredProducts = filteredProducts.filter(p => p.price >= Number(priceRange.min));
      }
      
      if (priceRange.max) {
        filteredProducts = filteredProducts.filter(p => p.price <= Number(priceRange.max));
      }
      
      // Filter by condition
      if (condition) {
        filteredProducts = filteredProducts.filter(p => p.condition_type === condition);
      }
      
      setProducts(filteredProducts);
    } catch (err) {
      setError(err.message || 'Failed to apply filters');
    } finally {
      setLoading(false);
      setShowFilters(false);
    }
  };

  // Sort products
  const sortProducts = (option) => {
    setSortOption(option);
    
    const sortedProducts = [...products];
    
    switch (option) {
      case "newest":
        sortedProducts.sort((a, b) => new Date(b.created_at || b.id) - new Date(a.created_at || a.id));
        break;
      case "oldest":
        sortedProducts.sort((a, b) => new Date(a.created_at || a.id) - new Date(b.created_at || b.id));
        break;
      case "price_low":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    
    setProducts(sortedProducts);
  };

  // Define sort options
  const sortOptions = [
    { id: "newest", name: "Newest First" },
    { id: "oldest", name: "Oldest First" },
    { id: "price_low", name: "Price: Low to High" },
    { id: "price_high", name: "Price: High to Low" }
  ];

  // Define condition options
  const conditions = [
    { id: "any", name: "Any Condition" },
    { id: "New", name: "New" },
    { id: "Like New", name: "Like New" },
    { id: "Excellent", name: "Excellent" },
    { id: "Good", name: "Good" },
    { id: "Fair", name: "Fair" },
    { id: "Poor", name: "Poor" }
  ];

  // Calculate total savings from original prices
  const totalSavings = products.reduce((total, product) => {
    const originalPrice = product.original_price || product.originalPrice || 0;
    const currentPrice = product.price || 0;
    return total + Math.max(0, originalPrice - currentPrice);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Discover Pre-Loved Treasures</h1>
          <p className="text-gray-600 mt-1">
            {products.length} items saving ₹{totalSavings.toLocaleString()} from landfill
          </p>
        </div>
        
        <Link
          to="/add-product"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg flex items-center mt-4 md:mt-0 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-1" />
          List an Item
        </Link>
      </div>

      {/* Sustainability Banner */}
      <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
        <div className="flex items-start">
          <div className="rounded-full bg-green-100 p-2 mr-3 flex-shrink-0">
            <span className="text-green-600 text-sm font-bold">♻️</span>
          </div>
          <div>
            <h3 className="font-medium text-green-800">Shop Sustainably</h3>
            <p className="text-sm text-green-700 mt-1">
              Every purchase gives quality items a new home and reduces waste. You've already saved {products.length} items from landfill!
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
              {(activeCategory !== "all" || condition !== "" || priceRange.min || priceRange.max) && (
                <span className="ml-1.5 bg-green-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                  !
                </span>
              )}
            </button>

            <div className="hidden md:block">
              <select 
                value={activeCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="hidden md:block">
              <select 
                value={sortOption}
                onChange={(e) => sortProducts(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 hidden md:block">
              {products.length} items
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
                  value={activeCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <select 
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button 
                onClick={() => {
              setActiveCategory("all");
              setCondition("");
              setPriceRange({ min: "", max: "" });
              const fetchData = async () => {
                setLoading(true);
                try {
                  const productsData = await productService.getAllProducts();
                  setProducts(productsData);
                } catch (err) {
                  setError(err.message || 'Failed to fetch products');
                } finally {
                  setLoading(false);
                }
              };
              fetchData();
            }}
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Clear all filters
              </button>
              
              <button 
                onClick={applyFilters}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
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
          value={activeCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>

        <select 
          value={sortOption}
          onChange={(e) => sortProducts(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          {sortOptions.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">
          Showing {products.length} {products.length === 1 ? 'item' : 'items'}
        </p>
        
        {products.length > 0 && (
          <div className="flex items-center text-sm text-gray-500">
            <ArrowsUpDownIcon className="w-4 h-4 mr-1" />
            Sorted by {sortOptions.find(opt => opt.id === sortOption)?.name}
          </div>
        )}
      </div>

      {/* Loading and Error States */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loading size="lg" message="Finding pre-loved treasures..." />
        </div>
      ) : error ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <ErrorMessage error={error} className="mb-4" />
          <button 
            onClick={() => {
              setActiveCategory("all");
              setCondition("");
              setPriceRange({ min: "", max: "" });
              const fetchData = async () => {
                setLoading(true);
                try {
                  const productsData = await productService.getAllProducts();
                  setProducts(productsData);
                } catch (err) {
                  setError(err.message || 'Failed to fetch products');
                } finally {
                  setLoading(false);
                }
              };
              fetchData();
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FunnelIcon className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your filters to find more pre-loved treasures.</p>
          <button 
            onClick={() => {
              setActiveCategory("all");
              setCondition("");
              setPriceRange({ min: "", max: "" });
              const fetchData = async () => {
                setLoading(true);
                try {
                  const productsData = await productService.getAllProducts();
                  setProducts(productsData);
                } catch (err) {
                  setError(err.message || 'Failed to fetch products');
                } finally {
                  setLoading(false);
                }
              };
              fetchData();
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
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
          {products.map((product) => (
            <ProductCard 
              key={product.product_id || product.id}
              product_id={product.product_id || product.id}
              title={product.title}
              price={product.price}
              original_price={product.original_price || product.originalPrice}
              condition_type={product.condition_type || product.condition}
              imageUrl={product.image_url || product.imageUrl}
              location={product.location}
              isLiked={product.isLiked}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default ProductListing;
