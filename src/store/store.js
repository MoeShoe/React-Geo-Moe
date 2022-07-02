import { configureStore, createSlice } from "@reduxjs/toolkit";

//initial states
const countryInitialState = {
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

      console.log(countryInitialData);
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
      const initialFetch = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      if (!initialFetch.ok) throw new Error("this is not a country!");
      const [countryData] = await initialFetch.json();
      dispatch(countryActions.setCountry(countryData));
    } catch (err) {
      console.error(err.message);
    }
  };
};

export default store;
