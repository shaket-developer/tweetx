import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import { AnimatedRoute } from 'react-router-transition';
import Feeds from '../core-components/Feeds';
import Users from '../core-components/Feeds';
import Profile from '../core-components/Profile';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Container } from 'react-bootstrap';
const Header = () => {
    return (
        <Navbar collapseOnSelect bg="light" variant="light" expand="lg" className="shadow">
            <Container>
            <Navbar.Brand>TweetX</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavLink to="/feeds" className="nav-link" exact activeClassName="active">Feeds</NavLink>
                    <NavLink to="/users" className="nav-link" exact activeClassName="active">Users</NavLink>
                    <NavLink to="/profile" className="nav-link" exact activeClassName="active">Profile</NavLink>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;