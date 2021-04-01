import React, { useEffect, useState } from 'react'
import MenuBar from "../Menu/MenuComponents/MenuBar"
import { Card, CardContent, TextField, Typography, Button, Divider, Grid, Link } from '@material-ui/core'
import { auth, generateUserDocument, firestore, updateAnalytics } from '../../firebase.js'

export default function SignUp(props) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [existingUsers, setExistingUsers] = useState('')
    const [emailError, setEmailError] = useState(false)

    useEffect(async () => {
        const snapshot = await firestore.collection('users').get()
        console.log(snapshot)
        const names = snapshot.docs.map(doc => doc.data().displayName.toLowerCase());
        setExistingUsers(names.sort())
    }, [])

    function emailInput(event) {
        setEmail(event.target.value)
    }

    function usernameInput(event) {
        var entered = event.target.value
        if (entered.length < 3) {
            setUsername(entered)
            setUsernameError(true)
            setUsernameErrorMessage('Username is too short')

        } else if (existingUsers.includes(entered.toLowerCase())) {
            setUsername(entered)
            setUsernameError(true)
            setUsernameErrorMessage('Username is taken')

        } else {
            setUsername(entered)
            setUsernameError(false)
            setUsernameErrorMessage('')

        }
    }

    function passwordInput(event) {
        setPassword(event.target.value)
    }

    function passwordConfInput(event) {
        setConfirm(event.target.value)
    }

    function badPassword(password) {
        var str = password
        var alphanumeric = /^(?=.*[a-zA-Z])(?=.*[0-9])/
        return (!alphanumeric.test(str))
    }

    async function signup() {
        if (password !== confirm) {
            setPasswordError(true)
            setErrorMessage('Passwords do not match')

        } else if (password.length < 6) {
            setPasswordError(true)
            setErrorMessage('Password is too short')

        } else if (badPassword(password)) {
            setPasswordError(true)
            setErrorMessage('Password must contain letters and numbers')
        
        } else if (usernameError) {
            setErrorMessage(usernameErrorMessage)
        }
        else {
            auth.createUserWithEmailAndPassword(email, password)
                .then(async (user) => {
                    await user.user.updateProfile({
                        displayName: username,
                    })
                    generateUserDocument(user.user)
                    updateAnalytics({ "type": "numSignUps" })
                    setEmailError(false)
                }).catch((err) => {
                    setEmailError(true)
                    setErrorMessage(err.message)
                })

        }
    }

    return (
        <div>
            <MenuBar />
            <div style={{ paddingLeft: '30%', paddingRight: '30%' }}>
                <div>
                    <Card variant='outlined'>
                        <CardContent>
                            <Typography variant='h4' align='center' style={{ marginBottom: '5px' }}>
                                Sign Up
                                </Typography>
                            <Divider style={{ marginTop: '15px', marginBottom: '20px' }} />
                            <form style={{ marginTop: '20px' }}>
                                <Grid container direction='column' justify='center' alignItems='center' spacing={3}>
                                    <Grid item xs>
                                        <TextField error={emailError} variant='outlined' required id='email' label='Email' type='email' onChange={emailInput} />
                                    </Grid>
                                    <Grid item xs>
                                        <TextField error={usernameError} variant='outlined' required id='username' label='Username' type='text' onChange={usernameInput} />
                                        {usernameError ?
                                            <Typography variant='body2' color='error'>{usernameErrorMessage}</Typography>
                                            : <></>}
                                    </Grid>
                                    <Grid item xs>
                                        <TextField error={passwordError} variant='outlined' required id='password' label='Password' type='password' onChange={passwordInput} />
                                        
                                    </Grid>
                                    <Grid item xs>
                                    <Typography variant='body2'>*Password needs to be 6 characters or longer.</Typography>
                                        <Typography variant='body2'>*Password must contain a letter and number.</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <TextField error={passwordError} variant='outlined' required id='passwordConfirm' label='Confirm Password' type='password' onChange={passwordConfInput} />
                                    </Grid>
                                    <Grid item xs>
                                        <Button variant='contained' color='primary' onClick={signup}>Sign up</Button>
                                    </Grid>
                                    <Grid item xs>
                                        {usernameError || passwordError || emailError ?
                                            <Typography variant='body2' color='error'>{errorMessage}</Typography>
                                            : <></>
                                        }
                                    </Grid>
                                    <Grid item xs>
                                        <Link href='/login'>
                                            Already have an account?
                                            </Link>
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