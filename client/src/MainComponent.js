import React from 'react';

import { NavbarComponent } from './NavbarComponent';
import { ContextInfoComponent } from './ContextInfoComponent';

export const MainComponent = () => {
    const ary = [];
    for (let i = 0; i < 100; i++) {
        ary.push(<p key={i}>This is paragraph #{i}</p>)
    }
    return (
        <div>
            <NavbarComponent />
            <ContextInfoComponent />
            <div className="container is-fluid">{ary}</div>
        </div>
    )
};
