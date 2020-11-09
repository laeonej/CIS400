import React from 'react'
import Card from './Card'



export default class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tableId: this.props.tableId,
            numOfCards: this.props.cardNum,
            cards: []
        }
    }


    render() {
        return(
            <div style={{backgroundColor: 'green', height: 400, width: 800, 
            borderStyle: 'solid', borderWidth: 2, borderColor: 'black'}}>
                {/* make these draggable */}
                <Card/>
                <Card/>
            </div>
        );
    }
}
