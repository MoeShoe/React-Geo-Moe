import { createSlice } from "@reduxjs/toolkit";

//*Initial State
const uiInitialState = {
  isLoading: false,
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
    setLoadingState(state, action) {
      state.isLoading = action.payload;
    },

    setIsNotCountry(state, action) {
      state.isNotCountry = action.payload;
    },
    setError(state, action) {
      state.error = { displayError: true, errorMessage: action.payload };
    },
    setErrorVisibility(state, action) {
      state.error = { ...state.error, displayError: action.payload };
    },
  },
});

export { uiSlice };

//*Actions
export const uiActions = uiSlice.actions;
