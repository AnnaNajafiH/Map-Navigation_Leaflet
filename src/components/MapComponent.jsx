import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import RoutingMachine from "./RoutingMachine";

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
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* Example with Esri World Street Map */}
      {/* <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" /> */}
      {bookshelves.map((shelf, idx) => (
        <Marker key={idx} position={shelf.location}>
          <Popup>
            <div>
              <h3>{shelf.name}</h3> {shelf.address} <br />
              {shelf.imageUrl && (
                <img
                  src={shelf.imageUrl}
                  alt={shelf.name}
                  style={{ width: "100%", height: "auto" }}
                />
              )}
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
  );
};

export default MapComponent;
