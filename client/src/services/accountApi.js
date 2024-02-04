import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../api';

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery,
  endpoints: (builder) => ({
    fetchVirtualAccounts: builder.query({
      query: (userId) => ({
        url: `/account/virtual-account?id=${userId}`,
        method: 'GET',
      }),
    }),
    getAllVirtualAccounts: builder.query({
      query: () => ({
        url: `/account/virtual-accounts`,
        method: 'GET',
      }),
    }),
    accountWithdrawal: builder.mutation({
      query: (details) => ({
        url: '/account/transfer',
        method: 'POST',
        body: { ...details },
      }),
    }),
    createWallet: builder.mutation({
      query: (details) => ({
        url: '/ngnc-wallet/create',
        method: 'POST',
        body: { ...details },
      }),
    }),
    fetchWallet: builder.query({
      query: (userId) => ({
        url: `/ngnc-wallet/fetch?id=${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useFetchVirtualAccountsQuery,
  useGetAllVirtualAccountsQuery,
  useAccountWithdrawalMutation,
  useCreateWalletMutation,
  useFetchWalletQuery,
} = accountApi;
