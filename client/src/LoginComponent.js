import React from 'react';

import { gapiAsync } from './gapi';

export class LoginComponent extends React.Component {
    constructor() {
        super()

        this.updateSigninStatus = this.updateSigninStatus.bind(this)

        this.state = { isSignedIn: false }
    }

    componentDidMount() {
        gapiAsync().then(gapi => {
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
            this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        })
    }

    updateSigninStatus(isSignedIn) {
        this.setState({ isSignedIn })
        if (!isSignedIn) {
            gapiAsync().then(gapi => {
                gapi.auth2.getAuthInstance().signIn();
            })
        }
    }

    render() {
        if (this.state.isSignedIn) {
            return this.props.children
        }
        return (
            <div className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <p className="title">Authenticating with Google...</p>
                        <p className="subtitle">(ensure popup are enabled for this site)</p>
                    </div>
                </div>
            </div>
        )
    }
}