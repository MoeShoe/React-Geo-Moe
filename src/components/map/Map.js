import { useEffect } from "react";
import { useSelector } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import styles from "./Map.module.css";

let map;

const Map = () => {
  const { latlng, zoomLevel } = useSelector((state) => {
    return {
      latlng: state.country.latlng,
      zoomLevel: state.country.zoomLevel,
    };
  });

  useEffect(() => {
    map = L.map("map").setView([30, 20], 2);
    L.tileLayer("https://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      maxZoom: 12,
      attribution: "© OpenStreetMap",
    }).addTo(map);
  }, []);

  useEffect(() => {
    map.setView(latlng, zoomLevel);
  }, [latlng, zoomLevel]);

  return <div id="map" className={styles.mapC}></div>;
};

export default Map;
