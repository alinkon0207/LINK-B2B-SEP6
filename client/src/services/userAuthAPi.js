import { createApi } from "@reduxjs/toolkit/query/react";

// import { setCredentials, logOut } from "../features/auth/authSlice";
import { baseQuery } from "../api";

export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery,
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    userLoginAdmin: builder.mutation({
      query: (credentials) => ({
        url: "/user/login-admin",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    allAccounts: builder.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
    }),
    newUser: builder.mutation({
      query: (credentials) => ({
        url: "/user/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: `/user/forgot-password`,
        method: "POST",
        headers: Headers,
        body: { ...credentials },
      }),
    }),
    updatePassword: builder.mutation({
      query: (credentials) => ({
        url: `/user/change-password/${credentials.uID}`,
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: `/user/reset-password?token=${credentials.token}&id=${credentials.id}`,
        method: "POST",
        body: { ...credentials },
      }),
    }),
    requestKYB: builder.mutation({
      query: (credentials) => ({
        url: "/user/requestKYB",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserLoginAdminMutation,
  useNewUserMutation,
  useForgotPasswordMutation,
  useUpdatePasswordMutation,
  useRequestKYBMutation,
  useResetPasswordMutation,
  useAllAccountsQuery,
} = userAuthApi;
