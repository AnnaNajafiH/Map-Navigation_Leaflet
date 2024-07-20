import React, { useState } from "react";
import MapComponent from "./MapComponent";
import "./LayoutComponent.css";
import SearchInput from "./SearchInput";

const LayoutComponent = ({
  bookshelves,
  center,
  setCenter,
  userLocation,
  destination,
  setDestination,
}) => {
  const [showMore, setShowMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term

  const filteredBookshelves = bookshelves.filter((shelf) =>
    shelf.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedBookshelves = showMore
    ? filteredBookshelves
    : filteredBookshelves.slice(0, 3);

  return (
    <div className="container">
      <div className="bookshelf-list">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setCenter={setCenter}
        />

        {displayedBookshelves.map((shelf, idx) => (
          <div key={idx} className="bookshelf">
            <h3>{shelf.name}</h3>
            <p>{shelf.address}</p>
          </div>
        ))}
        {bookshelves.length > 3 && (
          <button
            className="more-button"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "More"}
          </button>
        )}
      </div>

      <div className="map-container">
        <MapComponent
          bookshelves={filteredBookshelves}
          center={center}
          userLocation={userLocation}
          destination={destination}
          setDestination={setDestination}
        />
      </div>
    </div>
  );
};

export default LayoutComponent;
