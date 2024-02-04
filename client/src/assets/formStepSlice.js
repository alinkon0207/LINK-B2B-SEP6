import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 1,
};

export const formStepSlice = createSlice({
  name: "formStep",
  initialState,
  reducers: {
    nextForm: (state) => {
      state.value = 2;
    },
    prevForm: (state) => {
      state.value = 1;
    },
  },
});

export const { nextForm, prevForm } = formStepSlice.actions;
export default formStepSlice.reducer;

export const selectValue = (state) => state.formStep.value;
