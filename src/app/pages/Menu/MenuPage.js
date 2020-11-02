import React from "react";
import Button from '../../component/Button/Button.js';

export class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lobby: []
        }
    }

    render() {
        return (
            <div>
                <Button name='Hello'/>
                <a href='/login'>I click here to login</a>
            </div>
            
        )
    }
}