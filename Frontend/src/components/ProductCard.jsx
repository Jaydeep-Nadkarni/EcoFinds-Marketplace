import { Link } from "react-router-dom";

export default function ProductCard({ id, title, price }) {
  return (
    <Link
      to={`/product/${id}`}
      className="border rounded-lg shadow hover:shadow-lg p-4 flex flex-col"
    >
      <div className="bg-gray-200 h-40 flex justify-center items-center mb-3">
        <span className="text-gray-500">Image</span>
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-green-600 font-bold">₹{price}</p>
    </Link>
  );
}
