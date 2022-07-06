import fetchCountryData from "./country-action-thunk";

import { GEOCODE_API_KEY } from "../constants/API_KEYS";
import COUNTRY_NAMES_LIST from "../constants/COUNTRY_NAMES_LIST";

const reverseGeocodeCountry = (latLng) => async (dispatch) => {
  try {
    const initialFetch = await fetch(
      `https://api.geocodify.com/v2/reverse?api_key=${GEOCODE_API_KEY}&lat=${latLng.lat}&lng=${latLng.lng}`
    );
    // throwing generic error incase the request failed
    if (!initialFetch.ok) throw new Error("GENERIC_GEOCODE_ERROR");

    const data = await initialFetch.json();
    const locationData = data.response.features.at(0).properties;

    console.log(locationData.country);
    // this step is added to improve compatibility between the two different APIs
    if (locationData.country) {
      const [targetCountry] = COUNTRY_NAMES_LIST.filter((con) =>
        locationData.country.startsWith(con.common)
      );
      dispatch(
        fetchCountryData(targetCountry?.official || locationData.country)
      );
    }
    // will add this later!
    else dispatch();
  } catch (err) {
    if (err.message === "GENERIC_GEOCODE_ERROR") {
      console.error(
        "Something went wrong with reverse geocoding the coordinates"
      );
      return;
    }
    console.error("Something went wrong!");
  }
};

export default reverseGeocodeCountry;
