import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../core-components/Login';
import CreateAccount from '../core-components/CreateAccount';
import Users from '../core-components/Users';
import Feeds from '../core-components/Feeds';
import Profile from '../core-components/Profile';
import { AnimatedSwitch } from 'react-router-transition';

const RoutePath = () => {
    return (
        <Router>
            <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper"
            >
                <Route path="/login" component={Login} ></Route>
                <Route path="/create-account" component={CreateAccount} ></Route>
                <Route path="/users" component={Users} ></Route>
                <Route path="/feeds" component={Feeds} ></Route>
                <Route path="/profile" component={Profile} ></Route>
            </AnimatedSwitch>
        </Router>
    )
}

export default RoutePath;