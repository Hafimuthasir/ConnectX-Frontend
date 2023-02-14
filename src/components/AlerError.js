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
  let {errorAlert, setErrorAlert,errorMsg} = React.useContext(SearchContext);
  const handleOpen = () => setErrorAlert(true);
  const handleClose = () => setErrorAlert(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorAlert(false);
    }, 500);

    // return () => {
    //   clearTimeout(timer);
    // };
  }, []);


  return (
    <div>
      <Modal
        open={errorAlert}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         
        <Typography color="red" id="modal-modal-title" variant="h3" component="h2">
        Error...!
      </Typography>
        
          <Typography id="modal-modal-description"  variant='h5' sx={{ mt: 2,color:"darkgrey" }}>
            {errorMsg}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}