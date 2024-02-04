import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addresses: null,
};

export const ngncWalletSlice = createSlice({
  name: "ngncWallet",
  initialState,
  reducers: {
    setDetails: (state, action) => {
      const { addresses } = action.payload;
      state.addresses = addresses;
    },
    clearDetails: (state) => {
      state.addresses = null;
    },
  },
});

export const { setDetails, clearDetails } = ngncWalletSlice.actions;
export default ngncWalletSlice.reducer;

export const selectNgncAddresses = (state) => state.ngncWallet.addresses;
