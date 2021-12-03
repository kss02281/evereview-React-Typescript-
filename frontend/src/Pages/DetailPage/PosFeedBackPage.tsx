import React, { Fragment} from 'react';
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Navbar, Sidebar } from '../../Components/common';
import SearchBar from '../../Components/SearchBar/SearchBar/SearchBar';
import classNames from "classnames/bind";
import styles from "./AllFeedBackPage.module.scss";
import { nowCategory } from '../../store/modules/category';

const cx = classNames.bind(styles);


function PosFeedBackPage() {

    const isCategorySelect = useSelector(nowCategory);
    const name = useSelector((state: RootStateOrAny) => state.user.nickName);
    
    return (
      <Fragment>
        <div className={cx('dashBoardContainer')}>
        <Sidebar id={4} />
        <div className={cx("sideLine")}></div>
        <div className={cx("dashBoardWrap")}>
          <div className={cx("dashBoardWrapHeader")}>
            <div className={cx("dashBoardText")}>
              <div className={cx("dashBoardTitle")}>반갑습니다 {name}님!</div>
              <div className={cx("dashBoardDescription")}>댓글들을 분석하고 사용자들의 피드백을 확인해보세요!</div>
            </div>
            <div className={cx("dashBoardSearch")}>
              <SearchBar />
            </div>
          </div>
          <div></div>
        { isCategorySelect.category === '영상별 분석' ? <div></div> : <div></div> }
        </div>
      </div>
      </Fragment>
  );
}

export default PosFeedBackPage;
