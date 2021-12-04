import React, { Fragment} from 'react';
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Navbar, Sidebar } from '../../Components/common';
import SearchBar from '../../Components/SearchBar/SearchBar/SearchBar';
import classNames from "classnames/bind";
import styles from "./NegFeedBackPage.module.scss";
import { nowCategory } from '../../store/modules/category';
import { Link } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import { actions } from '../../store/modules';
import NegBarChart from '../../Components/barChart/NegBarChart';


const cx = classNames.bind(styles);


function NegFeedBackPage() {
  const isCategorySelect = useSelector(nowCategory);
  const name = useSelector((state: RootStateOrAny) => state.user.nickName);
    
  const dispatch = useDispatch();
  const setVideo = () => {
    dispatch(actions.selectCategory('영상별 분석'))
  };

  const thisData = [
    {
      id: 1,
      name: "소리가 너무 커요",
      댓글수: 300,
      좋아요수: 240,
      box: 10,
    },
    {
      id: 2,
      name: "자막 틀렸어요",
      댓글수: 400,
      좋아요수: 138,
      box: 10,
    },
    {
      id: 3,
      name: "진짜 맛있어 보이네요",
      댓글수: 200,
      좋아요수: 98,
      box: 10,
    },
    {
      id: 4,
      name: "먹방 잘 찍으시네요",
      댓글수: 278,
      좋아요수: 98,
      box: 10,
    },
    {
      id: 5,
      name: "치킨먹어주세요",
      댓글수: 189,
      좋아요수: 80,
      box: 10,
    },
    {
      id: 6,
      name: "자세한 설명 굿",
      댓글수: 239,
      좋아요수: 180,
      box: 10,
    },
    {
      id: 7,
      name: "구독 누르고 갑니다",
      댓글수: 349,
      좋아요수: 230,
      box: 10,
    },
    {
      id: 8,
      name: "진짜 웃기다",
      댓글수: 189,
      좋아요수: 80,
      box: 10,
    },
    {
      id: 9,
      name: "화질 너무 구려요",
      댓글수: 239,
      좋아요수: 138,
      box: 10,
    },
    {
      id: 10,
      name: "음질이 너무 안좋아요",
      댓글수: 349,
      좋아요수: 243,
      box: 10,
    },
  ];

  return (
    <Fragment>
      <div className={cx('feedBackContainer')}>
      <Sidebar id={5} />
      <div className={cx("sideLine")}></div>
      <div className={cx("feedBackWrap")}>
        <div className={cx("feedBackWrapHeader")}>
          <div className={cx("feedBackText")}>
            <div className={cx("feedBackTitle")}>반갑습니다 {name}님!</div>
            <div className={cx("feedBackDescription")}>댓글들을 분석하고 사용자들의 피드백을 확인해보세요!</div>
          </div>
        </div>
        <div>
          { isCategorySelect.category === '영상별 분석' ? <div></div> : <div></div> }
        </div>
        <div className={cx("feedBackContentWrap")}>
          <Link className={cx("allFeedbackSelect")} to={ROUTES.ALLFEEDBACK} onClick={setVideo}>모든 피드백</Link>
          <Link className={cx("posFeedbackSelect")} to={ROUTES.POSFEEDBACK} onClick={setVideo}>긍정 피드백</Link>
          <Link className={cx("negFeedbackSelected")} to={ROUTES.NEGFEEDBACK} onClick={setVideo}>부정 피드백</Link>
          <div className={cx("feedBackContent")}>
            <div className={cx("feedBackPageSearch")}>
              <SearchBar />
            </div>
            <div className={cx("feedBackPageContainer")}>
              <div className={cx("feedBackPageLeft")}>
                <div></div>
                <div></div>
                <div className={cx("feedBackBarGrpah")}>
                  <NegBarChart /> 
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
            </div>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
}

export default NegFeedBackPage;
