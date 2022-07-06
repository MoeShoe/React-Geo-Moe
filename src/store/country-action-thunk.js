import { waitAnimation } from "../helpers/animation-helpers";

import { COUNTRY_INFO_ANIMATION_WAIT_TIME } from "../constants/ANIMATION_CONSTANTS";
import { uiActions } from "./UI-slice";
import { countryActions } from "./country-slice";
import { mapActions } from "./map-slice";

//*Thunks
const fetchCountryData = (countryName) => {
  return async (dispatch) => {
    try {
      // creates a promise that waits for the animation to finish to resolve
      const waitAnimationPromise = waitAnimation(
        COUNTRY_INFO_ANIMATION_WAIT_TIME
      );

      dispatch(uiActions.setLoadingState(true));

      const initialFetch = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}?fields=name,area,population,flags,borders,subregion,capital,currencies,languages,latlng,capitalInfo`
      );

      if (!initialFetch.ok) {
        await waitAnimationPromise;
        throw new Error("NOT_COUNTRY");
      }

      let data = await initialFetch.json();

      console.log(data);

      // guard clause in case we get multiple results
      if (data.length > 1)
        data = data.filter((country) => country.name.official === countryName);

      //setup data for dispatch
      const [{ latlng, capitalInfo, ...countryData }] = data;

      //dispatch to reducers
      dispatch(countryActions.setCountry(countryData));
      dispatch(
        mapActions.updateMap({ latlng, capitalInfo, area: countryData.area })
      );
      dispatch(uiActions.setIsNotCountry(false));

      //waits for the animation to finish
      await waitAnimationPromise;
    } catch (err) {
      //* queried country is not a country error handling
      if (err.message === "NOT_COUNTRY") {
        dispatch(uiActions.setIsNotCountry(true));
        return;
      }

      //* generic error handling for now ...
      console.error(err.message);
    } finally {
      // only happens once the animation is finished
      dispatch(uiActions.setLoadingState(false));
    }
  };
};

export default fetchCountryData;
