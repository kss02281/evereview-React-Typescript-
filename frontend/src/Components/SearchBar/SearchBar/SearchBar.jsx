import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './SearchBar.module.scss';
import classNames from 'classnames/bind';
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown.jsx';
import SearchDropdown from '../SearchDropdown/SearchDropdown.jsx';
import CommentDropdown from '../CommentDropdown/CommentDropdown';
import { nowSelectedVideoList } from '../../../store/modules/selectedVideo';
import { nowDate } from '../../../store/modules/date';
import { nowCategory } from '../../../store/modules/category';


const cx = classNames.bind(styles);

function SearchBar() {
    const isVideoList = useSelector(nowSelectedVideoList)
    const isDate = useSelector(nowDate);
    const isCategorySelect = useSelector(nowCategory);

    const commentSubmit = () => {
        console.log(isDate)
        alert(`${isDate[0]} \n ${isDate[1]}`)
    }
    const videoSubmit = async () => {
        const selectedVideoArray = []
        for (let i = 0; i < isVideoList.selectedVideoList.length; i++) {
            if (isVideoList.selectedVideoList[i] === true) {
                selectedVideoArray.push(i)
            }
        }
        console.log(selectedVideoArray)
        alert(selectedVideoArray)
    }
    const handleClickOut = (e) => {
        console.log('out')
      };

    return (
        <>
            <div className={cx('searchBarContainer')}>
                <div className={cx('categoryDropdown')}>
                    <CategoryDropdown />
                    {isCategorySelect.category === '영상별 분석' ? <SearchDropdown className={cx('videoSearch')} onMouseOut={handleClickOut}/> : <CommentDropdown className={cx('commentSearch')} />}
                    {isCategorySelect.category === '영상별 분석' ? <div className={cx('submitButton')} onClick={videoSubmit}>적용하기</div> : <div className={cx('submitButton')} onClick={commentSubmit}>적용하기</div> }
                </div>
            </div>
        </>
    );
  }


export default SearchBar;
