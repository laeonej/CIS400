import React from 'react'
import MenuBar from "../../component/MenuBar"
import { Card, CardContent, TextField, Typography, Button, Divider, Grid, Link } from '@material-ui/core'
import { auth, generateUserDocument, firestore, updateAnalytics } from '../../firebase.js'


export default class SignUp extends React.Component {

    constructor(props) {
        super(props)
        this.signup = this.signup.bind(this)
        this.emailInput = this.emailInput.bind(this)
        this.usernameInput = this.usernameInput.bind(this)
        this.passwordInput = this.passwordInput.bind(this)
        this.passwordConfInput = this.passwordConfInput.bind(this)
        this.state = {
            email: '',
            username: '',
            password: '',
            confirm: '',
            error: 'none',
            errorMessage: '',
            usernameError: '',
            existingUsers: '',
        }
    }

    async componentDidMount() {
        const snapshot = await firestore.collection('users').get()
        const names = snapshot.docs.map(doc => doc.data().displayName.toLowerCase());
        console.log(names.sort())
        this.setState({ existingUsers: names.sort() })
    }

    async emailInput(event) {
        await this.setState({ email: event.target.value })
    }

    async usernameInput(event) {
        var entered = event.target.value
        if (entered.length < 3) {
            await this.setState({
                username: entered,
                error: 'username',
                usernameError: 'Username is too short'
            })
        } else if (this.state.existingUsers.includes(entered.toLowerCase())) {
            await this.setState({
                username: entered,
                error: 'username',
                usernameError: 'Username is taken'
            })
        } else {
            await this.setState({
                username: entered,
                error: 'none',
                usernameError: ''
            })
        }
    }

    async passwordInput(event) {
        await this.setState({ password: event.target.value })
    }

    async passwordConfInput(event) {
        await this.setState({ confirm: event.target.value })
    }

    badPassword(password) {
        var str = password
        var alphanumeric = /^(?=.*[a-zA-Z])(?=.*[0-9])/
        return (!alphanumeric.test(str))
    }

    async signup() {
        if (this.state.password !== this.state.confirm) {
            await this.setState({ error: 'password', errorMessage: "Passwords do not match" })
        } else if (this.state.password.length < 6) {
            await this.setState({ error: 'password', errorMessage: "Password is too short" })
        } else if (this.badPassword(this.state.password)) {
            await this.setState({ error: 'password', errorMessage: "Password must contain letters and numbers" })
        } else if (this.state.error === 'username') {
            await this.setState({ errorMessage: this.state.usernameError })
        }
        else {
            auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(async (user) => {
                    console.log(user)
                    await user.user.updateProfile({
                        displayName: this.state.username,
                    })
                    generateUserDocument(user.user)
                    updateAnalytics({ "type": "numSignUps" })
                }).catch((err) => {
                    this.setState({ error: 'email', errorMessage: err.message })
                })

        }
    }


    render() {
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
                                            <TextField error={this.state.error === 'email'} variant='outlined' required id='email' label='Email' type='email' onChange={this.emailInput} />
                                        </Grid>
                                        <Grid item xs>
                                            <TextField error={this.state.error === 'username'} variant='outlined' required id='username' label='Username' type='text' onChange={this.usernameInput} />
                                            {this.state.error === 'username' ?
                                                <Typography variant='body2' color='error'>{this.state.usernameError}</Typography>
                                                : <></>}
                                        </Grid>
                                        <Grid item xs>
                                            <TextField error={this.state.error === 'password'} variant='outlined' required id='password' label='Password' type='password' onChange={this.passwordInput} />
                                        </Grid>
                                        <Grid item xs>
                                            <TextField error={this.state.error === 'password'} variant='outlined' required id='passwordConfirm' label='Confirm Password' type='password' onChange={this.passwordConfInput} />
                                        </Grid>
                                        <Grid item xs>
                                            <Button variant='contained' color='primary' onClick={this.signup}>Sign up</Button>
                                        </Grid>
                                        <Grid item xs>
                                            {this.state.error ?
                                                <Typography variant='body2' color='error'>{this.state.errorMessage}</Typography>
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
}