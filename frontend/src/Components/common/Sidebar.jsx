import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import logo from '../../img/logo_transparent.png';
import { UilDashboard, UilChart, UilUserCircle, UilSetting, UilBell, UilReact, UilSignOutAlt, UilUserSquare } from '@iconscout/react-unicons'

const cx = classNames.bind(styles);

function Sidebar () {
    const [dashBoardColor, setDashBoardColor] = useState(false);
    const [contentsColor, setContentsColor] = useState(false);
    const [profileColor, setProfileColor] = useState(false);
    const [settingColor, setSettingColor] = useState(false);
    const [notificationColor, setNotificationColor] = useState(false);
    const [sideColor, setSideColor] = useState(false);
    const handleClick = (e) => {
        const targetClassName = e.target.className.baseVal
        console.log(targetClassName)
        if (sideColor === true){
            setSideColor(false);
        }
        else {
            setSideColor(true);
        }
      };

    return (
        <>
            <div className={cx('sideBarContainer')}>
                <div className={cx('sideLogo')}>
                    <UilReact className={cx('sideLogoImage')}/>
                </div>
                <div className={cx('sideIcon')}>
                    <UilDashboard className={cx('sideDashBoard')} style={sideColor ? {color:'#2f2f2f50'} : {color:'#6563FF'}} onClick={handleClick}/>
                    <UilChart className={cx('sideContents')} style={sideColor ? {color:'#2f2f2f50'} : {color:'#6563FF'}} onClick={handleClick}/>
                    <UilUserSquare className={cx('sideProfile')} style={sideColor ? {color:'#2f2f2f50'} : {color:'#6563FF'}} onClick={handleClick}/>
                    <UilSetting className={cx('sideSetting')} style={sideColor ? {color:'#2f2f2f50'} : {color:'#6563FF'}} onClick={handleClick}/>
                    <UilBell className={cx('sideNotification')} style={sideColor ? {color:'#2f2f2f50'} : {color:'#6563FF'}} onClick={handleClick}/>
                </div>
                <div className={cx('sideProfile')}>
                    <UilUserCircle className={cx('sideUser')}/>
                    <UilSignOutAlt className={cx('sideLogout')}/>
                </div>
            </div>
        </>
    );
  
}

export default Sidebar;
