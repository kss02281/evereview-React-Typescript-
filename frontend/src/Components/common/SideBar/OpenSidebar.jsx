import React, { Fragment } from 'react';
import styles from './OpenSidebar.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import ROUTES from '../../../constants/routes';

const cx = classNames.bind(styles);

function OpenSideBar(props) {
    console.log(props.isActive)
    const isActive = props.isActive
    const colorId = props.id
    
    const grey = '#2f2f2f50';
    const blue = '#6563FF';
    if (isActive === true) {
        return (
            <Fragment>
              <div className={cx('openSideBar')}>
                <div className={cx('openDashboard')}>
                    <Link to={ROUTES.DASHBOARD} style={props.id === 1 ? {color:blue} : {color:grey}}>
                    대쉬보드
                    </Link>
                </div>
                <div className={cx('openContents')}>
                    <div className={cx('openContent')}>
                        <Link to={ROUTES.CONTENTS} style={props.id === 2 ? {color:blue} : {color:grey}}>
                        컨텐츠
                        </Link>
                    </div>
                    <div className={cx('AllFeedback')}>
                        <Link className={cx('openFeedback')} to={ROUTES.CONTENTS} style={{color:grey}}>
                        모든 피드백
                        </Link>
                    </div>
                    <div className={cx('PosFeedback')} style={{color:grey}}>
                        <Link className={cx('openFeedback')} to={ROUTES.CONTENTS} style={{color:grey}}>
                        긍정 피드백
                        </Link>
                    </div>
                    <div className={cx('NegFeedback')} style={{color:grey}}>
                        <Link className={cx('openFeedback')} to={ROUTES.CONTENTS} style={{color:grey}}>
                        부정 피드백
                        </Link>
                    </div>
                </div>
                <div className={cx('openProfile')}>
                    <Link to={ROUTES.PROFILE} style={props.id === 3 ? {color:blue} : {color:grey}}>
                    사용자 프로필
                    </Link>
                </div>
                <div className={cx('openSetting')}>
                    <Link to={ROUTES.SETTING} style={props.id === 4 ? {color:blue} : {color:grey}}>
                    환경설정
                    </Link>
                </div>
                <div className={cx('openNotification')}>
                    <Link to={ROUTES.NOTIFICATION} style={props.id === 5 ? {color:blue} : {color:grey}}>
                    알림
                    </Link>
                </div>
              </div>
            </Fragment>
          );
    }
    else if (isActive === false){
    return (
        <Fragment>
            <div className={cx('closeSideBar')}>
            <div className={cx('openDashboard')}>
                    <Link to={ROUTES.DASHBOARD} style={props.id === 1 ? {color:blue} : {color:grey}}>
                    대쉬보드
                    </Link>
                </div>
                <div className={cx('openContents')}>
                    <div className={cx('openContent')}>
                        <Link to={ROUTES.CONTENTS} style={props.id === 2 ? {color:blue} : {color:grey}}>
                        컨텐츠
                        </Link>
                    </div>
                    <div className={cx('AllFeedback')}>
                        <Link className={cx('openFeedback')} to={ROUTES.CONTENTS} style={{color:grey}}>
                        모든 피드백
                        </Link>
                    </div>
                    <div className={cx('PosFeedback')} style={{color:grey}}>
                        <Link className={cx('openFeedback')} to={ROUTES.CONTENTS} style={{color:grey}}>
                        긍정 피드백
                        </Link>
                    </div>
                    <div className={cx('NegFeedback')} style={{color:grey}}>
                        <Link className={cx('openFeedback')} to={ROUTES.CONTENTS} style={{color:grey}}>
                        부정 피드백
                        </Link>
                    </div>
                </div>
                <div className={cx('openProfile')}>
                    <Link to={ROUTES.PROFILE} style={props.id === 3 ? {color:blue} : {color:grey}}>
                    사용자 프로필
                    </Link>
                </div>
                <div className={cx('openSetting')}>
                    <Link to={ROUTES.SETTING} style={props.id === 4 ? {color:blue} : {color:grey}}>
                    환경설정
                    </Link>
                </div>
                <div className={cx('openNotification')}>
                    <Link to={ROUTES.NOTIFICATION} style={props.id === 5 ? {color:blue} : {color:grey}}>
                    알림
                    </Link>
                </div>
            </div>
        </Fragment>
      );
    }
}

export default OpenSideBar;
