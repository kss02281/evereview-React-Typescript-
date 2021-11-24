import React from "react";
import styles from "./SignUp3.module.scss";
import classNames from "classnames/bind";
import { UilEditAlt } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import { ReducerType } from "../../../store/modules";

const cx = classNames.bind(styles);

function SignUp3(props: any) {
  const clickEventHandler = (e: any) => {
    e.preventDefault();
    props.onSubmit("4");
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("title")}>
            <div className={cx("pencilLogo")}>
              <UilEditAlt size="80" />
            </div>
            <div className={cx("titleText")}>EverReview</div>
          </div>

          <div className={cx("stepContainer")}>
            <div className={cx("stepBox")}>1</div>
            <div className={cx("link")}></div>
            <div className={cx("stepBox")}>2</div>
            <div className={cx("link")}></div>
            <div className={cx("nowStepBox")}>3</div>
            <div className={cx("link")}></div>
            <div className={cx("stepBox")}>4</div>
          </div>
          <div className={cx("inputContainer")}>
            <label id="channelName" htmlFor="channelName">
              Youtube Channel Name
            </label>
            <input id="channelName" type="text" name="channelName" placeholder="My Workspace" />
          </div>

          <div className={cx("inputContainer")}>
            <label id="channelUrl" htmlFor="channelUrl">
              Youtube Channel URL
            </label>
            <div className={cx("innerInputBox")}>
              <div className={cx("fixInput")}>http://www.youtube.com/</div>
              <input id="channelUrl" type="text" name="channelUrl" placeholder="채널 이름" />
            </div>
          </div>

          <div className={cx("btnContainer")}>
            <p>영상 업로드 주기</p>
            <button className={cx("btn1")}>1일 ~ 3일</button>
            <button className={cx("btn2")}>일주일</button>
            <button className={cx("btn3")}>한 달</button>
          </div>
          <button className={cx("btn")} onClick={clickEventHandler}>
            다음 단계
          </button>
        </div>
      </div>
    </>
  );
}

export default SignUp3;
