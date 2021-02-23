import React from "react"
import MenuBar from "../../component/MenuBar"
import { Card, CardContent, TextField, Typography, Button, Divider, Grid, Link, DialogContent, Dialog, DialogTitle, DialogContentText, DialogActions } from '@material-ui/core'
import { auth, updateAnalytics } from '../../firebase.js'

export class Login extends React.Component {

    constructor(props) {
        super(props)
        this.login = this.login.bind(this)
        this.emailInput = this.emailInput.bind(this)
        this.passwordInput = this.passwordInput.bind(this)
        this.resetPass = this.resetPass.bind(this)
        this.handlePassResetOpen = this.handlePassResetOpen.bind(this)
        this.handlePassResetClose = this.handlePassResetClose.bind(this)
        this.resetPassInput = this.resetPassInput.bind(this)
        this.wrapper = React.createRef()
        this.state = {
            email: '',
            password: '',
            error: false,
            errorMessage: '',
            open: false,
            resetPassEmail: ''
        }
    }

    async resetPass() {
        await this.setState({ open: false })
        await auth.sendPasswordResetEmail(this.state.resetPassEmail)
            .catch((err) => {
                console.log(err.message)
            })
    }

    async handlePassResetOpen() {
        await this.setState({ open: true })
    }

    async handlePassResetClose() {
        await this.setState({ open: false })
    }

    async emailInput(event) {
        await this.setState({ email: event.target.value })
    }

    async passwordInput(event) {
        await this.setState({ password: event.target.value })
    }

    async resetPassInput(event) {
        await this.setState({ resetPassEmail: event.target.value })
    }


    async login() {
        await auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(async (data) => {
                updateAnalytics({ "type": "numLogins" })
            })
            .catch(err => {
                this.setState({
                    error: true,
                    errorMessage: 'Password is not correct or an account with the email provided does not exist.',
                })
                document.getElementById('password').value = ''
            })
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
                                    Login
                                </Typography>
                                <Divider />
                                <form style={{ marginTop: '10px' }}>
                                    <Grid container direction='column' justify='center' alignItems='center' spacing={3}>
                                        <Grid item xs>
                                            <TextField required id='email' label='Email' type='email' onChange={this.emailInput} />
                                        </Grid>
                                        <Grid item xs>
                                            <TextField required id='password' label='Password' type='password' onChange={this.passwordInput} />
                                        </Grid>
                                        <Grid item xs>
                                            <Button variant='contained' color='primary' onClick={this.login}>Login</Button>
                                        </Grid>
                                        <Grid item xs>
                                            {this.state.error ?
                                                <Typography variant='body2' color='error'>{this.state.errorMessage}</Typography>
                                                : <></>
                                            }
                                        </Grid>
                                        <Grid item xs>
                                            <Link href='/signup'>
                                                Don't have an account? Sign up here.
                                            </Link>
                                        </Grid>
                                        <Grid item xs>
                                            <Link onClick={this.handlePassResetOpen}>
                                                Forgot password?
                                            </Link>
                                            <Dialog open={this.state.open} onClose={this.handlePassResetClose}>
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
                                                        onChange={this.resetPassInput}
                                                    />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button color='primary' onClick={this.resetPass}>
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
}