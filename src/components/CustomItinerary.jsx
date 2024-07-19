import React from "react";
import "./CustomItinerary.css"; // Import your CSS styles

const CustomItinerary = ({ route, onClose }) => {
  if (!route) return null;

  return (
    <div className="custom-itinerary">
      <button className="close-button" onClick={onClose}>
        ✕
      </button>
      <h2>Route Details</h2>
      <div className="route-summary">
        <p>
          <strong>Total Distance:</strong> {route.summary.totalDistance} km
        </p>
        <p>
          <strong>Estimated Time:</strong> {route.summary.totalTime} min
        </p>
      </div>
      <ul className="route-steps">
        {route.instructions.map((instruction, index) => (
          <li key={index}>
            <span>{instruction}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomItinerary;
