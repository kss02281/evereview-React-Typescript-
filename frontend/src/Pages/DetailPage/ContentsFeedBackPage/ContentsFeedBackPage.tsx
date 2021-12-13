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
const cx = classNames.bind(styles);

interface IProps {
  id: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function ContentsFeedBackPage(props: IProps) {
  const dispatch = useDispatch();
  const isAnalysis = useSelector(nowAnalysis);
  const isCategorySelect = useSelector(nowCategory);
  const contentsFeedBackData = useSelector((state: ReducerType) => state.contentsFeedBack.analysisData);
  const finishAnalysis = useSelector((state: ReducerType) => state.contentsFeedBack.IsEnter);
  const [isSelectedCommentArray, setIsSelectedCommentArray] = useState([]);
  const [openTableData, setOpenTableData] = useState([] as string[]);
  const [prevId, setPrevId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("분석완료");
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
          <div class='authorImg' >프로필</div>
          <div class='author'>작성자</div>
          <div class='textContent'>댓글내용</div>
          <div class='likeCount'>좋아요수</div>
          <div class='commentTime'>댓글달린 시각</div>
          <div class='videoTitle'>댓글달린 영상</div>
          <div class='videoViewCount'>조회수</div>
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
      <div className={cx("sideBarContainer")}>
        <Sidebar id={8} />
        <div className={cx("sideLine")}></div>
      </div>
      <div className={cx("contentsContainer")}>
        <div className={cx("contentsFeedbackTitle")}>컨텐츠 요구 분석 페이지</div>
        <div className={cx("contentsFeedbackDesc")}>시청자들의 요구 피드백이 담긴 댓글 분석 결과</div>
        <div className={cx("contentsFBBox")}>
          <button className={cx("closeBtn")} onClick={closeOpenBox}>
            펼친 내용 닫기
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
                  <div className={cx("rankTd")}>순위</div>
                  <div className={cx("textTd")}>댓글 내용</div>
                  <div className={cx("cntTd")}>총 댓글 수</div>
                  <div className={cx("likeTd")}>좋아요 합계</div>
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
