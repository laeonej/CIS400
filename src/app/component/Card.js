import React from 'react'
import cardback from '../images/card/back.jpg'
import Draggable from 'react-draggable';

var cardHeight = 80;
var cardWidth = 0.75 * cardHeight;

export default class Card extends React.Component {
    constructor(props) {
        super();
        this.handleClick = this.handleClick.bind(this)
        this.myRef = React.createRef();
        this.state = {
            drag: false,
            backSide: true,
            type: "card",
            offsetX: 200,
            offsetY: 300,
            tempX: 0,
            tempY: 0,
            change: true
        }
    }

    handleClick() {
        this.setState({ drag: false })
        if (this.state.backSide) {
            this.setState({ backSide: false })
        } else {
            this.setState({ backSide: true })
        }

        this.props.socket.emit("flipCard", {
            inPrivate: this.props.cardData[this.props.cardId].isPrivate,
            tableCode: this.props.tableCode,
            cardId: this.props.cardId,
            backSide: this.state.backSide
        })
        document.onmouseup = null
    }

    componentDidMount() {

        // this.props.socket.on('confirmDealCard', data => {
        //     if (data.tableCode == this.props.tableCode) {
        //         this.props.changeDeck(this.props.cardId, data.inDeck)
        //     }
        // });


        this.props.socket.on('confirmFlipCard', data => {
            if (data.tableCode === this.props.tableCode &&
                data.cardId === this.props.cardId) {
                this.setState({ backSide: data.backSide });
            }
        });

        this.props.socket.on('confirmStartDrag', data => {
            if (data.cardId === this.props.cardId && data.flag) {
                this.setState({ drag : true });
            }
        });

        this.props.socket.on('confirmMidDrag', data => {
            if (data.tableCode === this.props.tableCode &&
                data.cardId === this.props.cardId) {
                this.props.changeOwner(this.props.cardId, data.playerName)
                this.props.changePos(this.props.cardId, data.posX, data.posY)
                this.setState({ change: !this.state.change })
            }
        });

        this.props.socket.on('confirmStopDrag', data => {
            if (data.tableCode === this.props.tableCode &&
                data.cardId === this.props.cardId) {
                this.props.changePrivate(this.props.cardId, data.isPrivate)
                this.props.changeOwner(this.props.cardId, data.playerName)
                this.props.changePos(this.props.cardId, data.posX, data.posY)
                this.setState({ change: !this.state.change })
            }
        });
    }

    startDrag = (e) => {
        // determine event object
        if (!e) {
            e = window.event;
        }

        if (e.preventDefault) e.preventDefault();

        // IE uses srcElement, others use target
        var targ = e.target ? e.target : e.srcElement;

        this.setState({
            offsetX: e.clientX,
            offsetY: e.clientY
        });

        this.setState({ tempX: this.props.cardData[this.props.cardId].posX, tempY: this.props.cardData[this.props.cardId].posY })
        this.props.changeOwner(this.props.cardId, this.props.playerName)

        if (!targ.style.left) targ.style.left = '0px';
        if (!targ.style.top) targ.style.top = '0px';


        this.props.socket.emit('startDrag', {
            "tableCode": this.props.tableCode,
            "cardId": this.props.cardId,
            "playerName": this.props.playerName,
            "posX": this.props.cardData[this.props.cardId].posX,
            "posY": this.props.cardData[this.props.cardId].posY,
            "type": this.state.type
        });

        document.onmouseup = this.handleClick;

        document.onmousemove = this.dragDiv;

        return false;
    }

    dragDiv = (e) => {
        if (!this.state.drag) { return };
        if (!e) { e = window.event };

        console.log("isPrivate " + this.props.cardData[this.props.cardId].isPrivate)

        console.log("posY " + this.props.cardData[this.props.cardId].posY)

        var left = this.state.tempX + e.clientX - this.state.offsetX + 'px';
        var top = this.state.tempY + e.clientY - this.state.offsetY + 'px';

        console.log("left " + left)

        this.setState({ change: !this.state.change })
        this.props.changePos(this.props.cardId, parseInt(left), parseInt(top))
        //this.setState({ posX: parseInt(left), posY: parseInt(top) })

        this.props.socket.emit('midDrag', {
            "tableCode": this.props.tableCode,
            "cardId": this.props.cardId,
            "playerName": this.props.playerName,
            "posX": this.props.cardData[this.props.cardId].posX,
            "posY": this.props.cardData[this.props.cardId].posY,
            "type": this.state.type
        });
        document.onmouseup = this.stopDrag;
        return false;
    }

    inBounds = () => {
        return (this.props.cardData[this.props.cardId].posX > -160 && this.props.cardData[this.props.cardId].posX + cardWidth < 270 &&
            this.props.cardData[this.props.cardId].posY > -160 && this.props.cardData[this.props.cardId].posY + cardHeight < 230)

    }


    componentDidUpdate(prevProps) {
        if (this.props.change !== prevProps.change) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
        {
            this.setState({ change: !this.state.change })
        }
    }

    stopDrag = (e) => {
        this.setState({ drag: false })

        if (!this.inBounds()) {
            this.props.changePos(this.props.cardId,
                this.props.cardData[this.props.cardId].posX + cardWidth > 270 ?
                    295 : this.props.cardData[this.props.cardId].posX < -255 ? -315 : this.props.cardData[this.props.cardId].posX,
                this.props.cardData[this.props.cardId].posY + cardHeight > 230 ?
                    260 : this.props.cardData[this.props.cardId].posY < -160 ? -260 : this.props.cardData[this.props.cardId].posY);
            this.props.changePrivate(this.props.cardId, true);

        }
        if (this.props.cardData[this.props.cardId].isPrivate) {
            if (this.inBounds()) {
                this.props.changePrivate(this.props.cardId, false);
            }


            this.props.socket.emit('stopDrag', {
                "tableCode": this.props.tableCode,
                "isPrivate": this.props.cardData[this.props.cardId].isPrivate,
                "cardId": this.props.cardId,
                "playerName": this.props.playerName,
                "posX": this.props.cardData[this.props.cardId].posX,
                "posY": this.props.cardData[this.props.cardId].posY,
                "type": this.state.type
            });


        }
        if (this.props.cardData[this.props.cardId].inDeck) {
            this.props.changeDeck(this.props.cardId, false);
            //this.props.removeCard(this.props.cardId)
        }
    }


    // dragAll() {
    //     if (this.state.inDeck) {
    //         this.startDrag();
    //     }
    // }

    render() {
        return (
            <Draggable
                position={{
                    x: this.props.cardData[this.props.cardId].posX, y: this.props.cardData[this.props.cardId].posY
                }}
                onStart={this.startDrag}
            >
                <div id={this.props.cardId} class="card" style={{ position: "relative" }}>
                    {this.state.backSide ?

                        <div style={{
                            position: 'absolute',
                            display: this.props.cardData[this.props.cardId].isPrivate &
                                (this.props.cardData[this.props.cardId].owner !== this.props.playerName) ? "none" : "block"
                        }}>
                            <img src={cardback} alt='card' height={cardHeight} width={cardWidth} />
                        </div>

                        :
                        <div style={{
                            position: 'absolute',
                            display: this.props.cardData[this.props.cardId].isPrivate &
                                (this.props.cardData[this.props.cardId].owner !== this.props.playerName) ? "none" : "block"
                        }}>
                            <img src={this.props.frontSide} alt='card' height={cardHeight} width={cardWidth} />
                        </div>
                    }

                </div>
            </Draggable>
        );
    }
}