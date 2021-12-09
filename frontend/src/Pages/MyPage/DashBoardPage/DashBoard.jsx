import styles from './DashBoard.module.scss';
import classNames from 'classnames/bind';
import { Sidebar } from '../../../Components/common';
import SearchBar from '../../../Components/SearchBar/SearchBar/SearchBar.jsx';
import { useSelector } from "react-redux";
import { nowCategory } from '../../../store/modules/category';
import DashBoardVideo from './DashBoardVideo';
import DashBoardComment from './DashBoardComment';

const cx = classNames.bind(styles);

function DashBoard() {
  const isCategorySelect = useSelector(nowCategory);
  console.log(isCategorySelect)
  const name = useSelector((state) => state.user.nickName);

  console.log(isCategorySelect.category)
  return (
    
    <div className={cx('dashBoardContainer')}>
      <Sidebar id={1} />
      <div className={cx("sideLine")}></div>
      <div className={cx("dashBoardWrap")}>
        <div className={cx("dashBoardWrapHeader")}>
          <div className={cx("dashBoardText")}>
            <div className={cx("dashBoardTitle")}>반갑습니다 {name}님!</div>
            <div className={cx("dashBoardDescription")}>댓글들을 분석하고 사용자들의 피드백을 확인해보세요!</div>
          </div>
          <div className={cx("dashBoardSearch")}>
            <SearchBar data={1} />
          </div>
        </div>
        <div></div>
      { isCategorySelect.category === '영상별 분석' ? <DashBoardVideo /> : <DashBoardComment /> }
      </div>
    </div>
  );
}

export default DashBoard;
