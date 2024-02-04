import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ngncNetwork: '',
  token: '',
  tokenNetwork: '',
  walletAddress: '',
  linkAddress: '',
};

export const settlementSlice = createSlice({
  name: 'settlement',
  initialState,
  reducers: {
    setSettlement: (state, action) => {
      const { ngncNetwork, token, tokenNetwork, walletAddress, linkAddress } =
        action.payload;
      state.ngncNetwork = ngncNetwork;
      state.token = token;
      state.tokenNetwork = tokenNetwork;
      state.walletAddress = walletAddress;
      state.linkAddress = linkAddress;
    },

    clearSettlement: (state) => {
      state.ngncNetwork = '';
      state.token = '';
      state.tokenNetwork = '';
      state.walletAddress = '';
      state.linkAddress = '';
    },
  },
});

export const { setSettlement, clearSettlement } = settlementSlice.actions;
export default settlementSlice.reducer;

export const selectSettlementData = (state) => state.settlement;
