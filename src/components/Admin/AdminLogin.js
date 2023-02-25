import { Navigate, useNavigate } from "react-router-dom";
import { useState,useContext } from 'react';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import {AuthContext} from '../../contexts/AuthContext'
import Avatar from '@mui/material/Avatar';
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
import { adminApibaseUrl,apibaseUrl } from "../../constants/constants";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    let {setAdmin,setAuthTokensAd}=useContext(AuthContext)
    const navigate = useNavigate()

    

    const loginHandler=async(e)=>{
        e.preventDefault()
        
        let details = {username,password}

        // axios.post('http://localhost:8000/api/token',details).then((response)=>{
        //     console.log('hello');
        //     console.log('response',response.data);
        //     // navigate('/')
        //     if (response.data === 'True'){
        //         navigate('/adminhome');
        //     }
        //   })
        let response = await fetch(`${apibaseUrl}token`,{
      
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
              
          },
          
          credentials: 'include',
          body: JSON.stringify({
              'email': username,
              'password': password
          })
          
      })
    
    if (response.status===200) {
      let data = await response.json()
    console.log('data',data);
    console.log('response',response);
        
        console.log('yoo',jwt_decode(data.access).is_admin);
        var admincheck=jwt_decode(data.access).is_admin
        console.log('adch',admincheck)
        if (jwt_decode(data.access).is_admin === true){
          console.log('here');
          setAuthTokensAd(data)
          setAdmin(jwt_decode(data.access))
          localStorage.setItem('authTokensAd',JSON.stringify(data));
          navigate('/adminhome')
        }else{
          alert('invalid credentials');
        }
        
    }else{
        alert('Something Went wrong')
    }
    }
    return (
        <div style={{color:"white"}} className='container-fluid'>
    {/* <Form onSubmit={loginHandler}>
    
      <Form.Group className="mb-3">
        <Form.Label>username</Form.Label>
        <Form.Control type="text" onChange={(e)=>setUsername(e.target.value)} placeholder="Enter email" />
        <Form.Text className="text-muted">
        <br></br>
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label> 
        <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
      </Form.Group>
      <br></br>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form> */}
<div >
<ThemeProvider  theme={theme}>
      <Container  component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Superuser
          </Typography>
          <Box component="form" onSubmit={loginHandler} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>setPassword(e.target.value)}
              
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </div>
</div>
    );
}