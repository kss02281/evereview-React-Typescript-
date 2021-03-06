import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SearchBar.module.scss";
import classNames from "classnames/bind";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown.jsx";
import SearchDropdown from "../SearchDropdown/SearchDropdown.jsx";
import CommentDropdown from "../CommentDropdown/CommentDropdown";
import { nowSelectedVideoList } from "../../../store/modules/selectedVideo";
import { nowVideoList } from "../../../store/modules/videos";
import { nowDate } from "../../../store/modules/date";
import { nowCategory } from "../../../store/modules/category";
import axios from "axios";
import { actions } from "store/modules";
import { nowAnalysis } from "store/modules/analysis";

const cx = classNames.bind(styles);

function SearchBar(props) {
  const dispatch = useDispatch();
  const isVideoList = useSelector(nowSelectedVideoList);
  const isDate = useSelector(nowDate);
  const isCategorySelect = useSelector(nowCategory);
  const isNowVideoList = useSelector(nowVideoList);
  const isAnalysis = useSelector(nowAnalysis);
  const user = useSelector((state) => state.user);
  const channel_id = user.channelUrl.substring(32);
  const isFeedBackPage = useSelector((state) => state.contentsFeedBack.IsEnter);
  const analyticData = new FormData();
  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
  const commentSubmit = async () => {
    const submitStartDate = `${isDate[0].getFullYear()}` + '-' + `${isDate[0].getMonth()+1}`+'-'+`${isDate[0].getDate()}`
    const submitEndDate = `${isDate[1].getFullYear()}` + '-' + `${isDate[1].getMonth()+1}`+'-'+`${isDate[1].getDate()}`
    
    dispatch(actions.setLoading(true));
    dispatch(actions.saveDate({ startDate: submitStartDate, endDate: submitEndDate }));
    if (isFeedBackPage) {
      console.log("피드백 페이지에서 분석 요청");
      dispatch(actions.requestAnalysis(Boolean(true)));
    }

    analyticData.append("channel_id", channel_id);
    analyticData.append("day_start", submitStartDate);
    analyticData.append("day_end", submitEndDate);

    const response = axios.post(process.env.REACT_APP_BACKEND_URL + "/api/analysis/predict", analyticData, config).then((response) => {
      const analyticDatas = response.data["analysis_id"];
      console.log(submitStartDate,submitEndDate)
      axios
        .get(process.env.REACT_APP_BACKEND_URL + `/api/analysis/result/${response.data["analysis_id"]}`, config)
        .then((response) => {
          console.log(response.data.analysis);
          console.log(response.data.clusters);
          if (response.data.clusters === null && response.data.analysis === null) {
            const thisis = setInterval(() => {
              axios
                .get(process.env.REACT_APP_BACKEND_URL + `/api/analysis/result/${analyticDatas}`, config)
                .then((response) => {
                  console.log(response.data);
                  if (response.data.clusters !== null && response.data.analysis !== null) {
                    dispatch(actions.setDateAllTen(response.data.clusters.slice(10,20)));
                    dispatch(actions.setDateNegFive(response.data.clusters.slice(10,15)));
                    dispatch(actions.setDatePosFive(response.data.clusters.slice(15)));
                    dispatch(actions.setDateAnalysis(response.data));
                    console.log(response.data.clusters.slice(15));
                    clearInterval(thisis);
                    dispatch(actions.setLoading(false));
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }, 1000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const videoSubmit = async () => {
    dispatch(actions.setLoading(true));
    const selectedVideoArray = [];
    for (let i = 0; i < isVideoList.selectedVideoList.length; i++) {
      if (isVideoList.selectedVideoList[i] === true) {
        selectedVideoArray.push(isNowVideoList[i].id);
      }
    }
    dispatch(actions.saveSelectedVideosId({ selectedVideosId: selectedVideoArray }));
    if (isFeedBackPage) {
      console.log("피드백 페이지에서 분석 요청");
      dispatch(actions.requestAnalysis(Boolean(true)));
    }
    console.log(selectedVideoArray.join());

    analyticData.append("channel_id", channel_id);
    analyticData.append("video_list", selectedVideoArray.join());

    const response = axios.post(process.env.REACT_APP_BACKEND_URL + "/api/analysis/predict", analyticData, config).then((response) => {
      const analyticDatas = response.data["analysis_id"];
      axios
        .get(process.env.REACT_APP_BACKEND_URL + `/api/analysis/result/${response.data["analysis_id"]}`, config)
        .then((response) => {
          console.log(response.data.analysis);
          console.log(response.data.clusters);
          if (response.data.clusters === null && response.data.analysis === null) {
            const thisis = setInterval(() => {
              axios
                .get(process.env.REACT_APP_BACKEND_URL + `/api/analysis/result/${analyticDatas}`, config)
                .then((response) => {
                  console.log(response.data.analysis);
                  if (response.data.clusters !== null && response.data.analysis !== null) {
                    dispatch(actions.setAnalysis(response.data));
                    console.log(isAnalysis);
                    clearInterval(thisis);
                    dispatch(actions.setLoading(false));
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }, 1000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const handleClickOut = (e) => {
    console.log("out");
  };

  return (
    <>
      <div className={cx("searchBarContainer")}>
        <div className={cx("categoryDropdown")}>
          <CategoryDropdown />
          {isCategorySelect.category === "영상별 분석" ? (
            <SearchDropdown func={props.func} className={cx("videoSearch")} onMouseOut={handleClickOut} />
          ) : (
            <CommentDropdown className={cx("commentSearch")} />
          )}
          {isCategorySelect.category === "영상별 분석" ? (
            <div className={cx("submitButton")} onClick={videoSubmit}>
              적용하기
            </div>
          ) : (
            <div className={cx("submitButton")} onClick={commentSubmit}>
              적용하기
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchBar;
