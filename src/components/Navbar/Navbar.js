import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function ButtonAppBar() {
  const user=useContext(AuthContext)
  const navigate=useNavigate()
  var tokens = localStorage.getItem('authTokens')
  

  if (tokens) { var accesstoken=JSON.parse(tokens).access
    var dec= jwt_decode(accesstoken).name;}
  
  let {setUser,setAuthTokens}=useContext(AuthContext);
  
  function logoutHandler(){
    console.log('in but')
    
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens');
    navigate('/');
    
   
  } 
  
  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          { user.user ? 
          <>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hello {dec} ! 
          </Typography>
          <Button onClick={logoutHandler} color="inherit">Logout</Button>
          </>:
          ''
          
          }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}