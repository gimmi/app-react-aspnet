import React from 'react';

import { NavbarComponent } from './NavbarComponent';
import { LoginComponent } from './LoginComponent';

export const MainComponent = () => {
    const ary = [];
    for (let i = 0; i < 10; i++) {
        ary.push(<p key={i}>This is paragraph #{i}</p>)
    }
    return (
        <LoginComponent>
            <NavbarComponent />
            <ul>
                <li>process.env.NODE_ENV: {process.env.NODE_ENV}</li>
                <li>process.env.CLIENT_ID: {process.env.CLIENT_ID}</li>
                <li>process.env.API_KEY: {process.env.API_KEY}</li>
            </ul>
            <div className="container is-fluid">{ary}</div>
        </LoginComponent>
    )
};