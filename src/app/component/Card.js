import React from 'react'
import cardback from '../images/card/image001.jpg'
import Draggable from 'react-draggable';

var cardHeight = 80;
var cardWidth = 0.75 * cardHeight;

export default class Card extends React.Component {
    constructor(props) {
        super();
        // this.handleClick = this.handleClick.bind(this)
        this.state = {
            drag: false,
            frontSide: false,
            backSide: true,
            posX: 100,
            posY: 100,
            tempX: 0,
            tempY: 0,
            offsetX: 300,
            offsetY: 300,
            imageId: "abc.jpg"
        }
    }

    componentDidMount() {
        this.props.socket.on('confirmStartDrag', data => {
            if (data.cardId == this.props.cardId && data.flag) {
                this.setState({ "drag": true });
            }
            //this.setState({ tableCode: data.tableCode });
        });

        this.props.socket.on('confirmMidDrag', data => {
            if (data.cardId == this.props.cardId) {
                this.setState({ "posX": data.posX, "posY": data.posY });
            }
            //this.setState({ tableCode: data.tableCode });
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

        console.log("starDrag");

        this.setState({ offsetX: e.clientX, offsetY: e.clientY });

        if (!targ.style.left) { targ.style.left = '0px' };
        if (!targ.style.top) { targ.style.top = '0px' };


        console.log(e.clientX);
        console.log(targ.style.left);

        this.setState({ tempX: this.state.posX, tempY: this.state.posY })

        this.props.socket.emit('startDrag', { "tableCode": this.props.tableCode, "cardId": this.props.cardId, "playerName": this.state.playerName, "posX": this.state.posX, "posY": this.state.posY });

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
            "tableCode": this.props.tableCode, "cardId": this.props.cardId, "playerName": this.state.playerName, "posX": this.state.posX, "posY": this.state.posY
        });
        document.onmouseup = this.stopDrag;
        return false;
    }

    stopDrag = (e) => {
        this.setState({ drag: false })
        this.props.socket.emit('endDrag', { "tableCode": this.props.tableCode, "cardId": this.props.cardId, "playerName": this.state.playerName, "posX": this.state.posX, "posY": this.state.posY });

    }

    render() {
        return (
            <Draggable
                position={{
                    x: this.state.posX, y: this.state.posY
                }}
                onStart={this.startDrag}
            >
                <div style={{ position: 'absolute' }}>
                    <img src={cardback} alt='card' height={cardHeight} width={cardWidth} />
                </div>
            </Draggable>

        );
    }
}