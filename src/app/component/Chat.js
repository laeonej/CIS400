import React, { useState } from 'react'
//import the css here

export const Chat = (props) => {
    let hide = {
        display: 'none',
    }
    let show = {
        display: 'block'
    }
    let textRef = React.createRef()
    const [messages, setMessages] = useState([])

    const [chatopen, setChatopen] = useState(false)
    const toggle = e => {
        setChatopen(!chatopen)
    }

    const handleSend = e => {
        setMessages(messages.concat(textRef.current.value))
    }

    return (
        <div id='chatCon'>
            <div class="chat-box" style={chatopen ? show : hide}>
                <div class="header">Chat with me</div>
                <div class="msg-area">
                    {
                        messages.map((msg, i) => (
                            i % 2 ? (
                                <div>
                                    <p class="right"><span>{msg}</span></p>
                                </div>
                            ) : (
                                <div>
                                    <p>{props.playerName}</p>

                                    <p class="left"><span>{msg}</span></p>
                                </div>
                            )
                        ))
                    }
                    <div class="anchor"></div>
                </div>
                <div class="footer">
                    <input type="text" ref={textRef} />
                    <button onClick={handleSend}>Send</button>
                </div>
            </div>
            <div class="pop">
                <p><img onClick={toggle} src="https://p7.hiclipart.com/preview/151/758/442/iphone-imessage-messages-logo-computer-icons-message.jpg" alt="" /></p>
            </div>
        </div>
    )
}

export default Chat