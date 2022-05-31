import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPos: {},
  origin: {},
  destination: {},
  isStation:{},
  travelTimeInformation: {},
  stations: [],
  nearByStations: [],
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    setCurrentPos: (state, action) => {
      state.currentPos = action.payload;
    },
    setStations: (state, action) => {
      return { ...state, stations: [...action.payload] };
      state.stations = action.payload;
      console.log(state.stations);
    },
    setNearByStaions: (state, action) => {
      return { ...state, nearByStations: [...action.payload] };
      state.nearByStations = action.payload;
    },
    setIsStation: (state,action) =>{
      state.isStation = action.payload;
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setTravelTimeInformation,
  setCurrentPos,
  setNearByStaions,
  setStations,
  setIsStation,
} = navSlice.actions;

// Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;
export const selectIsStation = (state) => state.nav.isStation;
export const selectCurrentPosition = (state) => state.nav.currentPos;
export const selectStaions = (state) => state.nav.stations;
export const selectNearByStations = (state) => state.nav.nearByStations;
export default navSlice.reducer;