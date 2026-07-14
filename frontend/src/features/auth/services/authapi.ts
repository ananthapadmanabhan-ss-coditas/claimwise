import { JavabaseApi } from "../../../services/java/Javabaseapi";
import type { EmailRequest, VerifyOTPRequest } from "../types/auth.types";

export const authApi = JavabaseApi.injectEndpoints({
  endpoints: (builder) => ({

    verifyemail: builder.mutation<void, EmailRequest>({
      query: (body) => ({
        url: "", //integrate once i get api
        method: "POST",
        body,
      }),
    }),

    verifyotp: builder.mutation<void, VerifyOTPRequest>({
      query: (body) => ({
        url: "", //integrate with api
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
        url: "",
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
