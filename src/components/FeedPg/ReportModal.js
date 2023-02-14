import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem } from '@mui/material';
import axios from '../../axios/adminAxios';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import ReportIcon from '@mui/icons-material/Report';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#272727',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  let {user} = useContext(AuthContext) 

  const handleReport = (option) => {
    
    const details = {user:user.user_id,post:props.postid,opt:option}
   
    axios.post('reportpost',details).then((response)=>{
        console.log('looooooooooooooooo',response.data);
        if (response.status === 200){
            alert('success')
        }else{
            alert('Something Went Wrong....!')
        }
    })
  }

  return (
    <div>
        
        <Button sx={{m:1}} color="error" variant="contained" onClick={handleOpen}>Report this Post&nbsp;<ReportIcon/> </Button>
    
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography color="#bababa" variant="h4">Why you are reporting this post ?</Typography><br></br>
        <MenuItem onClick={()=>handleReport(1)} sx={{color:"#bababa"}}>Not related to Information Technology</MenuItem>
        <MenuItem onClick={()=>handleReport(2)} sx={{color:"#bababa"}}>Contains pornographic content</MenuItem>
        <MenuItem onClick={()=>handleReport(3)} sx={{color:"#bababa"}}>Voilence activities</MenuItem>
        <MenuItem onClick={()=>handleReport(4)} sx={{color:"#bababa"}}>Harrassing on you or anyone else</MenuItem>
        </Box>
      </Modal>
    </div>
  );
}