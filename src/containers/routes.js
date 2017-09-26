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
    
    constructor(props) {
        super(props);
        this.state = {
            authed: false,
            loading: true
        };
    }

    componentDidMount() {
        authenticate(AuthController.getToken())
          .then(res => {
              this.setState({
                  authed: res.success,
                  loading: false
              });
          })
          .catch(err => {
              this.setState({
                  authed: false,
                  loading: false
              });
          });
    }

    render() {
        if(this.state.loading) return <p>Loading</p>;
        return (
          <Router history={history}>
            <Switch>
              <Route exact path='/signin' component={SignIn} />
              <PrivateRoute exact path='/' redirect='/signin' component={Wrapper} authed={this.state.authed || this.props.isSignedIn} />
            </Switch>
          </Router>
        );
    }
}

const mapState = ({ auth }) => ({
    isSignedIn: auth.isSuccess
});

export default connect(mapState)(Routes);