import React from 'react'
import Card from './Card';
import cardFront from '../images/cardFronts/cardFront.js'
import { Button } from 'react-bootstrap';


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

    componentWillMount() {
        console.log("hello world")
        let cardDiv = cardFront.map(({id, src}) => 
            <Card frontSide={src} tableCode={this.props.tableCode} cardId={id} socket={this.props.socket} />
        );

        this.setState({
            cards: cardDiv
        })
    }

    

    render() {
        return (
            <div style={{
                backgroundColor: 'green', height: 400, width: 800,
                borderStyle: 'solid', borderWidth: 2, borderColor: 'black'
            }}>

                {this.state.cards}
                
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
