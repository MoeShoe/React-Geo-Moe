import { configureStore, createSlice } from "@reduxjs/toolkit";

//initial states
const countryInitialState = {
  country: {
    area: null,
    borders: [],
    capital: [],
    currencies: {},
    flags: {},
    languages: {},
    name: {},
    population: {},
    subregion: {},
  },
};

// slices
const countrySlice = createSlice({
  name: "country",
  initialState: countryInitialState,
  reducers: {
    setCountry(state, action) {
      state.country = action.payload;
      console.log(action.payload);
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
      const countryData = await initialFetch.json();
      dispatch(countryActions.setCountry(countryData));
    } catch (err) {
      console.error(err);
    }
  };
};

export default store;
