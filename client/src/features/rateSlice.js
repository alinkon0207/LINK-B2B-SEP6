import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usdcRates: [],
  ngncRates: [],
};

export const rateSlice = createSlice({
  name: "rates",
  initialState,
  reducers: {
    setNgncRates: (state, action) => {
      const { ngncRates } = action.payload;
      state.ngncRates = ngncRates;
    },
    setUsdcRates: (state, action) => {
      const { usdcRates } = action.payload;
      state.usdcRates = usdcRates;
    },
    clean: (state) => {
      state.ngncRates = [];
      state.usdcRates = [];
    },
  },
});

export const { setNgncRates, setUsdcRates, clean } = rateSlice.actions;
export default rateSlice.reducer;

export const selectNgncRates = (state) => state.rates.ngncRates;
export const selectUsdcRates = (state) => state.rates.usdcRates;
