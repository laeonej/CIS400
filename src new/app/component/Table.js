import React, { useState, useEffect, useContext, useRef } from 'react'
import Deck from './Deck';
import Image from './Image'
import ReactDOM from 'react-dom';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import PlayerInfo from './PlayerInfo.js';
import { acceptFriend, areFriendsWith, didRequest, hasFriendPending, sendRequest, removeFriend } from '../firebase.js'
import { UserContext } from '../../provider/UserProvider';
import PlayerInfoCard from './PlayerInfoCard';


// class Table extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handlePlayerMenuOpen = this.handlePlayerMenuOpen.bind(this)
//         this.handlePlayerMenuClose = this.handlePlayerMenuClose.bind(this)
//         this.sendInvite = this.sendInvite.bind(this)
//         this.state = {
//             images: [],
//             previewUrls: [],
//             tableLeft: 200,
//             tableTop: 300,
//             open: [false, false, false, false],
//             currPlayer: this.props.playerName,
//             isGuest: false
//         }
//     }

    

//     handlePlayerMenuOpen(index) {
//         let temp = this.state.open;
//         temp[index] = true
//         this.setState({ open: temp });
//     }

//     handlePlayerMenuClose(index) {
//         let temp = this.state.open;
//         temp[index] = false
//         this.setState({ open: temp });
//     }

//     componentDidMount() {
//         console.log(this.props.playerName)
//         console.log(this.props.players)
//         this.updateDimensions();
//         window.addEventListener('resize', this.updateDimensions);

//         this.props.socket.on('confirmAddImage', data => {
//             if (data.tableCode === this.props.tableCode) {
//                 const newImage = <Image src={data.src}
//                     tableCode={data.tableCode}
//                     socket={this.props.socket} />
//                 this.state.images.push(newImage)
//                 this.setState({ images: this.state.images })
//             }
//         });
//     }


    



//     updateDimensions = () => {
//         this.setState({ width: window.innerWidth, height: window.innerHeight });
//         var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
//         this.setState({ tableLeft: rect.left, tableTop: rect.top });
//     };

//     exitTable = () => {
//         this.props.socket.emit("exitTable", {
//             "tableCode": this.props.tableCode,
//             "playerName": this.props.playerName
//         })
//         this.props.changeInfo({ "tableCode": null, "playerName": null });
//     }

//     handleFile(file) {
//         //you can carry out any file validations here...
//         const url = URL.createObjectURL(file)
//         const newImage = <Image
//             src={url}
//             tableCode={this.props.tableCode}
//             socket={this.props.socket} />
//         this.state.images.push(newImage)
//         this.setState({ images: this.state.images })
//         this.props.socket.emit("addImage", {
//             src: url,
//             tableCode: this.props.tableCode
//         })

//         //this.setState({ images: , previewUrl: URL.createObjectURL(file) })
//         //console.log(this.state.previewUrl)
//     }

//     handleDragOver(event) {
//         event.preventDefault();
//     }

//     handleDrop = (event) => {
//         //prevent the browser from opening the image
//         event.preventDefault();
//         event.stopPropagation();
//         //let's grab the image file
//         let imageFile = event.dataTransfer.files[0];
//         this.handleFile(imageFile);
//     }

//     sendInvite(tgtName) {
//         console.log('Send invite called')
//         sendRequest(this.state.currPlayer, tgtName)
//     }
    
//     render() {
//         return (
//             <div id="table " className="wrapper" onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
//                 <div style={{
//                     backgroundColor: 'green', height: 400, width: 500,
//                     borderStyle: 'solid', borderWidth: 2, borderColor: 'black'
//                 }}>
//                     <Deck tableTop={this.state.tableTop} tableLeft={this.state.tableLeft} tableCode={this.props.tableCode} socket={this.props.socket} playerName={this.props.playerName} />

//                     {this.state.previewUrl && <div className="image">
//                         <img src={this.state.previewUrl} alt='img' />
//                         <span> {this.state.image.name} </span>
//                     </div>}

//                     <h2> {this.props.tableCode} </h2>
//                     {this.props.players ?
//                         <div> {[...this.props.players].map((player, index) => (
//                             <div>
//                                 <span on onClick={() => this.handlePlayerMenuOpen(index)}>{player}</span>
//                                 <Dialog
//                                     open={this.state.open[index]}
//                                     onClose={() => this.handlePlayerMenuClose(index)}
//                                 >
//                                     <DialogTitle>User: {player}</DialogTitle>
//                                     <DialogContent>
//                                         <PlayerInfo name={player} />
//                                     </DialogContent>
//                                     <DialogActions>
//                                         <Button valudisabled={true} onClick={() => this.sendInvite(player)}>
//                                             Add Friend
//                                         </Button>
//                                         <Button onClick={() => this.handlePlayerMenuClose(index)}>
//                                             Message
//                                         </Button>
//                                         <Button onClick={() => this.handlePlayerMenuClose(index)} color="secondary" autoFocus>
//                                             Mute
//                                         </Button>
//                                     </DialogActions>
//                                 </Dialog>

//                             </div>

//                         )
//                         )}
//                         </div > :
//                         <div></div>
//                     }

//                     <div style={{ position: "absolute", top: 300, left: 200 }}>{this.state.images}</div>

//                     <Button onClick={this.exitTable} variant="primary" type="button">
//                         Exit
//                     </Button>
//                 </div>
//             </div >
//         );
//     }
// }

function Table(props) {
    const user = useContext(UserContext)
    
    
    // states
    const [images, setImages] = useState([])
    const [previewUrls, setPreviewUrls] = useState([])
    const [tableLeft, setTableLeft] = useState(200)
    const [tableTop, setTableTop] = useState(300)
    const [open, setOpen] = useState([false, false, false, false]) // may change based on max players
    const [isGuest, setIsGuest] = useState(true)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    let playerName = null

    useEffect(() => {

        if(user !== null || user !== undefined) {
            setIsGuest(false)
            playerName = user.displayName
        }

        updateDimensions()
        window.addEventListener('resize', updateDimensions);
        
        props.socket.on('confirmAddImage', data => {
            if (data.tableCode === props.tableCode) {
                const newImage = <Image src={data.src}
                    tableCode={data.tableCode}
                    socket={props.socket} />
                let currImage = images
                currImage.push(newImage)
                setImages(currImage)
            }
        })
    },[props, images])

    function handlePlayerMenuOpen(index) {
        console.log('opened')
        let temp = open
        temp[index] = true
        setOpen([...temp])
    }

    function handlePlayerMenuClose(index) {
        console.log('closed')
        let temp = open
        temp[index] = false
        setOpen([...temp])
    }

    function updateDimensions() {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
        // console.log(ReactDOM.findDOMNode())
        // var rect = ReactDOM.findDOMNode(useRef.current).getBoundingClientRect();
        // setTableLeft(rect.left)
        // setTableTop(rect.top)
    };


    // may need fixing
    function exitTable() {
        props.socket.emit("exitTable", {
            "tableCode": props.tableCode,
            "playerName": props.playerName
        })
        props.changeInfo({ "tableCode": null, "playerName": null });
    }

    function handleFile(file) {
        //you can carry out any file validations here...
        const url = URL.createObjectURL(file)
        const newImage = <Image
            src={url}
            tableCode={props.tableCode}
            socket={props.socket} />
        
        let currImage = images
        currImage.push(newImage)
        setImages(currImage)
        props.socket.emit("addImage", {
            src: url,
            tableCode: props.tableCode
        })

        //this.setState({ images: , previewUrl: URL.createObjectURL(file) })
        //console.log(this.state.previewUrl)
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        //prevent the browser from opening the image
        event.preventDefault();
        event.stopPropagation();
        //let's grab the image file
        let imageFile = event.dataTransfer.files[0];
        handleFile(imageFile);
    }

    async function friendButtonClick(tgtName) {
        // if has pending invite from them add friend
        if (await hasFriendPending(playerName, tgtName)) {
            acceptFriend(playerName, tgtName)
        } else if (await didRequest(playerName, tgtName)) {
            return
        } else if (!(await areFriendsWith(playerName, tgtName))) {
            //send request
            sendRequest(playerName, tgtName)
        } else {
            // are you sure (implement later)
            //remove friend
            removeFriend(playerName, tgtName)
        }       
    }

    function buttonName(tgtName) {
        if (playerName === tgtName) {
            console.log(tgtName)
            return 'Add Friend'
        } else if (hasFriendPending(playerName, tgtName)) {
            return 'Accept'
        } else {
            return 'Add Friend'
        }
    }

    return (
        <div id="table " className="wrapper" onDragOver={handleDragOver} onDrop={handleDrop}>
            <div style={{
                backgroundColor: 'green', height: 400, width: 500,
                borderStyle: 'solid', borderWidth: 2, borderColor: 'black'
            }}>
                <Deck tableTop={tableTop} tableLeft={tableLeft} tableCode={props.tableCode} socket={props.socket} playerName={playerName} />

                {/* {previewUrl && <div className="image">
                    <img src={previewUrl} alt='img' />
                    <span> {image.name} </span>
                </div>} */}

                <h2> {props.tableCode} </h2>
                {props.players ?
                    <div> {[...props.players].map((player, index) => (
                        <div>
                            <span onClick={() => handlePlayerMenuOpen(index)}>{player}</span>
                            {/* <PlayerInfoCard 
                                open={open[index]} 
                                player={player} 
                                playerSrc={playerName}
                                menuClose={() => handlePlayerMenuClose(index)}
                                isGuest={isGuest}
                                buttonName={"Add Friend"}
                                addFriendButton={() => friendButtonClick(player)}
                            /> */}
                            <Dialog
                                open={open[index]}
                                onClose={() => handlePlayerMenuClose(index)}
                            >
                                <DialogTitle>User: {player}</DialogTitle>
                                <DialogContent>
                                    <PlayerInfo name={player} />
                                </DialogContent>
                                <DialogActions>
                                    <Button disabled={isGuest || playerName === player} onClick={() => friendButtonClick(player)}>
                                        {buttonName(player)}
                                    </Button>
                                    <Button disabled={playerName === player} onClick={() => handlePlayerMenuClose(index)}>
                                        Message
                                    </Button>
                                    <Button disabled={playerName === player} onClick={() => handlePlayerMenuClose(index)} color="secondary" autoFocus>
                                        Mute
                                    </Button>
                                </DialogActions>
                            </Dialog>

                        </div>

                    )
                    )}
                    </div > :
                    <div></div>
                }

                <div style={{ position: "absolute", top: 300, left: 200 }}>{images}</div>

                <Button onClick={exitTable} variant="primary" type="button">
                    Exit
                </Button>
            </div>
        </div >
    );

}

export default Table;
