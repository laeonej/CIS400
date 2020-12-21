import React, { useState, useRef } from "react";
import './ImageUploader.css'

const ImageUploader = () => {
    const fileInput = useRef(null);
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const handleFile = file => {
        //you can carry out any file validations here...
        setImage(file);
        setPreviewUrl(URL.createObjectURL(file));
    }

    const handleDragOver = event => {
        event.preventDefault();
    }

    const handleDrop = event => {
        //prevent the browser from opening the image
        event.preventDefault();
        event.stopPropagation();
        //let's grab the image file
        let imageFile = event.dataTransfer.files[0];
        handleFile(imageFile);
    }

    return (
        <div className="wrapper">
            <div className="drop_zone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInput.current.click()}>
                <p>Drag and drop image here....</p>
                <input
                    type="file"
                    accept='image/*'
                    ref={fileInput} hidden
                    onChange={e => handleFile(e.target.files[0])}
                />
            </div>
            {previewUrl && <div className="image">
                <img src={previewUrl} alt='image' />
                <span> {image.name} </span>
            </div>}
        </div>
    )
}
export default ImageUploader;