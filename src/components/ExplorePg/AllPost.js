import axios from "../../axios/axios";
import React from "react";
import PostCardSmall from "./PostCardSmall";
// import Post from "../Post";
import { Grid, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { DataObjectOutlined } from "@mui/icons-material";
import Post from "../Post";
import {SearchContext} from "../../contexts/SearchValue";


const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    // bgcolor: 'background.paper',
    boxShadow: 24,
    // height:"80rem",
    width:"50rem"
  };

function AllPost(props) {
  const [posts, setPosts] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const [currentPost,setCurrentPost] = React.useState([])

  const handleOpen = (obj) => {
    console.log('11111111111111',obj);
    setCurrentPost(obj)
    setOpen(true);}

  const handleClose = () => setOpen(false);

  let {searchVal,selectVal} = React.useContext(SearchContext)

  const handleGetAllpost = () => {
    console.log(props.section);
    if (props.section === "all") {
      axios.get("GetExplorePosts/all").then((response) => {
        setPosts(response.data);
      });
    } else if (props.section === "files") {
      axios.get("GetExplorePosts/files").then((response) => {
        console.log("111111", response.data);
        setPosts(response.data);
      });
    } else if(props.section === "premium") {
      axios.get("GetExplorePosts/primes").then((response) => {
        console.log("111111", response.data);
        setPosts(response.data);
        console.log("ppp", posts);
      });
    } else if (props.section === 'search') {
      console.log("ppppppp", searchVal);
      axios.get(`GetAllSearch/${searchVal}`).then((response) => {
        console.log("111111", response.data);
        setPosts(response.data);
        console.log("ppp", posts);
      });
    }else{
      axios.get(`GetLangPosts/${selectVal}`).then((response)=>{
        console.log('333333333',selectVal);
        setPosts(response.data)
      })
    }
  };

  React.useEffect(() => {
    handleGetAllpost();
  }, [searchVal,selectVal]);

  return (
    <>
      <div style={{ color: "grey" }}>
     
        {props.section === "all" ? (
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Top Posts
          </Typography>
        ) : (
          ""
        )}

        {props.section === "files" ? (
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Top Files
          </Typography>
        ) : (
          ""
        )}

        {props.section === "premium" ? (
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Top Paid
          </Typography>
        ) : (
          ""
        )}

{props.section === "select" ? (
          <Typography variant="h5" sx={{ textAlign: "center" }}>
             Top in {selectVal}
          </Typography>
        ) : (
          ""
        )}

        

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2px",
          }}
        >
          {posts.map((obj) => {
            return <div key={obj.id} onClick={()=>{handleOpen(obj)}}><PostCardSmall data={obj}/></div>;
       })}


        </Grid>
      </div>

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
          <Post data={currentPost}/>
        </Box>
      </Modal>

    </>
  );
}

export default AllPost;
