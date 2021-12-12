import React, { useEffect, useState } from "react";
import styles from "./ContentsFeedBackPage.module.scss";
import classNames from "classnames/bind";
import { Sidebar } from "Components/common";
import SearchBar from "Components/SearchBar/SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { actions, ReducerType } from "store/modules";
import { nowCategory } from "store/modules/category";
import PieChartC from "Components/PieChart/PieChart";

const cx = classNames.bind(styles);

function ContentsFeedBackPage() {
  const dispatch = useDispatch();
  const isCategorySelect = useSelector(nowCategory);
  const contentsFeedBackData = useSelector((state: ReducerType) => state.contentsFeedBack.analysisData);
  const finishAnalysis = useSelector((state: ReducerType) => state.contentsFeedBack.IsEnter);
  const [isSelectedCommentArray, setIsSelectedCommentArray] = useState([]);

  const requestAnalysis = () => {
    alert("분석결과요청");
    dispatch(actions.enterContentsFeedBack(Boolean(true)));
  };

  const outRequest = () => {
    dispatch(actions.outContentsFeedBack(Boolean(false)));
  };

  useEffect(() => {
    if (finishAnalysis === false) alert("Finish Analysis!");
  }, [finishAnalysis]);

  useEffect(() => {
    console.log(isCategorySelect);
  }, [isCategorySelect]);

  return (
    <div className={cx("contentsFeedbackContainer")}>
      <div className={cx("sideBarContainer")}>
        <Sidebar id={8} />
        <div className={cx("sideLine")}></div>
      </div>
      <div className={cx("contentsContainer")}>
        <div className={cx("contentsFeedbackTitle")}>컨텐츠 요구 분석 페이지</div>
        <button onClick={requestAnalysis}>분석결과 요청</button>
        <button onClick={outRequest}>나가기</button>
        <div className={cx("contentsFeedbackDesc")}>시청자들의 요구 피드백이 담긴 댓글 분석 결과</div>
        <div className={cx("contentsFBBox")}>
          <div className={cx("contentsFBSearch")}>
            <SearchBar />
          </div>
          <div className={cx("pieChartFBBox")}>
            <div className={cx("pieChartFB")}>
              <PieChartC data={contentsFeedBackData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentsFeedBackPage;
