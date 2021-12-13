import React, { Fragment, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Navbar, Sidebar } from "../../../Components/common";
import SearchBar from "../../../Components/SearchBar/SearchBar/SearchBar";
import classNames from "classnames/bind";
import styles from "./AllFeedBackPage.module.scss";
import { nowCategory } from "../../../store/modules/category";
import { Link } from "react-router-dom";
import ROUTES from "../../../constants/routes";
import { actions } from "../../../store/modules";
import AllBarChart from "../../../Components/barChart/AllBarChart";
import AllLineChart from "../../../Components/LineChart/AllLineChart";
import axios from "axios";
import { nowAllTenArray, nowAnalysis } from "store/modules/analysis";
import { nowVideoList } from "store/modules/videos";
import { nowSelectedVideoList } from "store/modules/selectedVideo";

const cx = classNames.bind(styles);

function AllFeedBackPage() {
  const [thisData, setThisData] = useState([]);
  const [thissData, setThissData] = useState([]);
  const [clusterData, setClusterData] = useState([]);
  const [sortByViewCount, setSortByViewCount] = useState([]);
  const [isSelectedCommentArray, setIsSelectedCommentArray] = useState([]);
  const nowAllTen = useSelector(nowAllTenArray);
  const isAnalysis = useSelector(nowAnalysis);
  const isNowVideo = useSelector(nowVideoList);
  
  const isSelectedVideoList = useSelector(nowSelectedVideoList);
  
  const getUserInfo = () => {
    const clusterArray = []
    for (let i=10; i<20; i++){
      const clusterId = isAnalysis.analysisArray.clusters[i].id;
    axios
      .get(process.env.REACT_APP_BACKEND_URL + `/api/comments/${clusterId}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        var obj = {};
        obj[clusterId] = response.data
        clusterArray.push(obj)
        setClusterData(clusterArray)
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  async function getFeedBackList() {
    setThisData(nowAllTen);
    setIsSelectedCommentArray(Array.from({ length: nowAllTen.length }, (v, i) => false));
    console.log(nowAllTen.length);
  }

  useEffect(() => {
    getUserInfo();
    getFeedBackList();
  }, []);

  const dispatch = useDispatch();
  const isCategorySelect = useSelector(nowCategory);

  const name = useSelector((state) => state.user.nickName);

  const setVideo = () => {
    dispatch(actions.selectCategory("영상별 분석"));
  };

  const setSelect = (number) => {
    let newArr = [...isSelectedCommentArray];
    newArr[number] = !isSelectedCommentArray[number];
    setIsSelectedCommentArray(newArr);
    let testArr = [...isSelectedCommentArray];
    setThissData(thissData.concat(testArr));
    console.log(thissData);
  };

  function sort_by_key(array, key)
{
 return array.sort(function(a, b)
 {
  var x = a[key]; var y = b[key];
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
 });
}
  const sortedClusterData = sort_by_key(clusterData, (Object.keys(clusterData)));
  console.log(sortedClusterData)
  console.log((Object.keys(clusterData[0])))

  useEffect(() => {
    clusterData.map((sortData, j) => {
      console.log((Object.keys(clusterData[0])))
      console.log(isAnalysis.analysisArray.clusters[j+10])
    })
  },[isAnalysis])
  
  return (
    <Fragment>
      <div className={cx("feedBackContainer")}>
        <Sidebar id={3} />
        <div className={cx("sideLine")}></div>
        <div className={cx("feedBackWrap")}>
          <div className={cx("feedBackWrapHeader")}>
            <div className={cx("feedBackText")}>
              <div className={cx("feedBackTitle")}>반갑습니다 {name}님!</div>
              <div className={cx("feedBackDescription")}>댓글들을 분석하고 사용자들의 피드백을 확인해보세요!</div>
            </div>
          </div>
          <div></div>
          <div className={cx("feedBackContentWrap")}>
            <Link className={cx("allFeedbackSelected")} to={ROUTES.ALLFEEDBACK} onClick={setVideo}>
              모든 피드백
            </Link>
            <Link className={cx("posFeedbackSelect")} to={ROUTES.POSFEEDBACK} onClick={setVideo}>
              긍정 피드백
            </Link>
            <Link className={cx("negFeedbackSelect")} to={ROUTES.NEGFEEDBACK} onClick={setVideo}>
              부정 피드백
            </Link>
            <div className={cx("feedBackContent")}>
              <div className={cx("feedBackPageSearch")}>
                <SearchBar />
              </div>
              <div className={cx("feedBackPageContainer")}>
                <div className={cx("feedBackPageLeft")}>
                  <div></div>
                  <div></div>
                  <div className={cx("feedBackBarGrpah")}>
                    {isCategorySelect.category === "영상별 분석" ? <AllBarChart /> : <AllLineChart />}
                  </div>
                  <div>
                    <div className={cx("allBarChart")}>
                      {thisData.map((data, i) => {
                        return (
                          <div className={cx("chartWrap")}>
                            <div className={cx("chartLeft")}>{i + 1}.</div>
                            <div className={cx("chartRight")}>{data.name}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className={cx("feedBackPageRight")}>
                  <div></div>
                  <div className={cx("feedBackCommentsContatiner")}>
                    <div className={cx("feedBackCommentsHeader")}>
                      <div>순위</div>
                      <div>피드백</div>
                      <div>총 댓글 수</div>
                      <div>좋아요</div>
                    </div>
                    <div className={cx("feedBackComments")}>
                      {thisData.map((data, i) => {
                        return (
                          <>
                            <div className={cx("feedBackComment")} id={i} onClick={() => setSelect(i)}>
                              <div style={{ overflow: "hidden", height: "50px" }}>{data.id}위</div>
                              <div style={{ overflow: "hidden", height: "50px" }}>{data.name}</div>
                              <div style={{ overflow: "hidden", height: "50px" }}>{data.댓글수} 개</div>
                              <div style={{ overflow: "hidden", height: "50px" }}>{data.좋아요수} 개</div>
                            </div>
                            {isSelectedCommentArray[i] ? (
                              <div>
                                <div className={cx("feedBackDetailHeader")}>
                                  <div>댓글이 달린 영상</div>
                                  <div>원래 댓글</div>
                                  <div>댓글 작성 일자</div>
                                  <div>좋아요</div>
                                  <div>조회수</div>
                                </div>
                                {clusterData.map((sortData, j) => {
                                  return (
                                    <div className={cx("feedBackDetail")}>
                                      <div style={{ overflow: "hidden", height: "20px" }}>
                                        {}
                                      </div>
                                      <div style={{ overflow: "hidden", height: "20px" }}>
                                        {}
                                      </div>
                                      <div style={{ overflow: "hidden", height: "20px" }}>
                                        {}
                                      </div>
                                      <div style={{ overflow: "hidden", height: "20px" }}>
                                        {}
                                      </div>
                                      <div style={{ overflow: "hidden", height: "20px" }}>
                                        {}
                                      </div>
                                    </div>
                                  );
                                })}
                                
                              </div>
                            ) : null}
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AllFeedBackPage;
