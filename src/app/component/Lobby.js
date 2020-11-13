import React, { Component } from 'react';
// import logo from './logo.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import TableJoin from './TableJoin';
import TableCreate from './TableCreate';
import Table from './Table';

// import ShowUsers from './components/ShowUsers';
// import GamePlay from './components/GamePlay';
// import { Container } from 'react-bootstrap';
import io from "socket.io-client";

export class Lobby extends Component {
    constructor() {
        super();
        this.state = {
            endpoint: "http://localhost:5000",
            socket: null,
            isGameStarted: false,
            gameId: null,
            gameData: null,
            tableCode: null,
            playerName: null
        };
    }

    componentDidMount() {
        const { endpoint } = this.state;
        // Made a connection with server
        const socket = io(endpoint, { transports: ['websocket'] });
        socket.on("connected", data => {
            this.setState({ socket: socket });
        });
    }
    registrationConfirmation = (data) => {
        // If registration successfully redirect to player list
        this.setState({ isRegistered: data });
    };
    gameStartConfirmation = (data) => {
        // If select opponent player then start game and redirect to game play
        this.setState({ isGameStarted: data.status, gameId: data.game_id, gameData: data.game_data });
    };
    opponentLeft = (data) => {
        // If opponent left then get back from game play to player screen
        alert("Opponent Left");
        this.setState({ isGameStarted: false, gameId: null, gameData: null });
    };

    changeInfo = (data) => {
        console.log(data.TableCode);
        this.setState({ tableCode: data.tableCode, playerName: data.playerName });
    }


    render() {
        return (
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                {this.state.socket ?
                    this.state.tableCode ? <Table tableCode={this.state.tableCode} changeInfo={this.changeInfo} />
                        : <div><TableJoin socket={this.state.socket} changeInfo={this.changeInfo} tableCode={this.state.tableCode} /><TableCreate socket={this.state.socket} changeInfo={this.changeInfo} tableCode={this.state.tableCode} /></div>
                    : <p>Loading...</p>
                }
            </header>

            //TODO ADD IN DIV THAT SHOWS BUTTONS TO CREATE/
            //TODO ADD IN GAMEBOARD
            // <ShowUsers socket={this.state.socket} gameStartConfirmation={this.gameStartConfirmation} /> :
            // <GamePlay socket={this.state.socket} gameId={this.state.gameId} gameData={this.state.gameData} opponentLeft={this.opponentLeft} />
        );
    }
}

// export default Lobby;