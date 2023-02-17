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
import adaxios from "../../axios/adminAxios";
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
import { Container } from "@mui/material";

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
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [res, setRes] = useState([users]);
  console.log("hello");
  const getuser = () => {
    console.log("hollo");
    var ath = { auth: false };
    // var ee = localStorage.getItem('authTokens')
    if (localStorage.getItem("authTokens")) {
      ath.auth = true;
    }

    console.log("lll", ath);
    adaxios.get("getbussinessReqs").then((response) => {
      console.log("lol", response.data);
      setUsers(response.data);
      console.log("kk", users);
    });
  };

  function searchHandler(e) {
    e.preventDefault();
    console.log(e.target.value);
    setSearch(e.target.value);
    let sr = users.filter((obj) =>
      obj.first_name.toLowerCase().includes(search)
    );
    setRes(sr);
    console.log("ff", sr);
  }
  useEffect(() => {
    getuser();
  }, []);

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);

  function userSelect(id) {
    
    const use = users.find((obj) => obj.id === id);
    
    setFirstName(use.first_name);
    setEmail(use.email);
    setLastName(use.last_name);
    setUserId(use.id);
    
  }

  function updateuser(e) {
    e.preventDefault();
    const datas = { first_name, last_name, email, userId };
    const pass = adaxios.create({
      baseURL: `edituser`,
    });
    pass.put(`/${userId}`, datas).then((response) => {
      getuser();
      // handleClose();
    });
  }

  function deleteuser(id) {
    adaxios.delete(`removebussreq/${id}`).then((response) => {
      getuser();
    });
  }

  function acceptuser(id) {
    adaxios.get(`acceptbussreq/${id}`).then((response) => {
      getuser();
    });
  }

  return (
    <>
      <ButtonAppBar page="bussinessman" />

      <h2 style={{ textAlign: "center", color: "#1e81b0" }}>
        Bussiness Requests
      </h2>
      <TextField
        component="form"
        id="outlined-basic"
        style={{ marginLeft: "15%", width: "70%" }}
        onChange={searchHandler}
        label="Search"
        variant="outlined"
      />

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
                  Fisrt Name
                </TableCell>
                <TableCell style={{ color: "white" }} align="right">
                  Last Name
                </TableCell>
                <TableCell style={{ color: "white" }} align="right">
                  Email&nbsp;
                </TableCell>
                <TableCell style={{ color: "white" }} align="right">
                  Accept&nbsp;
                </TableCell>
                <TableCell style={{ color: "white" }} align="right">
                  Remove&nbsp;
                </TableCell>
              </TableRow>
            </TableHead>
             
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{user.id}</TableCell>
                    <TableCell component="th" align="center" scope="row">
                      {user.user.first_name}
                    </TableCell>
                    <TableCell align="right">{user.user.last_name}</TableCell>

                    <TableCell align="right">{user.user.email}</TableCell>
                    <TableCell align="right">
                      {/* <Button variant="outlined" onClick={editHandler(user.id)} color="success">
                Edit
            </Button> */}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          acceptuser(user.id);
                          // handleOpen();
                        }}
                      >
                        Accept
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        onClick={() => {
                          deleteuser(user.id);
                        }}
                        color="error"
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            
          </Table>
        </TableContainer>
      </div>
      <br></br>
    </>
  );
}
