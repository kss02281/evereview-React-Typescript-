import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { MainPage, LoginPage, NotFound } from './Pages';
import { Navbar } from './Components/common';
import ROUTES from './constants/routes';

const Root: React.FC = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path={ROUTES.MAIN} component={MainPage} />
      <Route path={ROUTES.LOGIN} component={LoginPage} />
      <Route path={ROUTES.NotFound} component={NotFound} />
      <Redirect path="*" to={ROUTES.NotFound} />
    </Switch>
  </BrowserRouter>
);
export default Root;
