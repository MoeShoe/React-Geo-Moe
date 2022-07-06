import { createSlice } from "@reduxjs/toolkit";

//*Initial States
const mapInitialState = {
  latlng: [30, 20],
  zoomLevel: 4,
};

//*slices
const mapSlice = createSlice({
  name: "map",
  initialState: mapInitialState,
  reducers: {},
});

//*actions
