import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { JavabaseQuery } from "./Javabaseapi";


interface RefreshResponse {
    accessToken: string;
    refreshToken: string;
}

export const JavaBaseQueryWithRefresh: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {

    let result = await JavabaseQuery(
        args,
        api,
        extraOptions
    );

    if (result.error?.status === 401) {

        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            return result;
        }

        const refreshResult = await JavabaseQuery(
            {
                url: "/auth/refresh",
                method: "POST",
                body: {
                    refreshToken,
                },
            },
            api,
            extraOptions
        );

        if (refreshResult.data) {

            const {
                accessToken,
                refreshToken: newRefreshToken,
            } = refreshResult.data as RefreshResponse;

            localStorage.setItem(
                "accessToken",
                accessToken
            );

            localStorage.setItem(
                "refreshToken",
                newRefreshToken
            );

            result = await JavabaseQuery(
                args,
                api,
                extraOptions
            );

        } else {

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
    }

    return result;
};