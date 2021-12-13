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
  useEffect(() => {
    console.log(window.location.pathname);
    if (window.location.pathname === "/contentsfeedback") dispatch(actions.enterContentsFeedBack(Boolean(true)));
  }, []);

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
        <div className={cx("contentsFeedbackDesc")}>시청자들의 요구 피드백이 담긴 댓글 분석 결과</div>
        <div className={cx("contentsFBBox")}>
          <div className={cx("contentsFBSearch")}>
            <SearchBar />
          </div>
          <div className={cx("pieChartFBBox")}>
            <div className={cx("pieChartFB")}>
              <PieChartC data={contentsFeedBackData} />
            </div>
            <div className={cx("allBarChart")}>
              {contentsFeedBackData.map((data, i) => {
                return (
                  <div className={cx("chartWrap")}>
                    <div className={cx("chartLeft")}>{i + 1}.</div>
                    <div className={cx("chartRight")}>
                      {data.top_comment_text.replace(/(<([^>]+)>)/gi, "").replace(/\n/, "").length > 22
                        ? data.top_comment_text
                            .replace(/(<([^>]+)>)/gi, "")
                            .replace(/\n/, "")
                            .substring(0, 22) + ".."
                        : data.top_comment_text.replace(/(<([^>]+)>)/gi, "").replace(/\n/, "")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentsFeedBackPage;
