import React from 'react';
import { Link } from 'react-router-dom'; 
import { Menu, Button } from 'semantic-ui-react';

const NavBar = ({currentUser, logout}) => {
        const menuItems = (
            <div className="menu-items">
                <Link to='/profile'>{currentUser.username}</Link>
                <Link to='/groups'>Groups</Link>
                <Link to='/all'>All</Link>
                <Button onClick={logout} color='red'>Log Out</Button>
            </div>
        );

        return(
            <div className="app-header">
                <Menu children={menuItems} pointing="true"></Menu>
            </div>
        );

};

export default NavBar; 