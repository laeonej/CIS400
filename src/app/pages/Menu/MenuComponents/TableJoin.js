import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../provider/UserProvider'
import MenuBar from './MenuBar'
import {
    Button,
    makeStyles,
    TextField,
    Grid,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    List
} from '@material-ui/core'
import { LobbyListItem } from '../../../component/LobbyListItem'


// can be updated later to make things prettier
const useStyles = makeStyles((theme) => ({
    backBtn: {
        marginLeft: '2%'
    },
    lobbyList: {
        width: '100%',
        maxWidth: 500,
        backgroundColor: '#F8F8FF',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 500,
    },
    lobbyListItem: {
        backgroundColor: '#DCDCDC',
        marginBottom: '5px'
    }
}))

export default function TableJoin(props) {

    const classes = useStyles()

    // Get the logged in user
    const user = useContext(UserContext)

    // States to keep track of
    const [playerName, setPlayerName] = useState('')
    const [tableCode, setTableCode] = useState('')
    const [isGuest, setIsGuest] = useState(true)
    const [lobby, setLobby] = useState([])
    useEffect(() => {

        // If user is logged in, fill in input with their name and disable
        if (user !== null && user !== undefined) {
            setPlayerName(user.displayName)
            setIsGuest(false)
        }

        if (lobby.length === 0) {
            props.socket.emit('getTables')
        }

        props.socket.on('sendTables', data => {
            setLobby(data.tables)
            console.log(data.tables)
        })

    }, [props, user, playerName, lobby])

    function onPlayerNameChange(e) {
        setPlayerName(e.target.value)
    }

    function onTableCodeChange(e) {
        setTableCode(e.target.value)
    }

    async function joinLobby(code) {
        if (playerName === '') {
            alert('Enter a name')
        }
        props.joinBtn(code, playerName)
    }

    return (
        <div>
            <MenuBar />
            <Grid container alignItems='center' spacing={2}>
                <Grid item xs={6}>
                    <div style={{ textAlign: 'center' }}>
                        <form
                            noValidate
                            autoComplete='off'
                        >
                            <h1>
                                Enter Display Name
                            </h1>
                            <TextField
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                onChange={onPlayerNameChange}
                                value={playerName}
                                disabled={!isGuest}
                            />
                            <h1>
                                Enter Lobby Code
                            </h1>
                            <TextField
                                id="outlined-basic"
                                label="Lobby Code"
                                variant="outlined"
                                onChange={onTableCodeChange}
                                value={tableCode}
                            />
                        </form>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => props.joinBtn(tableCode, playerName)}
                        >
                            Join
                        </Button>
                        <Button
                            className={classes.backBtn}
                            variant='outlined'
                            color='secondary'
                            onClick={props.onBackClick}
                        >
                            Back
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <List className={classes.lobbyList}>
                        {lobby.map(table => (
                            <LobbyListItem
                                numPlayers={table.players.length}
                                tableCode={table.code}
                                gamemode={table.mode}
                                isPrivate={table.isPrivate}
                                join={joinLobby}
                            />
                        ))}
                    </List>
                </Grid>
            </Grid>

        </div>
    )
}