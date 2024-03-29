import { createSlice } from "@reduxjs/toolkit";

import { calcZoomLevel } from "../helpers/map-helpers";

//*Initial States
const mapInitialState = {
  map: {
    latlng: [45, 15],
    zoomLevel: 4,
  },
  pin: {
    pinMessage: "",
    userClickLatlng: [],
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
        (zoomLevel === 4 || zoomLevel === 12 || zoomLevel === 11) &&
        initialMapData.capitalInfo?.latlng.length !== 0
          ? initialMapData.capitalInfo?.latlng
          : initialMapData.latlng;

      state.map = {
        latlng,
        zoomLevel,
      };
    },

    setPinMessage(state, action) {
      state.pin.pinMessage = action.payload;
    },

    setUserClickLatlng(state, action) {
      state.pin.userClickLatlng = action.payload;
    },

    setPinLoadingState(state, action) {
      state.pin.pinIsLoading = action.payload;
    },
  },
});

export { mapSlice };

//*actions
export const mapActions = mapSlice.actions;
