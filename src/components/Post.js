import * as React from "react";

import {
  Button,
  Grid,
  TextField,
  Avatar,
  Stack,
  InputBase,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Icon,
  IconButton,
  Typography,
  Popover
} from "@mui/material";

import { red } from "@mui/material/colors";
import { styled, alpha } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import axios from "../axios/axios";
import adaxios from "../axios/adminAxios"
import { AuthContext } from "../contexts/AuthContext";
import ForumIcon from "@mui/icons-material/Forum";

import { useNavigate } from "react-router-dom";

import Moment from "react-moment";
import "moment-timezone";

// import MuiImageSlider from 'mui-image-slider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from "react";
import ReportModal from "./FeedPg/ReportModal";
import { SearchContext } from "../contexts/SearchValue";
import BasicModal from "./PaymentModal";
import VideoPlayer from "./VideoPlayer";



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  // transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post(props) {
  const [anchorElpop, setAnchorElpop] = React.useState(null);

  const handleClickPop = (event) => {
    setAnchorElpop(event.currentTarget);
  };

  const getFeed = () => {
    axios.get("feedPost").then((response) => {
      setFeedPost(response.data);
    });
  };


  const handleClosePop = () => {
    setAnchorElpop(null);
  };

  const openPop = Boolean(anchorElpop);
  const idPop = openPop ? "simple-popover" : undefined;

  const [data, setData] = useState(props.data);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

    let [checkPurchase, setCheckPurchase] = React.useState(false);

  const navigate = useNavigate();

  let { user } = React.useContext(AuthContext);
  let { setFeedPost,setSuccessAlert} = React.useContext(SearchContext)

  let profile = "";
  if (user.profile !== "null") {
    profile = user.profile.replace("/reactapp/src/uploads/profile/", "");
  }

  const [likebool, setLIkebool] = React.useState(false);

  const [expanded, setExpanded] = React.useState(false);

  const [comments, setComments] = React.useState(props.data.comment);

  const [likeCount, setLikeCount] = React.useState(props.data.likes);

  const [com, setCom] = React.useState("");

  const [primecheck,setPrimeCheck] = React.useState(false)

  const handlePrimeTrigger = () =>{
    setPrimeCheck(true)
  }

  React.useEffect(() => {
    setLIkebool(false);
    for (let i = 0; i < data.prime.length; i++) {
      if (data.prime[i].userid === user.user_id) {
        setPrimeCheck(true);
        break;
      }
    }

  }, [likebool, data]);

  // Button states

  const handleCom = (e, postid) => {
    e.preventDefault();
    let comments = com;
    let det = { comments, postid, userid: user.user_id };
    axios.post("subComment", det).then((response) => {
      console.log('iiiiiii',response.data.comment)
      getFeed()
      setComments(response.data.comment)
    });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handlePurchase = (postid) => {
    console.log("hello", postid, user.user_id);
    let details = { postid, userid: user.user_id };
    axios.post("dummyPurchase", details).then((response) => {
      console.log(response.data);
    });
  };

  const downloadFile = (file, id) => {
    console.log("d clicked", file, id);
    let filename = file.replace("/reactapp/src/uploads/zpostfile/", "");
    console.log(filename);
    axios({
      url: `DownloadFile/${id}`,
      method: "GET",
      // responseType: "blob",
      filename,
    }).then((response) => {
      window.location.href = response.data
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", filename); //or any other extension
      // document.body.appendChild(link);
      // link.click();
      console.log(response.data)
    });

    let details = { userid: user.user_id, postid: id };
    axios.post("addDownloadsCount", details).then((response) => {
      console.log("response.data", response.data);
    });
  };

  const handleLik = (userid, postid) => {
    console.log("88888888888888888",image);
    let det = { user: userid, post: postid };
    axios.post("LikePost", det).then((response) => {
      console.log(response.data);
      setLikeCount(response.data);
      // if(response.data ==='Liked'){
      //   setLiked(true)
      // }else{
      //   setLiked(false)
      // }
      // console.log('3333333333',liked);
    });
    // setLIkebool(true);
    // liked===true?setLikeCount(likeCount+1):setLikeCount(likeCount-1)
  };

  const handleOth = (e, userid, username, userprofile) => {
    e.preventDefault();
    console.log("click", userid);
    // if (userid!==user.user_id){
    navigate("/oprofile", {
      state: { userid: userid, username: username, userprofile: userprofile },
    });
    // }
  };

  function getExtension(filename) {
    return filename.split(".").pop();
  }

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  let image;

  function getExtension(filename) {
    return filename.split(".").pop();
  }

  // image = data.file.replace("https://dconnect-799.s3.ap-south-1.amazonaws.com/media/posts", "");
  // let filetype;
  // if (
  //   getExtension(image).toLowerCase() === "jpg" ||
  //   getExtension(image).toLowerCase() === "png" ||
  //   getExtension(image).toLowerCase() === "bmp" ||
  //   getExtension(image).toLowerCase() === "jpeg" ||
  //   getExtension(image).toLowerCase() === "webp"
  // ) {
  //   filetype = "pic";
  // } else {
  //   filetype = "vid";
  // }

  // let filetype = data.mediatype
  let avat;
  if (data.profile) {
    avat = data.profile
  }
  

 

  let backcol = "#18181B";

  if (data.mediatype === "video") {
    backcol = "#3f3f46";
  } else {
    backcol = "#18181B";
    
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleDelete = (id) => {
    console.log('dddddddddddeeeeeeeed');
    axios
      .delete(`deletepost/${id}`)
      .then((response) => {
        getFeed()
        setSuccessAlert(true)
      });
  };

  // const player = React.useRef(null);

  // React.useEffect(() => {
  //   player.current = new Plyr('#player', {
  //     // options here
  //     controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
  //     autoplay: true,
  //     // loop: { active: true },
  //     // keyboard: { focused: true, global: true },
  //     // captions: { active: true, update: true, language: 'en' },

  //   });
  // }, []);


  return (
    <div>
      <Stack>
        {data ? (
          <Card
            sx={{
              maxWidth: "800px",
              mt: 1,
              bgcolor: backcol,
              mb: 1,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            {avat ? (
              <CardHeader
                className="bg-zinc-700"
                sx={{ color: "#bdbdbd", p: 0.5 }}
                avatar={
                  <Avatar
                    onClick={(e) =>
                      handleOth(e, data.userid, data.username, data.profile)
                    }
                    sx={{ bgcolor: red[500] }}
                    src={avat}
                    aria-label="recipe"
                  ></Avatar>
                }
                subheader={
                  <>
                    <Moment
                      onClick={(e) =>
                        handleOth(e, data.userid, data.username, data.profile)
                      }
                      format="DD&nbsp;MMMM&nbsp;"
                      style={{ marginLeft: "2px", color: "grey" }}
                    >
                      {data.created_at}
                    </Moment>
                  </>
                }
                action={
                  <>
                    <IconButton aria-label="settings">
                      <MoreVertIcon
                        onClick={handleClickPop}
                        sx={{ color: "darkgrey" }}
                      />

                      <Popover
                        id={idPop}
                        open={openPop}
                        anchorEl={anchorElpop}
                        onClose={handleClosePop}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      >
                        <div style={{ backgroundColor: "#333333" }}>
                          {user.user_id !== data.userid ? (
                            <ReportModal postid={data.id} />
                          ) : (
                            ""
                          )}

                          {user.user_id === data.userid ? (
                            <Button
                              sx={{ m: 1 }}
                              onClick={()=>handleDelete(data.id)}
                              color="error"
                              variant="contained"
                            >
                              Delete this Post&nbsp;
                              <DeleteOutlineIcon />
                            </Button>
                          ) : (
                            ""
                          )}
                        </div>
                      </Popover>
                    </IconButton>

                    {data.is_z === true ? (
                      <IconButton aria-label="settings">
                        <FileCopyIcon sx={{ color: "blue" }} />
                        <span
                          style={{
                            fontSize: "1rem",
                            color: "darkgrey",
                          }}
                        >
                          File
                        </span>
                      </IconButton>
                    ) : (
                      ""
                    )}
                    {data.is_premium === true ? (
                      <Button size="sm" color="warning" variant="contained">
                        <WorkspacePremiumIcon />
                        Premium
                      </Button>
                    ) : (
                      ""
                    )}
                  </>
                }
                title={
                  <div
                    className="cursor-pointer"
                    onClick={(e) =>
                      handleOth(e, data.userid, data.username, data.profile)
                    }
                  >
                    {data.username}
                  </div>
                }

                // subheader={<Moment>item.created_at</Moment>}
              >
                hell
              </CardHeader>
            ) : (
              <CardHeader
                className="text-2xl bg-zinc-700"
                sx={{ color: "#bdbdbd", p: 0.5 }}
                avatar={
                  <Avatar
                    sx={{ bgcolor: red[500] }}
                    aria-label="recipe"
                  ></Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon
                      onClick={handleClickPop}
                      sx={{ color: "darkgrey" }}
                    />

                    <Popover
                      id={idPop}
                      open={openPop}
                      anchorEl={anchorElpop}
                      onClose={handleClosePop}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <div style={{ backgroundColor: "#333333" }}>
                        {user.user_id !== data.userid ? (
                          <ReportModal postid={data.id} />
                        ) : (
                          ""
                        )}
                        {user.user_id === data.userid ? (
                          <Button
                            sx={{ m: 1 }}
                            color="error"
                            variant="contained"
                            onClick={()=>handleDelete(data.id)}
                          >
                            Delete this Post&nbsp;
                            <DeleteOutlineIcon />
                          </Button>
                        ) : (
                          ""
                        )}
                      </div>
                    </Popover>
                  </IconButton>
                }
                title={
                  <div
                    className="cursor-pointer"
                    onClick={(e) =>
                      handleOth(e, data.userid, data.username, data.profile)
                    }
                  >
                    {data.username}
                  </div>
                }
                subheader={
                  <>
                    <Moment
                      onClick={(e) =>
                        handleOth(e, data.userid, data.username, data.profile)
                      }
                      format="DD&nbsp;MMMM&nbsp;"
                      style={{ marginLeft: "2px", color: "grey" }}
                    >
                      {data.created_at}
                    </Moment>
                  </>
                }

                // subheader={item.created_at}
              ></CardHeader>
            )}
            {/* <Moment
                  format="DD&nbsp;MMMM&nbsp;"
                  style={{ marginLeft: "2px", color: "grey" }}
                >
                  {data.created_at}
                </Moment> */}
                
            
              <Slider className="slideralign" {...settings}>
                <div>
                  {data.file ? (
                    <>
                    {data.mediatype === 'image'?
                    <CardMedia
                      sx={{maxHeight:"390px"}}
                      component='img'
                      src = {data.file}
                      alt="Paella dish"
                    />
                    :
                    <CardMedia
                      id="player" playsinline controls autoPlay muted
                      sx={{maxHeight:"390px"}}
                      component="video"
                      
                      src={data.file}
                    
                      alt="Paella dish"
                    />

                    }
                    </>              
                  ) : (
                    ""
                  )}
                </div>

                {data.file2 ? (
                  <div>
                   {data.mediatype2==='image'?
                    <CardMedia 
                    sx={{maxHeight:"390px"}}
                      component='img'
                      src = {data.file2}
                      alt="Paella"
                    />
                    :
                    <CardMedia
                      sx={{maxHeight:"390px"}}
                      component="video"
                      loop
                      controls
                      src={data.file2}
                      autoPlay
                      muted
                    />}
                    </div>
                  ) : (
                    ""
                  )}
                

                
                {data.file3 ? (
                  <div>
                    {data.mediatype3==='image'?
                    <CardMedia 
                    sx={{maxHeight:"390px"}}
                      component='img'
                      src = {data.file3}
                      alt="Paella dish"
                    />
                    :
                    <CardMedia
                      sx={{maxHeight:"390px"}}
                      component="video"
                      loop
                      controls
                      src={data.file3}
                      autoPlay
                      muted
                      alt="Paella dish"
                    />}
                    </div>
                  ) : (
                    ""
                  )}
                

              </Slider>
          

            <CardContent className="text-zinc-400 bg-zinc-700" sx={{ p: 0.5 }}>
              <Typography variant="body2" color="grey">
                {data.caption === "undefined"?"":data.caption}
              </Typography>
            </CardContent>
            <CardActions disableSpacing className="bg-zinc-700" sx={{ p: 0 }}>
              <IconButton
                aria-label="add to favorites"
                onClick={() => handleLik(data.userid, data.id)}
              >
                <StarIcon className="text-yellow-400" />{" "}
                <span className="text-zinc-400">{likeCount}</span>
              </IconButton>
              {data.price > 0 ? (
                <>
                  <Typography sx={{ color: "darkgrey" }}>
                    Rs.{data.price}
                  </Typography>
                  &nbsp;
                </>
              ) : (
                ""
              )}
              {/* <text onClick={handleLiker(item.id,rep.id)}>dsd</text> */}
              {/* <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton> */}

              {data.is_z === true ? (
                data.is_premium === false ? (
                  <Button
                    variant="contained"
                    onClick={() => downloadFile(data.zfile, data.id)}
                    color="success"
                  >
                    <DownloadIcon />
                    Download File
                  </Button>
                ) : //  item.prime.map((obj)=>{
                //   let joi = obj.userid
                //  })
                primecheck === false && user.user_id != data.userid ? (
                  // <Button
                  //   onClick={() => handlePurchase(data.id)}
                  //   variant="contained"
                  //   color="primary"
                  // >
                  //   Purchase
                  // </Button>
                  <BasicModal price={data.price} postid={data.id} primeTrigger={handlePrimeTrigger} feedCall={props.feedCall} userid={user.user_id}/>
                ) : (
                  <>
                    <Button
                      sx={{ lineHeight: "normal" }}
                      onClick={() => downloadFile(data.zfile, data.id)}
                      variant="contained"
                      color="success"
                    >
                      <Stack>
                        <span style={{ fontSize: "0.5rem" }}>
                          Already Owned
                        </span>
                        <span>Download</span>
                      </Stack>
                    </Button>
                  </>
                )
              ) : (
                ""
              )}

              {/* <span style={{fontSize:"80%",marginLeft:"78%"}}>Comments&nbsp;</span> */}
              {/* <Button variant="contained" color="secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
</svg>
<span>Repo</span>
</Button> */}

              {data.repo.length > 8 ? (
                <>
                  &nbsp;
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleClick}
                      color="secondary"
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
                          d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                        />
                      </svg>
                      <span>Repo</span>
                    </Button>

                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <Typography sx={{ p: 2 }}>
                        <a href={data.repo}>{data.repo}</a>
                      </Typography>
                    </Popover>
                  </div>
                </>
              ) : (
                ""
              )}

              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <span className="text-zinc-400" style={{ textAlign: "left" }}>
                  {comments&& comments.length}
                </span>
                {/* <ExpandMoreIcon /> */}
                <ForumIcon className="text-zinc-400" />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <TextField
                  sx={{ padding: "0px" }}
                  id="outlined-basic"
                  onChange={(e) => setCom(e.target.value)}
                  label="Write your comment"
                  variant="outlined"
                />
                &nbsp;
                <Button
                  color="primary"
                  onClick={(e) => handleCom(e, data.id)}
                  variant="contained"
                >
                  Post
                </Button>
                <br></br>
                <h3 style={{color:"darkgray",marginTop:"10px",marginBottom:"10px",fontSize:"large"}}>Comments</h3>
                
                <Grid sx={{ pl: 5,borderRadius:"10px" ,boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",pt:2,pb:2,maxHeight:"200px",overflow:"auto"}} direction="row">
                  {comments && comments.map((obj) => {
                    let comimage;
                    if (obj.profile !== null) {
                      comimage = obj.profile.replace(
                        "/reactapp/src/uploads/profile/",
                        ""
                      );
                    }

                    return (
                      <>
                      <Stack direction="row">
                        <Stack
                          sx={{
                            pt: 0.5,
                            bgcolor: "grey",
                            mb: 0.5,
                            width: "50%",
                            height: 50,
                            borderRadius: 2,
                            pl: 1,
                          }}
                        >
                          {comimage != null ? (
                            <Stack direction="row">
                              <Avatar
                                sx={{
                                  height: "15px",
                                  width: "15px",
                                }}
                                src={avat}
                              />
                              <span>{obj.name}</span>
                            </Stack>
                          ) : (
                            <Stack direction="row">
                              <Avatar
                                sx={{
                                  height: "15px",
                                  width: "15px",
                                }}
                              />
                              <span>{obj.name}</span>
                            </Stack>
                          )}

                          <Stack sx={{ pt: 0.5 }}>{obj.comments}</Stack>
                        </Stack>

                        {/* {obj.userid === user.user_id && props.data.userid === user.user_id ?
                          <Button variant="contained" color="error" sx={{ml:2,mt:1,height:"30px"}}>Remove</Button>
                          :
                          <Button variant="contained" color="error" sx={{ml:2,mt:1,height:"30px"}}>Report</Button>
                          } */}

                        </Stack>
                      </>
                    );
                  })}
                </Grid>
              </CardContent>
            </Collapse>
          </Card>
        ) : (
          <Card
            // className="bg-zinc-900"
            sx={{
              maxWidth: "800px",
              mt: 1,
              bgcolor: "#18181B",
              mb: 1,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <span>hdscjsfkdskf</span>
          </Card>
        )}
        {/* // </Box> */}
      </Stack>

      
    </div>
  );
}

export default Post;
