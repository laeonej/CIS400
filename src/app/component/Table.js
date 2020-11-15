import React from 'react'
import Card from './Card'
import { Form, Button } from 'react-bootstrap';

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableId: this.props.tableId,
            numOfCards: this.props.cardNum,
            cards: [],
            playerName: "laeone",
            players: ['laeone', 'younghu', 'jeff', 'james']
        }
    }

    exitTable = () => {
        this.props.changeInfo({ "tableCode": null, "playerName": null });
    }

    render() {
        return (
            <div style={{
                backgroundColor: 'green', height: 400, width: 800,
                borderStyle: 'solid', borderWidth: 2, borderColor: 'black'
            }}>
                {/* make these draggable */}
                <Card tableCode={this.props.tableCode} socket={this.props.socket} cardNum={1} />
                <Card tableCode={this.props.tableCode} socket={this.props.socket} cardNum={2} />

                <h2> {this.props.tableCode} </h2>
                <div> {this.state.players.map((player, index) => (
                    <p key={index}> {player} </p>
                ))}
                </div >


                <Button onClick={this.exitTable} variant="primary" type="button">
                    Exit
                </Button>
            </div>

        );
    }
}
export default Table;
