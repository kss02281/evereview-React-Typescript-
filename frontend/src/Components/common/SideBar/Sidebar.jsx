import { useState } from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../../constants/routes';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import OpenSideBar from './OpenSidebar';
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

function Sidebar (props) {
    const grey = '#2f2f2f50';
    const blue = '#6563FF';
    const [isActive, setActive] = useState(false);
    const logOut = () => {
        alert('logout');
    }
    const handleToggle = () => {
        setActive(!isActive);
    }
    return (
        <>
            <div className={cx('sideBarContainer')}>
                <div className={cx('sideLogo')}>
                    <Link className={cx('logo')} to={ROUTES.HOME}> 
                        <UilReact className={cx('sideLogoImage')}/>
                    </Link>
                </div>
                <div className={cx('sideIcon')}>
                    <Link className={cx('logo')} to={ROUTES.DASHBOARD}> 
                        <UilDashboard className={cx('sideDashBoard')} style={props.id === 1 ? {color:blue} : {color:grey}}/>
                    </Link>
                    <Link className={cx('logo')} to={ROUTES.CONTENTS}>     
                        <UilChart className={cx('sideContents')} style={props.id === 2 ? {color:blue} : {color:grey}}/>
                    </Link>
                    <Link className={cx('logo')} to={ROUTES.PROFILE}> 
                        <UilUserSquare className={cx('sideProfile')} style={props.id === 3 ? {color:blue} : {color:grey}}/>
                    </Link>
                    <Link className={cx('logo')} to={ROUTES.SETTING}> 
                        <UilSetting className={cx('sideSetting')} style={props.id === 4 ? {color:blue} : {color:grey}}/>
                    </Link>
                    <Link className={cx('logo')} to={ROUTES.NOTIFICATION}> 
                        <UilBell className={cx('sideNotification')} style={props.id === 5 ? {color:blue} : {color:grey}}/>
                    </Link>
                </div>
                <div className={cx('sideProfile')}>
                    <UilUserCircle className={cx('sideUser')} onClick={handleToggle}/>
                    <Link className={cx('logo')} to={ROUTES.HOME} onClick={logOut}>
                        <UilSignOutAlt className={cx('sideLogout')}/>
                    </Link>
                </div>
            </div>
            <OpenSideBar isActive={isActive} id={props.id} />
        </>
    );
  
}

export default Sidebar;
