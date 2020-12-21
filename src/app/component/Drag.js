import React from 'react'
import cardback from '../images/card/back.jpg'
import Draggable from 'react-draggable';

var cardHeight = 80;
var cardWidth = 0.75 * cardHeight;

export default class Drag extends React.Component {
    constructor(props) {
        super();
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            drag: false,
            backSide: true,
            posX: 100,
            posY: 100,
            tempX: 0,
            tempY: 0,
            offsetX: 300,
            offsetY: 300,
            imageId: "abc.jpg",
            inPrivate: false,
            currPlayer: null
        }
    }

    componentDidMount() {


        this.props.socket.on('confirmStartDrag', data => {
            if (data.cardId == this.props.cardId && data.flag) {
                this.setState({ "drag": true });
            }
        });

        this.props.socket.on('confirmMidDrag', data => {
            if (data.tableCode == this.props.tableCode && data.cardId == this.props.cardId) {
                this.setState({ "posX": data.posX, "posY": data.posY, "currPlayer": data.playerName });
            }
        });
        this.props.socket.on('confirmStopDrag', data => {
            if (data.tableCode == this.props.tableCode && data.cardId == this.props.cardId) {
                this.setState({ "currPlayer": data.playerName, "isPrivate": data.isPrivate, "posX": data.posX, "posY": data.posY });
            }
        });
    }

    startDrag = (e) => {
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


        this.props.socket.emit('startDrag', { "tableCode": this.props.tableCode, "cardId": this.props.cardId, "playerName": this.props.playerName, "posX": this.state.posX, "posY": this.state.posY });

        document.onmouseup = this.handleClick;

        document.onmousemove = this.props.dragDiv;

        return false;

    }

    dragDiv = (e) => {
        if (!this.state.drag) { return };
        if (!e) { var e = window.event };

        var left = this.state.tempX + e.clientX - this.state.offsetX + 'px';
        var top = this.state.tempY + e.clientY - this.state.offsetY + 'px';
        this.setState({ posX: parseInt(left), posY: parseInt(top) })

        this.props.socket.emit('midDrag', {
            "tableCode": this.props.tableCode, "cardId": this.props.cardId, "playerName": this.props.playerName, "posX": this.state.posX, "posY": this.state.posY
        });
        document.onmouseup = this.stopDrag;
        return false;
    }



    inBounds = () => {
        return (this.state.posX > 0 && this.state.posX + cardWidth < 500 &&
            this.state.posY > 0 && this.state.posY + cardHeight < 400)
    }
    stopDrag = (e) => {


        if (!this.inBounds()) {
            this.state.posY = this.state.posY + cardHeight > 400 ? 420 : this.state.posY < 0 ? -100 : this.state.posY;
            this.state.posX = this.state.posX + cardWidth > 500 ? 520 : this.state.posX < 0 ? -80 : this.state.posX;

            this.state.isPrivate = true;
            console.log("this is correct\n");
        }
        if (this.state.isPrivate) {
            if (this.inBounds()) {
                this.state.isPrivate = false;
            }
        }
        this.setState({ drag: false })


        this.props.socket.emit('stopDrag', { "tableCode": this.props.tableCode, "isPrivate": this.state.isPrivate, "cardId": this.props.cardId, "playerName": this.props.playerName, "posX": this.state.posX, "posY": this.state.posY });
    }

    render() {
        return (
            <>
                {this.state.backSide ?
                    <Draggable
                        position={{
                            x: this.state.posX, y: this.state.posY
                        }}
                        onStart={this.startDrag}
                    >
                        <div style={{ position: 'absolute', display: this.state.isPrivate & (this.state.currPlayer != this.props.playerName) ? "none" : "block" }}>
                            <img src={cardback} alt='card' height={cardHeight} width={cardWidth} />
                        </div>
                    </Draggable>

                    :

                    <Draggable
                        position={{
                            x: this.state.posX, y: this.state.posY
                        }}
                        onStart={this.startDrag}
                    >
                        <div style={{ position: 'absolute', display: this.state.isPrivate & (this.state.currPlayer != this.props.playerName) ? "none" : "block" }}>
                            <img src={this.props.frontSide} alt='card' height={cardHeight} width={cardWidth} />
                        </div>
                    </Draggable>

                }

            </>
        );
    }
}