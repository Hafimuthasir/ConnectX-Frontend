import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import  FormHelperText from '@mui/material/FormHelperText';
import  InputLabel from '@mui/material/InputLabel';
import  Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import ButtonAppBar from '../Navbar/AdNavbar';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }


// const [fname,setFname] = useState('')
// const [lname,setLname] = useState('')
// const [email,setEmail] = useState('')


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #2596be',
    boxShadow: 24,
    p: 4,
  };

export default function BasicTable() {
    const [users,setUsers] = useState([]);
    const [search,setSearch]=useState('');
    const [res,setRes]=useState([users]);
    console.log('hello');
    const getuser = () => {
        console.log('hollo');
        var ath = {auth :false};
        // var ee = localStorage.getItem('authTokens')
        if (localStorage.getItem('authTokens')){
          ath.auth=true
        }

        console.log("lll",ath)
        axios.post('http://localhost:8000/api2/userlist',ath).then((response)=>{
            console.log('lol',response.data)
            setUsers(response.data);
            console.log('kk',users);
        })
    }

    function searchHandler(e){
        e.preventDefault()
        console.log(e.target.value)
        setSearch(e.target.value)
        let sr = users.filter(obj=>obj.first_name.toLowerCase().includes(search))
        setRes(sr)
        console.log('ff',sr)
        


    }
    useEffect(()=>{
        getuser()
        
    }, [])

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [userId,setUserId]=useState(null);

    function userSelect(id){
        console.log('edit button clicked',id);
        const use = users.find(obj => obj.id === id);
        console.log('jo',use.first_name)
        setFirstName(use.first_name)
        setEmail(use.email)
        setLastName(use.last_name)
        setUserId(use.id)
        console.log('userfind',use)
        console.log('sele',first_name)

    }


    function updateuser(e){
        e.preventDefault()
        const datas = {first_name,last_name,email,userId}
        const pass = axios.create({
            baseURL:`http://localhost:8000/api2/edituser`
        })
        pass.put(`/${userId}`,datas).then((response)=>{
            console.log('lol',response.data)
            getuser()
            handleClose()
        })
    }

    function deleteuser(id){
        axios.post(`http://localhost:8000/api2/deleteuser/${id}`).then((response)=>{
            console.log('response',response.data);
            getuser()
        })
        
    }
//modal settings
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <>

    <ButtonAppBar page='userman'/>
    
    <h2 style={{textAlign:'center',color:'#1e81b0'}}>Users list</h2> 
    <TextField component="form" id="outlined-basic" style={{label:{color:"white"},marginLeft:'15%',width:'70%'}} onChange={searchHandler} label="Search" variant="outlined" />
    
    <div >
    <TableContainer style={{width:'70%',marginLeft:'15%',background:"darkgrey"}} component={Paper}>
      <Table sx={{ minWidth: 650 }}  aria-label="simple table">
        <TableHead style={{backgroundColor:'grey'}}>
          <TableRow>
            <TableCell style={{color:'white'}} align="center">id</TableCell>
            <TableCell style={{color:'white'}} align="center">Fisrt Name</TableCell>
            <TableCell style={{color:'white'}} align="right">Last Name</TableCell>
            <TableCell style={{color:'white'}} align="right">Email&nbsp;</TableCell>
            <TableCell style={{color:'white'}} align="right">Block&nbsp;</TableCell>
            
          </TableRow>
        </TableHead>{search ? <TableBody>  
          {res.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{user.id}</TableCell>
              <TableCell component="th" align="center" scope="row">
                {user.first_name}
              </TableCell>
              <TableCell align="right">{user.last_name}</TableCell>
              
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">
              {/* <Button variant="outlined" onClick={editHandler(user.id)} color="success">
                Edit
            </Button> */}
            <Button variant="contained" color="primary" onClick={()=> {userSelect(user.id);handleOpen()}}>edit</Button>
              </TableCell>
              <TableCell align="right">
              <Button variant="contained" onClick={()=>{deleteuser(user.id)}} color="error">
                Delete
            </Button>
                </TableCell> 
            </TableRow>
          ))}
          
        </TableBody>
        
:
        <TableBody>  
          {users.map((user) => {
            return (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{user.id}</TableCell>
              <TableCell component="th" align="center" scope="row">
                {user.first_name}
              </TableCell>
              <TableCell align="right">{user.last_name}</TableCell>
              
              <TableCell align="right">{user.email}</TableCell>
           
              <TableCell align="right">
              {user.is_blocked === false?<Button variant="contained" onClick={()=>{deleteuser(user.id)}} color="error">
                Block
            </Button>:<Button variant="contained" onClick={()=>{deleteuser(user.id)}} color="success">
                UnBlock
            </Button>}
                </TableCell> 
            </TableRow>
          )}
          
          )}
          
        </TableBody>
}
      </Table>
    </TableContainer>
    </div>
<br></br>
<div>
 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
            <FormControl>
                <InputLabel htmlFor="my-input">First Name</InputLabel>
                 <Input id="my-input" value={first_name} onChange={(e)=>setFirstName(e.target.value)} aria-describedby="my-helper-text" />
                
            </FormControl>
            &nbsp;
            <FormControl>
                <InputLabel htmlFor="my-input">Last Name</InputLabel>
                 <Input id="my-input" value={last_name} onChange={(e)=>setLastName(e.target.value)} aria-describedby="my-helper-text" />
            </FormControl>
            <br></br><br></br>
            <FormControl>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                 <Input id="my-input" value={email} onChange={(e)=>setEmail(e.target.value)} aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
            <br></br> <br></br> 
            <Grid container justify="flex-end">
            <Button onClick={handleClose} variant="contained" color="error">
                Close
            </Button>&nbsp;
            <Button onClick={updateuser} variant='contained' color='primary'>Update</Button>
            </Grid>
        </Box>
      </Modal>
    </div>




{/* 
     */}

    </>
  );
}