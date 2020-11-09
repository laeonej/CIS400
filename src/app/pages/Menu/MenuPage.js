import React from "react";
import Buttons from '../../component/Button';
import AppAppBar from '../../component/AppAppbar';
import Table from '../../component/Table';
import { Grid } from '@material-ui/core'




export class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.handleJoinClick = this.handleJoinClick.bind(this);
        this.handleCreateRoomClick = this.handleCreateRoomClick.bind(this);
        this.state = {
            notInGame: true,
            inGame: false
        }
    }

    handleCreateRoomClick() {
        this.setState({notInGame: false})
        this.setState({inGame: true})
        alert('create room handler')
    }

    handleJoinClick() {
        this.setState({notInGame: false})
        this.setState({inGame: true})
        alert('join game handler')
    }

    
    render() {
        return (
            <div>
                <NoGameMenu bool={this.state.notInGame} 
                            onJoinClick={this.handleJoinClick} 
                            onCreateRoomClick={this.handleCreateRoomClick}/>
                <Game bool={this.state.inGame}/>
            </div>
                
        )
    }
}

function NoGameMenu(props) {
    const x = props.bool

    if (x) {
        return (<>
        <AppAppBar/>
            <div flex-grow={1}>
                <Grid container spacing={10} justify='center'>
                    <Grid item >
                        <Buttons function={props.onJoinClick} text='Join'/>
                    </Grid>
                    <Grid item >
                        <Buttons function={props.onCreateRoomClick} text='Create Room'/>
                    </Grid>
                </Grid>
            </div>
        </>);
    } else {
        return (null)
    }
}

function Game(props) {
    const x = props.bool
    if (x) {
        return (
            <>
            <Grid container justify='center'>
                <Grid item>
                    <h1>Player 1</h1>
                </Grid>
            </Grid>
            <Grid container justify='center'>
                <Grid item sm >
                        <h1 style={{paddingTop: 100, paddingLeft: 100}}>Player 2</h1>
                </Grid>
                <Grid item>
                        <Table numOfCards={52} tableId={'12345'}/>
                </Grid>
                <Grid item sm>
                    <h1 style={{paddingTop: 100, paddingLeft: 100}}>Player 3</h1>
                </Grid>
            </Grid>
            <Grid container justify='center'>
                <Grid item>
                    <h1>Player 4</h1>
                </Grid>
            </Grid>
            </>
        );
    } else {
        return (null)
    }
}

