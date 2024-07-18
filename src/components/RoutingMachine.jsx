
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

const RoutingMachine = ({ start, end }) => {
  const map = useMap();

  //   useEffect(() => {
  //     if (!map) return;
  //     // console.log("Initializing RoutingMachine with:", { start, end });
  //     const routingControl = L.Routing.control({
  //       waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
  //       routeWhileDragging: true,
  //     }).addTo(map);

  //     return () => map.removeControl(routingControl);
  //   }, [map, start, end]);

  //   return null;
  // };
  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      routeWhileDragging: true,
      createMarker: () => null, // Do not create default markers
      lineOptions: {
        styles: [{ color: "red", weight: 4 }],
      },
      show: false, // Do not show the itinerary
      addWaypoints: false, // Do not allow adding waypoints
      draggableWaypoints: false, // Do not allow dragging waypoints
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, start, end]);

  return null;
};

export default RoutingMachine;
