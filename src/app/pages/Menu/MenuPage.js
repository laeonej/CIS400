import React from "react";
import Buttons from '../../component/Button';
import AppAppBar from '../../component/AppAppbar';
import { Grid } from '@material-ui/core'




export class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lobby: []
        }
    }

    click = () => {
        alert('clicked')
    }

    
    render() {
        return (
            <>
                <AppAppBar/>
                <div flexGrow={1}>
                <Grid container spacing={10} justify='center'>
                    <Grid item >
                        <Buttons function={this.click} text='Join'/>
                    </Grid>
                    <Grid item >
                        <Buttons function={this.click} text='Create Room'/>
                    </Grid>
            </Grid>
        </div>
                
            </>
            
        )
    }
}