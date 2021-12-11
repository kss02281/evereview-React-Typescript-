import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer, { userActions } from './user';
import selectedVideoSliceReducer, { selectedVideoSliceActions } from './selectedVideo';
import videoSliceReducer, { videoSliceActions } from './video';
import dateReducer, {dateActions} from './date'
import categoryReducer, {categoryActions} from './category';
import analysisReducer, { analysisActions } from './analysis';

export const actions = {
  ...userActions,
  ...selectedVideoSliceActions,
  ...videoSliceActions,
  ...dateActions,
  ...categoryActions,
  ...analysisActions,
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user','selectedVideos','videos','date','category','analysis'],
};

const rootReducer = combineReducers({
  user: userReducer,
  selectedVideoSlice: selectedVideoSliceReducer,
  videoSlice: videoSliceReducer,
  date: dateReducer,
  category: categoryReducer,
  analysis: analysisReducer,
});

export type ReducerType = ReturnType<typeof rootReducer>;
export default persistReducer(persistConfig, rootReducer);
