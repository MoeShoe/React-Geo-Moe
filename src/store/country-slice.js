import { createSlice } from "@reduxjs/toolkit";

import { calcZoomLevel } from "../helpers/map-helpers";

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
