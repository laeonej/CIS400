import React, { useEffect, useState,} from 'react'
import MainMenu from './MenuComponents/MainMenu'
import TableCreate from './MenuComponents/TableCreate'
import TableJoin from './MenuComponents/TableJoin'
import Table from '../../component/Table'
import { updateAnalytics, hasFriendPending } from '../../firebase.js'
import io from "socket.io-client";

export default function Menu(props) {
    const [menu, setMenu] = useState(true)
    const [createPage, setCreatePage] = useState(false)
    const [joinPage, setJoinPage] = useState(false)
    const [endPoint, setEndPoint] = useState("http://localhost:5000")
    const [socket, setSocket] = useState(null)
    const [inGame, setInGame] = useState(false)

    useEffect(() => {
        // componentDidmount
        const socket = io(endPoint, {transports: ['websocket']})
        socket.on("connected", data => {
            setSocket(socket)
            console.log(data)
            //updateAnalytics({ "id": data.id, "type": "numConnections" })
        })


        return () => {
            // componentWillUnmount
            console.log('Component Unmounted')
            //updateAnalytics({ "type": "numDisconnections" })
        }
    }, [])

    function createGame() {
        console.log("createGame called")

        setCreatePage(false)
        setInGame(true)
    }

    function joinGame() {
        console.log("joinGame called")
        
        setJoinPage(false)
        setInGame(true)
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
                    />
            }
            {
                inGame &&
                    <Table

                    />
            }
        </div>
    )

}

