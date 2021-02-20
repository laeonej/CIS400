import React from 'react'
import Deck from './Deck';
import Image from './Image'
import ReactDOM from 'react-dom';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import PlayerInfo from './PlayerInfo.js';



class Table extends React.Component {
    constructor(props) {
        super(props);
        this.handlePlayerMenuOpen = this.handlePlayerMenuOpen.bind(this)
        this.handlePlayerMenuClose = this.handlePlayerMenuClose.bind(this)
        this.state = {
            images: [],
            previewUrls: [],
            tableLeft: 0,
            tableTop: 0,
            open: false,
            currPlayer: this.props.playerName,
            isGuest: false
        }
    }

    handlePlayerMenuOpen() {
        this.setState({open: true});
    }

    handlePlayerMenuClose() {
        this.setState({open: false});
    }

    componentDidMount() {
        var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
        this.setState({ tableLeft: rect.left, tableTop: rect.top });

        this.props.socket.on('confirmAddImage', data => {
            if (data.tableCode === this.props.tableCode) {
                const newImage = <Image src={data.src}
                    tableCode={data.tableCode}
                    socket={this.props.socket} />
                this.state.images.push(newImage)
                this.setState({ images: this.state.images })
            }
        });
    }

    exitTable = () => {
        this.props.socket.emit("exitTable", {
            "tableCode": this.props.tableCode,
            "playerName": this.props.playerName
        })
        this.props.changeInfo({ "tableCode": null, "playerName": null });
    }

    handleFile(file) {
        //you can carry out any file validations here...
        const url = URL.createObjectURL(file)
        const newImage = <Image
            src={url}
            tableCode={this.props.tableCode}
            socket={this.props.socket} />
        this.state.images.push(newImage)
        this.setState({ images: this.state.images })
        this.props.socket.emit("addImage", {
            src: url,
            tableCode: this.props.tableCode
        })

        //this.setState({ images: , previewUrl: URL.createObjectURL(file) })
        //console.log(this.state.previewUrl)
    }

    handleDragOver(event) {
        event.preventDefault();
    }

    handleDrop = (event) => {
        //prevent the browser from opening the image
        event.preventDefault();
        event.stopPropagation();
        //let's grab the image file
        let imageFile = event.dataTransfer.files[0];
        this.handleFile(imageFile);
    }

    render() {
        return (
            <div id="table " className="wrapper" onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
                <div style={{
                    backgroundColor: 'green', height: 400, width: 500,
                    borderStyle: 'solid', borderWidth: 2, borderColor: 'black'
                }}>
                    <Deck tableTop={this.state.tableTop} tableLeft={this.state.tableLeft} tableCode={this.props.tableCode} socket={this.props.socket} playerName={this.props.playerName} />

                    {this.state.previewUrl && <div className="image">
                        <img src={this.state.previewUrl} alt='img' />
                        <span> {this.state.image.name} </span>
                    </div>}

                    <h2> {this.props.tableCode} </h2>
                    {this.props.players ?
                        <div> {[...this.props.players].map((player, index) => (
                            <>
                            <span onClick={this.handlePlayerMenuOpen}>{player}</span>
                                    <Dialog 
                                        open={this.state.open}
                                        onClose={this.handlePlayerMenuClose}
                                    >
                                        <DialogTitle>User: {player}</DialogTitle>
                                        <DialogContent>
                                            <PlayerInfo name={player}/>
                                        </DialogContent>
                                        <DialogActions>
                                        <Button disable={true} onClick={this.handlePlayerMenuClose}>
                                            Add Friend
                                        </Button>
                                        <Button onClick={this.handlePlayerMenuClose}>
                                            Message
                                        </Button>
                                        <Button onClick={this.handlePlayerMenuClose} color="secondary" autoFocus>
                                            Mute
                                        </Button>
                                        </DialogActions>
                                    </Dialog>
                                
                            </>
                            
                        ))}
                        </div > :
                        <div></div>
                    }

                    <div style={{ position: "absolute", top: 300, left: 200 }}>{this.state.images}</div>

                    <Button onClick={this.exitTable} variant="primary" type="button">
                        Exit
                    </Button>
                </div>
            </div>
        );
    }
}
export default Table;
