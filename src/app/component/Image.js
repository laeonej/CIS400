import React from 'react'
import Draggable from 'react-draggable';

var cardHeight = 240;
var cardWidth = 360;

export default class Image extends React.Component {
    constructor(props) {
        super();
        this.state = {
            drag: false,
            posX: 100,
            posY: 100,
            tempX: 0,
            tempY: 0,
            offsetX: 300,
            offsetY: 300,
            src: "",
            inPrivate: false,
            currPlayer: null,
            type: "image"
        }
    }

    componentDidMount() {
        this.props.socket.on('confirmStartDrag', data => {
            console.log("this is working")
            if (data.src == this.props.src && data.flag) {
                this.setState({ "drag": true });
            }
        });
        this.props.socket.on('confirmMidDrag', data => {
            console.log(data.src)
            console.log(this.props.src)
            if (data.tableCode == this.props.tableCode &&
                data.src == this.props.src) {
                this.setState({
                    "posX": data.posX,
                    "posY": data.posY,
                    "currPlayer": data.playerName
                });
            }
        });
        this.props.socket.on('confirmStopDrag', data => {
            if (data.tableCode == this.props.tableCode &&
                data.src == this.props.src) {
                this.setState({
                    "currPlayer": data.playerName,
                    "isPrivate": data.isPrivate,
                    "posX": data.posX,
                    "posY": data.posY
                });
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

        this.setState({
            offsetX: e.clientX,
            offsetY: e.clientY,
            currPlayer: this.props.playerName
        });

        if (!targ.style.left) targ.style.left = '0px';
        if (!targ.style.top) targ.style.top = '0px';

        this.setState({ tempX: this.state.posX, tempY: this.state.posY })

        this.props.socket.emit('startDrag', {
            tableCode: this.props.tableCode,
            src: this.props.src,
            playerName: this.props.playerName,
            posX: this.state.posX,
            posY: this.state.posY,
            type: this.state.type
        });
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
            "src": this.props.src,
            "playerName": this.props.playerName,
            "posX": this.state.posX,
            "posY": this.state.posY,
            "type": this.state.type
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
            this.state.posY = this.state.posY + cardHeight > 400 ? 420 :
                this.state.posY < 0 ? -100 : this.state.posY;
            this.state.posX = this.state.posX + cardWidth > 500 ? 520 :
                this.state.posX < 0 ? -80 : this.state.posX;

            this.state.isPrivate = true;
            console.log("this is correct\n");
        }
        if (this.state.isPrivate) {
            if (this.inBounds()) {
                this.state.isPrivate = false;
            }
        }
        this.setState({ drag: false })

        this.props.socket.emit('stopDrag', {
            "tableCode": this.props.tableCode,
            "isPrivate": this.state.isPrivate,
            "src": this.props.src,
            "playerName": this.props.playerName,
            "posX": this.state.posX,
            "posY": this.state.posY,
            "type": this.state.type
        });
    }

    render() {
        return (
            <>
                {
                    <Draggable
                        position={{
                            x: this.state.posX, y: this.state.posY
                        }}
                        onStart={this.startDrag}
                    >
                        <div style={{
                            position: 'absolute',
                            display: this.state.isPrivate & (this.state.currPlayer != this.props.playerName) ? "none" : "block"
                        }}>
                            <img src={this.props.src} alt='card' height={cardHeight} width={cardWidth} />
                        </div>
                    </Draggable>
                }

            </>
        );
    }
}