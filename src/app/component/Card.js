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
            imageId: "abc.jpg"
        }
    }

    startDrag = (e) => {
        // determine event object
        if (!e) {
            var e = window.event;
        }
        if (e.preventDefault) e.preventDefault();

        // IE uses srcElement, others use target
        var targ = e.target ? e.target : e.srcElement;

        if (targ.className != 'dragme') { return };
        // calculate event X, Y coordinates

        this.setState({ offsetX: e.clientX, offsetY: e.clientY });

        // assign default values for top and left properties
        if (!targ.style.left) { targ.style.left = '0px' };
        if (!targ.style.top) { targ.style.top = '0px' };

        // calculate integer values for top and left 
        // properties

        this.setState({ posX: parseInt(targ.style.left), posY: parseInt(targ.style.left) })
        this.setState({ drag: true })

        // move div element
        document.onmousemove = this.dragDiv;
        return false;

    }
    dragDiv = (e) => {
        if (!this.state.drag) { return };
        if (!e) { var e = window.event };
        var targ = e.target ? e.target : e.srcElement;
        // move div element
        targ.style.left = this.state.posX + e.clientX - this.state.offsetX + 'px';
        targ.style.top = this.state.posY + e.clientY - this.state.offsetY + 'px';
        return false;
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