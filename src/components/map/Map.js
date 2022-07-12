import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import styles from "./Map.module.css";
import reverseGeocodeCountry from "../../store/map-action-thunk";
import Card from "../UI/Card";

//TODO
/* find a fix to #closed being added to the URL after a pop up is closed
 on the map or downgrade to leaflet 1.7.0 where this is not an issue*/

let map;

const Map = () => {
  const dispatch = useDispatch();

  const { latlng, zoomLevel } = useSelector((state) => state.map.map);

  const { pinMessage, userClickLatlng } = useSelector((state) => state.map.pin);

  const pinIsLoading = useSelector(
    (state) => state.ui.isLoading.mapPinIsLoading
  );

  //* sets up our map
  useEffect(() => {
    //initializes our map
    map = L.map("map").setView([30, 20], 2);

    //sets up openstreetmap as our map source of choice
    L.tileLayer("https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
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

  return (
    <Card className={styles["country-map-container"]}>
      <div id="map" className={styles.mapC}></div>
    </Card>
  );
};

export default Map;
