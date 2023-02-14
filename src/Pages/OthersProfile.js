import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { Avatar } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { AuthContext } from "../contexts/AuthContext";
import { AppBarContext } from "../contexts/AppBarContext";
import axios from "../axios/axios";
import StarIcon from "@mui/icons-material/Star";
import SimpleBottomNavigation from "../components/BtAppbar/BtAppBar";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Post from "../components/Post";
import { SearchContext } from "../contexts/SearchValue";

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  // bgcolor: 'background.paper',
  boxShadow: 24,
  // height:"80rem",
  width: "50rem",
};

export default function SimpleContainer() {
  const [show, setShow] = React.useState("all");
  const [photoBt, setPbt] = React.useState("contained");
  const [modBt, setMbt] = React.useState("outlined");
  const [qnBt, setQnbt] = React.useState("outlined");
  let { setChatcol, setFeedcol, setQnscol, setProfilecol } =
    React.useContext(AppBarContext);
  let { setChatUser, setShowChat, setFullChat, fullchat, setChatdp } =
    React.useContext(SearchContext);
  const navigate = useNavigate();
  const loc = useLocation();

  const [posts, setPosts] = React.useState([]);

  const [userbio, setUserbio] = React.useState("bio");

  const [owner, setOwner] = React.useState("");

  const [loguser, setLoguser] = React.useState(false);

  const [follow, setFollow] = React.useState("Follow");

  let { user } = React.useContext(AuthContext);

  const [followers, setFollowers] = React.useState([]);
  const [following, setFollowing] = React.useState([]);
  let details;
  const handlePhotobt = () => {
    setShow("all");
    setPbt("contained");
    setMbt("outlined");
    setQnbt("outlined");
    details = { section: "all" };
    axios.post(`getUserPosts/${user.user_id}`, details).then((response) => {
      console.log("0000000000", response.data);
      setUserbio(response.data[0].bio);
      setPosts(response.data);
    });
  };

  const handleModbt = () => {
    setShow("primes");
    setMbt("contained");
    setQnbt("outlined");
    setPbt("outlined");
    details = { section: "files" };
    axios.post(`getUserPosts/${user.user_id}`, details).then((response) => {
      setUserbio(response.data[0].bio);
      setPosts(response.data);
    });
  };

  const handleQnbt = () => {
    setShow("files");
    setQnbt("contained");
    setMbt("outlined");
    setPbt("outlined");
    details = { section: "primes" };
    axios.post(`getUserPosts/${user.user_id}`, details).then((response) => {
      setUserbio(response.data[0].bio);
      setPosts(response.data);
    });
  };

  function handleHome(e) {
    e.preventDefault();
    navigate("/home");
  }

 

  let dp;
  // console.log('0000',check);

  // console.log('111111111111111111111',loc);
  const checkuser = () => {
    if (owner !== user.user_id) {
      setLoguser(false);
    } else {
      setLoguser(true);
    }
  };

  const handleuse = () => {
    follow == "Follow" ? setFollow("Following") : setFollow("Follow");
    console.log(follow);
    let follower = user.user_id;
    let following = owner;
    let details = { follower, following };
    axios.post("follow", details).then((response) => {
    });
  };

  const followCheck = () => {
    let follower = user.user_id;
    let following = loc.state.userid;
    let details = { follower, following };
    axios.post("followCheck", details).then((response) => {
      setFollow(response.data);
    });

  };

  const getPosts = () => {
    axios.get(`ProfileCounts/${loc.state.userid}`).then((response) => {
      // console.log(response.data.follower.length);
      setFollowers(response.data.follower);
      setFollowing(response.data.following);
    });
    details = { section: "all" };
    axios.post(`getUserPosts/${loc.state.userid}`, details).then((response) => {
      console.log("ddd", response.data);
      setUserbio(response.data[0].bio);
      setPosts(response.data);
      setOwner(response.data[0].userid);
    });
  };
  if (loc.state.userprofile !== null) {
    dp = loc.state.userprofile;
  }

  const handleChatPage = () => {
    let details = {
      primary_user: user.user_id,
      secondary_user: loc.state.userid,
    };
    axios.post("chat/getchats", details).then((response) => {
      setFullChat(response.data);
      console.log("8888888", response.data);
      setChatcol("#850f0f");
      setFeedcol("mintcream");
      setProfilecol("mintcream");
      setQnscol("mintcream");
      setChatUser(loc.state.username);
      setShowChat(true);
      // setChatProfile(dp)

      navigate("/home");

      // setChatUser(loc.state.username)
    });
  };

  const [open, setOpen] = React.useState(false);

  const [currentPost, setCurrentPost] = React.useState([]);

  const handleOpen = (obj) => {
    console.log("444444444", obj);
    setCurrentPost(obj);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  function getExtension(filename) {
    return filename.split(".").pop();
  }

  React.useEffect(() => {
    getPosts();
    checkuser();
    followCheck();
  }, [owner, follow]);

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
          <Stack
            direction="colomn"
            justifyContent="space-around"
            sx={{
              border: "1px",
              borderRadius: 2,
              height: "30vh",
              m: 0.5,
              p: 3,
              backgroundColor: "#303030",
            }}
          >
            <Stack direction="row" spacing={2}>
              {dp ? (
                <Avatar
                  sx={{ height: 100, width: 100, mb: 2 }}
                  alt="Profile"
                  src={dp}
                />
              ) : (
                <Avatar sx={{ height: 100, width: 100 }} alt="Muthasir" />
              )}
              <Typography sx={{ color: "grey" }}>
                <h3>{loc.state.username}</h3>
                <br></br>
                <p>{userbio}</p>
                <br></br>
                {loguser === false ? (
                  <>
                    <Button
                      sx={{ mt: 3 }}
                      variant="contained"
                      onClick={handleuse}
                    >
                      {follow}
                    </Button>
                    &nbsp;
                    <Button
                      sx={{ mt: 3 }}
                      variant="contained"
                      onClick={handleChatPage}
                    >
                      Message
                    </Button>
                  </>
                ) : (
                  <Button
                    sx={{ mt: 3 }}
                    variant="contained"
                    onClick={handleuse}
                  >
                    Edit Profile
                  </Button>
                )}
              </Typography>

              {/*  &nbsp;<Button sx={{mt:3}}  color="error" onClick={handleuse}>Logout</Button> */}
            </Stack>

            <Stack
              direction="colomn"
              spacing={2}
              sx={{ mt: 3 }}
              justifyContent="flex-end"
            >
              <Stack sx={{ color: "grey", mr: 2 }}>
                <h5>Followers</h5>
                &nbsp;&nbsp;&nbsp;&nbsp;{following.length}
              </Stack>
              <Stack sx={{ color: "grey", mt: 5, ml: 2 }}>
                <h5>Following</h5>
                &nbsp;&nbsp;&nbsp;&nbsp;{followers.length}
              </Stack>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Stack sx={{ color: "grey", mt: 5, ml: 2 }}>
                <h5>Posts</h5>
                &nbsp;&nbsp;&nbsp;&nbsp;{posts.length}
              </Stack>
            </Stack>
            {/* */}
          </Stack>

          {/* <Grid direction="row" sx={{border:"1px",borderRadius:2,height:"5vh",m:0.5,backgroundColor:"#303030"}}>
                
                </Grid> */}

          <Grid
            direction="row"
            sx={{
              border: "1px",
              borderRadius: 2,
              pb: 1,
              m: 0.5,
              backgroundColor: "#303030",
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
                Photos/Videos
              </Button>
              <Button variant={modBt} color="secondary" onClick={handleModbt}>
                Files
              </Button>
              &nbsp;&nbsp;
              <Button variant={qnBt} onClick={handleQnbt}>
                Premium
                <StarIcon sx={{ pb: 0.3, color: "#ffbf00" }} />
              </Button>
            </Stack>
            <br></br>

            {posts.length !== 0 ? (
              <ImageList
                sx={{ overflowY: "hidden", m: 1, pb: 4, borderRadius: 2 }}
                cols={4}
                rowHeight={164}
              >
                {posts.map((obj) => {
                  let img;
                  if (obj.file) {
                    img = obj.file;
                  }
                  let filetype = obj.mediatype
                  return (
                    <ImageListItem
                      onClick={() => {
                        handleOpen(obj);
                      }}
                      key={obj.id}
                      sx={{
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      }}
                    >
                      {obj.mediatype === "image" ? (
                        <img
                          style={{height:"100%"}}
                          // className="h-10 sm:h-5"
                          // src={`${obj.img}?w=164&h=164&fit=crop&auto=format`}
                          src={img}
                          srcSet={img}
                          alt={obj.title}
                          loading="lazy"
                        />
                      ) : (
                        <video
                        style={{objectFit:"cover",height:"100%"}}
                          src={img}
                        />
                      )}
                    </ImageListItem>
                  );
                })}
              </ImageList>
            ) : (
              ""
            )}
          </Grid>
        </Grid>

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
            <Post data={currentPost} />
          </Box>
        </Modal>
      </Container>
      {/* <SimpleBottomNavigation onClick={()=>handleHome}/> */}
      <Stack sx={{ alignItems: "center", pt: "1.5%", color: "white" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
          onClick={(e) => handleHome(e)}
        >
          <path
            fillRule="evenodd"
            d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
        <Typography>Go Back</Typography>
      </Stack>
    </React.Fragment>
  );
}
