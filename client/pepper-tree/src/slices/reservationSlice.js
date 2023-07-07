import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservationData: localStorage.getItem("reservationData")
    ? JSON.parse(localStorage.getItem("reservationData"))
    : null,
};

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setReservationData: (state, action) => {
      state.reservationData = action.payload;
      localStorage.setItem("reservationData", JSON.stringify(action.payload));
    },
    clearReservationData: (state, action) => {

      state.reservationData = null;
      localStorage.removeItem("reservationData");
    },
  },
});








export const { setReservationData, clearReservationData } =
  reservationSlice.actions;
export default reservationSlice.reducer;



