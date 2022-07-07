import { configureStore } from "@reduxjs/toolkit";

import { countrySlice } from "./country-slice";
import { neighbourCountriesSlice } from "./neighbour-countries-slice";
import { mapSlice } from "./map-slice";
import { uiSlice } from "./UI-slice";

//*store
const store = configureStore({
  reducer: {
    country: countrySlice.reducer,
    ui: uiSlice.reducer,
    map: mapSlice.reducer,
    neighbouringCountries: neighbourCountriesSlice.reducer,
  },
});

export default store;
