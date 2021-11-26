import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CommentDropdown.module.scss';
import DatePicker from "react-datepicker";
import moment from 'moment';


const cx = classNames.bind(styles);


function CommentDropdown() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  const handleChangeStart = (e) => {
    setIsStartOpen(!isStartOpen);
    setStartDate(e);
  };
  const handleClickStart = (e) => {
    e.preventDefault();
    setIsStartOpen(!isStartOpen);
  };
  const handleChangeEnd = (e) => {
    setIsEndOpen(!isEndOpen);
    setEndDate(e);
  };
  const handleClickEnd = (e) => {
    e.preventDefault();
    setIsEndOpen(!isEndOpen);
  };

    return (
      <div className={cx("searchContainer")}>
        <div className={cx("menu-container")}>
          <div className={cx("commentSearchWrap")}>
            <div className={cx("commentSearchBar")} onClick={handleClickStart}>
              {moment(startDate, "YYYY.MM.DD").format("YYYY-MM-DD")}
              {isStartOpen && (
                <DatePicker selected={startDate} onChange={handleChangeStart} inline />
              )}
            </div>
            <div className={cx("commentSearchBar")} onClick={handleClickEnd}>
            {moment(endDate, "YYYY.MM.DD").format("YYYY-MM-DD")}
              {isEndOpen && (
                <DatePicker selected={endDate} onChange={handleChangeEnd} inline />
              )}
            </div>
          </div>
        </div>
      </div>
    );
}

export default CommentDropdown;