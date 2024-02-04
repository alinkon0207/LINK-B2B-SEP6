import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { linkExcelApi } from "../api";

export const rateApi = createApi({
  reducerPath: "excelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: linkExcelApi,
  }),
  endpoints: (builder) => ({
    getUsdcNgncRates: builder.query({
      query: () => ({
        url: "/b2b_rates",
        method: "GET",
      }),
    }),
    getNgncUsdcRates: builder.query({
      query: () => ({
        url: "/rates",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNgncUsdcRatesQuery, useGetUsdcNgncRatesQuery } = rateApi;
