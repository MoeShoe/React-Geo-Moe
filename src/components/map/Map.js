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

  const { pinMessage, userClickLatlng, pinIsLoading } = useSelector(
    (state) => state.map.pin
  );

  //* sets up our map
  useEffect(() => {
    //initializes our map
    map = L.map("map").setView([30, 20], 2);

    //sets up openstreetmap as our map source of choice
    L.tileLayer("https://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      maxZoom: 12,
      attribution: "© OpenStreetMap",
    }).addTo(map);
  }, []);

  //* adds event listener to user clicks on map
  useEffect(() => {
    //updates pin message
    const updatePinOnMap = (e) => {
      //dispatches the latitude and longitude of where the user clicked on the map
      dispatch(reverseGeocodeCountry(e.latlng));
    };

    //adds event listener for use clicks on map
    map.on("click", updatePinOnMap);
  }, [dispatch]);

  //* creates pin with message on where the user clicked on the map
  useEffect(() => {
    //adds the pop up
    if (!pinMessage) return;

    //adds click me pop up on the map after 5s
    // setTimeout(
    //   () =>
    //     L.popup({ className: styles.popup })
    //       .setLatLng([36, 3])
    //       .setContent("Click me!")
    //       .openOn(map),
    //   5_000
    // );

    const message = !pinIsLoading ? pinMessage : "🌎 Loading...";
    L.popup().setLatLng(userClickLatlng).setContent(message).openOn(map);
  }, [pinMessage, userClickLatlng, pinIsLoading]);

  //* updates map on country change
  useEffect(() => {
    map.setView(latlng, zoomLevel);
  }, [latlng, zoomLevel]);

  return <div id="map" className={styles.mapC}></div>;
};

export default Map;
