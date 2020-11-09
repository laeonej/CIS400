import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class LobbyInput extends Component {
    constructor() {
        super();
        this.state = {
            tableCode: "123",
            playerName: "123"
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
                    {/* <Form.Control type="text" placeholder="Enter Table Code" />
                    <br /> */}
                    <Form.Control type="text" value={this.state.playerName} onChange={this.onPlayerNameChange} placeholder="Enter Player Name" />
                    <br />
                </Form.Group>

                {/* <Form.Text className="text-muted">
                        Enter Your Mobile Number
                    </Form.Text> */}
                {/* <Button disabled={this.state.mobileNumber == "" && this.state.playerName == ""} onClick={this.joinTable} variant="primary" type="button">
                    Join
                </Button> */}
            </Form>

        );
    }
}

export default LobbyInput;