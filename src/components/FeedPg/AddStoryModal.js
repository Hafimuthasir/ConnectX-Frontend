import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { motion } from "framer-motion";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import UploadFileBt from "../UploadFileBt";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import {
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Avatar,
} from "@mui/material";
import axios from "../../axios/axios";
import { AuthContext } from "../../contexts/AuthContext";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { SearchContext } from "../../contexts/SearchValue";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 14,
  height: 14,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginLeft: 3,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#2b2b2b",
  border: "2px solid grey",
  borderRadius: 2,
  boxShadow: 24,
  color: "grey",
  p: 1,
};

export default function BasicModal(props) {
  let { user } = React.useContext(AuthContext);

  const [progress, setProgress] = React.useState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    getOwnStory();
    setOpen(false);
    setFile("");
  };

  const [file, setFile] = React.useState("");
  const [mediaType,setMediaType] = React.useState("")
  // post input hiding config
  const hiddenFileInput = React.useRef(null);
  const hiddenZFileInput = React.useRef(null);

  const handleErrorAlert=()=>{
    setErrorAlert(true)
    const timer = setTimeout(() => {
      setErrorAlert(false);
    }, 2500);
  }

  let {
    setFeedPost,
    setPostbool,
    setSuccessAlert,
    setErrorAlert,
    setErrorMsg,
    setOwnStory,
    setOwnStoryWatched,
  } = React.useContext(SearchContext);

  const handleCheck = () => {
    console.log("hai", file);
  };

  const getFeed = (e) => {
    axios.get("feedPost").then((response) => {
      setFeedPost(response.data);
      setPostbool(true);
    });
  };

  let ownStoryWatched;
  const getOwnStory = () => {
    axios.get(`getOwnStory/${user.user_id}`).then((response) => {
      setOwnStory(response.data);
      let selfwatch = response.data[response.data.length - 1].watched.find(
        (obj) => obj.user === user.user_id
      );

      if (selfwatch !== undefined) {
        setOwnStoryWatched(true);
      } else {
        setOwnStoryWatched(false);
      }
    });
  };

  const handleUpload = (e) => {
    let userid = user.user_id;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mediatype",mediaType)
    formData.append("userid", userid);

    axios
      .post("uploadStory", formData, {
        onUploadProgress: (data) => {
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      })
      .then((response) => {
        if (response.status === 201) {
          console.log('helloe');
          getFeed();
          handleClose();
          setSuccessAlert(true)
        }
      })
      .catch((error) => {
        let erObj = Object.values(error.response.data)
        let errorMsg = Object.values(erObj[0])
        setErrorMsg(errorMsg[0])
        handleErrorAlert()
      });
  };

  const handleplus = (e) => {
    setFile(e.target.files[0]);
    let mediatype = e.target.files[0].type.substr(
      0,
      e.target.files[0].type.lastIndexOf("/")
    );
    setMediaType(mediatype)
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  let profile = "";
  if (user.profile !== "null") {
    profile = user.profile;
  }

  return (
    <>
      {props.type === "avatar" ? (
        profile ? (
          <>
            <Badge
              onClick={handleOpen}
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <AddCircleRoundedIcon className="text-blue-700 border rounded-full" />
              }
            >
              <Avatar
                sx={{ width: "55px", height: "55px" }}
                alt="Travis Howard"
                src={profile}
              />
            </Badge>
          </>
        ) : (
          <Avatar
            alt={user.name}
            sx={{ width: "55px", height: "55px" }}
            src="/static/images/avatar/1.jpg"
            onClick={handleOpen}
          >
            {user.name}
            <AddCircleRoundedIcon />
          </Avatar>
        )
      ) : (
        <Button
          variant="contained"
          size="large"
          sx={{ height: "23px", fontSize: "8px" }}
          color="secondary"
          onClick={handleOpen}
        >
          Add Story
        </Button>
      )}

      <motion.div initial={{ scale: 1 }}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Upload Story
            </Typography>
            <br></br>

            <Stack spacing={0.5}>
              <div onClick={handleClick}>
                <UploadFileBt name="Upload Media" />
              </div>
            </Stack>

            <form encType="multipart/form-data">
              <input
                type="file"
                ref={hiddenFileInput}
                style={{ display: "none" }}
                onChange={handleplus}
                name="file"
              ></input>

              <br></br>
              {/* <TextField onChange={handleCap} id="outlined-basic" label="Caption" variant="outlined" /> */}
              <br></br>
              <Grid>
                <Button onClick={handleClose} variant="contained" color="error">
                  Close
                </Button>
                &nbsp;
                <Button
                  onClick={handleUpload}
                  variant="contained"
                  color="success"
                >
                  Upload
                </Button>
                {progress ? (
                  <>
                    <br></br>
                    <Box sx={{ width: "100%" }}>
                      <Typography>Uploading</Typography>
                      <LinearProgress variant="determinate" value={progress} />
                    </Box>
                  </>
                ) : (
                  ""
                )}
              </Grid>
            </form>
          </Box>
        </Modal>
      </motion.div>
    </>
  );
}
