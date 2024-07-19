import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import CustomItinerary from "./CustomItinerary";
import RoutingMachine from "./RoutingMachine";

const MapComponent = ({
  bookshelves,
  center,
  userLocation,
  destination,
  setDestination,
}) => {
  const [route, setRoute] = useState(null);
  const [showItinerary, setShowItinerary] = useState(false);

  useEffect(() => {
    if (userLocation && destination) {
      // Example route data structure
      setRoute({
        summary: { totalTime: 141, totalDistance: 230.1 }, // Example data
        instructions: [
          "Head south on Otto-Wallach-Weg 100 m",
          "Turn right onto Albert-Einstein-Straße 80 m",
          "Turn right onto Düstere-Eichen-Weg 250 m",
          "Turn left onto Nikolausberger Weg (K 5) 1 km",
          "Continue onto Berliner Straße 800 m",
          "Turn right onto Groner Landstraße (B 3) 1 km",
          // Add other steps as needed
        ],
      });
      setShowItinerary(true);
    }
  }, [userLocation, destination]);

  const handleCloseItinerary = () => {
    setShowItinerary(false);
  };

  return (
    <>
      <MapContainer
        center={center}
        zoom={5}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {bookshelves.map((shelf) => (
          <Marker key={shelf.id} position={shelf.location}>
            <Popup>
              <div>
                <h3>{shelf.name}</h3>
                <p>{shelf.address}</p>
                {shelf.imageUrl && (
                  <img
                    src={shelf.imageUrl}
                    alt={shelf.name}
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
                <p>
                  <strong>Opening Hours:</strong> {shelf.openingHours}
                </p>
                <p>
                  <strong>Rating:</strong> {shelf.rating} ★
                </p>
                <button onClick={() => setDestination(shelf.location)}>
                  Go Here
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
        {userLocation && destination && (
          <RoutingMachine start={userLocation} end={destination} />
        )}
      </MapContainer>
      {showItinerary && (
        <CustomItinerary route={route} onClose={handleCloseItinerary} />
      )}
    </>
  );
};

export default MapComponent;
