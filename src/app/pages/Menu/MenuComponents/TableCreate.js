import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../provider/UserProvider'
import MenuBar from './MenuBar'
import {
    Button,
    makeStyles,
    TextField,
    Typography,
    Card,
    CardContent,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Grid,
    Select,
    MenuItem,
    InputLabel
} from '@material-ui/core'
import Lock from '@material-ui/icons/Lock'
import LockOpen from '@material-ui/icons/LockOpen'

// can be updated later to make things prettier
const useStyles = makeStyles((theme) => ({
    backBtn: {
        marginLeft: '2%'
    },
    gameSetting: {
        marginBottom: '2%'
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
    const [isPrivate, setIsPrivate] = useState(false)
    const [gamemode, setGamemode] = useState('Sandbox')

    useEffect(() => {



        // If user is logged in, fill in input with their name and disable
        if (user !== null && user !== undefined) {
            setPlayerName(user.displayName)
            setIsGuest(false)
        }
        console.log(isPrivate)
    }, [props, user, playerName, isPrivate])


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
            props.makeGame(playerName, isPrivate, gamemode)
        }
    }

    function handlePrivateLock(e) {
        setIsPrivate(!isPrivate)
    }

    function handleGamemodeSelect(e) {
        setGamemode(e.target.value)
    }

    return (
        <div>
            <MenuBar />
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
                {error ?
                    <Typography variant='body2' color='error'>{errorMessage}</Typography>
                    : <></>
                }

                <Typography variant='h6'>
                    Game Settings
                        </Typography>
                <Grid container alignItems='center' spacing={2} className={classes.gameSetting}>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox icon={<LockOpen />} checkedIcon={<Lock />} name="privacy" />}
                            onChange={handlePrivateLock}
                            label={isPrivate ? "Private" : "Public"}
                        />
                        <InputLabel id='gamemode-label'>Gamemode</InputLabel>
                        <Select
                            labelId='gamemode-label'
                            id="select-gamemode"
                            value={gamemode}
                            onChange={handleGamemodeSelect}
                        >
                            <MenuItem value={'Sandbox'}>Sandbox</MenuItem>

                        </Select>
                    </Grid>


                </Grid>



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