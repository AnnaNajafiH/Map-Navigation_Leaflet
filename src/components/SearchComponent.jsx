// src/components/SearchComponent.jsx
import React, { useState } from "react";

const SearchComponent = ({ bookshelves, setFilteredBookshelves }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);

    const filtered = bookshelves.filter(
      (shelf) =>
        shelf.name.toLowerCase().includes(value) ||
        shelf.address.toLowerCase().includes(value)
    );
    setFilteredBookshelves(filtered);
  };

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search by bookshelf name or city..."
        style={{
          width: "90%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
};

export default SearchComponent;
