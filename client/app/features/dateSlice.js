import { createSlice } from "@reduxjs/toolkit";

export const dateSlice = createSlice({
  name: "date",
  initialState: {
    date: null,
  },
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload.date;
    },
  },
});

export const { setDate } = dateSlice.actions;

export const selectDate = (state) => state.date.date;

export default dateSlice.reducer;
