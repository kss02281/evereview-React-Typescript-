import React, { useState,useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchDropdown.module.scss';
import VideoDropdown from './VideoDropdown';
import {  useDispatch } from 'react-redux';
import { actions } from "../../../store/modules";
import axios from 'axios';

const cx = classNames.bind(styles);

function SearchDropdown() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  async function getVideoSelectedList() {
   const response = await axios.get("http://localhost:8000/data");
    console.log(response.data);
    dispatch((actions.updateSelectedVideoList({selectedVideoList:Array(response.data.length).fill(false)})));
    dispatch((actions.updateVideoList(response.data)))
  }


  useEffect(() => {
    getVideoSelectedList()
    console.log('get Data!')
  },[]);


  const handleClickStart = (e) => {
    setIsOpen(!isOpen)
  };

    return (
      <div className={cx("searchContainer")}>
        <div className={cx("menu-container")}>
          <input 
          type="text" 
          className={cx("videoSearchWrap")} 
          onClick={handleClickStart} 
          placeholder="자신의 채널에서 분석하고자 하는 영상을 선택해주세요!" 
          onChange={(e) => {
          setSearchWord(e.target.value);
          }}>
          </input>
          {isOpen ? <VideoDropdown searchWord={searchWord} /> : null}
        </div>
      </div>
    );
}

export default SearchDropdown;