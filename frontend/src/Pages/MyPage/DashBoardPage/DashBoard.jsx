import styles from './DashBoard.module.scss';
import classNames from 'classnames/bind';
import { Sidebar } from '../../../Components/common';
import SearchBar from '../../../Components/SearchBar/SearchBar/SearchBar.jsx';
import { useDispatch, useSelector } from "react-redux";
import { nowCategory } from '../../../store/modules/category';
import DashBoardVideo from './DashBoardVideo';
import DashBoardComment from './DashBoardComment';

const cx = classNames.bind(styles);

function DashBoard() {
  const isCategorySelect = useSelector(nowCategory);
  console.log(isCategorySelect)
  const name = useSelector((state) => state.user.nickName);

  const thisData = [
    {
      id: 1,
      name: "소리가 너무 커요",
      댓글수: 300,
      좋아요수: 240,
      box: 10,
    },
    {
      id: 2,
      name: "자막 틀렸어요",
      댓글수: 400,
      좋아요수: 138,
      box: 10,
    },
    {
      id: 3,
      name: "진짜 맛있어 보이네요",
      댓글수: 200,
      좋아요수: 98,
      box: 10,
    },
    {
      id: 4,
      name: "먹방 잘 찍으시네요",
      댓글수: 278,
      좋아요수: 98,
      box: 10,
    },
    {
      id: 5,
      name: "치킨먹어주세요",
      댓글수: 189,
      좋아요수: 80,
      box: 10,
    },
    {
      id: 6,
      name: "자세한 설명 굿",
      댓글수: 239,
      좋아요수: 180,
      box: 10,
    },
    {
      id: 7,
      name: "구독 누르고 갑니다",
      댓글수: 349,
      좋아요수: 230,
      box: 10,
    },
    {
      id: 8,
      name: "진짜 웃기다",
      댓글수: 189,
      좋아요수: 80,
      box: 10,
    },
    {
      id: 9,
      name: "화질 너무 구려요",
      댓글수: 239,
      좋아요수: 138,
      box: 10,
    },
    {
      id: 10,
      name: "음질이 너무 안좋아요",
      댓글수: 349,
      좋아요수: 243,
      box: 10,
    },
  ];

  const gameData = [
    { name: "배틀그라운드", value: 600 },
    { name: "리그오브레전드", value: 500 },
    { name: "카트라이더", value: 40 },
    { name: "오버워치", value: 40 },
    { name: "리니지", value: 200 },
    { name: "서든어택", value: 120 },
    { name: "로스트아크", value: 120 },
    { name: "피파 온라인", value: 80 },
    { name: "메이플스토리", value: 150 },
    { name: "스타크래프트", value: 100 },
  ];
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
