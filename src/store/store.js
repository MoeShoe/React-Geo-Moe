import { configureStore } from "@reduxjs/toolkit";

import { countrySlice } from "./country-slice";
import { uiSlice } from "./UI-slice";

//*store
const store = configureStore({
  reducer: {
    country: countrySlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
