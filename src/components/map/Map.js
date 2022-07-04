import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import styles from "./Map.module.css";

const Map = () => {
  useEffect(() => {
    const map = L.map("map").setView([30, 20], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 12,
      attribution: "© OpenStreetMap",
    }).addTo(map);
  }, []);

  return <div id="map" className={styles.mapC}></div>;
};

export default Map;
