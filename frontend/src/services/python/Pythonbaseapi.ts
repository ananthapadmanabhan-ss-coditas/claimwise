import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const PythonbaseApi = createApi({
    reducerPath: "PythonbaseApi",
    baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_PYTHON_BASE_URL,
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
