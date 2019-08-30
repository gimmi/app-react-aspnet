import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';

import { ContextInfoComponent } from './ContextInfoComponent';


function Index() {
    const ary = [];
    for (let i = 0; i < 100; i++) {
        ary.push(<p key={i}>This is paragraph #{i}</p>)
    }
    return (
        <div>
            <ContextInfoComponent />
            <div className="container is-fluid">{ary}</div>
        </div>
    )
}

function About() {
    return <h1>This is the About page</h1>
}

function Users() {
    return <h1>This is the Users page</h1>
}

export function MainComponent() {
    const ary = [];
    for (let i = 0; i < 100; i++) {
        ary.push(<p key={i}>This is paragraph #{i}</p>)
    }

    return (
        <Router>
            <div>
                <nav className="navbar is-primary">
                    <div className="navbar-brand">
                        <Link to="/" className="navbar-item">
                            <img src="https://bulma.io/images/bulma-logo.png" />
                        </Link>
                    </div>
                    <div className="navbar-menu is-active">
                        <div className="navbar-start">
                            <NavLink to="/about/" className="navbar-item" activeClassName="is-active">About</NavLink>
                            <NavLink to="/users/" className="navbar-item" activeClassName="is-active">Users</NavLink>
                        </div>
                    </div>
                </nav>

                <Route path="/" exact component={Index} />
                <Route path="/about/" component={About} />
                <Route path="/users/" component={Users} />
            </div>
        </Router>
    );
}
