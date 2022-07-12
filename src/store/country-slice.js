import { createSlice } from "@reduxjs/toolkit";

import {
  arrayToTextFormatter,
  formatPopualtion,
} from "../helpers/data-formatting-helpers";

//*initial states
const countryInitialState = {
  country: {
    area: "",
    capital: "",
    currencies: "",
    flag: "", // url for an SVG
    languages: "",
    name: { common: "", official: "" },
    population: "",
    region: "",
    continent: "",
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
            return (acc += `${cur.name}${cur.symbol && ` (${cur.symbol})`}.`);
          return (acc += `${cur.name}${cur.symbol && ` (${cur.symbol})`}, `);
        },
        ""
      );

      const languages = arrayToTextFormatter(
        Object.values(countryInitialData.languages)
      );

      const name = countryInitialData.name;

      const capital =
        countryInitialData.capital?.length !== 0
          ? arrayToTextFormatter(countryInitialData.capital)
          : name?.common;

      const population = formatPopualtion(countryInitialData.population);

      const area = new Intl.NumberFormat("en-UK", {
        style: "unit",
        unit: "kilometer",
      }).format(countryInitialData.area);

      const flag = countryInitialData.flags.svg;

      const { subregion: region, region: continent } = countryInitialData;

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
        continent,
      };
    },
  },
});

export { countrySlice };

//*Actions
export const countryActions = countrySlice.actions;
