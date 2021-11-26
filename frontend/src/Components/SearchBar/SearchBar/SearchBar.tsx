import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SearchBar.module.scss';
import classNames from 'classnames/bind';
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown.jsx';
import SearchDropdown from '../SearchDropdown/SearchDropdown.jsx';
import CommentDropdown from '../CommentDropdown/CommentDropdown';

const cx = classNames.bind(styles);

function SearchBar() {
    const [categorySelect, setCategorySelect] = useState(true)
    const handleClick1 = () => {
        console.log(categorySelect)
    }
    const handleClick2 = () => {
        alert('Apply!')
    }


    return (
        <>
            <div className={cx('searchBarContainer')}>
                <div className={cx('categoryDropdown')}>
                    <CategoryDropdown setCategorySelect={setCategorySelect} />
                    {categorySelect ? <SearchDropdown /> : <CommentDropdown />}
                    <div className={cx('submitButton')} onClick={handleClick2}>적용하기</div>
                </div>
            </div>
        </>
    );
  }


export default SearchBar;
