import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchDropdown.module.scss';
import Select from 'react-select';
import { colourOptions } from '../searchMockData';
import VideoDropdown from './VideoDropdown';

const cx = classNames.bind(styles);

function SearchDropdown() {
  const [isOpen, setIsOpen] = useState(false);


  const handleClickStart = (e) => {
    console.log('hi')
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