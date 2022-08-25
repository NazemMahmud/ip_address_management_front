import { createSlice } from '@reduxjs/toolkit';
import { getUserData, getAccessToken } from "../../utility/utils";
import jwt_decode from "jwt-decode";


export const authSlice = createSlice({
    name: 'authentication',
    initialState: {
        userData: getUserData(),
        accessToken: getAccessToken
    },
    reducers: {
        handleLogin: (state, action) => {
            console.log('action.payload: ', action.payload);
            const decoded = jwt_decode(action.payload.access_token);
            state.userData = decoded.payload;
            state.accessToken = action.payload.access_token;

            localStorage.setItem('userData', JSON.stringify(state.userData));
            localStorage.setItem('accessToken', state.accessToken);
        },
        handleLogout: state => {
            state.userData = {};
            state.accessToken = null;

            // ** Remove user, accessToken  from localStorage
            localStorage.removeItem('userData');
            localStorage.removeItem('accessToken');
        }
    }
});

export const { handleLogin, handleLogout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.userData;
export const selectCurrentToken = (state) => state.auth.accessToken;
