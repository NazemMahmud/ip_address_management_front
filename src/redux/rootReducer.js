import auth from './states/authSlice';
import { authApi } from "./api/authApi";

const rootReducer = {
  [authApi.reducerPath]: authApi.reducer,
  auth,
};

export default rootReducer;
