import { PythonbaseApi } from "../../../services/python/Pythonbaseapi";
import type { BaseClaimRequest,BaseClaimResponse,GetClaimsResponse,SubmitClaimRequest, UploadClaimRequest } from "../types/claim.types";

export const authApi = PythonbaseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllClaims: builder.query<GetClaimsResponse[], void>({ 
      query: () => ({
        url: "/claims", 
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
      query: ({claim_id,...body}) => ({
        url: `/claims/${claim_id}/attachment`,
        method:"POST",
        body
      }),
    }),

    SubmitClaim: builder.mutation<any, SubmitClaimRequest>({
      query: ({claim_id}) => ({
        url: `/claims/${claim_id}/submit`,
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
