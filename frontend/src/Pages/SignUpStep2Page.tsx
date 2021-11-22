import React, { Fragment } from 'react';
import classNames from 'classnames/bind';
import styles from './SignUpStep2Page.module.scss';
import { Navbar } from '../Components/common';
import { UilEditAlt } from '@iconscout/react-unicons';

const cx = classNames.bind(styles);

function SignUpStep2Page() {
  return (
    <Fragment>
      <Navbar />
      <div className={cx('wrapper')}>
        <div className={cx('title')}>
          <UilEditAlt size="95" />
          <span>
            {' '}
            <span> </span>EverReview
          </span>
        </div>
        <h1>step2</h1>
      </div>
    </Fragment>
  );
}

export default SignUpStep2Page;
