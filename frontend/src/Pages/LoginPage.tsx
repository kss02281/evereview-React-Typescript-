import React, { Fragment } from 'react';
import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss';
import { Navbar } from '../Components/common';
import GoogleLogin from 'react-google-login';
import loginPageImg from '../img/loginPageImg.png';
import { UilEditAlt } from '@iconscout/react-unicons';
import { useHistory } from 'react-router';
import ROUTES from '../constants/routes';

import { useDispatch } from 'react-redux';
import { actions } from '../store/modules';

const cx = classNames.bind(styles);

function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const clientId: string = '437704144690-7heveppoq437luskbpavuf89rairq4ip.apps.googleusercontent.com' || '';
  const onLoginSuccess = (res: any) => {
    console.log(res);
    dispatch(actions.saveUser({ email: `${res.profileObj.email}`, name: `${res.profileObj.name}` }));
    history.push(`${ROUTES.SIGNUP.INDEX}`);
  };

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
            <span>
              {' '}
              <span> </span> EverReview
            </span>
          </div>
          <h1>로그인하기</h1>
          <p>
            Google 계정으로 Evereview의 모든 서비스를 간편하게 이용하실 수 있습니다.
            <br />
            로그인하여 댓글 분석 서비스를 이용해보세요!
            <br />
            <br />
            댓글을 통해 시청자의 니즈를 파악하고,
            <br />
            피드백을 수용하여 더 좋은 컨텐츠를 만들어보세요.
          </p>
          <div className={cx('loginBtn')}>
            <GoogleLogin
              clientId={clientId}
              buttonText="Sign In with Google"
              onSuccess={(result) => onLoginSuccess(result)}
              onFailure={(result) => console.log(result)}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default LoginPage;
