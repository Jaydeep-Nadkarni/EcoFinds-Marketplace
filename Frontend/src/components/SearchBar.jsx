import React from "react";

const SearchBar = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search products..."
    value={value}
    onChange={onChange}
    className="border rounded px-3 py-2 w-full md:w-80"
  />
);

export default SearchBar;