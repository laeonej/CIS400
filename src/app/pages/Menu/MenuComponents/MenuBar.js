import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Link, makeStyles } from "@material-ui/core";
import logo from '../../../images/logo/tablelogo.png'
import { UserContext } from '../../../../provider/UserProvider'
import { auth } from '../../../firebase'


const useStyles = makeStyles((theme) => ({
    appbar: {
        position: 'static',
        background: 'linear-gradient(45deg, #e0f5d5 30%, #98e86f 90%)'
    },
    barDiv: {
        flex: 1,
    },
    titleLink: {
        fontFamily: 'Comfortaa',

        fontSize: 36,
        color: '#535559',
    },
    otherLinks: {
        fontSize: 20,
        fontFamily: 'Comfortaa',
        color: '#535559',
        marginLeft: '30px'
    },
    title: {
        flexGrow: 1,
    },
    username: {
        fontSize: 30,
        fontFamily: 'Comfortaa',
        color: '#282e3b',
    }
}));

export default function MenuBar(props) {
    const classes = useStyles();
    const user = useContext(UserContext);

    return (
        <div style={{ marginBottom: '50px' }}>
            <AppBar className={classes.appbar}>
                <Toolbar>
                    <Typography className={classes.title}>
                        <Link className={classes.titleLink} underline='none' href='/'>
                            table
                        </Link>
                        <img src={logo} alt='logo' />
                    </Typography>
                    {user !== null && user !== undefined ?
                        <>
                            <Typography className={classes.username}>
                                {user.displayName}
                            </Typography>
                            <Link className={classes.otherLinks} onClick={() => { auth.signOut() }}>Sign out</Link>
                        </>
                        :
                        <>
                            <Link className={classes.otherLinks} href='/login'>Login</Link>
                            <Link className={classes.otherLinks} href='/signup'>Sign Up</Link>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}