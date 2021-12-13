import React, { useEffect } from "react";
import styles from "./DashBoard.module.scss";
import classNames from "classnames/bind";
import PieChartC from "../../../Components/PieChart/PieChart";
import AllBarChart from "../../../Components/barChart/AllBarChart.jsx";
import NegBarChart from "../../../Components/barChart/NegBarChart.jsx";
import PosBarChart from "../../../Components/barChart/PosBarChart.jsx";
import { useSelector } from "react-redux";
import { nowAllTenArray, nowNegFiveArray, nowPogFiveArray } from "store/modules/analysis";
import ROUTES from "constants/routes";
import { useHistory } from "react-router";
const cx = classNames.bind(styles);

function DashBoardVideo() {
  const history = useHistory();
  
  const isAllTen = useSelector(nowAllTenArray);
  const isNegFive = useSelector(nowNegFiveArray);
  const isPosFive = useSelector(nowPogFiveArray);
  const feedBackAnalysis = useSelector((state) => state.contentsFeedBack.analysisData);

  const goContentsFeedBack = () => {
    history.push(`${ROUTES.CONTENTSFEEDBACK}`);
  };

  return (
    <>
      <div className={cx("dashBoardWrapMiddle")}>
        <div className={cx("dashBoardAllFeedback")}>
          <p className={cx("dashP")}>모든 피드백</p>
          <div className={cx("allSquareWrap")}>
            <div className={cx("allSquareLike")}></div>
            <p className={cx("allSquareP")}>좋아요 수</p>
            <div className={cx("allSquareComment")}></div>
            <p className={cx("allSquareP")}>댓글 수</p>
          </div>
          <div className={cx("allBarChart")}>
            {isAllTen.map((data, i) => {
              return (
                <div className={cx("chartWrap")}>
                  <div className={cx("chartLeft")}>{i + 1}.</div>
                  <div className={cx("chartRight")}>{data.name.replace(/(<([^>]+)>)/gi, "").replace(/\n/, "").length > 22
                      ? data.name
                          .replace(/(<([^>]+)>)/gi, "")
                          .replace(/\n/, "")
                          .substring(0, 22) + "..."
                      : data.name.replace(/(<([^>]+)>)/gi, "").replace(/\n/, "")}</div>
                </div>
              );
            })}
          </div>
          <div className={cx("allBarGraph")}>
            <AllBarChart />
          </div>
        </div>
        <div className={cx("dashBoardWrapMiddleBlank")}></div>
        <div onClick={goContentsFeedBack} className={cx("dashBoardAllFeedback")}>
          <p className={cx("dashP")}>사용자 요구 분석</p>

          <div className={cx("allBarChart")}>
            {feedBackAnalysis.map((data, i) => {
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
          <div className={cx("pieGraph")}>
            <PieChartC data={feedBackAnalysis} />
          </div>
        </div>
      </div>
      <div className={cx("dashBoardWrapDown")}>
        <div className={cx("dashBoardWrapDownGrid")}>
          <div className={cx("dashBoardPosFeedback")}>
            <p className={cx("dashP")}>긍정 피드백</p>
            <div className={cx("squareWrap")}>
              <div className={cx("posSquareLike")}></div>
              <p className={cx("posSquareP")}>좋아요 수</p>
              <div className={cx("posSquareComment")}></div>
              <p className={cx("posSquareP")}>댓글 수</p>
            </div>
            <div className={cx("allBarChart")}>
            {isPosFive.map((data, i) => {
              return (
                <div className={cx("chartWrap")}>
                  <div className={cx("chartLeft")}>{i + 1}.</div>
                  <div className={cx("chartRight")}>{data.name.replace(/(<([^>]+)>)/gi, "").replace(/\n/, "").length > 22
                      ? data.name
                          .replace(/(<([^>]+)>)/gi, "")
                          .replace(/\n/, "")
                          .substring(0, 22) + "..."
                      : data.name.replace(/(<([^>]+)>)/gi, "").replace(/\n/, "")}</div>
                </div>
              );
            })}
            </div>
            <div className={cx("allBarGraph")}>
              <PosBarChart />
            </div>
          </div>
          <div className={cx("dashBoardWrapDownBlank")}>
            <div className={cx("BlankLine")}></div>
          </div>
          <div className={cx("dashBoardPosFeedback")}>
            <p className={cx("dashP")}>부정 피드백</p>
            <div className={cx("negSquareWrap")}>
              <div className={cx("negSquareLike")}></div>
              <p className={cx("negSquareP")}>좋아요 수</p>
              <div className={cx("negSquareComment")}></div>
              <p className={cx("negSquareP")}>댓글 수</p>
            </div>
            <div className={cx("allBarChart")}>
            {isNegFive.map((data, i) => {
              return (
                <div className={cx("chartWrap")}>
                  <div className={cx("chartLeft")}>{i + 1}.</div>
                  <div className={cx("chartRight")}>{data.name.replace(/(<([^>]+)>)/gi, "").replace(/\n/, "").length > 22
                      ? data.name
                          .replace(/(<([^>]+)>)/gi, "")
                          .replace(/\n/, "")
                          .substring(0, 22) + "..."
                      : data.name.replace(/(<([^>]+)>)/gi, "").replace(/\n/, "")}</div>
                </div>
              );
            })}
            </div>
            <div className={cx("allBarGraph")}>
              <NegBarChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoardVideo;
