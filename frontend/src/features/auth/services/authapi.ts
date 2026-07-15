import { JavabaseApi } from "../../../services/java/Javabaseapi";
import type { EmailRequest, VerifyOTPRequest } from "../types/auth.types";

export const authApi = JavabaseApi.injectEndpoints({
  endpoints: (builder) => ({

    verifyemail: builder.mutation<void, EmailRequest>({
      query: (body) => ({
        url: "api/v1/auth/request-otp",
        method: "POST",
        body,
      }),
    }),

    verifyotp: builder.mutation<void, VerifyOTPRequest>({
      query: (body) => ({
        url: "api/v1/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),

    refresh: builder.mutation<any, {refreshToken:string}>({
      query: () => ({
        url: "",
        method:"GET"
      }),
    }),

    me: builder.query<any, void>({
      query: () => ({
        url: "auth/me",
        method:"GET"
      }),
    }),
    
  }),
});

export const {
  useMeQuery,
  useVerifyemailMutation,
  useVerifyotpMutation,
  useRefreshMutation
} = authApi;
