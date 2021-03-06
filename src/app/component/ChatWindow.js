import React, { Component } from 'react'
import { Launcher } from 'react-chat-window'

export default class ChatWindow extends Component {
    constructor() {
        super();
        this.state = {
            messageList: []
        };
    }

    componentDidMount() {
        this.props.socket.on('messageSent', data => {
            this.setState({
                messageList: [...this.state.messageList, data.message]
            })
        });
    }

    _onMessageWasSent(message) {
        this.setState({
            messageList: [...this.state.messageList, message]
        })
        this.props.socket.emit("sendMessage", {
            "message": message
        })
    }

    // _sendMessage(text) {
    //     if (text.length > 0) {

    //         let message =
    //         {
    //             author: this.props.playerName,
    //             type: 'text',
    //             data: { text }
    //         }
    //         this.setState({
    //             messageList: [...this.state.messageList, message]
    //         })
    //         console.log(message)

    //     }
    //}

    render() {
        return (<div>
            <Launcher
                agentProfile={{
                    teamName: 'Room Chat',
                    imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                }}
                onMessageWasSent={this._onMessageWasSent.bind(this)}
                messageList={this.state.messageList}
                showEmoji
            />
        </div>)
    }
}