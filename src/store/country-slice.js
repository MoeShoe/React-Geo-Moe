import { createSlice } from "@reduxjs/toolkit";

import { calcZoomLevel } from "../helpers/map-helpers";
import { waitAnimation } from "../helpers/animation-helpers";

import { COUNTRY_INFO_ANIMATION_TIME } from "../constants/ANIMATION_CONSTANTS";
import { uiActions } from "./UI-slice";

//*initial states
const countryInitialState = {
  country: {
    area: null,
    borderingCountries: [],
    capital: null,
    currencies: [{ name: null, symbol: null }],
    flag: { png: null, svg: null },
    languages: [],
    name: null,
    population: null,
    subregion: null,
    latlng: [30, 20],
    zoomLevel: 4,
  },
};

//*slices
const countrySlice = createSlice({
  name: "country",
  initialState: countryInitialState,
  reducers: {
    setCountry(state, action) {
      const countryInitialData = action.payload;

      // formatting data
      const {
        population,
        area,
        flags: flag,
        borders: borderingCountries,
        subregion: region,
      } = countryInitialData;

      const currencies = Object.values(countryInitialData.currencies);
      const languages = Object.values(countryInitialData.languages);
      const name = countryInitialData.name?.common;
      const capital = countryInitialData.capital?.at(0) || name;
      const zoomLevel = calcZoomLevel(area);
      const latlng =
        zoomLevel !== 4
          ? countryInitialData.latlng
          : countryInitialData.capitalInfo.latlng;

      //updating state
      state.country = {
        population,
        area,
        currencies,
        languages,
        flag,
        borderingCountries,
        region,
        name,
        capital,
        zoomLevel,
        latlng,
      };
    },
  },
});

export { countrySlice };

//*Actions
export const countryActions = countrySlice.actions;

//*Thunks
export const fetchCountryData = (countryName) => {
  return async (dispatch) => {
    try {
      // creates a promise that waits for the animation to finish to resolve
      const waitAnimationPromise = waitAnimation(COUNTRY_INFO_ANIMATION_TIME);

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
