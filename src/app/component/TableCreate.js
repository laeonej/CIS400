import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class TableCreate extends Component {
    constructor() {
        super();
        this.state = {
            playerName: ""
        };
    }
    componentDidMount() {
        this.props.socket.on('confirmCreateTable', data => {
            console.log("this printed");
            this.props.changeInfo({ "tableCode": data.tableCode, "playerName": this.state.playerName });
            //this.setState({ tableCode: data.tableCode });
        });
    }

    onPlayerNameChange = (e) => {
        this.setState({ playerName: e.target.value });
    }

    createTable = () => {
        console.log("this is printing");
        if (this.state.playerName != "") {
            this.props.socket.emit('createTable', { "playerName": this.state.playerName });
        } else {
            alert("Enter All Inputs");
        }
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

export default TableCreate;