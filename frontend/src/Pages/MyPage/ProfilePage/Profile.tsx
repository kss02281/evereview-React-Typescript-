import React from "react";
import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import { Sidebar } from "../../../Components/common";
import { useSelector } from "react-redux";
import { ReducerType } from "../../../store/modules";

const cx = classNames.bind(styles);

function Profile() {
  const name = useSelector((state: ReducerType) => state.user.name);
  const img_url = useSelector((state: ReducerType) => {
    if (state) {
      return state.user.img_url;
    }
  });
  return (
    <div className={cx("profileContainer")}>
      <div className={cx("leftSide")}>
        <Sidebar id={3} />
        <div className={cx("sideLine")}></div>
      </div>

      <div className={cx("rightSide")}>
        <div className={cx("profileTitle")}>사용자 정보 변경 페이지</div>
        <div className={cx("profileDescription")}>현재 사용자 정보 확인 및 변경</div>

        <div className={cx("profileImg_Name")}>
          <img className={cx("profileImg")} src={img_url} alt="profileImg" />
          <p className={cx("profileName")}>{name}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
