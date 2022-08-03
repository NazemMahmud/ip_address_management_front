import axios from 'axios';
import { appConfig } from "../config/config";

const guestInstance = axios.create({
   baseURL: appConfig.apiBaseUrl,
   timeout: 1000,
   headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
   }
});


export { guestInstance };
