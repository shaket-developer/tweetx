import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import { AnimatedRoute } from 'react-router-transition';
import Feeds from '../core-components/Feeds';
import Users from '../core-components/Feeds';
import Profile from '../core-components/Profile';
const Header = () => {
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
            <div className="container">
                <a className="logo logo-md">TweetX</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <NavLink to="/feeds" exact activeClassName="active">
                            <li className="nav-item">
                                <a className="nav-link">Feed <span className="sr-only">(current)</span></a>
                            </li>
                        </NavLink>
                        
                        <NavLink to="/users" exact activeClassName="active">
                            <li className="nav-item">
                                <a className="nav-link">Users</a>
                            </li>
                        </NavLink>

                        
                        <NavLink to="/profile" exact activeClassName="active">
                            <li className="nav-item">
                                <a className="nav-link">Profile</a>
                            </li>
                        </NavLink>
                        
                    </ul>
                </div>
            </div>

        </nav>
    )
}

export default Header;