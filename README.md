import React, { useState } from "react";
import { 
  PhotoIcon, 
  MapPinIcon, 
  ArrowPathIcon,
  QuestionMarkCircleIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

const categories = [
  { id: "clothing", name: "Clothing & Accessories", subcategories: ["Men's", "Women's", "Kids", "Shoes", "Bags", "Jewelry"] },
  { id: "electronics", name: "Electronics & Gadgets", subcategories: ["Phones", "Laptops", "Audio", "Cameras", "Gaming", "Accessories"] },
  { id: "home", name: "Home & Furniture", subcategories: ["Furniture", "Decor", "Kitware", "Garden", "Appliances", "Lighting"] },
  { id: "books", name: "Books & Media", subcategories: ["Fiction", "Non-Fiction", "Textbooks", "Music", "Movies", "Games"] },
  { id: "sports", name: "Sports & Outdoor", subcategories: ["Exercise", "Cycling", "Camping", "Water Sports", "Team Sports", "Footwear"] },
  { id: "other", name: "Other Items", subcategories: ["Toys", "Collectibles", "Art", "Crafts", "Miscellaneous"] }
];

const conditions = [
  { id: "excellent", name: "Excellent", description: "Like new, barely used" },
  { id: "good", name: "Good", description: "Gently used, minor signs of wear" },
  { id: "fair", name: "Fair", description: "Visible wear but functional" },
  { id: "poor", name: "Poor", description: "Heavy wear, may need repairs" }
];

const AddProduct = () => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    subcategory: "",
    condition: "",
    description: "",
    price: "",
    originalPrice: "",
    location: "",
    meetupPreference: "public",
    image: null,
    images: []
  });

  const [previews, setPreviews] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [showConditionHelp, setShowConditionHelp] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "image") {
      const newImages = Array.from(files);
      const newPreviews = newImages.map(file => URL.createObjectURL(file));
      
      setForm(prev => ({ 
        ...prev, 
        images: [...prev.images, ...newImages] 
      }));
      setPreviews(prev => [...prev, ...newPreviews]);
    } else {
      setForm({ ...form, [name]: value });
      
      // Reset subcategory when category changes
      if (name === "category") {
        setForm(prev => ({ ...prev, subcategory: "" }));
      }
    }
  };

  const removeImage = (index) => {
    const newImages = [...form.images];
    const newPreviews = [...previews];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setForm(prev => ({ ...prev, images: newImages }));
    setPreviews(newPreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send form data to backend API
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "images") {
        form.images.forEach(image => data.append("images", image));
      } else {
        data.append(key, value);
      }
    });
    
    alert("Product submitted! (Check console)");
    console.log("Product data:", form);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const selectedCategory = categories.find(cat => cat.id === form.category);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8 border border-gray-100">
      <div className="flex items-center mb-6">
        <ArrowPathIcon className="w-8 h-8 text-amber-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">List a Pre-Loved Item</h2>
      </div>

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-amber-600">Step {currentStep} of 3</span>
          <span className="text-sm text-gray-500">Sustainably yours ♻️</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-amber-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What are you selling? *
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g., Gently used iPhone 12, Vintage denim jacket"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subcategory
                </label>
                <select
                  name="subcategory"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={form.subcategory}
                  onChange={handleChange}
                  disabled={!form.category}
                >
                  <option value="">Select a subcategory</option>
                  {selectedCategory?.subcategories.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                Condition *
                <button 
                  type="button" 
                  className="ml-1 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConditionHelp(!showConditionHelp)}
                >
                  <QuestionMarkCircleIcon className="w-4 h-4" />
                </button>
              </label>
              
              {showConditionHelp && (
                <div className="bg-amber-50 p-3 rounded-lg mb-2 text-sm text-amber-800">
                  <p className="font-medium">Condition Guidelines:</p>
                  <ul className="list-disc list-inside mt-1 ml-2">
                    <li><strong>Excellent:</strong> Like new, barely used</li>
                    <li><strong>Good:</strong> Gently used, minor signs of wear</li>
                    <li><strong>Fair:</strong> Visible wear but functional</li>
                    <li><strong>Poor:</strong> Heavy wear, may need repairs</li>
                  </ul>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-2">
                {conditions.map((cond) => (
                  <label 
                    key={cond.id} 
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      form.condition === cond.id 
                        ? 'border-amber-500 bg-amber-50' 
                        : 'border-gray-300 hover:border-amber-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="condition"
                      value={cond.id}
                      checked={form.condition === cond.id}
                      onChange={handleChange}
                      className="text-amber-600 focus:ring-amber-500"
                      required
                    />
                    <span className="ml-2 text-sm font-medium">{cond.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                placeholder="Describe your item, including any flaws or special features..."
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="button"
              onClick={nextStep}
              className="bg-amber-600 text-white rounded-lg py-3 font-semibold mt-2 hover:bg-amber-700 transition-colors"
            >
              Next: Pricing & Photos
            </button>
          </>
        )}

        {/* Step 2: Pricing & Photos */}
        {currentStep === 2 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selling Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price (₹)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  value={form.originalPrice}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photos *
              </label>
              <p className="text-xs text-gray-500 mb-2">Add clear photos from different angles (up to 5)</p>
              
              <div className="flex flex-wrap gap-3 mb-3">
                {previews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                {previews.length < 5 && (
                  <label className="w-20 h-20 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-amber-400 transition-colors">
                    <PhotoIcon className="w-8 h-8 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Add</span>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleChange}
                      multiple
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 bg-gray-200 text-gray-800 rounded-lg py-3 font-medium hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 bg-amber-600 text-white rounded-lg py-3 font-semibold hover:bg-amber-700 transition-colors"
              >
                Next: Location & Details
              </button>
            </div>
          </>
        )}

        {/* Step 3: Location & Final Details */}
        {currentStep === 3 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <MapPinIcon className="w-4 h-4 mr-1" />
                Location *
              </label>
              <input
                type="text"
                name="location"
                placeholder="City or neighborhood"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meetup Preference *
              </label>
              <select
                name="meetupPreference"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                value={form.meetupPreference}
                onChange={handleChange}
                required
              >
                <option value="public">Public Meetup</option>
                <option value="delivery">Delivery</option>
                <option value="pickup">Pickup at My Location</option>
              </select>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h3 className="font-medium text-amber-800 mb-2">♻️ Sustainability Impact</h3>
              <p className="text-sm text-amber-700">
                By selling this pre-loved item, you're helping reduce waste and extend the life of products. 
                Thank you for contributing to a more sustainable marketplace!
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 bg-gray-200 text-gray-800 rounded-lg py-3 font-medium hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-amber-600 text-white rounded-lg py-3 font-semibold hover:bg-amber-700 transition-colors"
              >
                List My Item
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
