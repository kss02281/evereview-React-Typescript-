import React, { Fragment, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SignUpStep2Page.module.scss';
import { Navbar } from '../Components/common';
import queryString from 'query-string';
import loginPageImg from '../img/loginPageImg.png';
import { UilEditAlt } from '@iconscout/react-unicons';
import { useHistory, useLocation } from 'react-router';
import ROUTES from '../constants/routes';

const cx = classNames.bind(styles);

function SignUpStep2Page() {
  const history = useHistory();

  return (
    <Fragment>
      <Navbar />
      <div className={cx('wrapper')}>
        <div className={cx('leftContainer')}>
          <img className={cx('leftImg')} src={loginPageImg} alt="" />
        </div>
        <div className={cx('rightContainer')}>
          <div className={cx('title')}>
            <UilEditAlt size="95" />
            <span>EverReview</span>
          </div>
          <h1>step2</h1>
        </div>
      </div>
    </Fragment>
  );
}

export default SignUpStep2Page;
