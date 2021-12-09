import React from "react";
import styles from "./ContentsFeedBackPage.module.scss";
import classNames from "classnames/bind";
import { Sidebar } from "../../../Components/common";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

//contentsFeedback

function ContentsFeedBackPage() {
  const name = "이성효";
  return (
    <div className={cx("contentsFeedbackContainer")}>
      <div className={cx("sideBarContainer")}>
        <Sidebar id={8} />
        <div className={cx("sideLine")}></div>
      </div>
      <div className={cx("contentsContainer")}>
        <div className={cx("contentsFeedbackTitle")}>사용자 정보 변경 페이지</div>
        <div className={cx("contentsFeedbackDesc")}>현재 사용자 정보 확인 및 변경</div>
      </div>
    </div>
  );
}

export default ContentsFeedBackPage;
