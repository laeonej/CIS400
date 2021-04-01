import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../provider/UserProvider'
import MenuBar from './MenuBar'
import { Button, makeStyles, TextField, Typography } from '@material-ui/core'


// can be updated later to make things prettier
const useStyles = makeStyles((theme) => ({
    backBtn: {
        marginLeft: '2%'
    }
}))


export default function TableCreate(props) {

    const classes = useStyles()

    // Gets the logged in user
    const user = useContext(UserContext)

    // States to keep track of
    const [playerName, setPlayerName] = useState('')
    const [isGuest, setIsGuest] = useState(true)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(() => {
        


        // If user is logged in, fill in input with their name and disable
        if (user !== null && user !== undefined) {
            setPlayerName(user.displayName)
            setIsGuest(false)
        }

    }, [props, user, playerName])


    function onPlayerNameChange(e) {
        setPlayerName(e.target.value)
    }

    function createTable() {
        // if name is empty throw an error
        if (playerName == '') {
            setError(true)
            setErrorMessage("Please enter a display name")
        // may want to check if name already exists
        } else {
            props.makeGame()
        }
    }

    return (
        <div>
            <MenuBar/>
            <div style={{ textAlign: 'center' }}>
                <form 
                    noValidate 
                    autoComplete="off"
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

                </form>
                { error ?
                    <Typography variant='body2' color='error'>{errorMessage}</Typography>
                    :<></>
                }
                <Button 
                    variant='contained'
                    color='primary'
                    onClick={createTable}
                >
                    Create
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