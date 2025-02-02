import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeConfigSlice from "@/store/themeConfigSlice";
import { adminAPI } from "./api/adminAPI";

const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
  [adminAPI.reducerPath]: adminAPI.reducer, // Add API reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminAPI.middleware), // Add API middleware
});

export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
