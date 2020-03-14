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
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { ContextInfoComponent } from './ContextInfoComponent';
import EditorComponent from './EditorComponent';

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

function Users() {
    return <h1>This is the Users page</h1>
}

export function MainComponent() {
    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            <Link color="inherit" component={RouterLink} className={classes.navLink} to="/">Home</Link>
                            <Link color="inherit" component={RouterLink} className={classes.navLink} to="/editor/">Editor</Link>
                            <Link color="inherit" component={RouterLink} className={classes.navLink} to="/users/">Users</Link>
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Container maxWidth={false}>
                    <Route path="/" exact component={Index} />
                    <Route path="/editor/" component={EditorComponent} />
                    <Route path="/users/" component={Users} />
                </Container>
            </Router>
        </>
    );
}
