import React, { useEffect, useState } from "react";
import styles from "./ContentsFeedBackPage.module.scss";
import classNames from "classnames/bind";
import { Sidebar } from "Components/common";
import SearchBar from "Components/SearchBar/SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { actions, ReducerType } from "store/modules";
import { nowCategory } from "store/modules/category";
import PieChartC from "Components/PieChart/PieChart";
import { AxiosResponse } from "axios";
import axios from "axios";
import "./innerTable.css";
import { nowAnalysis } from "store/modules/analysis";
import { Hypnosis } from "react-cssfx-loading";
const cx = classNames.bind(styles);

interface IProps {
  id: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function ContentsFeedBackPage(props: IProps) {
  const dispatch = useDispatch();
  const isAnalysis = useSelector(nowAnalysis);
  const nowLoading = useSelector(nowAnalysis).loading;
  const isCategorySelect = useSelector(nowCategory);
  const contentsFeedBackData = useSelector((state: ReducerType) => state.contentsFeedBack.analysisData);
  const finishAnalysis = useSelector((state: ReducerType) => state.contentsFeedBack.IsEnter);
  const [isSelectedCommentArray, setIsSelectedCommentArray] = useState([]);
  const [openTableData, setOpenTableData] = useState([] as string[]);
  const [prevId, setPrevId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("λΆμμλ£");
    const analysisDataArray = isAnalysis?.analysisArray?.clusters;
    console.log(analysisDataArray);
    var dataArray = [];
    const object: any = {};
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
    console.log(window.location.pathname);
    if (window.location.pathname === "/contentsfeedback") dispatch(actions.enterContentsFeedBack(Boolean(true)));
  }, []);

  useEffect(() => {
    console.log(isCategorySelect);
  }, [isCategorySelect]);

  const closeOpenBox = () => {
    const prevElement = document.getElementById(`${prevId}`);
    if (prevElement) prevElement.innerHTML = "";
    setOpenTableData([]);
    setIsOpen(false);
  };

  const openTable = (data: any) => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + `/api/comments/${data.cluster_id}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response: AxiosResponse) => {
        const idx: string = "" + data.rank;
        const element = document.getElementById(`${idx}`);
        var innerHTMLText: string = `
        <div class='innerTableHead'>
          <div class='authorImg' >νλ‘ν</div>
          <div class='author'>μμ±μ</div>
          <div class='textContent'>λκΈλ΄μ©</div>
          <div class='likeCount'>μ’μμμ</div>
          <div class='commentTime'>λκΈλ¬λ¦° μκ°</div>
          <div class='videoTitle'>λκΈλ¬λ¦° μμ</div>
          <div class='videoViewCount'>μ‘°νμ</div>
        </div>
        `;

        if (!isOpen) {
          console.log("hi1");
          setPrevId(idx);
          response.data.map((item: any) => {
            const text_display: string =
              item.text_display
                .replace(/(<([^>]+)>)/gi, "")
                .replace(/\n/, "")
                .substring(0, 80) + "..";
            innerHTMLText += `
        <div class='innerTableHead'>
          <img class='authorImg' src=${item.author_img} />
          <div class='author'>${item?.author}</div>
          <div class='textContent'>
          ${text_display}
          </div>
          <div class='likeCount'>${item?.like_count}</div>
          <div class='commentTime'>${item?.published_at}}</div>
          <div class='videoTitle'>${item?.video?.title}</div>
          <div class='videoViewCount'>${item?.video?.view_count}</div>
        </div>
        `;
          });
          if (element) element.innerHTML = innerHTMLText;
          setIsOpen(true);
        } else {
          if (prevId === idx) {
            console.log("hi2");
            if (element) element.innerHTML = "";
            setIsOpen(false);
          } else {
            console.log("hi3");
            const prevElement = document.getElementById(`${prevId}`);
            if (prevElement) prevElement.innerHTML = "";
            setPrevId(idx);
            response.data.map((item: any) => {
              const text_display: string =
                item.text_display
                  .replace(/(<([^>]+)>)/gi, "")
                  .replace(/\n/, "")
                  .substring(0, 80) + "..";
              innerHTMLText += `
              <div class='innerTableHead'>
              <img class='authorImg' src=${item.author_img} />
              <div class='author'>${item?.author}</div>
              <div class='textContent'>
              ${text_display}
              </div>
              <div class='likeCount'>${item?.like_count}</div>
              <div class='commentTime'>${item?.published_at}}</div>
              <div class='videoTitle'>${item?.video?.title}</div>
              <div class='videoViewCount'>${item?.video?.view_count}</div>
            </div>
        `;
            });
            if (element) element.innerHTML = innerHTMLText;
            setIsOpen(true);
          }
        }
      });
  };
  useEffect(() => {
    const current: any = document.getElementById("topElement");
    console.log(current);
    if (isOpen) {
      current.style.marginRight = "17px";
    } else {
      current.style.marginRight = "0";
    }
  }, [isOpen]);

  return (
    <div className={cx("contentsFeedbackContainer")}>
      {nowLoading ? (
        <div className={cx("loadingPage")}>
          <Hypnosis color="#0000008f" width="200px" height="200px" />
        </div>
      ) : null}
      <div className={cx("sideBarContainer")}>
        <Sidebar id={8} />
        <div className={cx("sideLine")}></div>
      </div>
      <div className={cx("contentsContainer")}>
        <div className={cx("contentsFeedbackTitle")}>μ»¨νμΈ  μκ΅¬ λΆμ νμ΄μ§</div>
        <div className={cx("contentsFeedbackDesc")}>μμ²­μλ€μ μκ΅¬ νΌλλ°±μ΄ λ΄κΈ΄ λκΈ λΆμ κ²°κ³Ό</div>
        <div className={cx("contentsFBBox")}>
          <button className={cx("closeBtn")} onClick={closeOpenBox}>
            νΌμΉ λ΄μ© λ«κΈ°
          </button>
          <div className={cx("contentsFBSearch")}>
            <SearchBar />
          </div>

          <div className={cx("pieChartBox")}>
            <div className={cx("pieChartLeftBox")}>
              <div className={cx("pieChartFB")}>
                <PieChartC data={contentsFeedBackData} />
              </div>
            </div>
            <div className={cx("pieChartRightBox")}>
              <div className={cx("allBarChart")}>
                <div id="topElement" className={cx("outerTableTop")}>
                  <div className={cx("rankTd")}>μμ</div>
                  <div className={cx("textTd")}>λκΈ λ΄μ©</div>
                  <div className={cx("cntTd")}>μ΄ λκΈ μ</div>
                  <div className={cx("likeTd")}>μ’μμ ν©κ³</div>
                </div>
                <div className={cx("tableBottom")}>
                  {contentsFeedBackData.map((data, i) => {
                    const idx: string = "" + data.rank;
                    return (
                      <>
                        <div
                          className={cx("outerTableHead")}
                          onClick={(event: React.MouseEvent<HTMLElement>) => {
                            openTable(data);
                          }}
                        >
                          <div className={cx("rankTd")}>{data.rank}</div>
                          <div className={cx("textTd")}>
                            {data.top_comment_text.replace(/(<([^>]+)>)/gi, "").replace(/\n/, "").length > 80
                              ? data.top_comment_text
                                  .replace(/(<([^>]+)>)/gi, "")
                                  .replace(/\n/, "")
                                  .substring(0, 80) + ".."
                              : data.top_comment_text.replace(/(<([^>]+)>)/gi, "").replace(/\n/, "")}
                          </div>
                          <div className={cx("cntTd")}>{data.total_count}</div>
                          <div className={cx("likeTd")}>{data.total_like}</div>
                        </div>
                        <div className="openBox" id={idx}>
                          {openTableData}
                        </div>
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
  );
}

export default ContentsFeedBackPage;
