import React from 'react';

import { NavbarComponent } from './NavbarComponent';
import { LoginComponent } from './LoginComponent';
import { ExpensesComponent } from './ExpensesComponent';

export const MainComponent = () => (
    <LoginComponent>
        <NavbarComponent />
        <ul>
            <li>process.env.NODE_ENV: {process.env.NODE_ENV}</li>
            <li>process.env.CLIENT_ID: {process.env.CLIENT_ID}</li>
            <li>process.env.API_KEY: {process.env.API_KEY}</li>
        </ul>
        <div className="container is-fluid">
            <ExpensesComponent />
        </div>
    </LoginComponent>
)