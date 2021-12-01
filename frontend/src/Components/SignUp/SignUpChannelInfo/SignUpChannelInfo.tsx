import React, { useState, useEffect } from "react";
import styles from "./SignUpChannelInfo.module.scss";
import classNames from "classnames/bind";
import { UilEditAlt } from "@iconscout/react-unicons";
import { useDispatch } from "react-redux";
import { actions } from "../../../store/modules";

const cx = classNames.bind(styles);

function SignUpChannelInfo(props: any) {
  const dispatch = useDispatch();
  const category: string[] = ["먹방", "일상", "리뷰", "게임", "피트니스", "ASMR", "주식", "부동산", "이슈", "교육", "기타"];
  const [checkedInputs, setCheckedInputs] = useState([] as number[]);
  const [selectedCategory, setSelectedCategory] = useState([] as string[]);
  const [uploadTerm, setUploadTerm] = useState("" as string);

  useEffect(() => {
    checkedInputs.map((id) => {
      let check = selectedCategory.findIndex((i) => i === category[id]);
      if (check === -1) {
        console.log("없는 카테고리");
        setSelectedCategory([...selectedCategory, category[id]]);
      }
    });
  }, [checkedInputs]);

  useEffect(() => {
    const numList = ["1", "2", "3"];
    if (uploadTerm !== "") {
      let current: any = document.getElementById(uploadTerm);
      if (current) {
        current.style.backgroundColor = "rgb(255, 125, 125)";
      }
    }
    numList.map((item) => {
      if (item != uploadTerm) {
        let element: any = document.getElementById(item);
        if (element) {
          element.style.backgroundColor = "red";
        }
      }
    });
  }, [uploadTerm]);

  const getClick = (e: any) => {
    setUploadTerm(e.target.id);
  };

  const changeHandler = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
      setSelectedCategory(selectedCategory.filter((el) => el !== category[id]));
    }
  };

  const clickEventHandler = (e: any) => {
    e.preventDefault();
    props.onSubmit("4");
    checkedInputs.map((id) => {
      setSelectedCategory([...selectedCategory, category[id]]);
    });
    dispatch(actions.saveChannelInfo({ category: selectedCategory, upload_term: parseInt(uploadTerm) }));
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

          <p className={cx("category")}>업로드 주력 컨텐츠 카테고리</p>
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
                    key={idx}
                  />
                  <span>{item}</span>
                </>
              );
            })}
          </div>

          <div className={cx("btnContainer")}>
            <p>영상 업로드 주기</p>
            <button id="1" className={cx("btn1")} onClick={getClick}>
              1일 ~ 3일
            </button>
            <button id="2" className={cx("btn2")} onClick={getClick}>
              일주일
            </button>
            <button id="3" className={cx("btn3")} onClick={getClick}>
              한 달
            </button>
          </div>
          <button disabled={!(selectedCategory.length !== 0 && uploadTerm)} className={cx("channel_btn")} onClick={clickEventHandler}>
            다음 단계
          </button>
        </div>
      </div>
    </>
  );
}

export default SignUpChannelInfo;
