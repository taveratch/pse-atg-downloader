import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { AuthController } from 'src/controllers';

class PrivateRoute extends React.Component {

    render() {
        if(this.props.authed)
            return <Route {...this.props} />;
        else 
            return <Redirect to={{ pathname: '/signin' }} />;
    }
}

export default PrivateRoute;