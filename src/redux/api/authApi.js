import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleLogin } from "../authSlice";
import { appConfig } from "../../config/config";

const baseUrl = appConfig.apiBaseUrl;
// Define a service using a base URL and expected endpoints
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getPokemonByName: builder.query({
            query: (name) => `pokemon/${name}`,
        }),
        loginUser: builder.mutation({
            query(data) {
                return {
                    url: '/login',
                    method: 'POST',
                    body: data,
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    await dispatch(handleLogin(data.data));
                } catch (error) {}
            },
        }),
    }),
});


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {  useLoginUserQuery } = authApi;
