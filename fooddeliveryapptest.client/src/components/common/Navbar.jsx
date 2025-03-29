import React, { useState } from 'react';
import './Navbar.css';
import { assets } from './../../assets/assets';
import Login from '../Auth/Login';
import Register from '../Auth/Register';

const Navbar = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className='navbar'>
            <a href='/'>
                <img src={assets.logo} alt="" className='logo' />
            </a>

            {/* Hamburger Icon for Mobile */}
            <div className="hamburger" onClick={toggleMobileMenu}>
                <img src={assets.food_31} alt="Menu" className="hamburger-icon" />
            </div>

            {/* Navbar Menu */}
            <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <a href='/' className='active'>Home</a>
                <a href='#explore-menu'>Menu</a>
                <a href='#app-download'>Mobile App</a>
                <a href='#footer'>Contact Us</a>
            </ul>

            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <a href='/cart'>
                        <img src={assets.basket_icon} alt="" />
                    </a>
                    <div className='dot'></div>
                </div>
                <button onClick={() => setShowLogin(true)}>Sign In</button>
                <button onClick={() => setShowRegister(true)}>Register</button>
            </div>

            {/* Show Login/Register Modal */}
            {showLogin && <Login closeModal={() => setShowLogin(false)} />}
            {showRegister && <Register closeModal={() => setShowRegister(false)} />}
        </div>
    );
};

export default Navbar;