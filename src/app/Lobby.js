// // App.js
// import React, { Component } from 'react';
// // import Game from './Game';
// // import Board from './Board';
// import PubNubReact from 'pubnub-react';
// import Swal from "sweetalert2";
// import shortid from 'shortid';
// // import './Game.css';
// export class Lobby extends Component {
//     constructor(props) {
//         super(props);
//         // REPLACE with your keys
//         this.pubnub = new PubNubReact({
//             publishKey: "pub-c-666a3d32-ec55-4639-a05b-e72a6ebedb39",
//             subscribeKey: "sub-c-a13a0484-1ca6-11eb-a660-060a09f46642"
//         });

//         this.state = {
//             piece: '', // X or O
//             isPlaying: false, // Set to true when 2 players are in a channel
//             isRoomCreator: false,
//             isDisabled: false,
//             myTurn: false,
//         };
//         this.lobbyChannel = null; // Lobby channel
//         this.gameChannel = null; // Game channel
//         this.roomId = null; // Unique id when player creates a room   
//         this.pubnub.init(this); // Initialize PubNub
//     }
//     render() {
//         return (
//             <div>
//                 <div className="title">
//                     <p> React Tic Tac Toe </p>
//                 </div>
//                 {
//                     !this.state.isPlaying &&
//                     <div className="game">
//                         <div className="board">
//                             {/* <Board
//                                 squares={0}
//                                 onClick={index => null}
//                             /> */}

//                             <div className="button-container">
//                                 <button
//                                     className="create-button "
//                                     disabled={this.state.isDisabled}
//                                 //onClick={(e) => this.onPressCreate()}
//                                 > Create
//                       </button>
//                                 <button
//                                     className="join-button"
//                                 //onClick={(e) => this.onPressJoin()}
//                                 > Join
//                       </button>
//                             </div>

//                         </div>
//                     </div>
//                 }
//                 {
//                     // this.state.isPlaying &&
//                     // <Game
//                     //     pubnub={this.pubnub}
//                     //     gameChannel={this.gameChannel}
//                     //     piece={this.state.piece}
//                     //     isRoomCreator={this.state.isRoomCreator}
//                     //     myTurn={this.state.myTurn}
//                     //     xUsername={this.state.xUsername}
//                     //     oUsername={this.state.oUsername}
//                     //     endGame={this.endGame}
//                     // />
//                 }
//             </div>
//         )
//     }
// }
