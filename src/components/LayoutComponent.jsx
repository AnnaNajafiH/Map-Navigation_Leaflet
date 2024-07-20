// src/components/LayoutComponent.jsx
import React, { useState } from "react";
import MapComponent from "./MapComponent";
import "./LayoutComponent.css";

const LayoutComponent = ({
  bookshelves,
  center,
  userLocation,
  destination,
  setDestination,
}) => {
  const [showMore, setShowMore] = useState(false);

  const displayedBookshelves = showMore ? bookshelves : bookshelves.slice(0, 3);

  return (
    <div className="container">
      <div className="bookshelf-list">
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
          bookshelves={bookshelves}
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