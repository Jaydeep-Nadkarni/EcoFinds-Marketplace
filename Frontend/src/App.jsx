import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Dashboard from "./pages/Dashboard";
import ProductListing from "./pages/ProductListing";
import AddProduct from "./pages/AddProduct";
import MyListings from "./pages/MyListings";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import PreviousPurchases from "./pages/PreviousPurchases";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<ProductListing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/my-listings" element={<MyListings />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/purchases" element={<PreviousPurchases />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
