import {Router, Route} from 'react-router';
import React from 'react'
import App from './app';
import EnsureSignedInContainer from './ensure-signedin-container';
import Wrapper from './wrapper';
import SignInContainer from './signin/signin';

export default (props) => (
  <Router {...props}>
    <Route path='login' component={SignInContainer} />
    <Route path='/' component={EnsureSignedInContainer} >
      <Route path='main' component={Wrapper} />
    </Route>
  </Router>
)