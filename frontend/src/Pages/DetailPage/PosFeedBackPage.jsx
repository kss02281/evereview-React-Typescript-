import React, { Fragment, useState, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Navbar, Sidebar } from '../../Components/common';
import SearchBar from '../../Components/SearchBar/SearchBar/SearchBar';
import classNames from "classnames/bind";
import styles from "./PosFeedBackPage.module.scss";
import { nowCategory } from '../../store/modules/category';
import ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { actions } from '../../store/modules';
import PosBarChart from '../../Components/barChart/PosBarChart';
import PosLineChart from '../../Components/LineChart/PosLineChart';
import axios from 'axios';

const cx = classNames.bind(styles);


function PosFeedBackPage() {

  const [thisData,setThisData] = useState([])
  const [thissData,setThissData] = useState([])
  const [isSelectedCommentArray, setIsSelectedCommentArray] = useState([])

  async function getFeedBackList() {
    const response = await axios.get("http://localhost:8000/feedBackList");
    setThisData(response.data)
    setIsSelectedCommentArray(Array.from({ length: response.data.length }, (v, i) => false))
    console.log(response.data.length)
   }

 
   useEffect(() => {
    getFeedBackList()
     console.log('get Data!')
   },[]);

  const dispatch = useDispatch();
  const isCategorySelect = useSelector(nowCategory);

  const name = useSelector((state) => state.user.nickName);

  const setVideo = () => {
    dispatch(actions.selectCategory('영상별 분석'))
  };

  const setSelect = (number) => {
    let newArr = [...isSelectedCommentArray];
    newArr[number] = !isSelectedCommentArray[number]
    setIsSelectedCommentArray(newArr)
    console.log(newArr)
    let testArr = [...isSelectedCommentArray];
    setThissData(thissData.concat(testArr))
    console.log(thissData)
  };

    return (
      <Fragment>
      <div className={cx('feedBackContainer')}>
      <Sidebar id={4} />
      <div className={cx("sideLine")}></div>
      <div className={cx("feedBackWrap")}>
        <div className={cx("feedBackWrapHeader")}>
          <div className={cx("feedBackText")}>
            <div className={cx("feedBackTitle")}>반갑습니다 {name}님!</div>
            <div className={cx("feedBackDescription")}>댓글들을 분석하고 사용자들의 피드백을 확인해보세요!</div>
          </div>
        </div>
        <div>
          
        </div>
        <div className={cx("feedBackContentWrap")}>
          <Link className={cx("allFeedbackSelect")} to={ROUTES.ALLFEEDBACK} onClick={setVideo}>모든 피드백</Link>
          <Link className={cx("posFeedbackSelected")} to={ROUTES.POSFEEDBACK} onClick={setVideo}>긍정 피드백</Link>
          <Link className={cx("negFeedbackSelect")} to={ROUTES.NEGFEEDBACK} onClick={setVideo}>부정 피드백</Link>
          <div className={cx("feedBackContent")}>
            <div className={cx("feedBackPageSearch")}>
              <SearchBar />
            </div>
            <div className={cx("feedBackPageContainer")}>
              <div className={cx("feedBackPageLeft")}>
                <div></div>
                <div></div>
                <div className={cx("feedBackBarGrpah")}>
                { isCategorySelect.category === '영상별 분석' ? <PosBarChart /> : <PosLineChart /> }
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
                  <div>싫어요</div>
                  <div>좋아요</div>
                </div>
                <div className={cx("feedBackComments")}>
                {thisData.map((data, i) => {
                      return (
                        <>
                        <div className={cx("feedBackComment")} id={i} onClick={() => setSelect(i)}>
                        <div>{data.id}위</div>
                        <div>{data.name}</div>
                        <div>{data.댓글수} 개</div>
                        <div>{data.좋아요수} 개</div>
                        <div>{data.box} 개</div>
                      </div>
                      {isSelectedCommentArray[i] ? 
                      <div>
                        <div className={cx("feedBackDetailHeader")}>
                          <div>댓글이 달린 영상</div>
                          <div>원래 댓글</div>
                          <div>댓글 작성 일자</div>
                          <div>좋아요</div>
                          <div>싫어요</div>
                        </div>
                        {Object.keys(thisData[i].details).map((data, j) => {
                      return (
                        <div className={cx("feedBackDetail")}>
                          <div>{data}</div>
                          <div>{thisData[i].details[data]}</div>
                          <div>{data}</div>
                          <div>4</div>
                          <div>5</div>
                        </div>
                        
                      );
                    })}
                      </div>
                       : null}
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

export default PosFeedBackPage;
