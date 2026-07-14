import { PythonbaseApi } from "../../../services/python/Pythonbaseapi";
import type { BaseClaimRequest,BaseClaimResponse,SubmitClaimRequest, UploadClaimRequest } from "../types/claim.types";

export const authApi = PythonbaseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllClaims: builder.query<any, void>({ //change ds according to data after recieving api
      query: () => ({
        url: "", //integrate once i get api
        method: "GET",
      }),
    }),

    getClaimById: builder.query<any,{id:string}>({
      query: (body) => ({
        url: "", //integrate with api
        method: "GET",
        body,
      }),
    }),

    BaseClaim: builder.mutation<BaseClaimResponse,BaseClaimRequest>({
      query: (body) => ({
        url: "/claims",
        method:"POST",
        body
      }),
    }),

    UploadClaim: builder.mutation<any, UploadClaimRequest>({
      query: () => ({
        url: "",
        method:"GET"
      }),
    }),

    SubmitClaim: builder.mutation<any, SubmitClaimRequest>({
      query: () => ({
        url: "",
        method:"POST"
      }),
    }),
    
  }),
});

export const {
  useBaseClaimMutation,
  useGetAllClaimsQuery,
  useGetClaimByIdQuery,
  useSubmitClaimMutation,
  useUploadClaimMutation
} = authApi;
