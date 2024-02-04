import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: "main",
};

export const settlementTabSlice = createSlice({
  name: "settlementTab",
  initialState,
  reducers: {
    setNextTab: (state, action) => {
      const { tab } = action.payload;
      state.tab = tab;
    },

    close: (state) => {
      state.tab = "main";
    },
  },
});

export const { setNextTab, close } = settlementTabSlice.actions;
export default settlementTabSlice.reducer;

export const selectSettlementTab = (state) => state.settlementTab.tab;
