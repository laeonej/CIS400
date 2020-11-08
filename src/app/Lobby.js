import React, { Component } from 'react';
// import logo from './logo.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GetUserDetail from './Login';
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
        };
    }

    componentDidMount() {
        const { endpoint } = this.state;
        // Made a connection with server
        const socket = io(endpoint, { transports: ['websocket'] });
        socket.on("connected", data => {
            console.log(data.connected);
            this.setState({ socket: socket })
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
    render() {
        return (

            !this.state.isGameStarted ? !this.state.isRegistered ? <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                {this.state.socket
                    ? <GetUserDetail socket={this.state.socket} registrationConfirmation={this.registrationConfirmation} />
                    : <p>Loading...</p>}
            </header> :
                <div> GAME STARTED </div> : <div> SUCCESS </div>

            //TODO ADD IN DIV THAT SHOWS BUTTONS TO CREATE/
            //TODO ADD IN GAMEBOARD
            // <ShowUsers socket={this.state.socket} gameStartConfirmation={this.gameStartConfirmation} /> :
            // <GamePlay socket={this.state.socket} gameId={this.state.gameId} gameData={this.state.gameData} opponentLeft={this.opponentLeft} />
        );
    }
}

// export default Lobby;