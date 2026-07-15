import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { JavaBaseQueryWithRefresh } from "./Javabasequeryrefresh";

export const JavabaseQuery=fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_JAVA_BASE_URL,

    prepareHeaders: (headers) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

export const JavabaseApi = createApi({
    reducerPath: "JavabaseApi",
    baseQuery: JavaBaseQueryWithRefresh,
    tagTypes: [],
    endpoints: () => ({}),
});
