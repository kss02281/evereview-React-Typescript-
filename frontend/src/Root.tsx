import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { AboutPage, MainPage, NotFound, OverviewPage, LoginPage, SignUpPage } from "./Pages";
import ROUTES from "./constants/routes";

const Root: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTES.HOME} component={MainPage} />
      <Route path={ROUTES.ABOUT} component={AboutPage} />
      <Route path={ROUTES.OVERVIEW} component={OverviewPage} />
      <Route path={ROUTES.LOGIN} component={LoginPage} />
      <Route path={ROUTES.SIGNUP} component={SignUpPage} />
      <Route path={ROUTES.NOTFOUND} component={NotFound} />
      <Redirect path="*" to="/notFound" />
    </Switch>
  </BrowserRouter>
);
export default Root;
