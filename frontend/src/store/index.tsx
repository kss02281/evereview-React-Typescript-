import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import reducer from './modules/index';
import { persistStore } from 'redux-persist';
import persistedReducer from './modules';

const store = configureStore({ reducer: persistedReducer, middleware: [logger] });

const persistor = persistStore(store);
persistor.pause();

export type AppDispatch = typeof store.dispatch;
export { persistor };
export default store;
