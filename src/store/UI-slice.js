import { createSlice } from "@reduxjs/toolkit";

//*Initial State
const uiInitialState = {
  isLoading: false,
  isNotCountry: false,
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
  },
});

export { uiSlice };

//*Actions
export const uiActions = uiSlice.actions;
