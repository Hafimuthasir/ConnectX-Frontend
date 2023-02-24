  import { useState} from 'react';
  import Form from 'react-bootstrap/Form';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import ButtonAppBar from '../Navbar/Navbar';
  import * as React from 'react';
import Alert from '@mui/material/Alert';
import MemoryIcon from '@mui/icons-material/Memory';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { borderRadius, fontWeight } from '@mui/system';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}; 



const theme = createTheme();

  export default function Signup(){

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [first_name,setName] = useState('')
    const [last_name,setUser]=useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [bio,setBio] = useState('')
    
    const [error,setError] = useState('')
    const navigate = useNavigate()

    const [profile,setProfile] = useState('')
   
    function loginRedirect(){
      navigate('/')
    }

    const profileHandler=(e)=>{
      setError('')
      console.log(e.target.files[0]);
      setProfile(e.target.files[0])
    }

    const bt=(e)=>{
      console.log('dsds');
      console.log('loool',profile);
    }

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let gg;
    const loginHandler=(e)=>{
      console.log('prfile',profile);
        e.preventDefault()
        if(first_name.length===0||last_name.length===0||email.length===0||password.length===0){
          setError('Please fill all the fields*')
        
        }else if(password.length<8){
            setError('Password too short* It should contain minimum of 8 characters')
        }else if (profile === ''){
          setError('Please add a Photo')
        }else if (!email.match(validRegex)){
          gg = email.match(validRegex)
          setError('Pls enter a valid email')
          console.log('lll',gg);
        }
        else{
        
        // let details = {first_name,last_name,email,password,profile}  
        const formData = new FormData()
        formData.append('first_name',first_name)
        formData.append('last_name',last_name)
        formData.append('email',email)
        formData.append('password',password)
        formData.append('profile',profile)
        formData.append('bio',bio)

        axios.post('https://grapicscard.ga/api/register',formData).then((response)=>{
      if (response.status===200){
        handleOpen()
      }
    }).catch((error)=>{
      let erObj = Object.values(error.response.data)
      let errorMsg = Object.values(erObj[0])
      setError(errorMsg[0])
    })
  }
    }
    return (
    <>
  <div className='container' >
<ThemeProvider theme={theme}>

      <Container sx={{background:"#00000045",
    paddingLeft: "15px",
    paddingRight: "15px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    borderRadius:"8px"
    }} component="main" maxWidth="xs">
      
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <MemoryIcon sx={{color:"#C13540",height:"50px",width:"50px"}} />
          <Typography color="#cccccc" component="h1" sx={{fontSize:"30px"}} variant="h5">
            V e L a R
          </Typography>
          <Box component="form" noValidate onSubmit={loginHandler} sx={{ mt: 3,color:"white" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField sx={{ input: { color: 'white',border: '1.5px solid #006be8',borderRadius:1 }}}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onClick={(e)=>{setError('')}} onChange={(e)=>{setName(e.target.value);setError('')}}
                  InputLabelProps={{
                    style: { color: '#cccccc' },
                  }}
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField sx={{ input: { color: 'white',border: '1.5px solid #006be8',borderRadius:1 }}}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onClick={(e)=>{setError('')}} onChange={(e)=>setUser(e.target.value)}
                  InputLabelProps={{
                    style: { color: '#cccccc' },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField sx={{ input: { color: 'white',border: '1.5px solid #006be8',borderRadius:1 }}}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onClick={(e)=>{setError('')}} onChange={(e)=>setEmail(e.target.value)}
                  InputLabelProps={{
                    style: { color: '#cccccc' },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField sx={{ input: { color: 'white',border: '1.5px solid #006be8',borderRadius:1 }}}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onClick={(e)=>{setError('')}} onChange={(e)=>setPassword(e.target.value)}
                  InputLabelProps={{
                    style: { color: '#cccccc' },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField sx={{ input: { color: 'white',border: '1.5px solid #006be8',borderRadius:1 }}}
                  required
                  fullWidth
                  name="bio"
                  label="bio"
                  type="bio"
                  id="bio"
                  onClick={(e)=>{setError('')}} onChange={(e)=>setBio(e.target.value)}
                  InputLabelProps={{
                    style: { color: '#cccccc' },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
              {/* Upload Profile
                <input type="file" onChange={set}></input> */}
              <label style={{
                // border: "1px solid #ccc",
                display: "inline-block",
                padding: "6px 12px",
                cursor: "pointer",
                backgroundColor:"#851d1d",
                borderRadius:3,
                color:"white",
                fontWeight:'lighter'
              }}>
                  <input style={{display:"none"}} onChange={profileHandler} type="file"/>
                  Upload Profile Photo
              </label>


              </Grid>
              {/* <Button onClick={bt}>hai</Button> */}
              <Grid item xs={12}>
              {error ?
      <Alert variant="filled" severity="error">
       An error occured...!,Please try again&nbsp;&nbsp;{error}
      </Alert>:''}
              </Grid>
            </Grid>
            <Button
            color="warning"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" sx={{color:"white"}} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

  <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" color='green' variant="h3" component="h2">
            Veify Email
          </Typography>
          <Typography id="modal-modal-description" color='grey' variant='h5' sx={{ mt: 2 }}>
            A link is send to your email.verify your email by clicking on the link to login
          </Typography>
        </Box>
      </Modal>
    </div>
       
      </Container>
    </ThemeProvider>

</div>
</>
);  
}