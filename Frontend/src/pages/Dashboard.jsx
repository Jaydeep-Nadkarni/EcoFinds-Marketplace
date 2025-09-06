import { useState } from "react";
import { 
  UserIcon, 
  ShoppingBagIcon, 
  HeartIcon, 
  Cog6ToothIcon,
  BellIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  ChartBarIcon,
  CreditCardIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState({
    username: "EcoWarrior23",
    email: "ecowarrior@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    bio: "Passionate about sustainable living and giving pre-loved items a new home!",
    avatar: null
  });
  
  const [stats] = useState({
    itemsSold: 12,
    itemsBought: 8,
    totalEarnings: 12500,
    positiveReviews: 11,
    followers: 47,
    following: 32
  });
  
  const [recentActivity] = useState([
    { id: 1, type: "sale", item: "Vintage Chair", price: 500, date: "2 hours ago" },
    { id: 2, type: "purchase", item: "Wireless Headphones", price: 1200, date: "1 day ago" },
    { id: 3, type: "like", item: "Your leather jacket", user: "FashionLover", date: "2 days ago" },
    { id: 4, type: "review", item: "Wooden Desk", rating: 5, date: "3 days ago" }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile logic would go here
    console.log("Profile saved:", userData);
    alert("Profile updated successfully!");
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 text-2xl font-bold">
          {userData.avatar ? (
            <img src={userData.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
          ) : (
            userData.username.charAt(0)
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{userData.username}</h3>
          <p className="text-gray-600">Member since March 2023</p>
          <button className="text-amber-600 text-sm font-medium mt-1">
            Change avatar
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
          <div className="relative">
            <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-10 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
          <div className="relative">
            <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-10 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <div className="relative">
            <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="location"
              value={userData.location}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-10 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Your city or area"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            name="bio"
            value={userData.bio}
            onChange={handleInputChange}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Tell others about yourself and your interests..."
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 rounded-lg transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );

  const renderStatsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
          <div className="flex items-center">
            <ShoppingBagIcon className="h-8 w-8 text-amber-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Items Sold</p>
              <p className="text-xl font-bold text-gray-900">{stats.itemsSold}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center">
            <ChartBarIcon className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Earnings</p>
              <p className="text-xl font-bold text-gray-900">₹{stats.totalEarnings.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center">
            <HeartIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Items Bought</p>
              <p className="text-xl font-bold text-gray-900">{stats.itemsBought}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <div className="flex items-center">
            <ShieldCheckIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Positive Reviews</p>
              <p className="text-xl font-bold text-gray-900">{stats.positiveReviews}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-gray-900 mb-3">Sustainability Impact</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <ArrowPathIcon className="h-10 w-10 text-amber-600 mr-3" />
            <div>
              <p className="font-semibold">By using ReCircle, you've helped:</p>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                <li>Keep {stats.itemsSold + stats.itemsBought} items out of landfills</li>
                <li>Save approximately {(stats.itemsSold + stats.itemsBought) * 25} kg of CO₂ emissions</li>
                <li>Contribute to a circular economy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900">Recent Activity</h3>
      <div className="divide-y divide-gray-200">
        {recentActivity.map(activity => (
          <div key={activity.id} className="py-3 first:pt-0 last:pb-0">
            <div className="flex items-start">
              <div className={`rounded-full p-2 mr-3 ${
                activity.type === "sale" ? "bg-green-100" :
                activity.type === "purchase" ? "bg-blue-100" :
                activity.type === "like" ? "bg-rose-100" : "bg-amber-100"
              }`}>
                {activity.type === "sale" && <ShoppingBagIcon className="h-5 w-5 text-green-600" />}
                {activity.type === "purchase" && <CreditCardIcon className="h-5 w-5 text-blue-600" />}
                {activity.type === "like" && <HeartIcon className="h-5 w-5 text-rose-600" />}
                {activity.type === "review" && <ShieldCheckIcon className="h-5 w-5 text-amber-600" />}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  {activity.type === "sale" && `You sold "${activity.item}" for ₹${activity.price}`}
                  {activity.type === "purchase" && `You purchased "${activity.item}" for ₹${activity.price}`}
                  {activity.type === "like" && `${activity.user} liked your "${activity.item}"`}
                  {activity.type === "review" && `You received a ${activity.rating}-star review for "${activity.item}"`}
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex items-center mb-6">
        <UserIcon className="w-8 h-8 text-amber-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-4">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center px-3 py-2 rounded-md text-left transition-colors ${
                  activeTab === "profile" 
                    ? "bg-amber-100 text-amber-700 font-medium" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <UserIcon className="h-5 w-5 mr-3" />
                Profile
              </button>
              
              <button
                onClick={() => setActiveTab("stats")}
                className={`w-full flex items-center px-3 py-2 rounded-md text-left transition-colors ${
                  activeTab === "stats" 
                    ? "bg-amber-100 text-amber-700 font-medium" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ChartBarIcon className="h-5 w-5 mr-3" />
                Statistics
              </button>
              
              <button
                onClick={() => setActiveTab("activity")}
                className={`w-full flex items-center px-3 py-2 rounded-md text-left transition-colors ${
                  activeTab === "activity" 
                    ? "bg-amber-100 text-amber-700 font-medium" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <BellIcon className="h-5 w-5 mr-3" />
                Activity
              </button>
              
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center px-3 py-2 rounded-md text-left transition-colors ${
                  activeTab === "settings" 
                    ? "bg-amber-100 text-amber-700 font-medium" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Cog6ToothIcon className="h-5 w-5 mr-3" />
                Settings
              </button>
            </nav>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <div className="flex">
                  <ArrowPathIcon className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-xs text-amber-800">
                    You've saved 20+ items from landfill this year! ♻️
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {activeTab === "profile" && renderProfileTab()}
            {activeTab === "stats" && renderStatsTab()}
            {activeTab === "activity" && renderActivityTab()}
            {activeTab === "settings" && (
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Account Settings</h3>
                <p className="text-gray-600">Security, notifications, and privacy settings will be available here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}