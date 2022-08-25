import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appConfig } from "../../config/config";
import { handleLogin, handleLogout } from "../states/authSlice";

const baseUrl = appConfig.apiBaseUrl;
/** **** Guest API Call Section ***********/
const guestBaseQuery = fetchBaseQuery({ baseUrl });

// Define a service using a base URL and expected endpoints
export const guestApiSlice = createApi({
    baseQuery: guestBaseQuery,
    endpoints:  builder => ({})
});

/** **** Auth API Call Section ***********/
const authBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken; // auth comes from reducers array
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
    let result = await authBaseQuery(args, api, extraOptions);

    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token');
        // send refresh token to get new access token
        const refreshResult = await authBaseQuery('/refresh', api, extraOptions);
        console.log(refreshResult);
        if (refreshResult?.data) {
            const user = api.getState().auth.user;
            // store the new token
            api.dispatch(handleLogin({ ...refreshResult.data, user }));
            // retry the original query with new access token
            result = await authBaseQuery(args, api, extraOptions);
        } else {
            api.dispatch(handleLogout());
        }
    }

    return result;
};

export const authApiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    endpoints:  builder => ({})
});

