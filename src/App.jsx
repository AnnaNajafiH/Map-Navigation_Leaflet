
import React, { useEffect, useState } from "react";
import LayoutComponent from "./components/LayoutComponent";
// import { fetchBookshelves } from "./services/bookshelfService";


const App = () => {
  const [bookshelves, setBookshelves] = useState([]);
  const [center, setCenter] = useState([51.541574, 9.951122]); // Default center
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [error, setError] = useState(null);

  //--------------------------------------------static data---------------------------------------------
  const staticBookshelves = [
    {
      name: "Jugend Bookshelf",
      address: "Kochstraße, Leipzig",
      location: [51.321003, 12.3716],
      imageUrl:
        "https://s1.qwant.com/thumbr/474x632/0/8/34ec604c3e1ede755f6e5142afdbc07403c6e8c0269cbd8fb86668b984b940/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.YXGuhiA4ebINec46PhhbEgHaJ4%26pid%3DApi&q=0&b=1&p=0&a=0",
      openingHours: "9:00 AM - 5:00 PM",
      rating: 4.5,
      liked: false,
    },
    {
      name: "Central Library",
      address: "NeumanStraße, Berlin",
      location: [52.557614, 13.422919],
      imageUrl:
        "https://s2.qwant.com/thumbr/474x632/7/7/b517b3db7d8360f12948c8376dc6b9b124d40891de9e2406be5ef894035e96/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.Z6wcAr0v4uZ4DijLfS9mOAHaJ4%26pid%3DApi&q=0&b=1&p=0&a=0",
      openingHours: "9:00 AM - 5:00 PM",
      rating: 3,
      liked: false,
    },
    {
      name: "Community Bookshelf",
      address: "Breubergstraße, Frankfurt am main",
      location: [50.08557, 8.641062],
      imageUrl:
        "https://s2.qwant.com/thumbr/474x460/4/2/8dd6e30a587d4aac6fd7e96f2a7f72647db315f946cb57e9a84ab87d711465/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.uaSwTd1xRMlNowxeMX3CygHaHM%26pid%3DApi&q=0&b=1&p=0&a=0",

      openingHours: "9:00 AM - 5:00 PM",
      rating: 4,
      liked: true,
    },
  ];
  //--------------------------------------------static data---------------------------------------------

  useEffect(() => {
    //     // Use static data
    setBookshelves(staticBookshelves);

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
              // const defaultCoords = [51.541574, 9.951122];  if we want to set default location
              setCenter(defaultCoords);
              setUserLocation(defaultCoords);
              setLoadingLocation(false);
            } else {
              console.error("Error getting user location: ", error);
              setLoadingLocation(false);
            }
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLoadingLocation(false);
      }
    };

    // getBookshelves();
    getUserLocation();
  }, []);

  if (loadingLocation) {
    return <div>Loading location...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <LayoutComponent
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
//------------------------------------------------------------------------








// import React, { useEffect, useState } from "react";
// import MapComponent from "./components/MapComponent";
// import { fetchBookshelves } from "./services/bookshelfService";

// const App = () => {
//   const [bookshelves, setBookshelves] = useState([]);
//   const [center, setCenter] = useState([51.5326, 9.92844]); // Default center
//   const [userLocation, setUserLocation] = useState(null);
//   const [destination, setDestination] = useState(null);
//   const [loadingLocation, setLoadingLocation] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getBookshelves = async () => {
//       try {
//         const data = await fetchBookshelves();
//         setBookshelves(data);
//       } catch (error) {
//         console.error("Failed to fetch bookshelves:", error);
//       }
//     };

//     const getUserLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const userCoords = [
//               position.coords.latitude,
//               position.coords.longitude,
//             ];
//             setCenter(userCoords);
//             setUserLocation(userCoords);
//             setLoadingLocation(false);
//           },
//           (error) => {
//             if (error.code === error.PERMISSION_DENIED) {
//               console.error("User denied Geolocation");
//               alert(
//                 "Location access is required for navigation. Please enable location services or enter your location manually."
//               );
//               setCenter([51.5326, 9.92844]); // Default location
//               setUserLocation([51.541574, 9.951122]);
//             } else {
//               console.error("Error getting user location: ", error);
//             }
//             setLoadingLocation(false);
//           }
//         );
//       } else {
//         console.error("Geolocation is not supported by this browser.");
//         setLoadingLocation(false);
//       }
//     };

//     getBookshelves();
//     getUserLocation();
//   }, []);

//   if (loadingLocation) {
//     return <div>Loading location...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <MapComponent
//       bookshelves={bookshelves}
//       center={center}
//       userLocation={userLocation}
//       destination={destination}
//       setDestination={(loc) => {
//         setDestination(loc);
//         console.log("Destination set:", loc);
//       }}
//     />
//   );
// };

// export default App;
