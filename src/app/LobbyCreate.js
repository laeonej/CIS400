import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class LobbyCreate extends Component {
    constructor() {
        super();
        this.state = {
            tableCode: "",
            playerName: ""
        };
    }
    componentDidMount() {
        this.props.socket.on('confirmJoinTable', data => {
            this.setState({ tableCode: data.tableCode });
        });
    }
    createTable = () => {
        if (this.state.playerName != "") {
            this.props.socket.emit('createTable', { "playerName": this.state.playerName });
        } else {
            alert("Enter All Inputs");
        }
    }

    onPlayerNameChange = (e) => {
        this.setState({ playerName: e.target.value });
    }
    render() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Enter Lobby Code and Player Name</Form.Label>
                    <br />
                    <Form.Control type="text" onChange={this.onPlayerNameChange} placeholder="Enter Player Name" />
                    <br />
                </Form.Group>
                <Button disabled={this.state.playerName == ""} onClick={this.createTable} variant="primary" type="button">
                    Create
                </Button>
            </Form>
        );
    }
}

export default LobbyCreate;