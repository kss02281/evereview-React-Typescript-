import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


// Define Actions & Reducer
const videoSlice = createSlice({
  name: 'videos',
  initialState: {
    videoList: [],
    videoListLength: 0,
  },
  reducers: {
    updateVideoList: (state, action) => {
      state.videoList = action.payload
  },
    updateVideoListLength: (state, action) => {
      state.videoListLength = action.payload
  },
    selectVideo: (state, action) => {
      state.videoList.videoList[action.payload] = !state.videoList.videoList[action.payload];
  },
    closeVideo: (state, action) => {
      state.videoList.videoList[action.payload] = false;
  },
    selectAllVideo: (state, action) => {
      state.videoList.videoList[action.payload] = true;
  },
  },
});

export const videoSliceActions = videoSlice.actions;
export const nowVideoList = state => state.videoSlice.videoList;
export const nowVideoListLength = state => state.videoSlice.videoListLength;
export default videoSlice.reducer;
