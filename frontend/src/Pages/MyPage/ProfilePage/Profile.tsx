import React from "react";
import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import { Sidebar } from "../../../Components/common";
import { useSelector } from "react-redux";
import { ReducerType } from "../../../store/modules";

const cx = classNames.bind(styles);

function Profile() {
  const name = useSelector<ReducerType>((state) => state.user.nickName);
  return (
    <div className={cx("overviewContainer")}>
      <Sidebar id={3} />
      <div className={cx("sideLine")}></div>
      <div>
        <div className={cx("overViewTitle")}>반갑습니다 {name}님!</div>
        <div className={cx("overViewDescription")}>댓글들을 분석하고 사용자들의 피드백을 확인해보세요!</div>
        <div>PROFILE</div>
      </div>
    </div>
  );
}

export default Profile;
