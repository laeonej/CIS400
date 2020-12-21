import React from 'react';
import { AppBar, Toolbar, Typography, Link, makeStyles, Button } from "@material-ui/core";
import logo from '../images/logo/tablelogo.png'

const useStyles = makeStyles((theme) => ({
    appbar: {
        position: 'static',
        background: 'linear-gradient(45deg, #e0f5d5 30%, #98e86f 90%)'
    },
    barDiv: {
        flex: 1,
    },
    titleLink: {
        fontSize: 36,
        color:'#535559',
    },
    otherLinks: {
        fontSize: 20,
        color: '#535559',
        marginLeft: '30px'
    },
    title: {
        flexGrow: 1,
    }
}));

export default function MenuBar(props) {
    const classes = useStyles();

    return (
        <div style={{marginBottom: '50px'}}>
            <AppBar className={classes.appbar}>
                <Toolbar>
                    <Typography className={classes.title}>
                        <Link className={classes.titleLink} underline='none' href='/'>
                            table
                        </Link>
                        <img src={logo}/>
                    </Typography>
                    {props.user ? 
                    <>
                        <h2>{props.user}</h2>
                        <Button color='inherit' onClick={props.signout}>Sign out</Button>
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