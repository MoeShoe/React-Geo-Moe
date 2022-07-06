import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import styles from "./Map.module.css";
import reverseGeocodeCountry from "../../store/map-action-thunk";

let map;

const Map = () => {
  const dispatch = useDispatch();

  const { latlng, zoomLevel } = useSelector((state) => state.map.map);

  useEffect(() => {
    //initializes our map
    map = L.map("map").setView([30, 20], 2);

    //sets up openstreetmap as our map source of choice
    L.tileLayer("https://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      maxZoom: 12,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    //adds click me pop up on the map after 5s
    // setTimeout(
    //   () =>
    //     L.popup({ className: styles.popup })
    //       .setLatLng([36, 3])
    //       .setContent("Click me!")
    //       .openOn(map),
    //   5_000
    // );

    //adds event listener for use clicks on map
    map.on("click", (e) => {
      //adds the pop up
      L.popup()
        .setLatLng(e.latlng)
        .setContent("You' clicked on the map!")
        .openOn(map);

      console.log(e.latlng);
      //dispatches lat lng where the user clicked
      dispatch(reverseGeocodeCountry(e.latlng));
    });
  }, [dispatch]);

  useEffect(() => {
    map.setView(latlng, zoomLevel);
  }, [latlng, zoomLevel]);

  return <div id="map" className={styles.mapC}></div>;
};

export default Map;
