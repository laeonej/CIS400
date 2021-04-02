import React, { useContext, useEffect, useState } from 'react'
import MainMenu from './MenuComponents/MainMenu'
import TableCreate from './MenuComponents/TableCreate'
import TableJoin from './MenuComponents/TableJoin'
import Table from '../../component/Table'
import { updateAnalytics, hasFriendPending } from '../../firebase.js'
import io from "socket.io-client";
import { UserContext } from '../../../provider/UserProvider'

export default function Menu(props) {

    const user = useContext(UserContext)

    const [menu, setMenu] = useState(true)
    const [createPage, setCreatePage] = useState(false)
    const [joinPage, setJoinPage] = useState(false)
    const [endPoint, setEndPoint] = useState("http://localhost:5000")
    const [socket, setSocket] = useState(null)
    const [inGame, setInGame] = useState(false)
    const [tableCode, setTableCode] = useState('AAAA11')
    const [players, setPlayers] = useState(null)
    const [playerName, setPlayerName] = useState(null)
    const [isGuest, setIsGuest] = useState(true)
    const [test, setTest] = useState('not working')

    useEffect(async () => {
        // componentDidmount
        const socket = io(endPoint, { transports: ['websocket'] })
        socket.on("connected", data => {
            setSocket(socket)
            //updateAnalytics({ "id": data.id, "type": "numConnections" })
        })

        socket.on('confirmCreateTable', async (data) => {
            confirmCreateTableChangeInfo(data)
        })

        if (user !== null && user !== undefined) {
            setPlayerName(user.displayName)
            setIsGuest(false)
        }

        socket.on("confirmNewPlayer", data => {
            if (data.tableCode === tableCode) {
                setPlayers(data.players)

            }
        });
        return () => {
            // componentWillUnmount
            //updateAnalytics({ "type": "numDisconnections" })
        }
    }, [])

    function confirmCreateTableChangeInfo(data) {

        setTableCode(data.tableCode)
        setPlayers(data.players)
    }

    function createGame(enteredPlayerName) {
        setPlayerName(enteredPlayerName)
        socket.emit('createTable', { 'playerName': enteredPlayerName })
        updateAnalytics({ "type": "numTablesCreated" })

        console.log(tableCode)
        console.log(players)
        setCreatePage(false)
        setInGame(true)
    }

    // may need fixing
    function exitTable() {
        console.log('exitTable() called')
        socket.emit("exitTable", {
            "tableCode": tableCode,
            "playerName": playerName
        })
        setTableCode(null)
        setPlayerName(null)
        setInGame(false)
        setMenu(true)
    }

    async function joinGame(enteredTableCode, enteredPlayerName) {
        console.log("joinGame called")
        await socket.emit('joinTable', { "tableCode": enteredTableCode, "playerName": enteredPlayerName })
        await socket.on('confirmJoinTable', data => {
            if (data.flag) {
                setTableCode(enteredTableCode)
                setPlayerName(enteredPlayerName)
                setPlayers(data.players)
                updateAnalytics({ "type": "numTablesJoined" })
                setJoinPage(false)
                setInGame(true)
            } else {
                alert("No Lobby");
            }
        })
    }

    function handleCreateClick() {
        setMenu(false)
        setCreatePage(true)
    }

    function handleJoinClick() {
        setMenu(false)
        setJoinPage(true)
    }

    function handleBackClick() {
        setJoinPage(false)
        setCreatePage(false)
        setMenu(true)
    }

    return (
        <div>
            {
                menu &&
                <MainMenu
                    onJoinClick={handleJoinClick}
                    onCreateRoomClick={handleCreateClick}
                />
            }
            {
                createPage &&
                <TableCreate
                    onBackClick={handleBackClick}
                    makeGame={createGame}
                />
            }
            {
                joinPage &&
                <TableJoin
                    onBackClick={handleBackClick}
                    joinBtn={joinGame}
                />
            }
            {
                inGame &&
                <Table
                    players={players}
                    tableCode={tableCode}
                    socket={socket}
                    playerName={playerName}
                    isGuest={isGuest}
                    exit={exitTable}
                />
            }
        </div>
    )

}

