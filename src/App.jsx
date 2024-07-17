// src/App.jsx

import React, { useEffect, useState } from "react";
import MapComponent from "./components/MapComponent";
import { fetchBookshelves } from "./services/bookshelfService";

const App = () => {
  const [bookshelves, setBookshelves] = useState([]);
  const [center, setCenter] = useState([51.541574, 9.951122]); // Default center
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    const getBookshelves = async () => {
      try {
        const data = await fetchBookshelves();
        setBookshelves(data);
      } catch (error) {
        console.error("Failed to fetch bookshelves:", error);
      }
    };

    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setCenter(userCoords);
          setUserLocation(userCoords);
        },
        (error) => {
          console.error("Error getting user location: ", error);
        }
      );
    };

    getBookshelves();
    getUserLocation();
  }, []);

  return (
    <div>
      <MapComponent
        bookshelves={bookshelves}
        center={center}
        userLocation={userLocation}
        destination={destination}
        setDestination={setDestination}
      />
    </div>
  );
};

export default App;



