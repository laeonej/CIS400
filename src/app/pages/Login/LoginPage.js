import React from "react"
import MenuBar from "../../component/MenuBar"
import { Card, CardContent, TextField, Typography, Button, Divider, Grid, Link } from '@material-ui/core'


export class Login extends React.Component {

    constructor(props) {
        super(props)
        this.login = this.login.bind(this)
        this.emailInput = this.emailInput.bind(this)
        this.passwordInput = this.passwordInput.bind(this)
        this.state = {
            email : '',
            password: ''
        }
    }

    async emailInput(event) {
        await this.setState({email : event.target.value})
    }

    async passwordInput(event) {
        await this.setState({password : event.target.value})    
    }


    login() {
        //firebase stuff goes here
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
                                    Login
                                </Typography>
                                <Divider/>
                                <form style={{marginTop: '10px'}}>
                                    <Grid container direction='column' justify='center' alignItems='center' spacing={3}>
                                        <Grid item xs>
                                            <TextField required id='email' label='Email' type='email' onChange={this.emailInput}/>
                                        </Grid>
                                        <Grid item xs>
                                            <TextField required id='password' label='Password' type='password' onChange={this.passwordInput}/>
                                        </Grid>
                                        <Grid item xs>
                                            <Button variant='contained' color='primary' onClick={this.login}>Login</Button>
                                        </Grid>
                                        <Grid item xs>
                                            <Link href='/signup'>
                                                Don't have an account?
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