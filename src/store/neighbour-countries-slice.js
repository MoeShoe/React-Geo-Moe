import { createSlice } from "@reduxjs/toolkit";

//Initial state

const neighbourCountriesInitialState = {
  neighbourCountries: [],
};

//Slices

const neighbourCountriesSlice = createSlice({
  name: "neighbour-countries",
  initialState: neighbourCountriesInitialState,
  reducers: {
    setNeighbouringCountries(state, action) {
      // update the neighbouring countries here
      state.neighbourCountries = action.payload;
    },
  },
});

export { neighbourCountriesSlice };

//Actions

export const neighbourCountriesActions = neighbourCountriesSlice.actions;
