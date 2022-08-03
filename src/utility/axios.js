import axios from 'axios';
import { appConfig } from "../config/config";
import { store } from "../redux/store";

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
   timeout: 10000,
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


export { guestInstance, authInstance };
