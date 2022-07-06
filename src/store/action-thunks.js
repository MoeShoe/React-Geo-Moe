import { waitAnimation } from "../helpers/animation-helpers";

import { COUNTRY_INFO_ANIMATION_WAIT_TIME } from "../constants/ANIMATION_CONSTANTS";
import { uiActions } from "./UI-slice";
import { countryActions } from "./country-slice";

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

      let countryData = await initialFetch.json();

      // guard clause in case we get multiple results
      if (countryData.length > 1)
        countryData = countryData.filter(
          (country) => country.name.official === countryName
        );

      dispatch(countryActions.setCountry(countryData.at(0)));
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

export { fetchCountryData };
