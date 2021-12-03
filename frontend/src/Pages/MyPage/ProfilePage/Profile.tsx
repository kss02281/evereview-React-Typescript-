import React, { Reducer, useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import { Sidebar } from "../../../Components/common";
import { useSelector } from "react-redux";
import { ReducerType } from "../../../store/modules";
import axios from "axios";

const cx = classNames.bind(styles);

function Profile() {
  const name = useSelector((state: ReducerType) => state.user.name);
  const nickName = useSelector((state: ReducerType) => state.user.nickName);
  const email = useSelector((state: ReducerType) => state.user.email);
  const img_url = useSelector((state: ReducerType) => state.user.img_url);
  const upload_term = useSelector((state: ReducerType) => state.user.upload_term);
  const categoryState = useSelector((state: ReducerType) => state.user.categoryNumList);
  const channelUrl = useSelector((state: ReducerType) => state.user.channelUrl);
  const channelImgUrl = useSelector((state: ReducerType) => state.user.channelImgUrl);
  const channelName = useSelector((state: ReducerType) => state.user.channelTitle);
  const category: string[] = ["먹방", "일상", "리뷰", "게임", "피트니스", "ASMR", "주식", "부동산", "이슈", "교육", "기타"];
  const [checkedInputs, setCheckedInputs] = useState(categoryState ? categoryState : ([] as number[]));
  const [selectedCategory, setSelectedCategory] = useState([] as string[]);
  const [uploadTerm, setUploadTerm] = useState("" + upload_term);
  const [currNickName, setCurrNickName] = useState(nickName);
  const [changeBoolean, setChangeBoolean] = useState(Boolean(true));

  useEffect(() => {
    console.log(checkedInputs, uploadTerm, currNickName);
    if (checkedInputs !== categoryState || uploadTerm !== "" + upload_term || currNickName !== nickName) setChangeBoolean(Boolean(false));
    else {
      setChangeBoolean(true);
    }
  }, [checkedInputs, uploadTerm, currNickName]);

  useEffect(() => {
    checkedInputs.map((id) => {
      let check = selectedCategory.findIndex((i) => i === category[id]);
      if (check === -1) {
        setSelectedCategory([...selectedCategory, category[id]]);
      }
    });
  }, [checkedInputs]);

  useEffect(() => {
    const numList = ["1", "2", "3"];
    if (uploadTerm !== "") {
      let current: any = document.getElementById(uploadTerm);
      if (current) {
        current.style.backgroundColor = "#8583ffad";
      }
    }
    numList.map((item) => {
      if (item != uploadTerm) {
        let element: any = document.getElementById(item);
        if (element) {
          element.style.backgroundColor = "#6563ff";
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

  const saveButtonHandler = () => {
    console.log(currNickName, selectedCategory, uploadTerm);
    if (checkedInputs.length === 0 || uploadTerm === "" || currNickName === "") {
      alert("입력되지 않은 칸이 존재합니다.");
    }
  };

  return (
    <div className={cx("profileContainer")}>
      <div className={cx("leftSide")}>
        <Sidebar id={3} />
        <div className={cx("sideLine")}></div>
      </div>

      <div className={cx("currentInfoContainer")}>
        <div className={cx("profileTitle")}>사용자 정보 변경 페이지</div>
        <div className={cx("profileDescription")}>현재 사용자 정보 확인 및 변경</div>

        <div className={cx("profileImgTextContainer")}>
          <p className={cx("profileImgText")}>사용자 이미지</p>
          <img className={cx("profileImg")} src={img_url} alt="profileImg" />
          <p className={cx("profileTextlabel")}>연결된 구글 계정</p>
          <p className={cx("profileText")}>{email}</p>
          <p className={cx("profileTextlabel")}>이름</p>
          <p className={cx("profileText")}>{name}</p>

          <div className={cx("inputContainer")}>
            <label id="nickName" htmlFor="nickName">
              별명
            </label>
            <input id="nickName" type="text" value={currNickName} onChange={(e) => setCurrNickName(e.target.value)} />
          </div>
        </div>
      </div>
      <div className={cx("changeInfoContainer")}>
        <p className={cx("channelInfoTitle")}>분석하고 있는 채널 정보</p>
        <div className={cx("channelInfoImgName")}>
          <div className={cx("channelInfoImgBox")}>
            <img className={cx("channelInfoImg")} src={channelImgUrl} alt="channelImgUrl" />
          </div>
          <div className={cx("channelInfoName")}>
            채널이름
            <br />[ {channelName} ]
          </div>
        </div>
        <div className={cx("channelInfoUrlBox")}>
          채널 주소<span className={cx("channelInfoUrlDescription")}>클릭하여 채널로 이동할 수 있습니다.</span>
          <br />
          <a className={cx("channelInfoUrl")} href={channelUrl} target="_blank">
            {channelUrl}
          </a>
        </div>
        <div className={cx("channelUploadTerm")}>
          <p className={cx("upload_term")}>
            영상 업로드 주기
            <span className={cx("upload_termDescription")}>영상 업로드 주기에 따라 대쉬보드 초기 분석 결과가 달라집니다.</span>
          </p>
          <span className={cx("upload_termExplanation")}>1일 ~ 3일: 최신 10개의 영상 선택 /</span>
          <span className={cx("upload_termExplanation")}>일주일: 최신 4개의 영상 선택 /</span>
          <span className={cx("upload_termExplanation")}>한 달: 최신 1개의 영상 선택</span>
          <div className={cx("btnContainer")}>
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
        </div>
        <div className={cx("categoryBox")}>
          <p className={cx("category")}>
            업로드 영상의 컨텐츠 카테고리
            <span className={cx("categoryDescription")}>선택된 컨텐츠 카테고리가 분석 결과에 반영됩니다.</span>
          </p>
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
        </div>
        <button disabled={changeBoolean} className={cx("saveButton")} onClick={saveButtonHandler}>
          변경된 정보 저장하기
        </button>
      </div>
    </div>
  );
}

export default Profile;
