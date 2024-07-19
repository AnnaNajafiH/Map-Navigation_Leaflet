import React, { useEffect, useState } from "react";
import MapComponent from "./components/MapComponent";
import { fetchBookshelves } from "./services/bookshelfService";

const App = () => {
  const [bookshelves, setBookshelves] = useState([]);
  const [center, setCenter] = useState([51.541574, 9.951122]); // Default center
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [error, setError] = useState(null);

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
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userCoords = [
              position.coords.latitude,
              position.coords.longitude,
            ];
            setCenter(userCoords);
            setUserLocation(userCoords);
            setLoadingLocation(false);
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              console.error("User denied Geolocation");
              alert(
                "Location access is required for navigation. Please enable location services or enter your location manually."
              );
              setCenter([51.541574, 9.951122]); // Default location
              setUserLocation([51.541574, 9.951122]);
            } else {
              console.error("Error getting user location: ", error);
            }
            setLoadingLocation(false);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLoadingLocation(false);
      }
    };

    getBookshelves();
    getUserLocation();
  }, []);

  if (loadingLocation) {
    return <div>Loading location...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <MapComponent
      bookshelves={bookshelves}
      center={center}
      userLocation={userLocation}
      destination={destination}
      setDestination={(loc) => {
        setDestination(loc);
        console.log("Destination set:", loc);
      }}
    />
  );
};

export default App;
