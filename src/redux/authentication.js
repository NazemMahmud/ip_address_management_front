import { createSlice } from '@reduxjs/toolkit';
import { getUserData, getAccessToken } from "../utility/utils";
import jwt_decode from "jwt-decode";


export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: getUserData(),
    accessToken: getAccessToken
  },
  reducers: {
    handleLogin: (state, action) => {
      const decoded = jwt_decode(action.payload.access_token);
      state.userData = decoded.payload;
      state.accessToken = action.payload.access_token;

      localStorage.setItem('userData', JSON.stringify(state.userData));
      localStorage.setItem('accessToken', state.accessToken);
    },
  }
});

export const { handleLogin } = authSlice.actions;

export default authSlice.reducer;
