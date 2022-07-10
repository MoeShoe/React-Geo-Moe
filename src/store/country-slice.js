import { createSlice } from "@reduxjs/toolkit";

import { arrayToTextFormatter } from "../helpers/data-formatting-helpers";

//*initial states
const countryInitialState = {
  country: {
    area: null,
    capital: "",
    currencies: "",
    flag: { png: null, svg: null },
    languages: "",
    name: "",
    population: null,
    subregion: "",
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
      const currencies = Object.values(countryInitialData.currencies).reduce(
        (acc, cur, i, arr) => {
          if (arr.length - i === 1)
            return (acc += `${cur.name} (${cur.symbol}).`);
          return (acc += `${cur.name} (${cur.symbol}), `);
        },
        ""
      );

      const languages = arrayToTextFormatter(
        Object.values(countryInitialData.languages)
      );

      const name = countryInitialData.name?.common;
      const capital =
        countryInitialData.capital?.length !== 0
          ? arrayToTextFormatter(countryInitialData.capital)
          : name;

      const {
        population,
        area,
        flags: flag,
        subregion: region,
      } = countryInitialData;

      //updating state
      state.country = {
        population,
        area,
        currencies,
        languages,
        flag,
        region,
        name,
        capital,
      };
    },
  },
});

export { countrySlice };

//*Actions
export const countryActions = countrySlice.actions;
