import React from 'react';

interface UploadImageProps {
    value: any
}

const UploadImage = (props: UploadImageProps) => {
    const {value} = props
    const [selectedImage, setSelectedImage] = React.useState(value);
    return (
        <div>
            {selectedImage && (
                <div>
                    <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)}/>
                    <br/>
                    <button onClick={() => setSelectedImage(null)}>Remove</button>
                </div>
            )}
            <br/>

            <br/>
            <input
                accept="image/*" multiple type="file"
                name="myImage"
                onChange={(event) => {
                    // @ts-ignore
                    console.log(event?.target.files[0]);
                    // @ts-ignore
                    setSelectedImage(event.target.files[0]);
                }}
            />
        </div>
    );
};

export default UploadImage;