import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { SearchContext } from '../contexts/SearchValue';
import { useEffect } from 'react';

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
  let {successAlert, setSuccessAlert} = React.useContext(SearchContext);
  const handleOpen = () => setSuccessAlert(true);
  const handleClose = () => setSuccessAlert(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessAlert(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);


  return (
    <div>
      <Modal
        open={successAlert}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         
        <Typography color="green" id="modal-modal-title" variant="h3" component="h2">
        Successful...!
      </Typography>
        
          <Typography id="modal-modal-description"  variant='h5' sx={{ mt: 2,color:"darkgrey" }}>
            This alert box is now in testing stage for adding more function
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}