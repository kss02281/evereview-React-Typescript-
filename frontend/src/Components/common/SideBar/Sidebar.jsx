import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../../constants/routes';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';

import {
  UilDashboard,
  UilChart,
  UilUserCircle,
  UilSetting,
  UilBell,
  UilReact,
  UilSignOutAlt,
  UilUserSquare,
} from '@iconscout/react-unicons';

const cx = classNames.bind(styles);

function Sidebar() {
  const [dashBoardColor, setDashBoardColor] = useState(false);
  const [contentsColor, setContentsColor] = useState(true);
  const [profileColor, setProfileColor] = useState(true);
  const [settingColor, setSettingColor] = useState(true);
  const [notificationColor, setNotificationColor] = useState(true);
  function sideColorClick(e) {
    console.log(e.currentTarget.id);
    const colorId = e.currentTarget.id;
    setDashBoardColor(true);
    setContentsColor(true);
    setProfileColor(true);
    setSettingColor(true);
    setNotificationColor(true);
    if (colorId === '1') {
      setDashBoardColor(false);
    } else if (colorId === '2') {
      setContentsColor(false);
    } else if (colorId === '3') {
      setProfileColor(false);
    } else if (colorId === '4') {
      setSettingColor(false);
    } else if (colorId === '5') {
      setNotificationColor(false);
    }
  }
  return (
    <>
      <div className={cx('sideBarContainer')}>
        <div className={cx('sideLogo')}>
          <Link className={cx('logo')} to={ROUTES.HOME}>
            <UilReact className={cx('sideLogoImage')} />
          </Link>
        </div>
        <div className={cx('sideIcon')}>
          <UilDashboard
            className={cx('sideDashBoard')}
            id={1}
            style={dashBoardColor ? { color: '#2f2f2f50' } : { color: '#6563FF' }}
            onClick={sideColorClick}
          />
          <UilChart
            className={cx('sideContents')}
            id={2}
            style={contentsColor ? { color: '#2f2f2f50' } : { color: '#6563FF' }}
            onClick={sideColorClick}
          />
          <UilUserSquare
            className={cx('sideProfile')}
            id={3}
            style={profileColor ? { color: '#2f2f2f50' } : { color: '#6563FF' }}
            onClick={sideColorClick}
          />
          <UilSetting
            className={cx('sideSetting')}
            id={4}
            style={settingColor ? { color: '#2f2f2f50' } : { color: '#6563FF' }}
            onClick={sideColorClick}
          />
          <UilBell
            className={cx('sideNotification')}
            id={5}
            style={notificationColor ? { color: '#2f2f2f50' } : { color: '#6563FF' }}
            onClick={sideColorClick}
          />
        </div>
        <div className={cx('sideProfile')}>
          <UilUserCircle className={cx('sideUser')} />
          <UilSignOutAlt className={cx('sideLogout')} />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
