import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  // p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
//   const [search,setSearch] = React.useState

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <TextField
                    size="small"
                    placeholder="Search"
                    className="shadowclass"
                    onClick={()=>handleOpen(true)}
                    // onChange={}
                    sx={{
                      width: "50%",
                      bgcolor: "#757575",
                      borderRadius: 1.5,
                      width: "20rem",
                      height: "3rem",
                      mt: 1,
                    }}
                  />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='bg-gray-900' sx={style}>
        <List className='text-gray-400' sx={{ width: '100%', maxWidth: 360,}}>
 


        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel className='text-gray-400'  htmlFor="filled-adornment-amount">Search</InputLabel>
          <FilledInput
            autoFocus
            id="filled-adornment-amount"
            startAdornment={<InputAdornment position="start"></InputAdornment>}
          />
        </FormControl>
     
        {/* <TextField  fullWidth
                    autoFocus
                    size="small"
                    placeholder="Search"
                    className="shadowclass"
                    onClick={()=>handleOpen(true)}
                    // onChange={}
                    sx={{
                      width: "100px",
                      bgcolor: "#757575",
                      borderRadius: 1.5,
                      width: "20rem",
                      height: "3rem",
                      mt: 1,
                    }}
                  /> */}

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Photos" />
      </ListItem>
     
    </List>
        </Box>
      </Modal>
    </div>
  );
}