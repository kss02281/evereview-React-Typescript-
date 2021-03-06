import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface contentsAnalysis {
  rank: number;
  cluster_id: string;
  total_value: number;
  total_like: number;
  total_count: number;
  top_comment_text: string;
}
const initialState = {
  selectedVideosId: [] as string[],
  analysisData: [] as contentsAnalysis[],
  analysis_id: "",
  IsEnter: Boolean(false),
  requestAnalysis: Boolean(false),
};

// Define Actions & Reducer
const contentsFeedBackSlice = createSlice({
  name: "contentsFeedBack",
  initialState,
  reducers: {
    enterContentsFeedBack(state, action: PayloadAction<boolean>) {
      state.IsEnter = action.payload;
    },
    outContentsFeedBack(state, action: PayloadAction<boolean>) {
      state.IsEnter = action.payload;
    },
    saveSelectedVideosId(state, action: PayloadAction<any>) {
      const { selectedVideosId } = action.payload;
      state.selectedVideosId = [...selectedVideosId];
    },
    saveContentsFeedBackAnalysis(state, action: PayloadAction<contentsAnalysis[]>) {
      //const { analysisData } = action.payload;
      state.analysisData = [...action.payload];
    },
    saveAnalysisId(state, action: PayloadAction<string>) {
      state.analysis_id = action.payload;
    },
    requestAnalysis(state, action: PayloadAction<boolean>) {
      state.requestAnalysis = action.payload;
    },
    resetContentsFeedBack(state) {
      state.selectedVideosId = [];
      state.analysisData = [];
      state.analysis_id = "";
      state.IsEnter = Boolean(false);
      state.requestAnalysis = Boolean(false);
    },
  },
});

export const contentsFeedBackActions = contentsFeedBackSlice.actions;
export default contentsFeedBackSlice.reducer;
