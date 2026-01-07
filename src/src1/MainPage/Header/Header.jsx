import React, { useState } from 'react';
import './HeaderStyle.css';
import HeaderLinks from '../../Components/HeaderLinks.jsx';

function Header({ isMembers = false , style = { background: "rgba(242, 240, 234, 0.218)" }}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="hed">
            <header className="header" id="header" style = {style}>
                <nav className="navbar">
                    <div className="container">
                        <div className="nav-brand">
                            <div className="logo-container">
                                <img
                                    src="/logo.png"
                                    alt="Sengunthar in Business Logo"
                                    className="logo-image"
                                />
                            </div>
                            <div className="brand-info">
                                <span className="brand-text">Sengunthar in Business</span>
                                <span className="brand-location">Erode</span>
                            </div>
                        </div>

                        <div className="nav-menu desktop-menu">
                            <HeaderLinks classname={"nav-link"} ismembers={isMembers} />
                        </div>

                        <div className="burger-menu" onClick={toggleMenu}>
                            <span className={`burger-line ${isMenuOpen ? 'active' : ''}`}></span>
                            <span className={`burger-line ${isMenuOpen ? 'active' : ''}`}></span>
                            <span className={`burger-line ${isMenuOpen ? 'active' : ''}`}></span>
                        </div>

                        <div className={`mobile-dropdown ${isMenuOpen ? 'open' : ''}`}>
                            <HeaderLinks onClick={toggleMenu} classname={"mobile-nav-link"} ismembers={isMembers} />
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Header;
