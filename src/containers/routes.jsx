import { Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import App from './app';
import EnsureSignedInContainer from './ensure-signedin-container';
import Wrapper from './wrapper';
import SignIn from './signin/SignIn';
import history from './history';

export default (props) => (
  <Router history={history}>
    <Switch>
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/' component={SignIn} />
    </Switch>
    <Route path='login' component={SignInContainer} />
    <Route path='/' component={EnsureSignedInContainer} >
      <Route path='main' component={Wrapper} />
    </Route>
  </Router>
);