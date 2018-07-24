import React from 'react';

import { NavbarComponent } from './NavbarComponent';

export const MainComponent = () => {
    const ary = [];
    for (let i = 0; i < 100; i++) {
        ary.push(<p key={i}>This is paragraph #{i}</p>)
    }
    return (
        <div>
            <NavbarComponent />
            <div className="container is-fluid">{ary}</div>
        </div>
    )
};