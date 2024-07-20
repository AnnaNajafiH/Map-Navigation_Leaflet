// src/components/MapComponent.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import RoutingMachine from "./RoutingMachine";
import LocationMarker from "./LocationMarker";
import MinimapControl from "./MinimapControl";


// Define the custom icon
const customIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/?size=100&id=13800&format=png&color=000000", 
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapComponent = ({
  bookshelves,
  center,
  userLocation,
  destination,
  setDestination,
}) => {
  return (
    <MapContainer
      center={center}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {bookshelves.map((shelf, idx) => (
        <Marker key={idx} position={shelf.location} icon={customIcon}>
          <Popup>
            <div style={{ maxWidth: "200px" }}>
              <h3>{shelf.name}</h3>
              <p>{shelf.address}</p>
              {shelf.imageUrl && (
                <img
                  src={shelf.imageUrl}
                  alt={shelf.name}
                  style={{ width: "100%", height: "auto", borderRadius: "5px" }}
                />
              )}
              <button
                onClick={() => setDestination(shelf.location)}
                style={{ marginTop: "10px" }}
              >
                Go Here
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
      <LocationMarker />
      {userLocation && destination && (
        <RoutingMachine start={userLocation} end={destination} />
      )}
      <MinimapControl position="topright" zoom={0} />{" "}
    </MapContainer>
  );
};

export default MapComponent;

