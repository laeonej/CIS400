import React from 'react';
import { AppBar, Toolbar, Typography, Link, makeStyles } from "@material-ui/core";


// const flex = {
//     flexGrow: 1,

// }

// const appbar = {
//     background: 'linear-gradient(45deg, #4c5154 30%, #181d21 90%)',
//     position: 'static',
// }

// export default class AppAppbar extends React.Component {

//     render() {
//         return (
//             <div style={flex}>
//                     <AppBar style={appbar}>
//                         <Toolbar>
//                             <Typography style={flex} align='center'>
//                                 <Link 
//                                     variant='h3' 
//                                     href='/'
//                                     underline="none"
//                                     color='inherit'
//                                 >
//                                     Game
//                                 </Link>
//                             </Typography>
//                         </Toolbar>
                        
//                     </AppBar>
//                 </div>
//         )
//     }
// }

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(6)
    },
    appbar: {
        background: 'linear-gradient(45deg, #4c5154 30%, #181d21 90%)',
        position: 'static',
        
    },
    titleLink: {
        fontSize: 24,
        color:'inherit',
    },
    title: {
        flexGrow: 1
    }
}));

export default function AppAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar}>
                <Toolbar>
                    <Typography className={classes.title} align='center'>
                        <Link className={classes.titleLink} underline='none' href='/'>
                            Game
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}