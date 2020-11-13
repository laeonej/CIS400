import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class Table extends Component {
    constructor() {
        super();
        this.state = {
            tableCode: null,
            playerName: [
                { name: 'james' },
                { name: 'laeone' },
                { name: 'jeff' },
                { name: 'younghu' }
            ]
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

                <h2> {this.state.tableCode} </h2>
                <div> {this.state.playerName.map(player => (
                    <p> {player}</p>
                ))}
                </div >
            </div>
        );
    }
}

export default Table;