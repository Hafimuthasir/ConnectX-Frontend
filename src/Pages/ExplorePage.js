import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Button, TextField } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AllPost from "../components/ExplorePg/AllPost";
import {motion} from "framer-motion"
import SearchModal from '../components/SearchModal';
import { SearchContext } from "../contexts/SearchValue";
import Modal from '@mui/material/Modal';
// import Post from "../components/Post";
// import axios from "";

// const style = {
//   position: 'absolute',
//   top: '45%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   // width: 400,
//   // bgcolor: 'background.paper',
//   boxShadow: 24,
//   // height:"80rem",
//   width:"50rem"
// };

function ExplorePage() {

  const [currentPost,setCurrentPost] = React.useState([])

  const handleOpen = (obj) => {
    setCurrentPost(obj)
    setOpen(true);}

  const handleClose = () => setOpen(false);


  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState("photos");
  const [photoBt, setPbt] = React.useState("contained");
  const [modBt, setMbt] = React.useState("outlined");
  const [qnBt, setQnbt] = React.useState("outlined");
  // const [seleBt,setSeleBt] = React.useState("outlined");

  const [posts, setPosts] = React.useState([]);
  let {setSearchVal,searchVal,setSelectVal,selectVal} = React.useContext(SearchContext)

  const searchFunc=(value)=>{
    console.log('111',value);
    setSearchVal(value)
  }

  const handlePhotobt = () => {
    setShow("photos");
    setPbt("contained");
    setMbt("outlined");
    setQnbt("outlined");
  };

  const handleModbt = () => {
    setShow("mods");
    setMbt("contained");
    setQnbt("outlined");
    setPbt("outlined");
  };

  const handleQnbt = () => {
    setShow("qns");
    setQnbt("contained");
    setMbt("outlined");
    setPbt("outlined");
  };

  const handleSelect =()=>{
    setShow("sele");
    setQnbt("outlined");
    setMbt("outlined");
    setPbt("outlined");
  }

  const [langChoice, setLangChoice] = React.useState("");
  const [search,setSearch] = React.useState('')

  const handleChange = (event) => {
    setLangChoice(event.target.value);
    setSelectVal(event.target.value)
    handleSelect()
  };



  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid
          sx={{
            mt: 2,
            borderRadius: 2,
            bgcolor: "#4f4f4f",
            height: "85vh",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: 4,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#454545",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#661414",
              borderRadius: 7,
            },
          }}
        >
          {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} /> */}
          <div className="lg:flex lg:items-center lg:justify-between pl-3 pr-3 pt-2">
            <div className="min-w-0 flex-1">
           

              <Grid
                direction="row"
                sx={{
                  border: "1px",
                  pt: 0.5,
                  borderRadius: 2,
                  pb: 10,
                  m: 0.5,
                  backgroundColor: "#303030",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Stack
                  direction="colomn"
                  spacing="4px"
                  justifyContent="center"
                  sx={{ pt: 2 }}
                >
                  <Button
                    variant={photoBt}
                    color="error"
                    sx={{ mr: 1 }}
                    onClick={handlePhotobt}
                  >
                    All
                  </Button>
                  <Button
                    variant={modBt}
                    color="secondary"
                    onClick={handleModbt}
                  >
                    Files
                  </Button>
                  &nbsp;&nbsp;
                  <Button variant={qnBt} onClick={handleQnbt}>
                    Premium
                    <StarIcon sx={{ pb: 0.3, color: "#ffbf00" }} />
                  </Button>
                </Stack>
                <br></br>

                <Stack direction="row" spacing={2}>
                  <TextField
                    size="small"
                    placeholder="Search"
                    className="shadowclass"
                    onChange={(e)=>searchFunc(e.target.value)}
                    // onChange={}
                    sx={{
                      width: "50%",
                      bgcolor: "#757575",
                      borderRadius: 1.5,
                      width: "20rem",
                      height: "3rem",
                      mt: 1,
                    }}
                  />
                  {/* <SearchModal/> */}

                  <Box sx={{ minWidth: 120 }}>
                    <FormControl
                      fullWidth
                      className="shadowclass"
                      sx={{ backgroundColor: "grey", borderRadius: "4px" }}
                    >
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{ color: "#c0c0c0" }}
                      >
                        Language/Tool
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={langChoice}
                        label="Lang"
                        onChange={handleChange}
                      >
                        <MenuItem value='Css'>Css</MenuItem>
                        <MenuItem value='Javascript'>JavaScript</MenuItem>
                        <MenuItem value='Python'>Python</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Stack>
                {
                  searchVal !== ''?
                  <AllPost section='search' value={search}/>
                  :<>
                  {photoBt === "contained" ?  <AllPost section="all" /> : ""}

                  {modBt === "contained" ? <AllPost section="files" /> : ""}
  
                  {qnBt === "contained" ? <AllPost section="premium" /> : ""} 

                  {show === "sele" ? <AllPost value={langChoice} section="select" /> : ""}
                  </>
                }
                
              </Grid>
              
            </div>
          </div>
        </Grid>

        {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
          <Post data={currentPost}/>
        </Box>
      </Modal> */}

      </Container>
    </React.Fragment>
  );
}

export default ExplorePage;
