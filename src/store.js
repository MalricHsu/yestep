import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './slices/authSlice';
import InfoReducer from './slices/infoSlice';
export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        info: InfoReducer,
    },
});
