import React from 'react'
import Card from './Card';
import cardFront from '../images/cardFronts/cardFront.js'
import { Button } from 'react-bootstrap';
import Draggable from 'react-draggable';


class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            orphanCards: [],
            posX: 0,
            posY: 0,
            offsetX: 300,
            offsetY: 300,
            drag: false,
            type: "deck",
            deckId: 0
        }
    }

    componentDidMount() {
        this.props.socket.on('confirmStartDrag', data => {
            if (data.deckId == this.state.deckId && data.flag) {
                this.setState({ "drag": true });
            }
        });

        this.props.socket.on('confirmMidDrag', data => {
            if (data.type == "deck") {
                if (data.tableCode == this.props.tableCode &&
                    data.deckId == this.state.deckId) {
                    this.setState({
                        "posX": data.posX,
                        "posY": data.posY,
                        "currPlayer": data.playerName
                    });
                }
            }

        });

        this.props.socket.on('confirmStopDrag', data => {
            if (data.type == "deck") {
                if (data.tableCode == this.props.tableCode &&
                    data.deckId == this.state.deckId) {
                    this.setState({
                        "currPlayer": data.playerName,
                        "isPrivate": data.isPrivate,
                        "posX": data.posX,
                        "posY": data.posY
                    });
                }
            }
        });
    }

    componentWillMount() {
        let cardDiv = cardFront.map(({ id, src }) =>
            <Card
                removeCard={this.removeCard.bind(this)}
                posX={0}
                posY={0}
                // parentX={this.state.posX}
                // parentY={this.state.posY}
                // parentOffX={this.state.offsetX}
                // parentOffY={this.state.offsetY}
                frontSide={src}
                tableCode={this.props.tableCode}
                cardId={id}
                socket={this.props.socket}
                playerName={this.props.playerName} />
        );

        this.setState({
            cards: cardDiv
        })
    }

    startDrag = (e) => {
        console.log("HELP ME")
        // determine event object
        if (!e) {
            var e = window.event;
        }

        if (e.preventDefault) e.preventDefault();

        // IE uses srcElement, others use target
        var targ = e.target ? e.target : e.srcElement;

        this.setState({
            offsetX: e.clientX,
            offsetY: e.clientY,
            currPlayer: this.props.playerName
        });

        if (!targ.style.left) { targ.style.left = '0px' };
        if (!targ.style.top) { targ.style.top = '0px' };

        this.setState({ tempX: this.state.posX, tempY: this.state.posY })

        this.props.socket.emit('startDrag', {
            "tableCode": this.props.tableCode,
            "deckId": this.state.deckId,
            "playerName": this.props.playerName,
            "posX": this.state.posX,
            "posY": this.state.posY,
            "type": this.state.type
        });


        //this.props.socket.emit('startDrag', { "tableCode": this.props.tableCode, "cardId": this.props.cardId, "playerName": this.props.playerName, "posX": this.state.posX, "posY": this.state.posY });


        this.setState({ drag: true });
        document.onmouseup = this.stopDrag;

        document.onmousemove = this.dragDiv;

        return false;

    }

    dragDiv = (e) => {
        if (!this.state.drag) { return };
        if (!e) { var e = window.event };

        var left = this.state.tempX + e.clientX - this.state.offsetX + 'px';
        var top = this.state.tempY + e.clientY - this.state.offsetY + 'px';
        this.setState({ posX: parseInt(left), posY: parseInt(top) })

        this.props.socket.emit('midDrag', {
            "tableCode": this.props.tableCode,
            "deckId": this.state.deckId,
            "playerName": this.props.playerName,
            "posX": this.state.posX,
            "posY": this.state.posY,
            "type": this.state.type
        });


        document.onmouseup = this.stopDrag;
        return false;
    }

    // inBounds = () => {
    //     return (this.state.posX > 0 && this.state.posX + cardWidth < 500 &&
    //         this.state.posY > 0 && this.state.posY + cardHeight < 400)
    // }

    stopDrag = (e) => {
        // if (!this.inBounds()) {
        //     this.state.posY = this.state.posY + cardHeight > 400 ? 420 : this.state.posY < 0 ? -100 : this.state.posY;
        //     this.state.posX = this.state.posX + cardWidth > 500 ? 520 : this.state.posX < 0 ? -80 : this.state.posX;

        //     this.state.isPrivate = true;

        // }
        // if (this.state.isPrivate) {
        //     if (this.inBounds()) {
        //         this.state.isPrivate = false;
        //     }
        // }


        this.setState({ drag: false })

        this.props.socket.emit('stopDrag', {
            "tableCode": this.props.tableCode,
            "deckId": this.state.deckId,
            "playerName": this.props.playerName,
            "posX": this.state.posX,
            "posY": this.state.posY,
            "type": this.state.type
        });

    }

    removeCard(removeId) {
        var toRemove = document.getElementById(removeId);
        document.getElementById("deck").removeChild(toRemove);
        document.getElementById("orphan-container").appendChild(toRemove);

        // var findElement = this.state.cards.find(element => element.props.cardId === removeId);
        // const index = this.state.cards.indexOf(findElement)

        // console.log(this.state.cards.length)
        // console.log(findElement)
        // this.state.orphanCards.push(index)
        // // this.state.cards.splice(index, 1)

        // this.setState({
        //     cards: this.state.cards,
        //     orphanCards: this.state.orphanCards
        // })
    }

    // deal(positions) {
    //     var currCards = document.getElementById("deck").getElementsByClassName("card");
    //     let randIdx = Math.floor(Math.random() * currCards.length);

    //     var dealtCard = currCards[randIdx];
    // }

    // dealChild() {
    //     this.state.posX = 450;
    //     this.state.posY = 450;
    // }

    render() {
        // let deckCards = [...this.state.cards].filter(function (val, idx) {
        //     return this.state.orphanCards.indexOf(idx) == -1;
        // });
        // let orphanCards = [...this.state.cards].filter(function (val, idx) {
        //     return this.state.orphanCards.indexOf(idx) != -1;
        // });
        return (
            <div>
                <div id="deck" style={{
                    position: "relative",
                    top: this.state.posY, left: this.state.posX
                }}>
                    <Draggable
                        onStart={this.startDrag}
                    >
                        <div>hELLO</div>
                    </Draggable>
                    {this.state.cards}
                </div>
                <div id="orphan-container">
                    {this.state.orphanCards}
                </div>
            </div>

        )
    }
}
export default Deck;
