import { configureStore, createSlice } from "@reduxjs/toolkit";

//initial states
const countryInitialState = {
  isLoading: false,
  isNotCountry: false,
  country: {
    area: null,
    borderingCountries: [],
    capital: null,
    currency: { name: null, symbol: null },
    flag: { png: null, svg: null },
    language: null,
    name: null,
    population: null,
    subregion: null,
    latlng: [30, 20],
    zoomLevel: 4,
  },
};

// slices
const countrySlice = createSlice({
  name: "country",
  initialState: countryInitialState,
  reducers: {
    setCountry(state, action) {
      const countryInitialData = action.payload;

      //helper function
      //!get this out of here
      const calcZoomLevel = ($area) => {
        if ($area < 150) return 12;
        if ($area < 1_000) return 11;
        if ($area < 5_000) return 9;
        if ($area < 30_000) return 8;
        if ($area < 200_000) return 7;
        if ($area < 1_000_000) return 6;
        if ($area < 5_000_000) return 5;
        return 4;
      };

      // formatting data
      const {
        population,
        area,
        flags: flag,
        borders: borderingCountries,
        subregion: region,
      } = countryInitialData;
      const name = countryInitialData.name?.common;
      const capital = countryInitialData.capital?.at(0) || name;
      const currency = Object.values(countryInitialData.currencies)?.at(0);
      const language = Object.values(countryInitialData.languages)?.at(0);
      const zoomLevel = calcZoomLevel(area);
      const latlng =
        zoomLevel !== 4
          ? countryInitialData.latlng
          : countryInitialData.capitalInfo.latlng;

      //updating state
      state.country = {
        population,
        area,
        flag,
        borderingCountries,
        region,
        name,
        capital,
        currency,
        language,
        latlng,
        zoomLevel,
      };
    },

    setLoadingState(state, action) {
      state.isLoading = action.payload;
    },

    setIsNotCountry(state, action) {
      state.isNotCountry = action.payload;
    },
  },
});

//store
const store = configureStore({
  reducer: countrySlice.reducer,
});

//Actions
export const countryActions = countrySlice.actions;

//Thunks
export const fetchCountryData = (countryName) => {
  return async (dispatch) => {
    try {
      const waitAnimationPromise = waitAnimation();
      dispatch(countryActions.setLoadingState(true));
      const initialFetch = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );

      // ?fields=name,area,population,flags,borders,subregion,capital,currencies,languages

      if (!initialFetch.ok) {
        await waitAnimationPromise;
        throw new Error("NOT_COUNTRY");
      }

      let countryData = await initialFetch.json();

      console.log(countryData);

      // guard clause in case we get multiple results
      if (countryData.length > 1)
        countryData = countryData.filter(
          (country) => country.name.official === countryName
        );

      dispatch(countryActions.setCountry(countryData.at(0)));
      dispatch(countryActions.setIsNotCountry(false));

      //waits for the animation to finish
      await waitAnimationPromise;
    } catch (err) {
      //* queried country is not a country error handling
      if (err.message === "NOT_COUNTRY") {
        dispatch(countryActions.setIsNotCountry(true));
        return;
      }

      //* generic error handling for now ...
      console.error(err.message);
    } finally {
      dispatch(countryActions.setLoadingState(false));
    }
  };
};

export default store;

//! remove this from here later!
//helper

const waitAnimation = () =>
  new Promise((res) => {
    setTimeout(() => res(), 450);
  });
