import React from 'react';

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { List } from 'phosphor-react';
import { InstagramLogo } from 'phosphor-react';
import { ShoppingCart } from 'phosphor-react';

import './navbar.css';
import logo2 from  '../../assets/logo/logo2.png';


const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false);

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    return (
        <nav className="navbar">
            <div className="container-nav">
                <div className="logo">
                    {/* Replace the h1 element with an image */}
                    <img src={logo2} alt="Logo" style={{ height: '50px', objectFit: 'contain' }} />
                </div>
                <div className="menu-icon" onClick={handleShowNavbar}>
                    <List size={40} color='black' />
                </div>
                <div className={`nav-elements ${showNavbar && 'active'}`}>
                    <ul>
                        <li>
                            <NavLink onClick={handleShowNavbar} to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={handleShowNavbar} to="/shop">Shop</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={handleShowNavbar} to="/contact">Contact</NavLink>
                        </li>
                        <li>
                            <NavLink onClick={handleShowNavbar} to="/cart">
                                <ShoppingCart size={30} color='black' />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={handleShowNavbar} to="https://www.instagram.com/shahneela_baloch?igsh=MXBtMHFlN2RoOTBtaw==" target="_blank" rel="noopener noreferrer">
                                <InstagramLogo size={30} color='black' />
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
