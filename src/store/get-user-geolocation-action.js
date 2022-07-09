import reverseGeocodeCountry from "./map-action-thunk";
import { uiActions } from "./UI-slice";

// Promisified geolocation API
const geoLocationPromise = () =>
  new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });

const getUserGeolocation = () => async (dispatch) => {
  try {
    const userGeolocation = await geoLocationPromise();
    const { latitude: lat, longitude: lng } = userGeolocation.coords;
    dispatch(reverseGeocodeCountry({ lat, lng }));
  } catch (_) {
    dispatch(
      uiActions.setError(
        "Failed to get your current location, did you grant permission?"
      )
    );
  }
};

export default getUserGeolocation;
