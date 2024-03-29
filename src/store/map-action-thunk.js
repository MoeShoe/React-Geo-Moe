import fetchCountryData from "./country-action-thunk";

import { GEOCODE_API_KEY } from "../constants/API_KEYS";
import COUNTRY_NAMES_LIST from "../constants/COUNTRY_NAMES_LIST";
import { mapActions } from "./map-slice";
import { uiActions } from "./UI-slice";

//*Thunks
const reverseGeocodeCountry = (latLng) => async (dispatch) => {
  try {
    // dispatches data about where the user clicked and loading state

    //set map loading state to true
    dispatch(uiActions.setMapPinLoadingState(true));

    //TODO
    //* it introduces bugs to the animation, will figure out a fix later
    // //set country  loading state to true
    // dispatch(uiActions.setCountryLoadingState(true));

    //Set neighbour countries loading state to true
    dispatch(uiActions.setNeighboursAreLoading(true));

    dispatch(mapActions.setUserClickLatlng([latLng.lat, latLng.lng]));
    dispatch(mapActions.setPinMessage("❗Error"));

    // reverse geocodes the country which the user clicked on (or the area)
    const initialFetch = await fetch(
      `https://api.geocodify.com/v2/reverse?api_key=${GEOCODE_API_KEY}&lat=${latLng.lat}&lng=${latLng.lng}`
    );

    // throwing generic error incase the request failed
    if (!initialFetch.ok) throw new Error("GENERIC_GEOCODE_ERROR");

    const data = await initialFetch.json();
    const locationData = data.response.features.at(0).properties;

    const target = locationData.country || locationData.dependency;

    // this step is added to improve compatibility between the two different APIs

    if (target) {
      // exact match
      let targetCountry = COUNTRY_NAMES_LIST.find((con) => {
        if (Array.isArray(con.common)) {
          let $$con = con.common.find(
            ($con) => target.toLowerCase() === $con.toLowerCase()
          );
          return !!$$con;
        } else return target.toLowerCase() === con.common.toLowerCase();
      });

      // partial match
      if (!targetCountry) {
        targetCountry = COUNTRY_NAMES_LIST.find((con) => {
          if (Array.isArray(con.common))
            return !!con.common.find(($con) =>
              target.toLowerCase().startsWith($con.toLowerCase())
            );
          else return target.toLowerCase().startsWith(con.common.toLowerCase());
        });
      }

      if (!targetCountry) {
        targetCountry = COUNTRY_NAMES_LIST.find((con) => {
          if (Array.isArray(con.common))
            return !!con.common.find(($con) =>
              $con.toLowerCase().startsWith(target.toLowerCase())
            );
          else return con.common.toLowerCase().startsWith(target.toLowerCase());
        });
      }

      dispatch(fetchCountryData(targetCountry?.official || target));
      dispatch(mapActions.setPinMessage(`${target}!`));
      return;
    } else {
      dispatch(
        mapActions.setPinMessage(
          (locationData.label && `This is the ${locationData.label}!`) ||
            "i don't think this is a country :/ "
        )
      );
      // //set country  loading state to false
      // dispatch(uiActions.setCountryLoadingState(false));
      //Set neighbour countries loading state to false
      dispatch(uiActions.setNeighboursAreLoading(false));
    }
  } catch (err) {
    // //set country  loading state to false
    // dispatch(uiActions.setCountryLoadingState(false));
    //Set neighbour countries loading state to false
    dispatch(uiActions.setNeighboursAreLoading(false));

    // Offline error
    if (err.message === "Failed to fetch") {
      dispatch(uiActions.setError(`You appear to be offline.`));
      return;
    }

    //Error handling
    if (err.message === "GENERIC_GEOCODE_ERROR") {
      dispatch(
        uiActions.setError(
          "Something went wrong with reverse geocoding the coordinates"
        )
      );
      return;
    }

    //Generic error handling
    dispatch(uiActions.setError("Something went wrong with the map!"));
  } finally {
    dispatch(uiActions.setMapPinLoadingState(false));
  }
};

export default reverseGeocodeCountry;
