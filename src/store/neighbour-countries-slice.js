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
    setNeighbouringCountries() {
      // update the array here
    },
  },
});

export { neighbourCountriesSlice };

//Actions

export const neighbourCountriesActions = neighbourCountriesSlice.actions;
