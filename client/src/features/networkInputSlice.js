import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: null,
  network: null,
  name: null,
  index: 0,
};

export const networkSelectorSlice = createSlice({
  name: "networkSelector",
  initialState,
  reducers: {
    selectNet: (state, action) => {
      const { index, network, name, address } = action.payload;
      state.address = address;
      state.network = network;
      state.name = name;
      state.index = index;
    },
    clearNet: (state) => {
      state.address = null;
      state.network = null;
      state.name = null;
      state.index = 0;
    },
  },
});

export const { selectNet, clearNet } = networkSelectorSlice.actions;
export default networkSelectorSlice.reducer;

export const selectNetwork = (state) => state.networkSelector.network;
export const selectName = (state) => state.networkSelector.name;
export const selectIndex = (state) => state.networkSelector.index;
export const selectAddress = (state) => state.networkSelector.address;
