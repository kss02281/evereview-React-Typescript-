import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
<<<<<<< HEAD
import { MainPage, LoginPage, NotFound } from './Pages';
=======
import { AboutPage, LoginPage, MainPage, NotFound } from './Pages';
>>>>>>> bc05af55516fdd865dea15f68e2e8e22514c0ad6
import { Navbar } from './Components/common';
import ROUTES from './constants/routes';

const Root: React.FC = () => (
  <BrowserRouter>
    <Switch>
<<<<<<< HEAD
      <Route exact path={ROUTES.MAIN} component={MainPage} />
      <Route path={ROUTES.LOGIN} component={LoginPage} />
      <Route path={ROUTES.NotFound} component={NotFound} />
      <Redirect path="*" to={ROUTES.NotFound} />
=======
      <Route exact path={ROUTES.HOME} component={MainPage} />
      <Route path={ROUTES.ABOUT} component={AboutPage} />
      <Route path={ROUTES.LOGIN} component={LoginPage} />
      <Route path={ROUTES.NOTFOUND} component={NotFound} />
      <Redirect path="*" to="/notFound" />
>>>>>>> bc05af55516fdd865dea15f68e2e8e22514c0ad6
    </Switch>
  </BrowserRouter>
);
export default Root;
