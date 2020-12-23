import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { UserContext } from '../../provider/UserProvider'

function TableJoin(props) {
    
    const user = useContext(UserContext)

    const [tableCode, setTableCode] = useState('')
    const [playerName, setPlayerName] = useState('')

    useEffect(() => {
        props.socket.on('confirmJoinTable', data => {
            if (data.flag) {
                props.changeInfo({ "tableCode": tableCode, "playerName": playerName, "players": data.players });
            } else {
                alert("No Lobby");
            }
        })

        
        if (user !== null && user !== undefined) {
            setPlayerName(user.displayName)
        }
    }, [props, tableCode, playerName, user])

    function joinTable() {
        if (tableCode !== "" && playerName !== "") {
            props.socket.emit('joinTable', { "tableCode": tableCode, "playerName": playerName });
        } else {
            alert("Enter All Inputs");
        }
    }

    function onTableCodeChange(e) {
        setTableCode(e.target.value)
    }

    function onPlayerNameChange(e) {
        setPlayerName(e.target.value)
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label>Enter Lobby Code and Player Name</Form.Label>
                <br />
                    <Form.Control type="text" onChange={onTableCodeChange} placeholder="Enter Table Code" />
                    <br />
                    <Form.Control 
                        type="text" 
                        onChange={onPlayerNameChange} 
                        placeholder="Enter Player Name" 
                        value={playerName}
                        disabled={playerName ? true : false}/>
                    <br />
                </Form.Group>
                <Button disabled={tableCode === "" && playerName === ""} onClick={joinTable} variant="primary" type="button">
                    Join
                </Button>
            </Form>
            );
}


export default TableJoin;