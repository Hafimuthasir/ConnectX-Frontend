import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { SearchContext } from '../contexts/SearchValue';
import { useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#333',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  let {successAlert, setSuccessAlert,successMsg} = React.useContext(SearchContext);
  const handleOpen = () => setSuccessAlert(true);
  const handleClose = () => setSuccessAlert(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setSuccessAlert(false);
  //   }, 2000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  setTimeout(() => {
    handleClose();
  }, 1800);


  return (
    <div>
      <Modal
        open={successAlert}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
        <Typography sx={{textAlign:"center"}} color="green" id="modal-modal-title" variant="h3" component="h2">
        Successful...<CheckCircleIcon sx={{ fontSize: "3rem", mb: 2}}/>
      </Typography>
        
          {/* <Typography id="modal-modal-description"  variant='h5' sx={{ mt: 2,color:"darkgrey" }}>
            {successMsg} <br></br>Click outside to proceed..?
          </Typography> */}

        </Box>
      </Modal>
    </div>
  );
}