<<<<<<< HEAD
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer, { userActions } from './user';
import selectedVideoSliceReducer, { selectedVideoSliceActions } from './selectedVideo';
import videoSliceReducer, { videoSliceActions } from './video';
import dateReducer, {dateActions} from './date'
import categoryReducer, {categoryActions} from './category';
import analysisReducer, { analysisActions } from './analysis';
=======
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer, { userActions } from "./user";
import contentsFeedBackReducer, { contentsFeedBackActions } from "./contentsFeedBack";
import selectedVideoSliceReducer, { selectedVideoSliceActions } from "./selectedVideo";
import videoSliceReducer, { videoSliceActions } from "./video";
import dateReducer, { dateActions } from "./date";
import categoryReducer, { categoryActions } from "./category";
import testSaga from "./testSaga";
import { all, call } from "redux-saga/effects";
>>>>>>> feature/contents_detail

export const actions = {
  ...userActions,
  ...selectedVideoSliceActions,
  ...videoSliceActions,
  ...dateActions,
  ...categoryActions,
<<<<<<< HEAD
  ...analysisActions,
=======
  ...contentsFeedBackActions,
>>>>>>> feature/contents_detail
};

export function* rootSaga() {
  yield all([call(testSaga)]);
}

const persistConfig = {
  key: "root",
  storage,
<<<<<<< HEAD
  whitelist: ['user','selectedVideos','videos','date','category','analysis'],
=======
  whitelist: ["user", "selectedVideos", "videos", "date", "category", "contentsFeedBack"],
>>>>>>> feature/contents_detail
};

const rootReducer = combineReducers({
  user: userReducer,
  contentsFeedBack: contentsFeedBackReducer,
  selectedVideoSlice: selectedVideoSliceReducer,
  videoSlice: videoSliceReducer,
  date: dateReducer,
  category: categoryReducer,
  analysis: analysisReducer,
});

export type ReducerType = ReturnType<typeof rootReducer>;
export default persistReducer(persistConfig, rootReducer);
