import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer, { userActions } from "./user";
import contentsFeedBackReducer, { contentsFeedBackActions } from "./contentsFeedBack";
import selectedVideoSliceReducer, { selectedVideoSliceActions } from "./selectedVideo";
import videoSliceReducer, { videoSliceActions } from "./videos";
import dateReducer, { dateActions } from "./date";
import categoryReducer, { categoryActions } from "./category";
import analysisReducer, { analysisActions } from "./analysis";
import testSaga from "./testSaga";
import { all, call } from "redux-saga/effects";

export const actions = {
  ...userActions,
  ...selectedVideoSliceActions,
  ...videoSliceActions,
  ...dateActions,
  ...categoryActions,
  ...analysisActions,
  ...contentsFeedBackActions,
};

export function* rootSaga() {
  yield all([call(testSaga)]);
}

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "selectedVideoSlice", "videoSlice", "date", "category", "analysis", "contentsFeedBack"],
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
