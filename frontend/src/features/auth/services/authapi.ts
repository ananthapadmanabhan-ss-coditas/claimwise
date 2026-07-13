import { baseApi } from "../../../services/baseapi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    verifyemail: builder.mutation<void, {email:string}>({
      query: (body) => ({
        url: "", //integrate once i get api
        method: "POST",
        body,
      }),
    }),

    verifyotp: builder.mutation<void, {otp:string}>({
      query: (body) => ({
        url: "", //integrate with api
        method: "POST",
        body,
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
} = authApi;
