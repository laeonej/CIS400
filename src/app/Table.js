import React, { Component } from 'react';
// import { Form, Button } from 'react-bootstrap';

class Table extends Component {
    constructor() {
        super();
        this.state = {
            tableCode: null,
            playerName: ['laeone', 'younghu', 'jeff', 'james']
        };
    }
    componentDidMount() {

    }
    // createTable = () => {
    //     if (this.state.playerName != "") {
    //         this.props.socket.emit('createTable', { "playerName": this.state.playerName });
    //     } else {
    //         alert("Enter All Inputs");
    //     }
    // }

    // onPlayerNameChange = (e) => {
    //     this.setState({ playerName: e.target.value });
    // }

    render() {
        return (
            <div>
                <div id="tester"> </div>

                <h2> {this.props.tableCode} </h2>
                <div> {this.state.playerName.map((player, index) => (
                    <p key={index}> {player} </p>
                ))}
                </div >
            </div>
        );
    }
}

export default Table;