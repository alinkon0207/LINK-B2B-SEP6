import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../api';

export const walletTransactionApi = createApi({
  reducerPath: 'walletTransaction',
  baseQuery,
  endpoints: (builder) => ({
    walletTransfer: builder.mutation({
      query: (details) => ({
        url: '/ngnc-wallet/transfer',
        method: 'POST',
        body: { ...details },
      }),
    }),
    walletWithdraw: builder.mutation({
      query: (details) => ({
        url: '/ngnc-wallet/withdraw',
        method: 'POST',
        body: { ...details },
      }),
    }),
    getTransaction: builder.query({
      query: (userId) => ({
        url: `/ngnc-wallet/transactions?id=${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useWalletTransferMutation,
  useWalletWithdrawMutation,
  useGetTransactionQuery,
} = walletTransactionApi;
