import React, { Fragment } from 'react';
import classNames from 'classnames/bind';
import styles from './SignUpPage.module.scss';
import { Navbar } from '../../Components/common';
import { UilEditAlt } from '@iconscout/react-unicons';
import { useHistory } from 'react-router';
import ROUTES from '../../constants/routes';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../store/modules';

const cx = classNames.bind(styles);

function SignUpPage() {
  const history = useHistory();
  const name = useSelector<ReducerType>((state) => state.user.name);

  const clickEventHandler = () => {
    history.push(`${ROUTES.SIGNUP.STEP2}`);
  };

  return (
    <Fragment>
      <Navbar />
      <div className={cx('wrapper')}>
        <div className={cx('rightContainer')}>
          <div className={cx('title')}>
            <div className={cx('pencilLogo')}>
              <UilEditAlt size="80" />
            </div>
            <div className={cx('titleText')}>EverReview</div>
          </div>

          <h1>로그인 완료!</h1>

          <p>안녕하세요, {`${name}`}님 !</p>

          <p>간단한 정보 입력을 통해 서비스 이용을 시작해보세요!</p>

          <button className={cx('btn')} onClick={clickEventHandler}>
            정보 입력하러 가기
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default SignUpPage;
