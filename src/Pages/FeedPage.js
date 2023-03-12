import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Grid,
  Skeleton,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";

import TextField, { getTextFieldUtilityClass } from "@mui/material/TextField";
// import Input from '@mui/joy/Input';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { motion } from "framer-motion";
import Modal from "@mui/material/Modal";

import Typography from "@mui/material/Typography";
import axios from "../axios/axios";
import { AuthContext } from "../contexts/AuthContext";

import { useNavigate } from "react-router-dom";

import "moment-timezone";

import AddPostModal from "../components/FeedPg/AddPostModal";
import AddStoryModal from "../components/FeedPg/AddStoryModal";
// import MuiImageSlider from 'mui-image-slider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Story from "../components/FeedPg/Story";
import Post from "../components/Post";
import SuggestedFriends from "../components/FeedPg/SuggestedFriends";
import logo from "../images/logo.png";
import { SearchContext } from "../contexts/SearchValue";
import { Details } from "@mui/icons-material";

export default function SimpleContainer() {
  const navigate = useNavigate();

  let { user } = React.useContext(AuthContext);

  let {
    feedPost,
    setFeedPost,
    postBool,
    setPostbool,
    ownStory,
    setOwnStory,
    setOwnStoryWatched,
    ownStoryWatched,
    story,
    setStory,
  } = React.useContext(SearchContext);

  // let profile = "";
  // if (user.profile !== "null") {
  //   profile = user.profile.replace("/reactapp/src/uploads/profile/", "");
  // }

  const [likebool, setLIkebool] = React.useState(false);

  // post upload state
  const [file, setFile] = React.useState();
  const [caption, setCap] = React.useState();
  // story upload state
  const [filest, setFilest] = React.useState();

  const [posttab, setPosttab] = React.useState(false);

  const [searchText, setSearchText] = React.useState("");
  const [searchList, setSearchList] = React.useState([]);

  const handleSearch = (e) => {
    axios.get(`searchusers/${e.target.value}`).then((response) => {
      setSearchList(response.data);
    });
    setSearchText(e.target.value);
  };

  const hiddenFileInputst = React.useRef(null);

  // let ownStoryWatched;
  const getOwnStory = () => {
    axios.get(`getOwnStory/${user.user_id}`).then((response) => {
      setOwnStory(response.data);
      console.log("ggggg", response.data);
      if (response.data.length !==0 ){

      let selfwatch = response.data[response.data.length - 1].watched.find(
        (obj) => obj.user === user.user_id
      );
      console.log("l7777l", selfwatch);
      if (selfwatch !== undefined) {
        setOwnStoryWatched(true);
      } else {
        setOwnStoryWatched(false);
      }
    }
    else{
      setOwnStoryWatched(false)
    }
      console.log("youyoyou", ownStoryWatched);
    });
  
  };

  const getFeed = (e) => {
    axios.get("feedPost").then((response) => {
      setFeedPost(response.data);
      // console.log("555555555555555", response.data);
    });
  };

  const getStory = (e) => {
    axios.get("getStory").then((response) => {
      setStory(response.data);
    });
  };


  React.useEffect(() => {
    getFeed();
    setPostbool(false);
  }, [postBool]);

  React.useEffect(() => {
    getFeed();
    getOwnStory();
    getStory();
    setLIkebool(false);
    // storyViewCheck()
  }, [likebool]);

  /*Post Modal states*/
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFile("");
  };

  /*Story Modal states*/
  const [openst, setOpenst] = React.useState(false);
  // const handleOpenst = () => setMstatus(true);
  const handleClosest = () => {
    setOpenst(false);
    setFilest("");
  };

  const handleOpenPt = () => {
    setPosttab(!posttab);
  };

  const [currentStory, setCurrentStory] = React.useState("");

  const handleCurrentStory = (id, storyid) => {
    setCurrentStory(id);

    const details = { story: id, user: user.user_id };
    axios.post("storywatch", details).then((response) => {
    });
    handleOpen();
  };

  // let Ownwatched;
  // const handleChecker=()=>{
  //   let arr = ownStory[ownStory.length - 1].watched
  //   let userlist = arr.map(obj => obj.user)
  //   console.log('ttttttt',userlist);
  // }

  // let arr = [{'watched':0}]
  // const [watchlist,setWatchlist] = React.useState([arr])

  // const storyViewCheck =()=>{
  //   if
  //   let ww = ownStory[ownStory.length - 1].watched.map (obj => obj.user)
  //   setWatchlist(ww)
  //   console.log('ttttttt',watchlist);

  // }

  //

  // Ownwatched = arr.find(item => item.user === user.user_id)

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="xl"
        className="max-[1130px]:!block"
        sx={{
          overflow: "auto",
          display: "flex",
          gridTemplateColumns: "20rem 68rem 20rem",
          justifyContent: "center",
        }}
      >
        <Box
          className="max-[1130px]:!hidden "
          sx={{
            top: "7%",
            position: "sticky",
            mt: 3,
            overflowY: "auto",
            width: "150%",
            // maxHeight:"350px",
            height: "76vh",
            backgroundColor: "#424242",
            borderRadius: "5px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",

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
            // outlineColor: '#4b4b4b',
            // outlineStyle: 'double',
            // outlineWidth: '2px'
          }}
        >
          <br></br>
          <Typography className="text-center text-slate-300" sx={{fontSize:"15px"}}>
            Recent Chats
          </Typography>
          <br></br>
          <SuggestedFriends type="trendpost" />
        </Box>

        {/* <div>scsdcsc</div>
        <div>scsdcsc</div>
        <div>scsdcsc</div> */}

        <Container sx={{minWidth:"45%"}} className="min-[820px]:!w-[682px]">
          <Box sx={{ height: "100vh" }}>
            <Grid sx={{ width: "100%" }}>
              <br></br>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  minHeight: "4.5rem",
                  overflowX: "auto",

                  "&::-webkit-scrollbar": {
                    width: 1,
                    height: 2,
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#454545",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#6e0000",
                    borderRadius: 1,
                  },
                }}
              >
                <motion.div initial={{ scale: 0.5 }} whileInView={{ scale: 1 }}>
                  <div
                    style={{
                      alignItems: "end",
                      display: "flex",
                    }}
                  >
                    {ownStory.length === 0 ? (
                      <AddStoryModal type="avatar" />
                    ) : (
                      <motion.div
                        initial={{ scale: 0.5 }}
                        whileInView={{ scale: 1 }}
                      >
                        {ownStory[ownStory.length - 1].watched.length === 0 ||
                        ownStoryWatched === false ? (
                          <>
                          <Box
                            sx={{
                              borderRadius: "50%",
                              p: 1,
                              width: "50px",
                              height: "50px",
                              overflow: "hidden",
                            }}
                            className="flexcc bg-gradient-to-r from-cyan-500 to-blue-500"
                          >
                            {user.profile ? (
                              <Avatar
                                className="border-2"
                                sx={{
                                  width: "46px",
                                  height: "46px",
                                  borderColor: "#2b2b2b",
                                }}
                                alt="Travis Howard"
                                src={user.profile}
                                onClick={() => {
                                  handleCurrentStory(user.user_id, ownStory.id);
                                }}
                              />
                            ) : (
                              <Avatar
                                className="border-2"
                                sx={{
                                  width: "46px",
                                  height: "46px",
                                  borderColor: "#2b2b2b",
                                }}
                                alt="Travis Howard"
                          
                                onClick={() => {
                                  handleCurrentStory(user.user_id, ownStory.id);
                                }}
                              />
                            )}
                          </Box>
                          <Typography sx={{ color: "grey",ml:.2 }}>
                          Your Story
                        </Typography>
                        </>
                        ) : (
                          <>
                          <Box
                            sx={{
                              borderRadius: "50%",
                              p: 1,
                              width: "50px",
                              height: "50px",
                              overflow: "hidden",
                            }}
                            className="flexcc bg-zinc-600"
                          >
                            {user.profile ? (
                              <Avatar
                                className="border-2"
                                sx={{
                                  width: "46px",
                                  height: "46px",
                                  borderColor: "#2b2b2b",
                                }}
                                alt="Travis Howard"
                                src={user.profile}
                                onClick={() => {
                                  handleCurrentStory(user.user_id, ownStory.id);
                                }}
                              />
                            ) : (
                              <Avatar
                                className="border-2"
                                sx={{
                                  width: "46px",
                                  height: "46px",
                                  borderColor: "#2b2b2b",
                                }}
                                alt="Travis Howard"
              
                                onClick={() => {
                                  handleCurrentStory(user.user_id, ownStory.id);
                                }}
                              />
                            )}
                          </Box>
                          <Typography sx={{ color: "grey",ml:.2 }}>
                            Your Story
                          </Typography>
                          </>
                        )}
                      </motion.div>
                    )}

                    {/* <Typography sx={{color:"grey",width:"2px",ml:1.3}}>{user.name}</Typography> */}
                  </div>
                </motion.div>

                {story.map((obj) => {
                  if (obj.username !== user.name) {
                    let image = "";
                    let watched = obj.watched.find((obj) => obj.user === 1);
                    let isWatched;
                    if (watched !== undefined) {
                      isWatched = true;
                    } else {
                      isWatched = false;
                    }

                    if (obj.profile !== null) {
                      image = obj.profile
                      return (
                        <motion.div
                          key={obj.id}
                          initial={{ scale: 0.5 }}
                          whileInView={{ scale: 1 }}
                        >
                          {isWatched === false || obj.watched.length === 0 ? (
                            <Box
                              sx={{
                                borderRadius: "50%",
                                p: 1,
                                width: "50px",
                                height: "50px",
                                overflow: "hidden",
                              }}
                              className="flexcc bg-gradient-to-r from-cyan-500 to-blue-500"
                            >
                              <Avatar
                                className="border-2"
                                sx={{
                                  width: "46px",
                                  height: "46px",
                                  borderColor: "#2b2b2b",
                                }}
                                alt="Travis Howard"
                                src={image}
                                onClick={() => {
                                  handleCurrentStory(obj.userid, ownStory.id);
                                }}
                              />
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                borderRadius: "50%",
                                p: 1,
                                width: "50px",
                                height: "50px",
                                overflow: "hidden",
                              }}
                              className="flexcc bg-zinc-600"
                            >
                              <Avatar
                                className="border-2"
                                sx={{
                                  width: "46px",
                                  height: "46px",
                                  borderColor: "#2b2b2b",
                                }}
                                alt="Travis Howard"
                                src={image}
                                onClick={() => {
                                  handleCurrentStory(obj.userid, ownStory.id);
                                }}
                              />
                            </Box>
                          )}
                          <Typography sx={{ color: "grey", ml: 1.7 }}>
                            {obj.username}
                          </Typography>
                        </motion.div>
                      );
                    } else {
                      return (
                        <motion.div
                          initial={{ scale: 0.5 }}
                          whileInView={{ scale: 1 }}
                        >
                          {isWatched === false || obj.watched.length === 0 ? (
                            <Box
                              sx={{
                                borderRadius: "50%",
                                p: 1,
                                width: "50px",
                                height: "50px",
                                overflow: "hidden",
                              }}
                              className="flexcc bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                            >
                              <Avatar
                                className="border-2"
                                sx={{
                                  width: "46px",
                                  height: "46px",
                                  borderColor: "#2b2b2b",
                                }}
                                alt={obj.username}
                                src="/static/images/avatar/1.jpg"
                                onClick={() =>
                                  handleCurrentStory(obj.userid, ownStory.id)
                                }
                              />
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                borderRadius: "50%",
                                p: 1,
                                width: "50px",
                                height: "50px",
                                overflow: "hidden",
                              }}
                              className="flexcc bg-zinc-600"
                            >
                              <Avatar
                                className="border-2"
                                sx={{
                                  width: "46px",
                                  height: "46px",
                                  borderColor: "#2b2b2b",
                                }}
                                alt={obj.username}
                                src="/static/images/avatar/1.jpg"
                                onClick={() =>
                                  handleCurrentStory(obj.userid, ownStory.id)
                                }
                              />
                            </Box>
                          )}
                          <Typography sx={{ color: "grey", ml: 1.7 }}>
                            {obj.username}
                          </Typography>
                        </motion.div>
                      );
                    }
                  }
                })}
              </Stack>
              <br></br>
              <Stack
                direction="row"
                sx={{
                  position: "sticky",
                  top: "0",
                  zIndex: "1",
                  padding: "3px",
                  background: "#2b2b2b",
                  // minWidth: "65rem",
                  minHeight: "4rem",
                  paddingTop: "11px",
                  paddingBottom: "10px",
                  maxHeight:"5rem"
                }}
                spacing={2}
              >
                {/* <Box sx={{bgcolor:"white",width:"10vw",heigth:"5px",borderRadius:2,opacity:"50%"}}> */}
                <TextField
                  onChange={(e) => handleSearch(e)}
                  size="small"
                  label="Search"
                  sx={{
                    label: { color: "darkgrey" },
                    height: "-webkit-fill-available",
                    width: "50%",
                    bgcolor: "#3f3f46",
                    borderRadius: 1.5,
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                ></TextField>

                {/* <motion.div whileHover={{scale:1.4}}>
          <AddCircleRoundedIcon color='error'
          onClick={handleOpen}
           sx={{fontSize:"30px",'&:hover': {
         color: 'error.dark',
           opacity: [0.9, 0.8, 0.7],
         },}} />
         
         </motion.div> */}

                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{
                    scale: 0.8,
                    rotate: -100,
                    borderRadius: "100%",
                  }}
                >
                  <AddCircleRoundedIcon
                    color="error"
                    // onClick={handleOpen}
                    onClick={handleOpenPt}
                    sx={{
                      fontSize: "30px",
                      "&:hover": {
                        color: "error.dark",
                        opacity: [0.9, 0.8, 0.7],
                      },
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      borderRadius: "50%",
                    }}
                  />
                </motion.div>

                {posttab == true ? (
                  <motion.div
                    // initial={{scale:0.5}}
                    // whileInView={{scale:1.1}}

                    initial={{ x: -18 }}
                    whileInView={{ x: 1 }}
                    // animate={{ x: -10 }}
                    // transitionEnd= {{ type: "spring", stiffness: 100} }
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div
                      style={{
                        width: "250px",
                        height: "30px",
                        marginTop: "0px",
                        borderRadius: "15px",
                        background: "rgb(64 64 64)",
                        padding: "1px",
                        paddingLeft: "25px",
                        paddingTop: "3px",
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        display: "flex",
                        gap: "1px",
                      }}
                    >
                      <AddPostModal />
                      <AddStoryModal type="button" />
                    </div>
                  </motion.div>
                ) : (
                  <div
                    className="flexcc"
                    style={{
                      flexDirection: "row",
                      width: "20rem",
                      borderRadius: "4px",
                      //  width: "14rem",
                      borderRadius: "4px",
                      fontFamily: "Euclid Circular A",
                      textAlign: "center",
                      fontSize: "large",
                      color: "#bdbdbd",
                    }}
                    // onClick={()=>{handleChecker()}}
                  >
                    <img
                      style={{ marginBottom: "2px" }}
                      height="35"
                      width="35"
                      src={logo}
                    ></img>
                    &nbsp;Connect&nbsp;X
                  </div>
                )}
              </Stack>

              {searchText.length !== 0 ? (
                <>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "grey",
                      position: "sticky",
                      zIndex: "1",
                      top: "50px",
                      borderRadius: "7px",
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    }}
                  >
                    {searchList.length !== 0 ? (
                      <>
                        {searchList.map((obj) => {
                          // let profiledp = "";
                          // if (obj.profile !== null) {
                          //   profiledp = obj.profile.replace(
                          //     "/reactapp/src/uploads/profile/",
                          //     ""
                          //   );
                          // }

                          return (
                            <>
                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  {obj.profile ? (
                                    <Avatar
                                      alt={obj.first_name}
                                      src={obj.profile}
                                    />
                                  ) : (
                                    <Avatar alt={obj.first_name} src="./" />
                                  )}
                                </ListItemAvatar>
                                <ListItemText
                                  sx={{ mt: 2.3 }}
                                  primary={obj.first_name}
                                  // secondary={
                                  //   <React.Fragment>
                                  //     <Typography
                                  //       sx={{ display: "inline" }}
                                  //       component="span"
                                  //       variant="body2"
                                  //       color="text.primary"
                                  //     >
                                  //       Ali Connors
                                  //     </Typography>
                                  //     {
                                  //       " — I'll be in your neighborhood doing errands this…"
                                  //     }
                                  //   </React.Fragment>
                                  // }
                                />
                              </ListItem>
                              <Divider variant="inset" component="li" />
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <div>No result found</div>
                    )}
                  </List>
                </>
              ) : (
                ""
              )}

              {feedPost.length == 0 ? (
                <Stack sx={{ minWidth: "20rem" }} spacing={1}>
                  <Card
                    // className="bg-zinc-800"
                    sx={{
                      backgroundColor: "#424242",
                      minHeight: "100vh",
                      minWidth: "600px",
                      maxWidth: "800px",
                      mt: 1,
                      mb: 1,
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    }}
                  >
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={60} />
                    <Skeleton variant="rounded" width={210} height={60} />
                  </Card>
                </Stack>
              ) : (
                <Stack sx={{ width: "96%", marginLeft: "10px" }}>
                  {feedPost.map((item) => {
                    return <Post feedCall={getFeed} key={item.id} data={item} />;
                  })}

                  <br></br><br></br><br></br><br></br><br></br>
                </Stack>
              )}
            </Grid>
          </Box>
        </Container>

        <Box
          className="max-[1130px]:!hidden"
          sx={{
            top: "7%",
            width: "150%",
            position: "sticky",
            overflowY: "auto",
            // maxHeight:"350px",
            mt: 3,
            height: "77vh",
            backgroundColor: "#424242",
            borderRadius: "5px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",

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
          <br></br>

          <Typography className="text-center text-slate-300" sx={{fontSize:"15px"}}>
            Most Downloaded Files for You
          </Typography>

          <SuggestedFriends type="mostdowns" />
        </Box>
      </Container>

      {/* {stTest===true? <Story></Story>:""} */}
      {/* Story View Modal */}
      <motion.div initial={{ scale: 1 }}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Story name={currentStory}></Story>
          </Box>
        </Modal>
      </motion.div>

      {/* story modal */}
      {/* <motion.div initial={{ scale: 1 }}>
        <Modal
          open={openst}
          onClose={handleClosest}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          
        </Modal>
      </motion.div> */}
    </React.Fragment>
  );
}

// file modal

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // marginLeft:3,
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: 100,

  borderRadius: 2,
  boxShadow: 24,
  color: "grey",
  p: 1,
};
