import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Login } from '../components/Login';
import { Movie, MovieDetail } from '../components/Movies';
import { UserDetail } from '../components/Users';
import isAuthenticated from '../isAuthenticaded';
import signup from '../components/signup'

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
    <Route exact path="/logout" component={Logout} />,
    <Route exact path="/signup" component={signup} />,
    // <Route component={NoMatchComponent} />
    <PrivateRoute exact path="/" component={Movie}/>,
    <PrivateRoute exact path="/movies/:id" component={MovieDetail}/>,
    <PrivateRoute exact path="/users/:id" component={UserDetail}/>
]