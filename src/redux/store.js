import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './rootReducer';
import { authApi } from "./api/authApi";

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false
        }).concat([authApi.middleware]);
    }
});

export { store };
