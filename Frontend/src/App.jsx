import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./auth/login";
import Signup from "./auth/signup";
import Dashboard from "./pages/Dashboard";
import ProductListing from "./pages/ProductListing";
import LandingPage from "./pages/LandingPage";
import AddProduct from "./pages/AddProduct";
import MyListings from "./pages/MyListings";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import PreviousPurchases from "./pages/PreviousPurchases";
import Test from "./pages/Test";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Terms from "./pages/Terms";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useAuth();

  const handleSearch = (query) => {
    setSearchQuery(query);
    // You can add additional search logic here
    console.log("Searching for:", query);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar onSearch={handleSearch} />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductListing searchQuery={searchQuery} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/add-product" element={
              <ProtectedRoute requiredRole="seller">
                <AddProduct />
              </ProtectedRoute>
            } />
            <Route path="/my-listings" element={
              <ProtectedRoute requiredRole="seller">
                <MyListings />
              </ProtectedRoute>
            } />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/purchases" element={
              <ProtectedRoute>
                <PreviousPurchases />
              </ProtectedRoute>
            } />
            <Route path="/test" element={<Test/>} />
            <Route path="/terms" element={<Terms/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
