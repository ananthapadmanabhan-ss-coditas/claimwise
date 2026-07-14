import { configureStore } from "@reduxjs/toolkit";
import { JavabaseApi } from "../services/java/Javabaseapi";
import { PythonbaseApi } from "../services/python/Pythonbaseapi";

export const store = configureStore({
    reducer:{
        [PythonbaseApi.reducerPath]:PythonbaseApi.reducer,
        [JavabaseApi.reducerPath]:JavabaseApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(PythonbaseApi.middleware).concat(JavabaseApi.middleware),
});
