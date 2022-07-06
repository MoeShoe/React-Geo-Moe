import { createSlice } from "@reduxjs/toolkit";

import { calcZoomLevel } from "../helpers/map-helpers";

//*Initial States
const mapInitialState = {
  map: {
    latlng: [45, 15],
    zoomLevel: 4,
  },
};

//*slices
const mapSlice = createSlice({
  name: "map",
  initialState: mapInitialState,
  reducers: {
    updateMap(state, action) {
      const initialMapData = action.payload;

      const zoomLevel = calcZoomLevel(initialMapData.area);
      const latlng =
        zoomLevel !== 4
          ? initialMapData.latlng
          : initialMapData.capitalInfo.latlng;

      state.map = {
        latlng,
        zoomLevel,
      };
    },
  },
});

export { mapSlice };

//*actions
export const mapActions = mapSlice.actions;
