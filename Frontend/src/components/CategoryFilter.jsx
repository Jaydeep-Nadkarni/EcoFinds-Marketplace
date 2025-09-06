import React from "react";

const categories = ["All", "Clothing", "Electronics", "Books", "Home", "Other"];

const CategoryFilter = ({ selected, onSelect }) => (
  <div className="flex gap-2 flex-wrap">
    {categories.map((cat) => (
      <button
        key={cat}
        className={`px-3 py-1 rounded-full border ${selected === cat ? "bg-green-600 text-white" : "bg-white text-gray-700"}`}
        onClick={() => onSelect(cat)}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryFilter;