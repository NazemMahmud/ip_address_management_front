import { authApiSlice, guestApiSlice } from "./apiSlice";
// import { handleLogin } from "../authSlice";

export const guestAuthApi = guestApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query(data) {
                return {
                    url: 'register',
                    method: 'POST',
                    body: data,
                };
            },
        }),
        login: builder.mutation({
            query(data) {
                return {
                    url: 'login',
                    method: 'POST',
                    body: data,
                };
            },
            // async onQueryStarted(args, { dispatch, queryFulfilled }) {
            //     try {
            //         const { data } = await queryFulfilled;
            //         await dispatch(handleLogin(data.data));
            //     } catch (error) {}
            // },
        }),
    }),
});

export const authAuthApi = authApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        logout: builder.mutation({
            query(data) {
                return {
                    url: 'logout',
                    method: 'POST'
                };
            },
        }),
    }),
});


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {  useRegisterMutation, useLoginMutation } = guestAuthApi;
export const {  useLogoutMutation } = authAuthApi;
