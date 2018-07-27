import React from 'react';

import { initGapi } from './gapi';

export class LoginComponent extends React.Component {
    constructor() {
        super()

        this.updateSigninStatus = this.updateSigninStatus.bind(this)
        this.signIn = this.signIn.bind(this)

        this.state = { isSignedIn: false }
    }

    componentDidMount() {
        initGapi().then(gapi => {
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
            this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        })
    }

    updateSigninStatus(isSignedIn) {
        this.setState({ isSignedIn })
    }

    signIn() {
        initGapi().then(gapi => {
            gapi.auth2.getAuthInstance().signIn();
        })
    }

    render() {
        if (this.state.isSignedIn) {
            return this.props.children
        }
        return (
            <div className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <p className="title">Please sign in with Google to continue</p>
                        <button className="button is-primary is-large" onClick={this.signIn}>Sign In</button>
                    </div>
                </div>
            </div>
        )
    }
}