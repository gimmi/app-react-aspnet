import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link as RouterLink
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import { ContextInfoComponent } from './ContextInfoComponent';

const useStyles = makeStyles(theme => ({
    navLink: {
        marginRight: theme.spacing(1)
    }
}));

function Index() {
    return (
        <div>
            <h1>This is the Index page</h1>
            <ContextInfoComponent />
            <Button variant="contained" color="primary">Hello World</Button>
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
    const classes = useStyles();

    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        <Link color="inherit" component={RouterLink} className={classes.navLink} to="/">Home</Link>
                        <Link color="inherit" component={RouterLink} className={classes.navLink} to="/about/">About</Link>
                        <Link color="inherit" component={RouterLink} className={classes.navLink} to="/users/">Users</Link>
                    </Typography>
                </Toolbar>
            </AppBar>

            <Route path="/" exact component={Index} />
            <Route path="/about/" component={About} />
            <Route path="/users/" component={Users} />
        </Router>
    );
}
