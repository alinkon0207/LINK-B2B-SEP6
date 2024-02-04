import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: null,
  linkTag: null,
};

export const sellSlice = createSlice({
  name: "sell",
  initialState,
  reducers: {
    setAmount: (state, action) => {
      const { amount, linkTag } = action.payload;
      state.amount = amount;
      state.linkTag = linkTag;
    },
    resetAmount: (state) => {
      state.amount = null;
      state.linkTag = null;
    },
  },
});

export const { setAmount, resetAmount } = sellSlice.actions;
export default sellSlice.reducer;

export const selectAmount = (state) => state.sell.amount;
export const selectLinkTag = (state) => state.sell.linkTag;
