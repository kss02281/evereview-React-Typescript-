import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';
import ROUTES from '../../constants/routes';

const cx = classNames.bind(styles);

class Navbar extends React.Component {
  render() {
    return (
      <Fragment>
        <Link className={cx('link')} to={ROUTES.MAIN}>
          this is main button
        </Link>
        <Link className={cx('link')} to={ROUTES.NotFound}>
          this is NOT FOUND
        </Link>
      </Fragment>
    );
  }
}

export default Navbar;
