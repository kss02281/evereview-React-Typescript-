import { all, call, put, select, takeLatest, fork } from "redux-saga/effects";
import { ReducerType } from ".";
import { contentsFeedBackActions } from "./contentsFeedBack";
import { analysisActions } from "./analysis";
import axios, { AxiosResponse } from "axios";
import { create } from "domain";
import analysis from "./analysis";

const createFormData = (state: any) => {
  const data = new FormData();
  data.append("channel_id", state.user.channelId);
  data.append("video_list", state.contentsFeedBack.selectedVideosId);

  return data;
};

async function predictAPI(data: FormData) {
  try {
    const result = await axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/analysis/predict", data, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const analysis_id = response.data.analysis_id;
        const request = setInterval(function () {
          axios
            .get(process.env.REACT_APP_BACKEND_URL + "/api/analysis/result/" + analysis_id, {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
              },
            })
            .then((response) => {
              if (response.data.state === "SUCCESS") {
                clearInterval(request);
                console.log("finish");
                console.log(response.data);
                return response;
              }
            })
            .catch((error) => {
              console.log(error.data);
            });
        }, 5000);
        return request;
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("result", result);
    return result;
  } catch (err) {
    console.log(err);
  }
}

function* getAnalysisResult(data: FormData) {
  const analysisResult: AxiosResponse = yield call<any>(predictAPI, data);
  yield put(analysisActions.setAnalysis(analysisResult.data));
}

function* getTest() {
  try {
    const data: FormData = yield select<any>(createFormData);
    yield call(getAnalysisResult, data);
  } catch (error) {
    console.log(error);
  }
}

function* watchSaga() {
  yield takeLatest(contentsFeedBackActions.requestAnalysis, getTest);
}

export default function* testSaga() {
  yield all([fork(watchSaga)]);
}
