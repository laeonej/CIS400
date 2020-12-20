import React from 'react'
import Card from './Card';
import cardFront from '../images/cardFronts/cardFront.js'
import { Button } from 'react-bootstrap';


class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
    }

    exitTable = () => {
        this.props.socket.emit("exitTable", { "tableCode": this.props.tableCode, "playerName": this.props.playerName })
        this.props.changeInfo({ "tableCode": null, "playerName": null });
    }

    componentWillMount() {
        console.log(this.props.playerName);
        let cardDiv = cardFront.map(({ id, src }) =>
            <Card frontSide={src} tableCode={this.props.tableCode} cardId={id} socket={this.props.socket} playerName={this.props.playerName} />
        );

        this.setState({
            cards: cardDiv
        })
    }

    render() {
        console.log(this.props.players)
        return (
            <div style={{
                backgroundColor: 'green', height: 400, width: 500,
                borderStyle: 'solid', borderWidth: 2, borderColor: 'black'
            }}>

                {this.state.cards}

                <h2> {this.props.tableCode} </h2>
                {this.props.players ?
                    <div> {[...this.props.players].map((player, index) => (
                        <p key={index}> {player} </p>
                    ))}
                    </div > :
                    <div></div>
                }

                <Button onClick={this.exitTable} variant="primary" type="button">
                    Exit
                </Button>
            </div>

        );
    }
}
export default Table;
