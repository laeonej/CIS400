import React from "react"
import { getUserStats } from '../firebase.js'


export default class PlayerInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playername: this.props.name,
            wins: -1,
            loses: -1,
        }
    }

    async componentDidMount() {
        const data = await getUserStats(this.state.playername)
        this.setState({wins: data.wins, loses:data.loses})
    }

    render() {
        return (
            <>
                {/* <h2>{this.state.playername}</h2> */}
                <p> Wins: {this.state.wins} </p>
                <p> Loses: {this.state.loses} </p>
            </>
        )
    }
}