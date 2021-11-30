import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AboutPage, LoginPage, MainPage, NotFound, SignUpPage, DashBoard, Contents, Profile, Setting, Notification } from './Pages';
import ROUTES from './constants/routes';

const Root: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTES.HOME} component={MainPage} />
      <Route path={ROUTES.ABOUT} component={AboutPage} />
      <Route path={ROUTES.DASHBOARD} component={DashBoard} />
      <Route path={ROUTES.CONTENTS} component={Contents} />
      <Route path={ROUTES.PROFILE} component={Profile} />
      <Route path={ROUTES.SETTING} component={Setting} />
      <Route path={ROUTES.NOTIFICATION} component={Notification} />
      <Route path={ROUTES.LOGIN} component={LoginPage} />
      <Route path={ROUTES.SIGNUP} component={SignUpPage} />
      <Route path={ROUTES.NOTFOUND} component={NotFound} />
      <Redirect path="*" to="/notFound" />
    </Switch>
  </BrowserRouter>
);
export default Root;
