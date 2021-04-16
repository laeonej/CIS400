import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import PlayerInfo from './PlayerInfo.js';

function PlayerInfoCard(props) {

    const player = props.player
    const playerName = props.playerName

    return (
        <Dialog
            open={props.open}
            onClose={props.menuClose}
        >
            <DialogTitle>User: {player}</DialogTitle>
            <DialogContent>
                <PlayerInfo name={player} />
            </DialogContent>
            <DialogActions>
                <Button disabled={props.isGuest || playerName === player} onClick={props.addFriendButton}>
                    {props.buttonName}
                </Button>
                <Button disabled={playerName === player}>
                    Message
            </Button>
                <Button disabled={playerName === player} color="secondary" autoFocus>
                    Mute
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PlayerInfoCard