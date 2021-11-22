import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';
import logo from '../../img/logo_transparent.png';

const cx = classNames.bind(styles);

class Navbar extends React.Component {
  render() {
    return (
      <div className={cx('header')}>
        <Link className={cx('logo')} to={ROUTES.HOME}>
          <img style={{ width: 'auto', height: '6vh' }} src={logo} alt="logo" />
        </Link>
        <div className={cx('linkWrapper')}>
          <Link className={cx('link')} to={ROUTES.HOME}>
            Home
          </Link>
          <Link className={cx('link')} to={ROUTES.ABOUT}>
            About
          </Link>
          <Link className={cx('link')} to={ROUTES.LOGIN}>
            Login
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
