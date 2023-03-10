import React, { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Slider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import { SearchContext } from '../contexts/SearchValue';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ImageCropper() {
  const [image, setImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [zoom, setZoom] = useState(1);

  let {openCrop,setOpenCrop} =useContext(SearchContext)

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);


  const handleImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    setOpenCrop(true)
  };

  const handleCrop = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const croppedImageUrl = canvas.toDataURL();
      setCroppedImage(croppedImageUrl);
      const file = dataURItoBlob(croppedImageUrl);
      console.log('hhhhhhhhhh',file);
    }
    setOpenCrop(false)
  };


  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
  };


  const handleZoomChange = (event, newValue) => {
    setZoom(newValue);
  };

  return (
    <div>

<div>
      <Modal
        open={openCrop}
        onClose={setOpenCrop(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Crop Your Image
          </Typography>


          {image && (
        <>
        <AvatarEditor
        style={{maxHeight:"300px",maxWidth:"300px"}}
          ref={setEditor}
          image={image}
          width={600}
          height={600}
          border={50}
          borderRadius={0}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={zoom}
          outputFormat="jpeg"
          quality={2}
        />

        <div style={{ display: 'flex', alignItems: 'center' }}>
        <Slider
          value={zoom}
          min={1}
          max={10}
          step={0.1}
          onChange={handleZoomChange}
          style={{ flex: 1 }}
        />
        <span style={{ marginLeft: '10px' }}>{zoom}</span>
      </div>

      <Button onClick={handleCrop}>Crop Image</Button>

      </>

      )}



        </Box>
      </Modal>
    </div>


      <input type="file" onChange={handleImageChange} />
     

      
      {croppedImage && <img width={500} height={500} src={croppedImage} alt="Cropped Image" />}
    </div>
  );
}

export default ImageCropper;
