import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer, { userActions } from './user';
import selectedVideoSliceReducer, { selectedVideoSliceActions } from './selectedVideo';
import videoSliceReducer, { videoSliceActions } from './video';

export const actions = {
  ...userActions,
  ...selectedVideoSliceActions,
  ...videoSliceActions,
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user','selectedVideos','videos'],
};

const rootReducer = combineReducers({
  user: userReducer,
  selectedVideoSlice: selectedVideoSliceReducer,
  videoSlice: videoSliceReducer,
});

export type ReducerType = ReturnType<typeof rootReducer>;
export default persistReducer(persistConfig, rootReducer);
