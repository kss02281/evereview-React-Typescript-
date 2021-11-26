import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import persistedReducer from "./modules";

const store = configureStore({ reducer: persistedReducer, middleware: [logger] });

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
persistor.pause();
export default store;
