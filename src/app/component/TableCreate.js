import React, { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { UserContext } from '../../provider/UserProvider'

function TableCreate(props) {

    const user = useContext(UserContext)

    const [playerName, setPlayerName] = useState('')
    const [isGuest, setIsGuest] = useState(true)


    useEffect(() => {
        props.socket.on('confirmCreateTable', data => {
            props.changeInfo({"tableCode": data.tableCode, "playerName": playerName, "players": data.players });
        })

        
        if (user !== null && user !== undefined) {
            setPlayerName(user.displayName)
            setIsGuest(false)
        }
    }, [props, user, playerName])

    function onPlayerNameChange(e) {
        setPlayerName(e.target.value);
    }

    function createTable() {
        if (playerName !== "") {
            props.socket.emit('createTable', { "playerName": playerName });
        } else {
            alert("Enter All Inputs");
        }
    }

    
    return (
        <Form>
            <Form.Group>
                <Form.Label>Enter Lobby Code</Form.Label>
                <br />
                <Form.Control 
                    type="text" 
                    onChange={onPlayerNameChange} 
                    placeholder="Enter Player Name"
                    value = {playerName}
                    disabled = {!isGuest} />
                <br />
            </Form.Group>
            <Button disabled={playerName === ""} onClick={createTable} variant="primary" type="button">
                Create
            </Button>
        </Form>
    );
}

export default TableCreate;