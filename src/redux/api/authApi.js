import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseUrl = process.env.API_BASE_URL;
// Define a service using a base URL and expected endpoints
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getPokemonByName: builder.query({
            query: (name) => `pokemon/${name}`,
        }),
        registerUser: builder.query({
            query(data) {
                return {
                    url: '/register',
                    method: 'POST',
                    body: data,
                };
            },
        }),
    }),
});


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery, useRegisterUserQuery } = authApi;
