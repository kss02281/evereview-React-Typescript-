import React, { Fragment } from "react";
import { Navbar } from "Components/common";
import styles from "./MainPage.module.scss";
import classNames from "classnames/bind";
import { useHistory } from "react-router-dom";
import ROUTES from "constants/routes";
import VerticalCarousel from "Components/verticalSlider/VerticalCarousel";
import mockData from "constants/mockData.json";
import AnimationPage from "Components/Animation/AnimationPage";
import { useSelector } from "react-redux";
import { ReducerType } from "store/modules";
const cx = classNames.bind(styles);

function MainPage() {
  const history = useHistory();
  const isLogin = useSelector<ReducerType>((state) => state.user.success);

  const handleStart = () => {
    if (isLogin) {
      history.push(ROUTES.DASHBOARD);
    } else {
      history.push(ROUTES.LOGIN);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <div className={cx("mainContainer")}>
        <div></div>
        <div className={cx("leftContainer")}>
          <div className={cx("mainTitle")}>EveReview</div>
          <div className={cx("mainDescription")}>
          EveReview를 통해 사용자의 니즈를 분석하고 파악해보세요!<br/> 구글 로그인 하나로 EveReview의 모든 서비스를 이용하실 수 있습니다.
          </div>
          <div className={cx("startButton")} onClick={handleStart}>
            시작하기
          </div>
          <VerticalCarousel data={mockData.data} leadingText="" />
        </div>
        <div className={cx("rightContainer")}>
          <AnimationPage />
        </div>
        <div></div>
      </div>
    </Fragment>
  );
}

export default MainPage;
