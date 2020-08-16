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
                    <NavLink to="/feeds" exact activeClassName="active"><Nav.Link>Feeds</Nav.Link></NavLink>
                    <NavLink to="/users" exact activeClassName="active"><Nav.Link>Users</Nav.Link></NavLink>
                    <NavLink to="/profile" exact activeClassName="active"><Nav.Link>Profile</Nav.Link></NavLink>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;