import * as React from "react";
import {
  Button,
  Grid,
  Typography,
  Stack,
  Avatar,
  ImageList,
  ImageListItem,
  Modal,
  Box,
  CssBaseline,
  Container,
  Popover,
  Chip,
} from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { AuthContext } from "../contexts/AuthContext";
import axios from "../axios/axios";
import adaxios from "../axios/adminAxios";
import StarIcon from "@mui/icons-material/Star";
import EditProfileModal from "../components/ProfilePg/EditProfileModal";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  width: "50rem",
};

export default function SimpleContainer() {
  function getExtension(filename) {
    return filename.split(".").pop();
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickPop = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePop = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const openPop = Boolean(anchorEl);
  const id = openPop ? "simple-popover" : undefined;

  const [show, setShow] = React.useState("all");
  const [photoBt, setPbt] = React.useState("contained");
  const [modBt, setMbt] = React.useState("outlined");
  const [qnBt, setQnbt] = React.useState("outlined");
  const [PurchaseBt, setPurchasebt] = React.useState("outlined");

  const [posts, setPosts] = React.useState([]);

  const [userbio, setUserbio] = React.useState("bio");

  const handlePhotobt = () => {
    setPosts([]);
    setShow("all");
    setPbt("contained");
    setMbt("outlined");
    setQnbt("outlined");
    setPurchasebt("outlined");
    details = { section: "all" };
    axios.post(`getUserPosts/${user.user_id}`, details).then((response) => {
      setPosts(response.data);
    });
  };

  const handleModbt = () => {
    setPosts([]);
    setShow("files");
    setMbt("contained");
    setQnbt("outlined");
    setPbt("outlined");
    setPurchasebt("outlined");
    details = { section: "files" };
    axios.post(`getUserPosts/${user.user_id}`, details).then((response) => {
      setPosts(response.data);
    });
  };

  const handleQnbt = () => {
    setPosts([]);
    setShow("primes");
    setQnbt("contained");
    setMbt("outlined");
    setPbt("outlined");
    setPurchasebt("outlined");
    details = { section: "primes" };
    axios.post(`getUserPosts/${user.user_id}`, details).then((response) => {
      setPosts(response.data);
    });
  };

  const handlePurchasebt = () => {
    setPosts([]);
    setShow("purchases");
    setQnbt("outlined");
    setMbt("outlined");
    setPbt("outlined");
    setPurchasebt("contained");
    details = { section: "purchases" };
    axios.post(`getUserPosts/${user.user_id}`, details).then((response) => {
      setPosts(response.data);
    });
  };

  let { user, setUser, setAuthTokens } = React.useContext(AuthContext);

  const handleBusReq = () => {
    adaxios.put("bussinessReq/" + user.user_id).then((response) => {});
  };

  const [followers, setFollowers] = React.useState([]);
  const [following, setFollowing] = React.useState([]);

  let details;

  const getProfileCounts = () => {
    axios.get(`ProfileCounts/${user.user_id}`).then((response) => {
      setFollowers(response.data.follower);
      setFollowing(response.data.following);
    });
  };

  const getPosts = () => {
    details = { section: show };
    axios.post(`getUserPosts/${user.user_id}`, details).then((response) => {
      setUserbio(response.data[0].bio);
      setPosts(response.data);
    });
  };

  const [open, setOpen] = React.useState(false);

  const [currentPost, setCurrentPost] = React.useState([]);

  const handleOpen = (obj) => {
    setCurrentPost(obj);
    setOpen(true);
  };

  const logoutHandler = () => {
    console.log("teet");
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };

  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    getPosts();
    getProfileCounts();
  }, [userbio]);

  console.log("oppoopopo", userbio);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid
          sx={{
            mt: 2,
            borderRadius: 2,
            bgcolor: "#4f4f4f",
            height: "80rem",
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
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Stack
            direction="colomn"
            className="pboxresp"
            justifyContent="space-around"
            sx={{
              border: "1px",
              borderRadius: 2,
              height: "15rem",
              m: 0.5,
              p: 1,
              backgroundColor: "#303030",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Stack direction="row" className="h-16" spacing={2}>
              {user.profile ? (
                <Avatar
                  className="profileresponsive"
                  sx={{ height: "8em", width: "8em" }}
                  alt="profile"
                  src={user.profile}
                />
              ) : (
                <Avatar
                  className="profileresponsive"
                  sx={{ height: "8em", width: "8em" }}
                  alt="Muthasir"
                />
              )}

              <Grid
                sx={{ display: "flex", alignItems: "center", color: "grey" }}
              >
                <span style={{ fonSize: "20rem" }}>{user.name}</span>
                <br></br>
                <p style={{ marginTop: "25%" }}>{userbio}</p>
                <br></br>
                <Stack
                  sx={{
                    mt: "65%",
                    height: "5rem",
                    width: "10rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                  direction="row"
                >
                  {/* <Button sx={{mt:3}} variant="contained" onClick={handleuse}>Edit Profile</Button> */}
                  <div>
                    <EditProfileModal />
                  </div>
                  &nbsp;
                  <Button
                    variant="outlined"
                    color="error"
                    size="medium"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Button>
                  <div>
                    {user.is_bussiness !== true ? (
                      <Button
                        style={{ color: "darkgrey" }}
                        aria-describedby={id}
                        onClick={handleClickPop}
                      >
                        More
                      </Button>
                    ) : (
                      <span>
                        <Chip
                          sx={{ ml: 1, height: "2rem", maxWidth: "8rem" }}
                          avatar={
                            <Avatar alt="Natacha">
                              <BusinessCenterIcon />
                            </Avatar>
                          }
                          size="small"
                          label="Bussiness"
                          color="secondary"
                        />
                      </span>
                    )}

                    <Popover
                      id={id}
                      open={openPop}
                      anchorEl={anchorEl}
                      onClose={handleClosePop}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <Button
                        onClick={handleBusReq}
                        color="secondary"
                        variant="contained"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                          />
                        </svg>
                        &nbsp; Request For Bussiness Account
                      </Button>
                    </Popover>
                  </div>
                </Stack>
              </Grid>
            </Stack>
            {/* <Typography>
                    
                  </Typography> */}

            <Stack
              direction="colomn"
              sx={{ gap: "2rem" }}
              justifyContent="flex-end"
            >
              <Stack sx={{ mt: 4, color: "grey", alignItems: "center" }}>
                <span className="text-xs sm:text-lg">Followers</span>
                <p className="text-xs sm:text-lg">{following.length}</p>
              </Stack>

              <Stack sx={{ mt: 4, color: "grey", alignItems: "center" }}>
                <span className="text-xs sm:text-lg">Following</span>
                <p className="text-xs sm:text-lg">{followers.length}</p>
              </Stack>

              <Stack sx={{ mt: 4, color: "grey", alignItems: "center" }}>
                <span className="text-xs sm:text-lg">Posts</span>
                <p className="text-xs sm:text-lg">{posts.length}</p>
              </Stack>
            </Stack>
          </Stack>

          {/* <Grid direction="row" sx={{border:"1px",borderRadius:2,height:"5vh",m:0.5,backgroundColor:"#303030"}}>
                
                </Grid> */}

          <Grid
            direction="row"
            sx={{
              border: "1px",
              borderRadius: 2,
              pb: 30,
              m: 0.5,
              backgroundColor: "#303030",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <Stack
              direction="colomn"
              spacing="4px"
              justifyContent="center"
              sx={{ pt: 2 }}
            >
              <Button
                className="w-28 h-10 text-xs sm:w-44 sm:h-10"
                variant={photoBt}
                color="error"
                sx={{ mr: 1 }}
                onClick={handlePhotobt}
              >
                Photos/Videos
              </Button>
              <Button
                className="w-28 h-10 text-xs sm:w-44 sm:h-10"
                variant={modBt}
                color="secondary"
                onClick={handleModbt}
              >
                Files
              </Button>
              &nbsp;&nbsp;
              <Button
                className="w-28 h-10 text-xs sm:w-44 sm:h-10"
                variant={qnBt}
                onClick={handleQnbt}
              >
                Premium
                <StarIcon sx={{ pb: 0.3, color: "#ffbf00" }} />
              </Button>
              <span style={{ marginLeft: "2vw" }}>
                <Button
                  className="w-28 h-10 text-xs sm:w-44 sm:h-10"
                  color="warning"
                  variant={PurchaseBt}
                  onClick={handlePurchasebt}
                >
                  <ShoppingCartIcon
                    className="text-zinc-400"
                    sx={{ pb: 0.3 }}
                  />
                  <span
                    style={{
                      "@media only screen and (max-width: 640px)": {
                        fontSize: "14px !important",
                      },
                    }}
                  >
                    Purchases
                  </span>
                </Button>
              </span>
            </Stack>
            <br></br>

            {posts.length !== 0 ? (
              <ImageList
                sx={{ overflowY: "hidden", m: 1, pb: 4, borderRadius: 2 }}
                cols={4}
                rowHeight={164}
              >
                {PurchaseBt !== "contained" ? (
                  <>
                    {posts.map((obj) => {
                      let filetype = obj.mediatype;
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
                          {filetype === "image" ? (
                            <img
                              style={{ height: "100%" }}
                              // className="h-10 sm:h-5"
                              // src={`${obj.img}?w=164&h=164&fit=crop&auto=format`}
                              src={obj.file}
                              srcSet={obj.file}
                              alt={obj.title}
                              loading="lazy"
                            />
                          ) : (
                            <video
                              style={{ objectFit: "cover", height: "100%" }}
                              src={obj.file}
                            />
                          )}
                        </ImageListItem>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {posts.map((obj) => {
                      let filetype = obj.mediatype;
                      return (
                        <ImageListItem
                          onClick={() => {
                            handleOpen(obj.postid);
                          }}
                          key={obj.postid.id}
                          sx={{
                            boxShadow:
                              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                          }}
                        >
                          {filetype === "picture" ? (
                            <img
                              // style={{height:"10px"}}
                              className="h-10 sm:h-5"
                              // src={`${obj.img}?w=164&h=164&fit=crop&auto=format`}
                              src={obj.postid.file}
                              srcSet={obj.postid.file}
                              alt={obj.postid.title}
                              loading="lazy"
                            />
                          ) : (
                            <video
                              style={{ objectFit: "cover", height: "17rem" }}
                              src={obj.postid.file}
                            />
                          )}
                        </ImageListItem>
                      );
                    })}
                  </>
                )}
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
    </React.Fragment>
  );
}
