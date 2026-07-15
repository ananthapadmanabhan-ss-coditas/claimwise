import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { PythonBaseQueryWithRefresh } from "./Pythonbasequeryrefresh";


export const PythonbaseQuery=fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_PYTHON_BASE_URL,

    prepareHeaders: (headers) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

export const PythonbaseApi = createApi({
    reducerPath: "PythonbaseApi",
    baseQuery: PythonBaseQueryWithRefresh,
    tagTypes: [],
    endpoints: () => ({}),
});
