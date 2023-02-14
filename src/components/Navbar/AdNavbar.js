import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

export default function ButtonAppBar(props) {
  console.log(props.page);
  const admin = useContext(AuthContext);
  const navigate = useNavigate();
  var tokens = localStorage.getItem("authTokens");
  let reportBt='';
  let userBt='';
  let postBt=''
  let BrBt='';
  
  if ((props.page === "userman")) {
    reportBt = "outlined";
    userBt = "contained";
    postBt = "outlined";
    BrBt = "outlined";
  }

  else if ((props.page === "postman")) {
    reportBt = "outlined";
    userBt = "outlined";
    postBt = "contained";
    BrBt = "outlined";
  }
  else{
    reportBt = "outlined";
    userBt = "outlined";
    postBt = "outlined";
    BrBt = "contained";
  }

  if (tokens) {
    var accesstoken = JSON.parse(tokens).access;
    var dec = jwt_decode(accesstoken).name;
  }

  let { setAdmin, setAuthTokensAd } = useContext(AuthContext);

  function logoutHandler() {
    setAuthTokensAd(null);
    setAdmin(null);
    localStorage.removeItem("authTokensAd");
    navigate("/adminlogin");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ top: "0", backgroundColor: "black" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Super User !
          </Typography>

          <Stack direction="row" sx={{ flexGrow: 1 }}>
            {/* &nbsp;
            <Button variant={reportBt} onClick={()=>navigate('/reportman')} color="error">
              Post Reports
            </Button> */}
            &nbsp;
            <Button variant={userBt} onClick={()=>navigate('/adminhome')} color="secondary">
              User Management
            </Button>
            &nbsp;
            <Button variant={postBt} onClick={()=>navigate('/postman')} color="info">
              Post Management
            </Button>
            &nbsp;
            <Button variant={BrBt} onClick={()=>navigate('/bussinesrequests')} color="success">
              Bussiness Requests
            </Button>
            {/* &nbsp;<Button variant='outlined' color='success'>All Posts</Button> */}
          </Stack>

          {/* <Typography sx={{display:'none'}} variant="h6" component="div" >
            Super User !
          </Typography> */}

          <Button onClick={logoutHandler} variant="contained" color="warning">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </Box>
  );
}
