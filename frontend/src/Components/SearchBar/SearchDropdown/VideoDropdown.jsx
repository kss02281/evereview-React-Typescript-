import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchDropdown.module.scss';
import Select from 'react-select';
import { colourOptions } from '../searchMockData';
import { UilTimes } from '@iconscout/react-unicons';
import data from './searchMockData.json';
const cx = classNames.bind(styles);

function VideoDropdown(activeTab = "") {
  const [isSelected, setIsSelected] = useState({});
  const selectedMap = new Map(Object.entries(isSelected));
  const handleBtn = (btnId) => (e) => {
    e.preventDefault();
    setIsSelected((state) => ({
      ...state,
      [btnId]: !state[btnId]
    }));
  };

  const handleClickClose = (btnId) => (e) => {
    e.preventDefault();
    setIsSelected((state) => ({
      ...state,
      [btnId]: false
    }));
  };

  const handleClickCloseAll = () => {
    console.log('hi')
    Object.keys(isSelected).map((keyName, i) => (
        setIsSelected(isSelected[keyName] = false)
    ))

  };

    return (
      <>
        <div className={cx("videoContainer")}>
            <div className={cx("deleteAll")} onClick={handleClickCloseAll}>X</div>
            <div className={cx("videoHeader")}>
            {Object.keys(isSelected).map((keyName, i) => (
                    isSelected[keyName] ? <div className={cx('videoHeaderBox')}  onClick={handleClickClose(i)} key={i}>{data.data[i]['title'].substr(0,10)}<span>x</span> </div> : null
                ))}
            </div>
            <div className={cx("videoItems")}>
                {data.data.map((videoInfo, i) => {
                    return (
                        <div 
                        className={cx(`videoItem_${isSelected[i]}`)} 
                        id='videoItem' 
                        onClick={handleBtn(i)} 
                        style={{ backgroundColor: isSelected[i] ? "#D0E9FF" : "#ffffff" }}
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