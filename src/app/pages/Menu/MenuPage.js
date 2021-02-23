import React from "react";
import Buttons from '../../component/Button';
import MenuBar from '../../component/MenuBar';
import Table from '../../component/Table';
import { Grid } from '@material-ui/core'
import TableCreate from '../../component/TableCreate';
import TableJoin from '../../component/TableJoin';
import io from "socket.io-client";
import { updateAnalytics, hasFriendPending } from '../../firebase.js'

export class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.handleJoinClick = this.handleJoinClick.bind(this);
        this.handleCreateRoomClick = this.handleCreateClick.bind(this);
        this.state = {
            joinPage: false,
            createPage: false,
            menu: true,
            endpoint: "http://localhost:5000",
            socket: null,
            isGameStarted: false,
            gameId: null,
            gameData: null,
            tableCode: null,
            playerName: null,
            players: null,
        }
    }

    componentDidMount() {
        const { endpoint } = this.state;
        // Made a connection with server
        const socket = io(endpoint, { transports: ['websocket'] });
        socket.on("connected", data => {
            this.setState({ socket: socket });
            updateAnalytics({ "id": data.id, "type": "numConnections" })
        });

        socket.on("confirmNewPlayer", data => {
            if (data.tableCode === this.state.tableCode) {
                this.setState({ players: data.players });
                this.setState({ playerName: data.playerName });
            }
        });


    }

    componentWillUnmount() {
        updateAnalytics({ "type": "numDisconnections" })
    }
    // registrationConfirmation = (data) => {
    //     // If registration successfully redirect to player list
    //     this.setState({ isRegistered: data });
    // };
    // gameStartConfirmation = (data) => {
    //     // If select opponent player then start game and redirect to game play
    //     this.setState({ isGameStarted: data.status, gameId: data.game_id, gameData: data.game_data });
    // };
    // opponentLeft = (data) => {
    //     // If opponent left then get back from game play to player screen
    //     alert("Opponent Left");
    //     this.setState({ isGameStarted: false, gameId: null, gameData: null });
    // };

    changeInfo = (data) => {
        this.setState({ playerName: data.playerName });
        this.setState({ players: data.players });
        this.setState({ tableCode: data.tableCode });

        console.log("making table: " + this.state.playerName)
    }

    handleCreateClick() {
        this.setState({ menu: false })
        this.setState({ createPage: true })
    }

    handleJoinClick() {
        this.setState({ menu: false })
        this.setState({ joinPage: true })
    }

    async testing() {
        console.log(await hasFriendPending('abc123', 'aaa'))
    }

    // setUser(user) {
    //     if (user != null) {
    //         this.setState({ playerName: user.displayName });
    //     }
    // }

    render() {
        return (
            <div>
                <MainMenu bool={this.state.menu}
                    onJoinClick={this.handleJoinClick}
                    onCreateRoomClick={this.handleCreateRoomClick}
                    testing={this.testing} />
                {/* renders when you click create */}
                {
                    this.state.createPage &&
                    <header className="App-header">
                        {this.state.socket ?
                            this.state.tableCode ?
                                <Table players={this.state.players} 
                                       tableCode={this.state.tableCode} 
                                       changeInfo={this.changeInfo} 
                                       socket={this.state.socket} 
                                       playerName={this.state.playerName} 
                                />
                            : <TableCreate 
                                socket={this.state.socket} 
                                changeInfo={this.changeInfo} 
                                tableCode={this.state.tableCode} 
                                />
                            : <p>Loading...</p>
                        }
                    </header>
                }
                {/* renders when you click join */}
                {
                    this.state.joinPage &&
                    <header className="App-header">
                        {this.state.socket ?
                            this.state.tableCode ? <Table players={this.state.players} tableCode={this.state.tableCode} changeInfo={this.changeInfo} socket={this.state.socket} playerName={this.state.playerName} />
                                : <TableJoin socket={this.state.socket} changeInfo={this.changeInfo} tableCode={this.state.tableCode} />
                            : <p>Loading...</p>
                        }
                    </header>
                }
            </div >

        )
    }
}

function MainMenu(props) {
    const x = props.bool

    if (x) {
        return (<>
            <MenuBar />
            <div flex-grow={1}>
                <Grid container spacing={10} justify='center'>
                    <Grid item >
                        <Buttons function={props.onJoinClick} text='Join' />
                    </Grid>
                    <Grid item >
                        <Buttons function={props.onCreateRoomClick} text='Create Room' />
                    </Grid>
                    <Grid item >
                        <Buttons function={props.testing} text='test function' />
                    </Grid>
                </Grid>
            </div>
        </>);
    } else {
        return (null)
    }
}

