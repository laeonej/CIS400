import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class TableJoin extends Component {
    constructor() {
        super();
        this.state = {
            tableCode: "",
            playerName: ""
        };
    }
    componentDidMount() {
        this.props.socket.on('confirmJoinTable', data => {
            if (data) {
                //redirect
            } else {
                alert("No Lobby");
            }
        });
    }
    joinTable = () => {
        if (this.state.tableCode != "" && this.state.playerName != "") {
            this.props.socket.emit('joinTable', { "tableCode": this.state.tableCode, "playerName": this.state.playerName });
        } else {
            alert("Enter All Inputs");
        }
    }
    onTableCodeChange = (e) => {
        this.setState({ tableCode: e.target.value });
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
                    <Form.Control type="text" onChange={this.onTableCodeChange} placeholder="Enter Table Code" />
                    <br />
                    <Form.Control type="text" onChange={this.onPlayerNameChange} placeholder="Enter Player Name" />
                    <br />
                </Form.Group>
                <Button disabled={this.state.tableCode == "" && this.state.playerName == ""} onClick={this.joinTable} variant="primary" type="button">
                    Join
                </Button>
            </Form>
        );
    }
}

export default TableJoin;