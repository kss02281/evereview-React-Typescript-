import { useState, forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './CommentDropdown.module.scss';
import DatePicker from "react-datepicker";
import moment from 'moment';


const cx = classNames.bind(styles);


function CommentDropdown() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  console.log(startDate.getFullYear())
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className={cx("datePick1")} onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  const CustomInput2 = forwardRef(({ value, onClick }, ref) => (
    <button className={cx("datePick2")} onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  const handleChangeStart = (e) => {
    setStartDate(e);
  };
  const handleClickStart = (e) => {
    e.preventDefault();
  };
  const handleChangeEnd = (e) => {
    setEndDate(e);
  };
  const handleClickEnd = (e) => {
    e.preventDefault();
  };

    return (
      <div className={cx("searchContainer")}>
        <div className={cx("menu-container")}>
          <div className={cx("commentSearchWrap")}>
            <div className={cx("commentSearchBar")} onClick={handleClickStart}>
              
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                customInput={<CustomInput />
              }
              />
            </div>
            <div className={cx("commentSearchBar")} onClick={handleClickEnd}>
            
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              customInput={<CustomInput2 />}
            />
            </div>
          </div>
        </div>
      </div>
    );
}

export default CommentDropdown;