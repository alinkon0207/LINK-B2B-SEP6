import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: null,
  linkTag: null,
  address: null,
};

export const buySlice = createSlice({
  name: "buy",
  initialState,
  reducers: {
    setAmount: (state, action) => {
      const { amount, linkTag, address } = action.payload;
      state.amount = amount;
      state.linkTag = linkTag;
      state.address = address;
    },
    resetAmount: (state) => {
      state.amount = null;
      state.linkTag = null;
      state.address = null;
    },
  },
});

export const { setAmount, resetAmount } = buySlice.actions;
export default buySlice.reducer;

export const selectAmount = (state) => state.buy.value;
