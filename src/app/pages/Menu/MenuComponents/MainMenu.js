import React from 'react'
import { Grid, makeStyles, Button } from '@material-ui/core'
import MenuBar from './MenuBar'
import logo from '../../../images/logo/tablelogo.png'


const useStyles = makeStyles(
    {
        btn: {
            //background: 'linear-gradient(45deg, #4c5154 30%, #181d21 90%)',
            border: '2px solid',
            borderRadius: 3,
            color: 'black',
            height: 48,
            padding: '0 30px',
        }
    }
)


export default function MainMenu(props) {

    const classes = useStyles()

    return (
        <div>
            <MenuBar />
            <div
                flex-grow={1}
            >

                <Grid
                    container
                    spacing={10}
                    justify='center'
                >

                    <Grid
                        item
                    >
                        <Button
                            onClick={props.onJoinClick}
                            className={classes.btn}
                        >
                            Join
                        </Button>
                    </Grid>
                    <Grid
                        item
                    >
                        <Button
                            onClick={props.onCreateRoomClick}
                            className={classes.btn}
                        >
                            Create Room
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
