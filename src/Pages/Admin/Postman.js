import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import ButtonAppBar from "../../components/Navbar/AdNavbar";
import TextField from "@mui/material/TextField";
import { Container, Stack } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const [fname,setFname] = useState('')
// const [lname,setLname] = useState('')
// const [email,setEmail] = useState('')

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #2596be",
  boxShadow: 24,
  p: 4,
};

export default function BasicTable() {
  const [allpost, setAllpost] = useState([]);
  const [postReports, setPostreports] = useState([]);
  const [search, setSearch] = useState("");
  const [res, setRes] = useState([allpost]);
  console.log("hello");
  const getPostdata = () => {

    axios.get("http://localhost:8000/api/feedPost").then((response) => {
      setAllpost(response.data);
      console.log(response.data);
    });

    axios.get("http://localhost:8000/api2/getpostreports").then((response) => {
      setPostreports(response.data);
      console.log('6767676767676',response.data);
    });
  };


  useEffect(() => {
    getPostdata();
  }, []);


  const [section, setSection] = useState("allpost");





  function removePost(id) {
    axios
      .delete(`http://localhost:8000/api2/removepost/${id}`)
      .then((response) => {
        console.log("response", response.data);
        getPostdata();
      });
  }

  const IgnoreReport = (id) => {
    axios
    .delete(`http://localhost:8000/api2/ignorepost/${id}`)
    .then((response) => {
      console.log("response", response.data);
      getPostdata();
    })
  }
  //modal settings
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleSectionChange = (sect) =>{
    setSection(sect)
  }


  return (
    <>
      <ButtonAppBar page="postman" />

      <h2 style={{ textAlign: "center", color: "#1e81b0" }}>
        Recent Post Reports
      </h2>

      <br></br>
      <Stack sx={{ m: 1 }} className="flexcc" direction="row">
        {section === "allpost" ? (
          <Button onClick={()=> handleSectionChange('allpost')} variant="contained">All Post</Button>
        ) : (
          <Button onClick={()=> handleSectionChange('allpost')} variant="outlined">All Post</Button>
        )}
        &nbsp;
        {section === "reports" ? (
          <Button onClick={()=> handleSectionChange('reports')} variant="contained">Reports</Button>
        ) : (
          <Button onClick={()=> handleSectionChange('reports')} variant="outlined">Reports</Button>
        )}
      </Stack>
      <div>
        <TableContainer
          style={{ width: "70%", marginLeft: "15%", background: "darkgrey" }}
          component={Paper}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "grey" }}>
              <TableRow>
                <TableCell style={{ color: "white" }} align="center">
                  id
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  Image
                </TableCell>
                <TableCell style={{ color: "white" }} align="right">
                  caption
                </TableCell>
                { section === 'allpost'?
                <TableCell style={{ color: "white" }} align="right">
                  username
                </TableCell>:

                <TableCell style={{ color: "white" }} align="right">
                Total Reports
              </TableCell>

                }
                <TableCell style={{ color: "white" }} align="right">
                  is_premium
                </TableCell>

                <TableCell style={{ color: "white" }} align="right">
                  is_file
                </TableCell>

                <TableCell style={{ color: "white" }} align="right">
                  Ignore or Remove&nbsp;
                </TableCell>
              </TableRow>
            </TableHead>
            
            
            {section ==='allpost'?(
              <TableBody>
                {allpost.map((post) => (
                  <TableRow
                    key={post.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{post.id}</TableCell>
                    <TableCell component="th" align="center" scope="row">
                      <img src="dscs"></img>
                    </TableCell>
                    <TableCell sx={{maxWidth:'5rem'}}align="right">{post.caption.substr(0,18)}</TableCell>

                    <TableCell align="right">{post.username}</TableCell>

                    <TableCell align="right">
                      {post.is_premium===true?<CheckCircleIcon color='success'/>:<CancelIcon color='error'/>}
                      </TableCell>

                      <TableCell align="right">
                      {post.is_z===true?<CheckCircleIcon color='success'/>:<CancelIcon color='error'/>}
                      </TableCell>
                   
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        onClick={() => {
                          removePost(post.id);
                        }}
                        color="error"
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ):(
              <TableBody>
                {postReports.map((obj) => (
                  <TableRow
                    key={obj.post.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{obj.post.id}</TableCell>
                    <TableCell component="th" align="center" scope="row">
                      <img src="dscs"></img>
                    </TableCell>
                    <TableCell sx={{maxWidth:'5rem'}}align="right">{obj.post.caption.substr(0,18)}</TableCell>

                    <TableCell align="right">{obj.total_reports}</TableCell>

                    <TableCell align="right">
                      {obj.post.is_premium === true?<CheckCircleIcon color='success'/>:<CancelIcon color='error'/>}
                      </TableCell>

                      <TableCell align="right">
                      {obj.post.is_z===true?<CheckCircleIcon color='success'/>:<CancelIcon color='error'/>}
                      </TableCell>
                   
                    <TableCell align="right">
                      <Button
                        variant="contained"

                        onClick={() => {
                          IgnoreReport(obj.post.id);
                        }}

                        color="secondary"
                      >
                        Ignore
                      </Button>&nbsp;

                      <Button
                        variant="contained"

                        onClick={() => {
                          removePost(obj.post.id);
                        }}

                        color="error"
                      >
                        Remove
                      </Button>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )       
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
           
            <Grid container justify="flex-end">
              <Button onClick={handleClose} variant="contained" color="error">
                Close
              </Button>
              &nbsp;
              <Button variant="contained" color="primary">
                Update
              </Button>
            </Grid>
          </Box>
        </Modal>
      </div>
    </>
  );
}
