import React from 'react';

export const NavbarComponent = () => (
    <nav className="navbar is-primary is-fixed-top">
        <div className="navbar-brand">
            <a className="navbar-item">
                <img src="https://bulma.io/images/bulma-logo.png" />
            </a>
        </div>
        <div className="navbar-menu is-active">
            <div className="navbar-start">
                <a className="navbar-item">Home</a>
            </div>
        </div>
    </nav>
);