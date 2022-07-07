import { waitAnimation } from "../helpers/animation-helpers";
import fetchNeighbouringCountries from "./neighbour-country-action-thunk";

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

      // guard clause in case we get multiple results
      if (data.length > 1)
        data = data.filter(
          (country) =>
            country.name.official.toLowerCase() === countryName.toLowerCase()
        );

      //setup data for dispatch
      const [
        { latlng, capitalInfo, borders: neighbouringCountries, ...countryData },
      ] = data;

      //*dispatch to reducers

      //update Country
      dispatch(countryActions.setCountry(countryData));

      //update Neighbouring Countries
      dispatch(fetchNeighbouringCountries(neighbouringCountries));

      //update Map
      dispatch(
        mapActions.updateMap({ latlng, capitalInfo, area: countryData.area })
      );

      //update UI
      dispatch(uiActions.setIsNotCountry(false));

      //waits for the animation to finish
      await waitAnimationPromise;
    } catch (err) {
      //* queried country is not a country error handling
      if (err.message === "NOT_COUNTRY") {
        dispatch(uiActions.setIsNotCountry(true));
        dispatch(uiActions.setError(`${countryName} is not a country!`));
        return;
      }

      //* generic error handling
      dispatch(uiActions.setError(err.message));
    } finally {
      // only happens once the animation is finished
      dispatch(uiActions.setLoadingState(false));
    }
  };
};

export default fetchCountryData;
