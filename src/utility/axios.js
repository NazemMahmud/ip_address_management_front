import axios from 'axios';
import { appConfig } from "../config/config";
import { store } from "../redux/store";
import { handleLogin, handleLogout } from "../redux/authSlice";

const guestInstance = axios.create({
   baseURL: appConfig.apiBaseUrl,
   timeout: 10000,
   headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
   }
});

const authInstance = axios.create({
   baseURL: appConfig.apiBaseUrl,
   headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
   }
});

authInstance.interceptors.request.use(
    config => {
       /**
        * Get token from state
        * If token is present add it to request's Authorization Header
        */
       const accessToken = store.getState().auth.accessToken;
       if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
       }
       return config;
    },
    error => Promise.reject(error)
);

// Response interceptor for API calls in case token mismatch/expires
authInstance.interceptors.response.use(response => {
    return response;
}, async error => {
    const originalRequest = error?.config;
    if (error?.response?.status === 401 && !originalRequest?._retry) {
        originalRequest._retry = true;

        const access_token = error.response.data.data.refresh_token;

        originalRequest.headers.Authorization = 'Bearer ' + access_token;
        store.dispatch(handleLogin({ access_token }));
        return authInstance(originalRequest);
    }

    if (error?.response?.error?.error === 'Token is Invalid') {
        // in case token invalid/mismatch but not expired
        store.dispatch(handleLogout());
        setTimeout(() => {
            window.location.href = "/login";
        }, 1000);
    }

    return Promise.reject(error);
});


export { guestInstance, authInstance };
