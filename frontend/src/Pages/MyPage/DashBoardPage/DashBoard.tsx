import React from 'react';
import styles from './DashBoard.module.scss';
import classNames from 'classnames/bind';
import { Sidebar } from '../../../Components/common';
import SearchBar from '../../../Components/SearchBar/SearchBar/SearchBar.jsx';
import PieChartC from '../../../Components/PieChartC/PieChartC';
import BarChartC from '../../../Components/barChartC/barChartC';

const cx = classNames.bind(styles);

function DashBoard() {
  const name = "이성효";
  return (
    <div className={cx('dashBoardContainer')}>
      <Sidebar id={1} />
      <div className={cx('sideLine')}></div>
      <div className={cx('dashBoardWrap')}>
        <div className={cx('dashBoardWrapHeader')}>
          <div className={cx('dashBoardText')}>
            <div className={cx('dashBoardTitle')}>반갑습니다 {name}님!</div>
            <div className={cx('dashBoardDescription')}>댓글들을 분석하고 사용자들의 피드백을 확인해보세요!</div>
          </div>
          <div className={cx('dashBoardSearch')}>
            <SearchBar />
          </div>
        </div>
        <div></div>
        <div className={cx('dashBoardWrapMiddle')}>
          <div className={cx('dashBoardAllFeedback')}>
            <p>모든 피드백</p>
            <div className={cx('allBarChart')}>
              
            </div>
            </div>
          <div className={cx('dashBoardWrapMiddleBlank')}></div>
          <div className={cx('dashBoardUserNeeds')}>
            <p>사용자 요구 분석</p>
            <div className={cx('pieChart')}>
              piechart
            </div>
          </div>
          </div>
        <div className={cx('dashBoardWrapDown')}>
          <div className={cx('dashBoardWrapDownGrid')}>
            <div className={cx('dashBoardPosFeedback')}>
              <p>긍정 피드백</p>
              <div className={cx('negBarChart')}>
              
            </div>
            </div>
            <div className={cx('dashBoardWrapDownBlank')}>
              <div className={cx('BlankLine')}></div>
            </div>
            <div className={cx('dashBoardNegFeedback')}>
              <p>부정 피드백</p>
              <div className={cx('posBarChart')}>
              
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }
  
export default DashBoard;
