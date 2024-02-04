import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transaction_name: null,
  remark: null,
  wallet_address: null,
  amount: null,
  start_date: null,
  start_time: null,
  completion_time: null,
  completion_date: null,
  stream_rate: {},
};

export const zebecSlice = createSlice({
  name: "zebec",
  initialState,
  reducers: {
    step_1: (state, action) => {
      const { transaction_name, remark, wallet_address, amount } =
        action.payload;
      state.transaction_name = transaction_name;
      state.remark = remark;
      state.wallet_address = wallet_address;
      state.amount = amount;
    },
    step_2: (state, action) => {
      const {
        start_date,
        start_time,
        completion_time,
        completion_date,
        stream_rate,
      } = action.payload;
      state.start_date = start_date;
      state.start_time = start_time;
      state.completion_time = completion_time;
      state.completion_date = completion_date;
      state.stream_rate = stream_rate;
    },

    reset: (state) => {
      state.transaction_name = null;
      state.remark = null;
      state.wallet_address = null;
      state.amount = null;
      state.start_date = null;
      state.start_time = null;
      state.completion_time = null;
      state.completion_date = null;
      state.stream_rate = null;
    },
  },
});

export const { step_1, step_2, reset } = zebecSlice.actions;
export default zebecSlice.reducer;

export const selectTransaction_name = (state) => state.zebec.transaction_name;
export const selectRemark = (state) => state.zebec.remark;
export const selectWallet_address = (state) => state.zebec.wallet_address;
export const selectAmount = (state) => state.zebec.amount;
export const selectStart_date = (state) => state.zebec.start_date;
export const selectStart_time = (state) => state.zebec.start_time;
export const selectCompletion_time = (state) => state.zebec.completion_time;
export const selectCompletion_date = (state) => state.zebec.completion_date;
export const selectStream_rate = (state) => state.zebec.stream_rate;
