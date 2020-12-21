import React from 'react'
import MenuBar from "../../component/MenuBar"
import { Card, CardContent, TextField, Typography, Button, Divider, Grid, Link } from '@material-ui/core'
import Google from '../../images/logo/google.jpg'
import { auth, generateUserDocument } from '../../firebase.js'

export default class SignUp extends React.Component {

    constructor(props) {
        super(props)
        this.signup = this.signup.bind(this)
        this.emailInput = this.emailInput.bind(this)
        this.usernameInput = this.usernameInput.bind(this)
        this.passwordInput = this.passwordInput.bind(this)
        this.passwordConfInput = this.passwordConfInput.bind(this)
        this.state = {
            email : '',
            username: '',
            password: '',
            confirm: '',
            error: false,
            errorMessage: ''
        }
    }

    async emailInput(event) {
        await this.setState({email: event.target.value})
    }

    async usernameInput(event) {
        await this.setState({username: event.target.value})
    }

    async passwordInput(event) {
        await this.setState({password: event.target.value})
    }

    async passwordConfInput(event) {
        await this.setState({confirm: event.target.value})
    }

    badPassword(password) {
        var str = password
        var alphanumeric = /^(?=.*[a-zA-Z])(?=.*[0-9])/
        return (!alphanumeric.test(str))
    }

    async signup() {
        if (this.state.password !== this.state.confirm) {
            await this.setState({error: true, errorMessage: "Passwords do not match"})
            console.log(this.state.errorMessage)
        } else if (this.state.password.length < 6) {
            await this.setState({error: true, errorMessage: "Password is too short"})
            console.log(this.state.errorMessage)
        } else if (this.badPassword(this.state.password)) {
            await this.setState({error: true, errorMessage: "Password must contain letters and numbers"})
            console.log(this.state.errorMessage)
        } else {
            auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(async (user) => {
                console.log(user)
                await user.user.updateProfile({
                    displayName: this.state.username
                })
                generateUserDocument(user.user)
            })
        }
    }


    render() {
        return (
            <div>
                <MenuBar/>
                <div style={{paddingLeft: '30%', paddingRight: '30%'}}>
                    <div>
                        <Card variant='outlined'>
                            <CardContent>
                                <Typography variant='h4' align='center' style={{marginBottom: '5px'}}>
                                    Sign Up
                                </Typography>
                                <Divider/>
                                <form style={{marginTop: '10px'}}>
                                    <Grid container direction='column' justify='center' alignItems='center' spacing={3}>
                                        <Grid item xs>
                                            <TextField required id='email' label='Email' type='email' onChange={this.emailInput}/>
                                        </Grid>
                                        <Grid item xs>
                                            <TextField required id='username' label='Username' type='text' onChange={this.usernameInput}/>
                                        </Grid>
                                        <Grid item xs>
                                            <TextField required id='password' label='Password' type='password' onChange={this.passwordInput}/>
                                        </Grid>
                                        <Grid item xs>
                                            <TextField required id='passwordConfirm' label='Confirm Password' type='password' onChange={this.passwordConfInput}/>
                                        </Grid>
                                        <Grid item xs>
                                            <Button variant='contained' color='primary' onClick={this.signup}>Sign up</Button>
                                        </Grid>
                                        <Grid item xs>
                                            <img src={Google} alt="Sign up with Google" style={{height: '40px', width: '40px'}}/>
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