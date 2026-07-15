import { configureStore } from "@reduxjs/toolkit";
import { PythonbaseApi } from "../services/python/Pythonbaseapi";
import { JavabaseApi } from "../services/java/Javabaseapi";

export const store = configureStore({
    reducer:{
        [PythonbaseApi.reducerPath]:PythonbaseApi.reducer,
        [JavabaseApi.reducerPath]:JavabaseApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(PythonbaseApi.middleware).concat(JavabaseApi.middleware),
});
