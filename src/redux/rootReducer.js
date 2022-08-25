import auth from './states/authSlice';
import { authAuthApi, guestAuthApi } from "./api/authApi";

const rootReducer = {
  [guestAuthApi.reducerPath]: guestAuthApi.reducer,
  [authAuthApi.reducerPath]: authAuthApi.reducer,
  auth,
};

export default rootReducer;
