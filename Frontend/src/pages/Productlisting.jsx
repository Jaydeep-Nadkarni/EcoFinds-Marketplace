import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const dummyProducts = [
  { id: 1, title: "Second-hand Chair", price: 500 },
  { id: 2, title: "Used Laptop", price: 25000 },
];

export default function ProductListing() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Product Listings</h2>
        <Link
          to="/add-product"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Product
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {dummyProducts.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
