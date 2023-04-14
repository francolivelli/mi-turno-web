import { createSlice } from "@reduxjs/toolkit";

export const stepSlice = createSlice({
  name: "step",
  initialState: {
    currentStep: 1,
  },
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export const { setCurrentStep } = stepSlice.actions;

export const selectCurrentStep = (state) => state.step.currentStep;

export default stepSlice.reducer;