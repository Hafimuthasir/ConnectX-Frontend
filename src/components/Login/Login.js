import { Navigate, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import axios from "../../axios/axios";
import { AuthContext } from "../../contexts/AuthContext";
import jwt_decode from "jwt-decode";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import iLogin from "../../images/iLogin.jpg";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MemoryIcon from "@mui/icons-material/Memory";

import { motion } from "framer-motion";

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


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let { setUser, setAuthTokens,user } = useContext(AuthContext);

  // function signupHandler(){
  //   navigate('/signup')
  // }

  const loginHandler = async (e) => {
    e.preventDefault();
    let details = { email, password };

    let response = await fetch("https://grapicscard.ga/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    
    let data = await response.json();
    let info

    if (response.status === 200) {
      info = jwt_decode(data.access)
      if (info.is_verified === true){
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        navigate("/home");
      }else if(info.is_verified === false){
        setError('Email Not Verified')
        axios.post('celeryverify',details).then((response)=>{
          handleOpen()
        })
      }else{
        console.log('something went wrong try again')
      } 
    } else {
      setError("Invalid Credentials");
    }
  };
  return (
    <div className="container">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="lg" sx={{ height: "385px" }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <MemoryIcon
              sx={{ color: "#C13540", height: "50px", width: "50px" }}
            />

            <Typography
              color="#cccccc"
              component="h1"
              sx={{ fontSize: "30px" }}
              variant="h5"
            >
              V e L a R
            </Typography>
            <Box
              sx={{ color: "white" }}
              component="form"
              onSubmit={loginHandler}
              noValidate
            >
              <TextField
                sx={{
                  input: {
                    color: "white",
                    border: "1.5px solid #008aff",
                    borderRadius: 1,
                  },
                }}
                margin="normal"
                required
                fullWidth
                fontColor="green"
                id="email"
                label="Email Address"
                name="email"
                InputLabelProps={{
                  style: { color: "#cccccc" },
                }}
                onClick={(e) => {
                  setError("");
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                sx={{
                  input: { color: "white" },
                  border: "1.5px solid #008aff",
                  borderRadius: 1,
                }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputLabelProps={{
                  style: { color: "#cccccc" },
                }}
                onClick={(e) => {
                  setError("");
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <FormControlLabel Color="white"
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              {error ? (
                <Alert variant="filled" severity="error">
                  {error}
                </Alert>
              ) : (
                ""
              )}
              <motion.div
                className="box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="warning"
                >
                  Sign In
                </Button>
              </motion.div>

              <Grid container>
                <Grid item xs>
                  <Link href="#" sx={{ color: "#cccccc" }} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="/signup"
                    sx={{ color: "#cccccc" }}
                    variant="body2"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <div>
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
  );
}
