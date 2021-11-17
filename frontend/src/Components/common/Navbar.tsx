import React, { Fragment } from 'react';
import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Navbar extends React.Component {
  render() {
    return (
      <Fragment>
        <h1 className={cx('navBar')}>Navbar</h1>
      </Fragment>
    );
  }
}

export default Navbar;
