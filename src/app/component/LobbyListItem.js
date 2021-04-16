import React from 'react'
import { makeStyles, ListItem, Button, ListItemSecondaryAction, ListItemText  } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#DCDCDC',
        marginBottom: '5px'
    }
}))

export function LobbyListItem(props) {

    const classes = useStyles()

    const numPlayers = props.numPlayers
    const tableCode = props.tableCode
    const gamemode = props.gamemode


    return (
        <>
            <ListItem className={classes.root} divider={true}>
                <ListItemText primary={tableCode} 
                                secondary={"Players: " + numPlayers + " Gamemode: " + gamemode}/>
                <ListItemSecondaryAction>
                    <Button disabled={props.isPrivate} color='primary' variant='contained' onClick={() => props.join(tableCode)}>
                        {props.isPrivate ? 'Private' : 'Join'}
                    </Button>
                </ListItemSecondaryAction>
            </ListItem>
        </>
    )
}