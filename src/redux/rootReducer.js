import auth from './authentication';
import { authApi } from "./api/authApi";

const rootReducer = {
  [authApi.reducerPath]: authApi.reducer,
  auth,
};

export default rootReducer;
