import React from 'react';
import { Route, Link } from 'react-router-dom';
import { AnimatedRoute } from 'react-router-transition';
import Feeds from '../core-components/Feeds';
import Users from '../core-components/Feeds';
import Profile from '../core-components/Profile';
const Header = () => {
    return (

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a className="logo logo-md">TweetX</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ml-auto">
                        <Link to="/feeds">
                            <li class="nav-item active">
                                <a class="nav-link">Feed <span class="sr-only">(current)</span></a>
                            </li>
                        </Link>
                        
                        <Link to="/users">
                            <li class="nav-item">
                                <a class="nav-link">Users</a>
                            </li>
                        </Link>

                        
                        <Link to="/profile">
                            <li class="nav-item">
                                <a class="nav-link">Profile</a>
                            </li>
                        </Link>
                        
                    </ul>
                </div>
            </div>

        </nav>
    )
}

export default Header;