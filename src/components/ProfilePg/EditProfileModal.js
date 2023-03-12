import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { motion } from 'framer-motion';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import UploadFileBt from '../UploadFileBt';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import { InputLabel,Select,MenuItem,LinearProgress } from '@mui/material';
import axios from '../../axios/axios';
import { AuthContext } from '../../contexts/AuthContext';
import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';



const style = {
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  marginLeft:3,
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth:"30rem",
  // height:"40rem",
  p:1,
  maxHeight:"40rem",
  bgcolor: '#2b2b2b',
  border: '2px solid grey',
  borderRadius:2, 
  boxShadow: 24,
  color:"grey",
  overflowY:"auto"
};

export default function BasicModal() {

  let {user} = React.useContext(AuthContext)

  const [age, setAge] = React.useState('');

  const [progress,setProgress] = React.useState()

  const handleChange = (event) => {
    setLang(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFile('')
    setImage('')
  };

  const [file,setFile] = React.useState('')

  
  const [file2,setFile2] = React.useState('')
  const [file3,setFile3] = React.useState('')
    // post input hiding config
  const hiddenFileInput = React.useRef(null);
  const hiddenZFileInput = React.useRef(null);

  const [caption, setCap] = React.useState();
  const [lang, setLang] = React.useState('');
  const [repo, setRepo] = React.useState('');
  const [isZ, setIsz] = React.useState(false);
  const [zfile, setZfile] = React.useState();
  const [zDesc, setZdesc] = React.useState();
  const [isPrime,setIsprime] = React.useState()
  const [price,setPrice] =React.useState('')
  const [dprice,setDprice] = React.useState()

  const [image,setImage]  = React.useState(null)


  const handleUpload =(e) =>{
    let userid=user.user_id
   
    const formData = new FormData();
    formData.append('file',file)
    formData.append('caption',caption)
    formData.append('userid',userid)
    formData.append('repo',repo)
    formData.append('lang',lang)
    if (isZ===true){
      formData.append('is_z',isZ)
      formData.append('zfile',zfile)
      formData.append('zdescription',zDesc)
    }
    if (isPrime===true){
      formData.append('is_premium',isPrime)
      formData.append('price',price)
      formData.append('discount_price',dprice)
    }
    var dat={file,caption,userid}
    axios.post('http://localhost:8000/api/uploadPost',formData,{
      onUploadProgress:data =>{
        setProgress(Math.round((100 * data.loaded) / data.total))
      }
    }
    
    
    ).then((response)=>{
      
      if (response.data===200){
      
        // getFeed()
        handleClose()
        setFile('')
        setImage('')

  }})
  console.log('upld bt clicked')
}

  const handleplus =(e) =>{
    setFile(e.target.files[0])
    console.log('2222222222222',file);
    setImage({image:URL.createObjectURL(file)})
  }

  const handleZplus =(e) =>{
    setZfile(e.target.files[0])
  }

  const handleCap =(e) =>{
    setCap(e.target.value)
  }

  const handleClick = event => {
      hiddenFileInput.current.click();
    };
  const handleZClick = event => {
      hiddenZFileInput.current.click();
    };

    // React.useEffect(() => {
     
    // }, [file])
    
  return (
    <div>
      <Button variant="contained" size='small' sx={{height:"27px",fontSize:"0.9rem"}} color="primary" onClick={handleOpen}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
</svg>&nbsp;Edit</Button>
    
    
      <motion.div initial={{scale:1}}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Profile
          </Typography>
         
          <Stack spacing={0.5}>
            <Stack direction="row" spacing={0.5}>
            <TextField id="outlined-basic"
             InputLabelProps={{
              style: { color: 'grey' },
            }}
            sx={{ input:{color:"white"}}} onChange={(e)=>setCap(e.target.value)} label="Firstname" variant="outlined" />
            
            <TextField id="outlined-basic"
             InputLabelProps={{
              style: { color: 'grey' },
            }}
            sx={{ input:{color:"white"}}} onChange={(e)=>setCap(e.target.value)} label="Last Name" variant="outlined" />
            <br></br>

            </Stack>
            {/* <Typography>
              Edit Profile
            </Typography> */}
          
          <TextField id="outlined-basic"
           InputLabelProps={{
            style: { color: 'grey' },
          }}
          sx={{ input:{color:"white"}}}  label="Repo Link" onChange={(e)=>setRepo(e.target.value)} variant="outlined" />
        

            <Stack direction="row" spacing={0.5}>
            <TextField id="outlined-basic"  
            InputLabelProps={{
              style: { color: 'grey' },
            }}
            sx={{ input:{color:"white"}}} onChange={(e)=>setZdesc(e.target.value)} label="File Description" variant="outlined" />
            </Stack>
            
           
        
            <Stack direction="row" spacing={0.5}>
          <TextField id="outlined-basic" onChange={(e)=>setPrice(e.target.value)} label="Price" variant="outlined" />
          <TextField id="outlined-basic" onChange={(e)=>setDprice(e.target.value)} label="Discounted Price" variant="outlined"/>
          </Stack>
          </Stack>
        
  <form encType='multipart/form-data'>
          <input type="file"
          ref={hiddenFileInput}
          style={{display:'none'}}
          onChange={handleplus}
          name="file"
          >
      
          </input>
      
          <br></br>
          {/* <TextField onChange={handleCap} id="outlined-basic" label="Caption" variant="outlined" /> */}
          <br></br>
          <Grid>
          <Button onClick={handleClose} variant="contained" color="error">
        Close
      </Button>&nbsp;

          <Button onClick={handleUpload} variant="contained" color="success">
        Upload
      </Button>

{/*       
      <Button onClick={handleCheck} variant="contained" color="success">
        check
      </Button> */}

      {progress?
      <>
      <br></br>
      <Box sx={{ width: '100%' }}>
        <Typography>Uploading</Typography>
      <LinearProgress variant="determinate" value={progress} />
    </Box></>
    :""}

      </Grid>
      </form>
        </Box>

      </Modal>
      </motion.div>



    </div>
  );
}