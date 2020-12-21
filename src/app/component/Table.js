import React, { useState, useRef } from 'react'
import Deck from './Deck';
import Card from './Card';
import cardFront from '../images/cardFronts/cardFront.js'
import { Button } from 'react-bootstrap';
import Image from './Image'

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            previewUrls: []
        }
    }

    exitTable = () => {
        this.props.socket.emit("exitTable", { "tableCode": this.props.tableCode, "playerName": this.props.playerName })
        this.props.changeInfo({ "tableCode": null, "playerName": null });
    }

    handleFile(file) {
        //you can carry out any file validations here...
        const url = URL.createObjectURL(file)
        const newImage = <Image frontSide={url} tableCode={this.props.tableCode} socket={this.props.socket} playerName={this.props.playerName} />
        this.state.images.push(newImage)
        this.setState({ images: this.state.images })
        this.props.socket.emit("addImage", { src: url, tableCode: this.props.tableCode })

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
            <div className="wrapper" onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
                <div style={{
                    backgroundColor: 'green', height: 400, width: 500,
                    borderStyle: 'solid', borderWidth: 2, borderColor: 'black'
                }}>
                    <Deck tableCode={this.props.tableCode} socket={this.props.socket} playerName={this.props.playerName} />

                    {this.state.previewUrl && <div className="image">
                        <img src={this.state.previewUrl} alt='image' />
                        <span> {this.state.image.name} </span>
                    </div>}

                    <h2> {this.props.tableCode} </h2>
                    {this.props.players ?
                        <div> {[...this.props.players].map((player, index) => (
                            <p key={index}> {player} </p>
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
