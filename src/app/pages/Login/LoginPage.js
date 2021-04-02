import React, { useState } from "react"
import MenuBar from "../Menu/MenuComponents/MenuBar"
import { Card, CardContent, TextField, Typography, Button, Divider, Grid, Link, DialogContent, Dialog, DialogTitle, DialogContentText, DialogActions } from '@material-ui/core'
import { auth, updateAnalytics } from '../../firebase.js'


export default function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [open, setOpen] = useState(false)
    const [resetPassEmail, setResetPassEmail] = useState('')

    async function resetPass() {
        await setOpen(false)
        await auth.sendPasswordResetEmail(resetPassEmail)
            .catch((err) => {
                console.log(err.message)
            })
    }

    async function handlePassResetOpen() {
        await setOpen(true)
    }

    async function handlePassResetClose() {
        await setOpen(false)
    }

    async function emailInput(event) {
        await setEmail(event.target.value)
    }

    async function passwordInput(event) {
        await setPassword(event.target.value)
    }

    async function resetPassInput(event) {
        await setResetPassEmail(event.target.value)
    }

    async function login() {
        await auth.signInWithEmailAndPassword(email, password)
            .then(async (data) => {
                updateAnalytics({ "type": "numLogins" })
            })
            .catch(err => {
                setError(true)
                setErrorMessage('Password is not correct or an account with the email provided does not exist.')
                document.getElementById('password').value = ''
            })
    }

    return (
        <div>
            <MenuBar />
            <div style={{ paddingLeft: '30%', paddingRight: '30%' }}>
                <div>
                    <Card variant='outlined'>
                        <CardContent>
                            <Typography variant='h4' align='center' style={{ marginBottom: '5px' }}>
                                Login
                                </Typography>
                            <Divider />
                            <form style={{ marginTop: '10px' }}>
                                <Grid container direction='column' justify='center' alignItems='center' spacing={3}>
                                    <Grid item xs>
                                        <TextField required id='email' label='Email' type='email' onChange={emailInput} />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField required id='password' label='Password' type='password' onChange={passwordInput} />
                                    </Grid>
                                    <Grid item xs>
                                        <Button variant='contained' color='primary' onClick={login}>Login</Button>
                                    </Grid>
                                    <Grid item xs>
                                        {error ?
                                            <Typography variant='body2' color='error'>{errorMessage}</Typography>
                                            : <></>
                                        }
                                    </Grid>
                                    <Grid item xs>
                                        <Link href='/signup'>
                                            Don't have an account? Sign up here.
                                            </Link>
                                    </Grid>
                                    <Grid item xs>
                                        <Link onClick={handlePassResetOpen}>
                                            Forgot password?
                                            </Link>
                                        <Dialog open={open} onClose={handlePassResetClose}>
                                            <DialogTitle justify='center'>Password Reset</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    Enter your email. If an account associated with the entered email exist, a password email will be sent.
                                                    </DialogContentText>
                                                <TextField
                                                    autoFocus
                                                    id='passReset'
                                                    label='Email Address'
                                                    type='email'
                                                    fullWidth
                                                    onChange={resetPassInput}
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button color='primary' onClick={resetPass}>
                                                    Submit
                                                    </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )

}