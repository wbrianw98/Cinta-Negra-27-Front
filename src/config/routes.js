import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Login } from '../components/Login';
import isAuthenticated from '../isAuthenticaded';

const Logout = () => {
    localStorage.removeItem("appToken");
    return <Redirect to="/login" />
}

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route  {...rest} render={
        (props) => (
            isAuthenticated() 
                ? <Component {...props} /> 
                : <Redirect to="/login" />
        )
    }>
    </Route>
)

export default [
    <Route exact path="/login" component={Login} />,
    <Route exact path="/logout" component={Logout} />
    // <Route exact path="/signup" component={SignUp} />,
    // <Route component={NoMatchComponent} />
]