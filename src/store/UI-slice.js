import { createSlice } from "@reduxjs/toolkit";

//*Initial State
const uiInitialState = {
  isLoading: {
    mapPinIsLoading: false,
    countryIsLoading: false,
    neighboursAreLoading: false,
  },
  isNotCountry: false,
  error: {
    displayError: false,
    errorMessage: "",
  },
};

//*Slice
const uiSlice = createSlice({
  name: "UI",
  initialState: uiInitialState,
  reducers: {
    setCountryLoadingState(state, action) {
      state.isLoading.countryIsLoading = action.payload;
    },

    setMapPinLoadingState(state, action) {
      state.isLoading.mapPinIsLoading = action.payload;
    },

    setNeighboursAreLoading(action, state) {
      state.isLoading.neighboursAreLoading = action.payload;
    },

    setIsNotCountry(state, action) {
      state.isNotCountry = action.payload;
    },

    setError(state, action) {
      state.error = { displayError: true, errorMessage: action.payload };
    },

    setErrorVisibility(state, action) {
      state.error.displayError = action.payload;
    },
  },
});

export { uiSlice };

//*Actions
export const uiActions = uiSlice.actions;
