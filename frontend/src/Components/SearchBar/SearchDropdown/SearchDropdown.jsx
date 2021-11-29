import React, { useState,useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchDropdown.module.scss';
import Select from 'react-select';
import { colourOptions } from '../searchMockData';
import VideoDropdown from './VideoDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from "../../../store/modules";
import { nowVideoList } from '../../../store/modules/selectedVideo';
import axios from 'axios';

const cx = classNames.bind(styles);

function SearchDropdown() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

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
          <input className={cx("videoSearchWrap")} onClick={handleClickStart}>
          </input>
          {isOpen ? <VideoDropdown /> : null}
        </div>
      </div>
    );
}

export default SearchDropdown;