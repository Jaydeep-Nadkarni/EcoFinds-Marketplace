import React, { useState } from "react";

const categories = ["Clothing", "Electronics", "Books", "Home", "Other"];

const AddProduct = () => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send form data to backend API
    // For now, just log it
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    // Example: fetch("/api/products", { method: "POST", body: data })
    alert("Product submitted! (Check console)");
    console.log("Product data:", form);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border rounded px-3 py-2"
          value={form.title}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          className="border rounded px-3 py-2"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Category</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <textarea
          name="description"
          placeholder="Description"
          className="border rounded px-3 py-2"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border rounded px-3 py-2"
          value={form.price}
          onChange={handleChange}
          required
        />
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
            required
          />
          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              "+"
            )}
          </div>
          <span>Add Image</span>
        </label>
        <button
          className="bg-green-600 text-white rounded py-2 font-semibold"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
