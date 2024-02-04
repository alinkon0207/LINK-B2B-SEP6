import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api";

export const settlementApi = createApi({
  reducerPath: "settlementApi",
  baseQuery,
  endpoints: (builder) => ({
    usdcNgnc: builder.mutation({
      query: (details) => ({
        url: "/settlement/usdc-ngnc",
        method: "POST",
        body: { ...details },
      }),
    }),
    ngncusdc: builder.mutation({
      query: (details) => ({
        url: "/settlement/ngnc-usdc",
        method: "POST",
        body: { ...details },
      }),
    }),
  }),
});

export const { useNgncusdcMutation, useUsdcNgncMutation } = settlementApi;
