import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "../api";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery,
  endpoints: (builder) => ({
    bankWithdrawal: builder.mutation({
      query: (details) => ({
        url: "/transaction/withdraw/bank",
        method: "POST",
        body: { ...details },
      }),
    }),
    transferWithdrawal: builder.mutation({
      query: (details) => ({
        url: "/transaction/transfer/bank",
        method: "POST",
        body: { ...details },
      }),
    }),
    multichainWithdrawal: builder.mutation({
      query: (details) => ({
        url: "/transaction/withdraw/multichain",
        method: "POST",
        body: { ...details },
      }),
    }),
    getWithdrawal: builder.query({
      query: (userId) => ({
        url: `/transaction/withdrawals?id=${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useBankWithdrawalMutation,
  useTransferWithdrawalMutation,
  useMultichainWithdrawalMutation,
  useGetWithdrawalQuery,
  useWalletWithdrawalMutation,
} = transactionApi;
