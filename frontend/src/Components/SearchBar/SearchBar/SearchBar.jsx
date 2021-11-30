import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './SearchBar.module.scss';
import classNames from 'classnames/bind';
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown.jsx';
import SearchDropdown from '../SearchDropdown/SearchDropdown.jsx';
import CommentDropdown from '../CommentDropdown/CommentDropdown';
import { nowSelectedVideoList } from '../../../store/modules/selectedVideo';
import { nowDate } from '../../../store/modules/date';

const cx = classNames.bind(styles);

function SearchBar() {
    const [categorySelect, setCategorySelect] = useState(true)
    const isVideoList = useSelector(nowSelectedVideoList)
    const isDate = useSelector(nowDate);

    const handleClick1 = () => {
        console.log(isDate)
    }
    const HandleClick2 = async () => {
        const selectedVideoArray = []
        for (let i = 0; i < isVideoList.selectedVideoList.length; i++) {
            if (isVideoList.selectedVideoList[i] === true) {
                selectedVideoArray.push(i)
            }
        }
        console.log(selectedVideoArray)
    }

    return (
        <>
            <div className={cx('searchBarContainer')}>
                <div className={cx('categoryDropdown')}>
                    <CategoryDropdown setCategorySelect={setCategorySelect} />
                    {categorySelect ? <SearchDropdown className={cx('videoSearch')} /> : <CommentDropdown className={cx('commentSearch')} />}
                    {categorySelect ? <div className={cx('submitButton')} onClick={HandleClick2}>적용하기</div> : <div className={cx('submitButton')} onClick={handleClick1}>적용하기</div> }
                </div>
            </div>
        </>
    );
  }


export default SearchBar;
