import React, { useState,useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchDropdown.module.scss';
import Select from 'react-select';
import { colourOptions } from '../searchMockData';
import { UilTimes } from '@iconscout/react-unicons';
import data from './searchMockData.json';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from "../../../store/modules";
import { nowSelectedVideoList } from '../../../store/modules/selectedVideo';
import { nowVideoList } from '../../../store/modules/video';

const cx = classNames.bind(styles);

function VideoDropdown() {
  const dispatch = useDispatch();
  const isSelectedVideoList = useSelector(nowSelectedVideoList)
  const isVideoList = useSelector(nowVideoList)

  const handleBtn = (btnId) => (e) => {
    e.preventDefault();
    dispatch(actions.selectSelectedVideo(btnId))
  };

  const handleClickClose = (btnId) => (e) => {
    e.preventDefault();
    dispatch(actions.closeSelectedVideo(btnId))
  };

  const handleClickCloseAll = () => {
    Object.keys(isSelectedVideoList.selectedVideoList).map((keyName, i) => (
      dispatch(actions.closeSelectedVideo(keyName))
    ))
  };

  const handleClickSelectAll = () => {
    Object.keys(isSelectedVideoList.selectedVideoList).map((keyName, i) => (
      dispatch(actions.selectAllSelectedVideo(keyName))
    ))
  };

    return (
      <>
        <div className={cx("videoContainer")}>
            <div className={cx("selectAll")} onClick={handleClickSelectAll}>/</div>
            <div className={cx("deleteAll")} onClick={handleClickCloseAll}>X</div>
            <div className={cx("videoHeader")}>
            {Object.keys(isSelectedVideoList.selectedVideoList).map((keyName, i) => (
                    isSelectedVideoList.selectedVideoList[keyName] ? <div className={cx('videoHeaderBox')}  onClick={!undefined && handleClickClose(i)} key={i}>{isVideoList[i]['title'].substr(0,10)}<span>x</span> </div> : null
                ))}
                
            </div>
            <div className={cx("videoItems")}>
                {isVideoList.map((videoInfo, i) => {
                    return (
                        <div 
                        className={cx(`videoItem_${isSelectedVideoList.selectedVideoList[i]}`)} 
                        id='videoItem' 
                        onClick={!undefined && handleBtn(i)} 
                        style={{ backgroundColor: isSelectedVideoList.selectedVideoList[i] ? "#D0E9FF" : "#ffffff" }}
                        >
                        <div className={cx('videoImageWrap')}>
                            <img className={cx('videoImage')} src={videoInfo.url} alt="imgUrl" />
                        </div>
                        <div className={cx('videoImageText')}>
                            제목 : {videoInfo.title} <br />
                            상세 내용 : {videoInfo.description} <br />
                            조회 수 : {videoInfo.viewCount} 회 <br />
                            댓글 수 : {videoInfo.commentCount} 개 <br />
                            좋아요 수 : {videoInfo.likeCount} 개 <br />
                            업로드 시간 : {videoInfo.upload} <br />
                        </div>
                    </div>
                    )
                }
                    
                )}
            </div>
        </div>
      </>
    );
}

export default VideoDropdown;