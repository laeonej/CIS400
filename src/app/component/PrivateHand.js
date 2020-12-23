import React from 'react'
// import cardback from '../images/card/back.jpg'
// import Draggable from 'react-draggable';

// var cardHeight = 80;
// var cardWidth = 0.75 * cardHeight;

export default class PrivateHand extends React.Component {
    constructor(props) {
        super(props);
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

        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div class="privatediv">
                Hey there
            </div>
        )
    }
}