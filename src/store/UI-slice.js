import { createSlice } from "@reduxjs/toolkit";

//*Initial State
const uiInitialState = {
  isLoading: {
    mapPinIsLoading: false,
    countryIsLoading: false,
    neighboursAreLoading: false,
  },
  error: {
    isNotCountry: false,
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

    setNeighboursAreLoading(state, action) {
      state.isLoading.neighboursAreLoading = action.payload;
    },

    setIsNotCountry(state, action) {
      state.error.isNotCountry = action.payload;
    },

    setError(state, action) {
      state.error = {
        ...state.error,
        displayError: true,
        errorMessage: action.payload,
      };
    },

    setErrorVisibility(state, action) {
      state.error.displayError = action.payload;
    },
  },
});

export { uiSlice };

//*Actions
export const uiActions = uiSlice.actions;
