import React from 'react'
import cardback from '../images/card/image001.jpg'


var cardHeight = 80;
var cardWidth = 0.75 * cardHeight;




export default class Card extends React.Component {
    constructor(props) {
        super(props)
        // this.handleClick = this.handleClick.bind(this)
        this.state = {
            frontSide: false,
            backSide: true,
            posX: 0,
            posY: 0
        }
    }


    render() {
        return (
            <div style={{ position: 'absolute' }}>
                <img src={cardback} alt='card' height={cardHeight} width={cardWidth} />
            </div>

        );
    }
}