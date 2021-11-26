import React from "react";
import ROUTES from "../../../constants/routes";
import styles from "./SignUp4.module.scss";
import classNames from "classnames/bind";
import { UilEditAlt } from "@iconscout/react-unicons";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { ReducerType } from "../../../store/modules";

const cx = classNames.bind(styles);

function SignUp4(props: any) {
  const history = useHistory();
  const name = useSelector<ReducerType>((state) => state.user.name);

  const clickEventHandler = (e: any) => {
    e.preventDefault();
    props.onSubmit("");
    history.push(ROUTES.LOGIN);
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
            <div className={cx("stepBox")}>3</div>
            <div className={cx("link")}></div>
            <div className={cx("nowStepBox")}>4</div>
          </div>

          <div className={cx("completeCheck")}>✔</div>

          <p className={cx("welcomeText")}>{name} 님, 환영합니다!</p>
          <p>EVEREVIEW의 수 많은 서비스를 이용해보세요!</p>
          <button className={cx("btn")} onClick={clickEventHandler}>
            로그인하러 가기
          </button>
        </div>
      </div>
    </>
  );
}

export default SignUp4;
