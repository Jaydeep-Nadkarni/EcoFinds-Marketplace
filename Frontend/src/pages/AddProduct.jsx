export default function AddProduct() {
  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Product Title" className="w-full border rounded px-3 py-2" />
        <select className="w-full border rounded px-3 py-2">
          <option>Category</option>
          <option>Furniture</option>
          <option>Electronics</option>
        </select>
        <textarea placeholder="Description" className="w-full border rounded px-3 py-2"></textarea>
        <input type="number" placeholder="Price" className="w-full border rounded px-3 py-2" />
        <button type="button" className="w-full border border-dashed py-2 rounded">+ Add Image</button>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Submit</button>
      </form>
    </div>
  );
}
