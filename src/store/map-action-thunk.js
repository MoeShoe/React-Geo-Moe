import fetchCountryData from "./country-action-thunk";

import { GEOCODE_API_KEY } from "../constants/API_KEYS";
import COUNTRY_NAMES_LIST from "../constants/COUNTRY_NAMES_LIST";
import { mapActions } from "./map-slice";

//*Thunks
const reverseGeocodeCountry = (latLng) => async (dispatch) => {
  try {
    // dispatches data about where the user clicked and loading state
    dispatch(mapActions.setPinLoadingState(true));
    dispatch(mapActions.setUserClickLatlng([latLng.lat, latLng.lng]));

    // reverse geocodes the country which the user clicked on (or the area)
    const initialFetch = await fetch(
      `https://api.geocodify.com/v2/reverse?api_key=${GEOCODE_API_KEY}&lat=${latLng.lat}&lng=${latLng.lng}`
    );

    // throwing generic error incase the request failed
    if (!initialFetch.ok) throw new Error("GENERIC_GEOCODE_ERROR");

    const data = await initialFetch.json();
    const locationData = data.response.features.at(0).properties;

    // this step is added to improve compatibility between the two different APIs
    if (locationData.country) {
      let [targetCountry] = COUNTRY_NAMES_LIST.filter(
        (con) =>
          locationData.country.toLowerCase() === con.common.toLocaleLowerCase()
      );
      if (!targetCountry) {
        [targetCountry] = COUNTRY_NAMES_LIST.filter((con) =>
          locationData.country.startsWith(con.common)
        );
      }

      dispatch(
        fetchCountryData(targetCountry?.official || locationData.country)
      );
      dispatch(mapActions.setPinMessage(`${locationData.country}!`));
      return;
    }

    //sometimes we get the dependency field instead of country from the API
    if (locationData.dependency) {
      dispatch(fetchCountryData(locationData.dependency));
      dispatch(mapActions.setPinMessage(`${locationData.dependency}!`));
      return;
    } else
      dispatch(
        mapActions.setPinMessage(
          `This is the ${
            locationData.label || "i don't think this is a country :/ "
          }!`
        )
      );
  } catch (err) {
    if (err.message === "GENERIC_GEOCODE_ERROR") {
      console.error(
        "Something went wrong with reverse geocoding the coordinates"
      );
      return;
    }
    console.error("Something went wrong!");
  } finally {
    dispatch(mapActions.setPinLoadingState(false));
  }
};

export default reverseGeocodeCountry;
