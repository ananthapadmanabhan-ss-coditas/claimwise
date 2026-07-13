import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/baseapi";

export const store = configureStore({
    reducer:{
        [baseApi.reducerPath]:baseApi.reducer,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(baseApi.middleware),
});
