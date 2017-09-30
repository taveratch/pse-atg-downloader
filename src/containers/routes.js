import { Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import EnsureSignedInContainer from 'src/containers/ensure-signedin-container';
import Wrapper from 'src/containers/app/Wrapper';
import SignIn from 'src/containers/signin/SignIn';
import PrivateRoute from 'src/containers/PrivateRoute';
import history from 'src/containers/history';
import { connect } from 'react-redux';
import { authenticate } from 'src/services/auth';
import { AuthController } from 'src/controllers';
import AdminRoutes from 'src/containers/admin/routes';


class Routes extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={Wrapper} />
                </Switch>
            </Router>
        );
    }
}
export default Routes;