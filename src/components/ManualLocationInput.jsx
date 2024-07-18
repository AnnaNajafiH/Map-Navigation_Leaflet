// import React, { useState } from "react";

// const ManualLocationInput = ({ setUserLocation }) => {
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const userCoords = [parseFloat(latitude), parseFloat(longitude)];
//     setUserLocation(userCoords);
//     console.log("Manual user location set:", userCoords);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>
//           Latitude:
//           <input
//             type="number"
//             value={latitude}
//             onChange={(e) => setLatitude(e.target.value)}
//             required
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Longitude:
//           <input
//             type="number"
//             value={longitude}
//             onChange={(e) => setLongitude(e.target.value)}
//             required
//           />
//         </label>
//       </div>
//       <button type="submit">Set Location</button>
//     </form>
//   );
// };

// export default ManualLocationInput;
