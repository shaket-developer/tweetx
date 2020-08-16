import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../core-components/Login';
import CreateAccount from '../core-components/CreateAccount';
import Users from '../core-components/Users';
import Feeds from '../core-components/Feeds';
import Profile from '../core-components/Profile';
import { AnimatedSwitch } from 'react-router-transition';
import ApiCall from '../integration/ApiCall';

const RoutePath = () => {
    return (
        <Router>
            <Route path="/login" component={Login} ></Route>
            <Route path="/create-account" component={CreateAccount} ></Route>
            <Route path="/users" component={Users} ></Route>
            <Route path="/feeds" component={Feeds} ></Route>
            <Route path="/profile" component={Profile} ></Route>
            <Route path="/apicall" component={ApiCall} ></Route>
        </Router>
    )
}

export default RoutePath;