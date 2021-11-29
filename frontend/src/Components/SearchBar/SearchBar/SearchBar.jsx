import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import styles from './SearchBar.module.scss';
import classNames from 'classnames/bind';
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown.jsx';
import SearchDropdown from '../SearchDropdown/SearchDropdown.jsx';
import CommentDropdown from '../CommentDropdown/CommentDropdown';
import axios from 'axios';
import { nowSelectedVideoList } from '../../../store/modules/selectedVideo';

const cx = classNames.bind(styles);

function SearchBar() {
    const [categorySelect, setCategorySelect] = useState(true)
    const dispatch = useDispatch();
    const isVideoList = useSelector(nowSelectedVideoList)
    
    const handleClick1 = () => {
        console.log(categorySelect)
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
                    <div className={cx('submitButton')} onClick={HandleClick2}>적용하기</div>
                </div>
            </div>
        </>
    );
  }


export default SearchBar;
