import React from 'react'
import Card from './Card';
import cardFront from '../images/cardFronts/cardFront.js'
import { Button } from 'react-bootstrap';

class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            posX: 0,
            posY: 0,
            offsetX: 0,
            offsetY: 0,
            drag: false
        }
    }

    componentWillMount() {
        let cardDiv = cardFront.map(({ id, src }) =>
            <Card frontSide={src} tableCode={this.props.tableCode} cardId={id} socket={this.props.socket} playerName={this.props.playerName} />
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

        this.setState({ offsetX: e.clientX, offsetY: e.clientY, currPlayer: this.props.playerName });

        if (!targ.style.left) { targ.style.left = '0px' };
        if (!targ.style.top) { targ.style.top = '0px' };

        this.setState({ tempX: this.state.posX, tempY: this.state.posY })


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
    }


    render() {
        return (
            <div style={{ position: "absolute", top: this.state.posY, left: this.state.posX }}>
                <Button onStart={this.startDrag} svariant="primary" type="button">
                    Exit
                    </Button>
                {this.state.cards}
            </div>

        )
    }
}
export default Deck;
