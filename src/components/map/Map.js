import { useEffect } from "react";
import { useSelector } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import styles from "./Map.module.css";

let map;

const Map = () => {
  const { latlng, zoomLevel } = useSelector((state) => state.map.map);

  useEffect(() => {
    //initializes our map
    map = L.map("map").setView([30, 20], 2);

    //sets up openstreetmap as our map source of choice
    L.tileLayer("https://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      maxZoom: 12,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    //adds click me pop up on the map
    L.popup({ className: styles.popup })
      .setLatLng([36, 3])
      .setContent("Click me!")
      .openOn(map);

    //adds event listener for use clicks on map
    map.on("click", (e) => {
      console.log(e);
      L.popup()
        .setLatLng(e.latlng)
        .setContent("You clicked on the map!")
        .openOn(map);
    });
  }, []);

  useEffect(() => {
    map.setView(latlng, zoomLevel);
  }, [latlng, zoomLevel]);

  return <div id="map" className={styles.mapC}></div>;
};

export default Map;
