import React, { useEffect, useState } from "react";
import styles from "./SignUp2.module.scss";
import classNames from "classnames/bind";
import { UilEditAlt } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import { ReducerType } from "../../../store/modules";

const cx = classNames.bind(styles);

function SignUp2(props: any) {
  const name = useSelector<ReducerType>((state) => state.user.name);
  const category: string[] = ["먹방", "일상", "리뷰", "게임", "피트니스", "ASMR", "주식", "부동산", "이슈", "교육", "기타"];
  const [checkedInputs, setCheckedInputs] = useState([] as number[]);
  const [selectedCategory, setSelectedCategory] = useState([] as string[]);

  const clickEventHandler = (e: any) => {
    e.preventDefault();
    props.onSubmit("3");
  };

  useEffect(() => {
    checkedInputs.map((id) => {
      setSelectedCategory([...selectedCategory, category[id]]);
    });
  }, [checkedInputs]);

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  const changeHandler = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
    }
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
            <div className={cx("nowStepBox")}>2</div>
            <div className={cx("link")}></div>
            <div className={cx("stepBox")}>3</div>
            <div className={cx("link")}></div>
            <div className={cx("stepBox")}>4</div>
          </div>
          <p className={cx("infoTitle")}>회원 정보 입력</p>

          <div className={cx("inputContainer")}>
            <label id="name" htmlFor="name">
              성명
            </label>
            <input id="name" type="text" name="name" />
          </div>

          <div className={cx("inputContainer")}>
            <label id="nickName" htmlFor="nickName">
              별명
            </label>
            <input id="nickName" type="text" name="nickName" />
          </div>

          <p id="category">업로드 주력 컨텐츠 카테고리</p>
          <div className={cx("categoryContainer")}>
            {category.map((item, idx) => {
              return (
                <>
                  <input
                    id={item}
                    type="checkbox"
                    onChange={(e) => {
                      changeHandler(e.currentTarget.checked, idx);
                    }}
                    checked={checkedInputs.includes(idx) ? true : false}
                  />
                  <span>{item}</span>
                </>
              );
            })}
          </div>

          <button className={cx("btn")} onClick={clickEventHandler}>
            다음 단계
          </button>
        </div>
      </div>
    </>
  );
}

export default SignUp2;
