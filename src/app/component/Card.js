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
            posX: 0,
            posY: 0,
            offsetX: 0,
            offsetY: 0,
            imageId: "abc.jpg",
            player: null
        }
    }

    componentDidMount() {
        this.props.socket.on('confirmHoldCard', data => {
            if (data.cardNum == this.props.cardNum) {
                this.setState({ player: data.player })
            }
        });
        this.props.socket.on("confirmDragCard", data => {
            console.log("card drag detec")
            if (data.cardNum == this.props.cardNum) {
                this.setState({ offsetX: data.offsetX, offsetY: data.offsetY })
            }
        });
    }

    startDrag = (e) => {
        if (this.state.player == null || this.state.player == this.props.socket.id) {
            this.props.socket.emit('holdCard', { "tableCode": this.props.tableCode, "cardNum": this.props.cardNum });
            //this.setState({ player: this.props.socket.id })
            // console.log("test touch")
            // determine event object
            if (!e) {
                var e = window.event;
            }
            if (e.preventDefault) e.preventDefault();

            // IE uses srcElement, others use target
            var targ = e.target ? e.target : e.srcElement;

            this.setState({ drag: true })

            if (targ.className != 'dragme') { return };

            //             // calculate event X, Y coordinates

            // this.setState({ offsetX: e.clientX, offsetY: e.clientY });

            // // assign default values for top and left properties
            // if (!targ.style.left) { targ.style.left = '0px' };
            // if (!targ.style.top) { targ.style.top = '0px' };

            // // calculate integer values for top and left 
            // // properties

            // 
            // 
            // console.log(this.state.drag)

            // // move div element
            // document.onmousemove = this.dragDiv;

        }

        return false;
    }

    dragDiv = (e) => {
        if (!this.state.drag) { return };
        this.setState({ offsetX: e.clientX, offsetY: e.clientY })
        this.props.socket.emit('dragCard', { "dragPlayer": this.props.socket.id, "tableCode": this.props.tableCode, "cardNum": this.props.cardNum, "offsetX": e.clientX, "offsetY": e.clientY });

    }

    stopDrag = (e) => {
        this.setState({ drag: false })

    }

    render() {
        return (
            <Draggable onStart={this.startDrag}
                onDrag={this.dragDiv}
                onStop={this.stopDrag} >
                <div style={{ position: 'absolute' }}>
                    <img src={cardback} alt='card' height={cardHeight} width={cardWidth} />
                </div>
            </Draggable>

        );
    }
}