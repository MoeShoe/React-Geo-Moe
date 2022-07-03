import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import styles from "./Map.module.css";

const Map = () => {
  useEffect(() => {
    const map = L.map("map").setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);
  }, []);

  return <div id="map" className={styles.mapC}></div>;
};

export default Map;
