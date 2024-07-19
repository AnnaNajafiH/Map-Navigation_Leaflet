// src/App.jsx

import React, { useEffect, useState } from "react";
import MapComponent from "./components/MapComponent";
import { fetchBookshelves } from "./services/bookshelfService";
// import ManualLocationInput from "./components/ManualLocationInput";


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
        // console.log("Bookshelves fetched:", data);

      } catch (error) {
        console.error("Failed to fetch bookshelves:", error);
      }
    };
    //Fetching User Location -----------------------------------------
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
            console.log("User location set:", userCoords);
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              console.error("User denied Geolocation");
              alert(
                "Location access is required for navigation. Please enable location services or enter your location manually."
              );
              //  default location
              const defaultCoords = [51.541574, 9.951122]; // Example default location
              setCenter(defaultCoords);
              setUserLocation(defaultCoords);
            } else {
              console.error("Error getting user location: ", error);
            }
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };
//-----------------------------------------
    getBookshelves();
    getUserLocation();
  }, []);

  return (
    <div>
      {/* {!userLocation && (
        <div>
          <ManualLocationInput setUserLocation={setUserLocation} />
        </div>
      )} */}
      <MapComponent
        bookshelves={bookshelves}
        center={center}
        userLocation={userLocation}
        destination={destination}
        // setDestination={setDestination}
        setDestination={(loc) => {
          setDestination(loc);
          console.log("Destination set:", loc);
        }}
      />
    </div>
  );
};

export default App;



