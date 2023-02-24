import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {Box,Typography} from '@mui/material';

import { Button, Grid } from '@mui/material'
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import { apibaseUrl } from '../constants/constants';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';

function Verification() {
 const navigate = useNavigate()
 const [verified,setVerified] = useState('')
 const {id,username} = useParams()


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

 const verify = ()=>{
    let item = {id:id,username:username}
    console.log('ver',item)
    axios.post(`${apibaseUrl}emailvalidate`,item).then((response)=>{
        console.log('verifuuuu',response.data)
        setVerified(response.data)
    })
 }


 useEffect(()=>{
    verify()
 },[])
  return (
//     <div style={{marginTop:"35vh",marginLeft:'30vw',backgroundColor:"white"}} >
//        <h1 style={{color:"green"}}>Email Verified Successfully</h1>
// <Button variant='outlined' onClick={()=>navigate('/')}>Login Now</Button>
//     </div>
<Box sx={style}>
<TaskAltRoundedIcon sx={{fontSize:"30px",color:"green",ml:"47%",textAlign:"center"}}/>
<br></br>
<Typography id="modal-modal-title" sx={{textAlign:"center",mt:1}} color='green' variant="h3" component="h2">
  Email Verified Successfully
</Typography>
{/* <Typography id="modal-modal-description" color='grey' variant='h5' sx={{ mt: 2 }}>
  A link is send to your email.verify your email by clicking on the link to login
</Typography> */}
<br></br>
<Button variant='contained' sx={{ml:"40%"}} onClick={()=>navigate('/')}>Login Now</Button>
</Box>
  )
}

export default Verification