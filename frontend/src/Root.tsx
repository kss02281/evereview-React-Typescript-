import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { MainPage, NotFound } from './Pages/index.';
import { Navbar } from './Components/common';

const Root: React.FC = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/notFound/" component={NotFound} />
      <Redirect path="*" to="/notFound" />
    </Switch>
  </BrowserRouter>
);
export default Root;
