import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  analysisArray: [],
  dateAnalysisArray: [],
  allTenArray: [],
  posFiveArray: [],
  negFiveArray: [],
  loading: false,
  nowClusterData: [],
  nowPosClusterData: [],
  nowNegClusterData: [],
  nowDateClusterData: [],
  nowDatePosClusterData: [],
  nowDateNegClusterData: [],
  allDateTenArray: [],
  posDateFiveArray: [],
  negDateFiveArray: [],
};

// Define Actions & Reducer
const analysisSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {
    setCluster(state, action) {
      state.nowClusterData = action.payload;
    },
    setDateCluster(state, action) {
      state.nowDateClusterData = action.payload;
    },
    setPosCluster(state, action) {
      state.nowPosClusterData = action.payload;
    },
    setPosDateCluster(state, action) {
      state.nowDatePosClusterData = action.payload;
    },
    setNegCluster(state, action) {
      state.nowNegClusterData = action.payload;
    },
    setNegDateCluster(state, action) {
      state.nowDateNegClusterData = action.payload;
    },
    setAnalysis(state, action) {
      state.analysisArray = action.payload;
    },
    setDateAnalysis(state, action) {
      state.dateAnalysisArray = action.payload;
    },
    setAllTen(state, action) {
      state.allTenArray = action.payload;
    },
    setNegFive(state, action) {
      state.negFiveArray = action.payload;
    },
    setPosFive(state, action) {
      state.posFiveArray = action.payload;
    },
    setDateAllTen(state, action) {
      state.allDateTenArray = action.payload;
    },
    setDateNegFive(state, action) {
      state.negDateFiveArray = action.payload;
    },
    setDatePosFive(state, action) {
      state.posDateFiveArray = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    resetAnalysisData(state) {
      state.analysisArray = [];
      state.allTenArray = [];
      state.negFiveArray = [];
      state.posFiveArray = [];
      state.loading = false;
      state.dateAnalysisArray = [];
      state.allDateTenArray = [];
      state.posDateFiveArray = [];
      state.negDateFiveArray = [];
    },
  },
});

export const analysisActions = analysisSlice.actions;
export const nowAnalysis = (state) => state.analysis;
export const nowDateAnalysis = (state) => state.dateAnalysis;
export const nowAllTenArray = (state) => state.analysis.allTenArray;
export const nowNegFiveArray = (state) => state.analysis.negFiveArray;
export const nowPosFiveArray = (state) => state.analysis.posFiveArray;
export const nowAllDateTenArray = (state) => state.analysis.allDateTenArray;
export const nowNegDateFiveArray = (state) => state.analysis.negDateFiveArray;
export const nowPosDateFiveArray = (state) => state.analysis.posDateFiveArray;
export const nowClusterData = (state) => state.nowClusterData;
export const nowPosClusterData = (state) => state.nowPosClusterData;
export const nowNegClusterData = (state) => state.nowNegClusterData;
export const nowDateClusterData = (state) => state.nowDateClusterData;
export const nowDatePosClusterData = (state) => state.nowDatePosClusterData;
export const nowDateNegClusterData = (state) => state.nowDateNegClusterData;
export const nowLoading = (state) => state.loading;
export default analysisSlice.reducer;

