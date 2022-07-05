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
  },
};

// slices
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
      const name = countryInitialData.name.common;
      const capital = countryInitialData.capital.at(0);
      const currency = Object.values(countryInitialData.currencies).at(0);
      const language = Object.values(countryInitialData.languages).at(0);

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
      if (!initialFetch.ok) {
        await waitAnimationPromise;
        throw new Error("NOT_COUNTRY");
      }
      const [countryData] = await initialFetch.json();
      dispatch(countryActions.setCountry(countryData));
      dispatch(countryActions.setIsNotCountry(false));
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
