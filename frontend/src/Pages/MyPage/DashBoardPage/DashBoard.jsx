import { useEffect, useState } from "react";
import React from "react";
import styles from "./DashBoard.module.scss";
import classNames from "classnames/bind";
import { Sidebar } from "../../../Components/common";
import SearchBar from "../../../Components/SearchBar/SearchBar/SearchBar.jsx";
import { actions } from "../../../store/modules";
import { useSelector, useDispatch } from "react-redux";
import { nowCategory } from "../../../store/modules/category";
import { nowVideoList, nowNextVideoPage, nowPrevVideoPage } from "../../../store/modules/videos";
import DashBoardVideo from "./DashBoardVideo";
import DashBoardComment from "./DashBoardComment";
import axios from "axios";
import { nowAllTenArray, nowAnalysis, nowNegFiveArray } from "store/modules/analysis";
import { Hypnosis } from "react-cssfx-loading";

const cx = classNames.bind(styles);

function DashBoard() {
  const dispatch = useDispatch();
  useEffect(() => {
    
  dispatch(actions.selectCategory('영상별 분석'))
  }, []);
  const [isloading, setIsLoading] = useState(true);

  const [videoString, setVideoString] = useState("");
  const isCategorySelect = useSelector(nowCategory);
  const isAnalysis = useSelector(nowAnalysis);
  const nowLoading = useSelector(nowAnalysis).loading;
  const name = useSelector((state) => state.user.nickName);
  const isNextVideoPage = useSelector(nowNextVideoPage);
  const isPrevVideoPage = useSelector(nowPrevVideoPage);
  const isVideoList = useSelector(nowVideoList);

  const user = useSelector((state) => state.user);
  const channel_id = user.channelUrl.substring(32);
  const uploadTerm = user.upload_term;
  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  async function getVideos() {
    if (isCategorySelect.category === "영상별 분석") {
    const response = await axios
      .get(process.env.REACT_APP_BACKEND_URL + `/api/videos?channel_id=${channel_id}&page_token=${isNextVideoPage}`, config)
      .then((response) => {
        if (response.data.prev_page_token == null || response.data.page_info.totalResults == null) {
          console.log(response.data);
          dispatch(actions.updateSelectedVideoList({selectedVideoList: Array(!null && response.data.page_info.totalResults).fill(false) }));
          dispatch(actions.updateVideoList(response.data.video_items));
          dispatch(actions.setNextVideoPage(response.data.next_page_token));
          console.log(response.data.video_items);
          const analyticData = new FormData();
          const newArray = [];
          if (uploadTerm === 1) {
            setVideoString(response.data.video_items.slice(0, 10));
            const upLoadTermDay = response.data.video_items.slice(0, 10);
            for (let i = 0; i < upLoadTermDay.length; i++) {
              newArray.push(response.data.video_items[i]["id"]);
            }
            analyticData.append("channel_id", channel_id);
            analyticData.append("video_list", newArray.join());
          } else if (uploadTerm === 2) {
            setVideoString(response.data.video_items.slice(0, 4));
            const upLoadTermWeek = response.data.video_items.slice(0, 4);
            for (let i = 0; i < upLoadTermWeek.length; i++) {
              newArray.push(response.data.video_items[i]["id"]);
              console.log(response.data.video_items[i]["id"]);
            }
            analyticData.append("channel_id", channel_id.toString());
            analyticData.append("video_list", newArray.toString());
          } else if (uploadTerm === 3) {
            setVideoString(response.data.video_items[0]["id"]);
            const upLoadTermMonth = response.data.video_items[0]["id"];
            analyticData.append("channel_id", channel_id);
            analyticData.append("video_list", response.data.video_items[0]["id"]);
          }
          axios
            .post(process.env.REACT_APP_BACKEND_URL + "/api/analysis/predict", analyticData, config)
            .then((response) => {
              const analyticDatas = response.data["analysis_id"];
              axios
                .get(process.env.REACT_APP_BACKEND_URL + `/api/analysis/result/${response.data["analysis_id"]}`, config)
                .then((response) => {
                  console.log(response.data.analysis);
                  console.log(response.data.clusters);
                  if (response.data.clusters === null && response.data.analysis === null) {
                    dispatch(actions.setLoading(true));
                    const thisis = setInterval(() => {
                      axios
                        .get(process.env.REACT_APP_BACKEND_URL + `/api/analysis/result/${analyticDatas}`, config)
                        .then((response) => {
                          console.log("data is fetching..");
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
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (response.data.prev_page_token != null) {
          let testArr = [...isVideoList];
          dispatch(actions.updateVideoList(testArr.concat(response.data.video_items)));
          dispatch(actions.setNextVideoPage(response.data.next_page_token));
        } else if (isNextVideoPage == null) {
          console.log("Done!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    } else if ( isCategorySelect.category === "댓글 기간별 분석" && isAnalysis?.dateAnalysisArray?.clusters === undefined) {
      const newStartDate = new Date();
      const submitStartDate = `${new Date(newStartDate.setDate(newStartDate.getDate() - 1)).getFullYear()}` + '-' + `${new Date(newStartDate.setDate(newStartDate.getDate() - 1)).getMonth()+1}`+'-'+`${new Date().getDate()-1}`
      const submitEndDate = `${new Date().getFullYear()}` + '-' + `${new Date().getMonth()+1}`+'-'+`${new Date().getDate()}`
      console.log(new Date(newStartDate.setDate(newStartDate.getDate() - 7)))
      
      dispatch(actions.saveDate({ startDate: submitStartDate, endDate: submitEndDate }));
      
      const analyticDateData = new FormData();
      analyticDateData.append("channel_id", channel_id);
      analyticDateData.append("day_start", submitStartDate);
      analyticDateData.append("day_end", submitEndDate);
      axios
            .post(process.env.REACT_APP_BACKEND_URL + "/api/analysis/predict", analyticDateData, config)
            .then((response) => {
              const analyticDatas = response.data["analysis_id"];
              axios
                .get(process.env.REACT_APP_BACKEND_URL + `/api/analysis/result/${response.data["analysis_id"]}`, config)
                .then((response) => {
                  console.log(response.data.analysis);
                  console.log(response.data.clusters);
                  if (response.data.clusters === null && response.data.analysis === null) {
                    dispatch(actions.setLoading(true));
                    const thisis = setInterval(() => {
                      axios
                        .get(process.env.REACT_APP_BACKEND_URL + `/api/analysis/result/${analyticDatas}`, config)
                        .then((response) => {
                          console.log(response.data)
                          console.log("data is fetching..");
                          if (response.data.clusters !== null && response.data.analysis !== null) {
                            dispatch(actions.setDateAnalysis(response.data));
                            dispatch(actions.setDateAllTen(response.data.clusters.slice(10,20)));
                            dispatch(actions.setDateNegFive(response.data.clusters.slice(10,15)));
                            dispatch(actions.setDatePosFive(response.data.clusters.slice(15)));
                            console.log(response.data);
                            clearInterval(thisis);
                            dispatch(actions.setLoading(false));
                          } else if (response.data.state == 'FAILURE') {
                            clearInterval(thisis);
                            dispatch(actions.setLoading(false));
                            console.log('fail')
                          }
                        })
                        .catch((error) => {
                          console.log(error);
                          dispatch(actions.setLoading(false));
                          clearInterval(thisis);
                        });
                    }, 1000);
                  }
                })
                .catch((error) => {
                  console.log(error);
                  dispatch(actions.setLoading(false));
                });
            })
        }
  }
  

  useEffect(() => {
    console.log("분석완료");
    const analysisDataArray = isAnalysis?.analysisArray?.clusters;
    console.log(analysisDataArray);
    var dataArray = [];
    const object = {};
    if (analysisDataArray) {
      dispatch(actions.setLoading(false));
      for (let i = 0; i < 10; i++) {
        object[i] = {
          rank: i + 1,
          cluster_id: analysisDataArray[i].id,
          total_value: analysisDataArray[i].like_count + analysisDataArray[i].count,
          total_like: analysisDataArray[i].like_count,
          total_count: analysisDataArray[i].count,
          top_comment_text: analysisDataArray[i].top_comment.text_display,
        };
        dataArray.push(object[i]);
      }
      dataArray = dataArray.sort((a, b) => b["total_value"] - a["total_value"]);
      dataArray.map((item, idx) => {
        item.rank = idx + 1;
      });
      console.log(dataArray);
      dispatch(actions.saveContentsFeedBackAnalysis(dataArray));
    } else {
      dispatch(actions.setLoading(true));
    }
  }, [isAnalysis.analysisArray?.clusters]);

  useEffect(() => {
    getVideos();
  }, [isCategorySelect.category]);

  return (
    <div className={cx("dashBoardContainer")}>
      {nowLoading ? (
        <div className={cx("loadingPage")}>
          <Hypnosis color="#0000008f" width="200px" height="200px" />
        </div>
      ) : null}
      <Sidebar id={1} />
      <div className={cx("sideLine")}></div>
      <div className={cx("dashBoardWrap")}>
        <div className={cx("dashBoardWrapHeader")}>
          <div className={cx("dashBoardText")}>
            <div className={cx("dashBoardTitle")}>반갑습니다 {name}님!</div>
            <div className={cx("dashBoardDescription")}>댓글들을 분석하고 사용자들의 피드백을 확인해보세요!</div>
          </div>
          <div className={cx("dashBoardSearch")}>
            <SearchBar data={1} func={getVideos} />
          </div>
        </div>
        <div></div>
        {isCategorySelect.category === "영상별 분석" ? <DashBoardVideo /> : <DashBoardComment />}
      </div>
    </div>
  );
}

export default DashBoard;
