import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../provider/UserProvider'
import MenuBar from './MenuBar'
import { Button, makeStyles, TextField } from '@material-ui/core'


// can be updated later to make things prettier
const useStyles = makeStyles((theme) => ({
    backBtn: {
        marginLeft: '2%'
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

    useEffect(() => {

        // If user is logged in, fill in input with their name and disable
        if (user !== null && user !== undefined) {
            setPlayerName(user.displayName)
            setIsGuest(false)
        }

    },[props, user, playerName])

    function onPlayerNameChange(e) {
        setPlayerName(e.target.value)
    }

    function onTableCodeChange(e) {
        setTableCode(e.target.value)
    }

    return (
        <div>
            <MenuBar/>
            <div style={{textAlign: 'center'}}>
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
                    onClick={props.joinBtn(tableCode, playerName)}
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
        </div>
    )
}