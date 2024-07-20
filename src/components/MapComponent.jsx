import React, { useRef, useEffect } from "react";
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
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.TileLayer || layer instanceof L.Marker) {
          layer.remove();
        }
      });

      mapRef.current.setView(center, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      bookshelves.forEach((shelf) => {
        L.marker(shelf.location)
          .addTo(mapRef.current)
          .bindPopup(`<b>${shelf.name}</b><br>${shelf.address}`);
      });

      if (userLocation) {
        const userIcon = L.icon({
          iconUrl: "path_to_custom_user_icon.png", // Update this path to your custom icon
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        });

        L.marker(userLocation, { icon: userIcon })
          .addTo(mapRef.current)
          .bindPopup("Your Location")
          .openPopup();
      }

      if (destination) {
        L.marker(destination)
          .addTo(mapRef.current)
          .bindPopup("Destination")
          .openPopup();
      }
    }
  }, [bookshelves, center, userLocation, destination]);

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
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
      <MinimapControl position="topright" zoom={0} />
    </MapContainer>
  );
};

export default MapComponent;
