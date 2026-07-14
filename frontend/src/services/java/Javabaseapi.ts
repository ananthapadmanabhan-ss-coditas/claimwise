import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const JavabaseApi = createApi({
    reducerPath: "JavabaseApi",
    baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_JAVA_BASE_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
