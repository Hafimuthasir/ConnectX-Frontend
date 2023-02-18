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
import { InputLabel, Select, MenuItem, LinearProgress } from "@mui/material";
import axios from "../../axios/axios";
import { AuthContext } from "../../contexts/AuthContext";
import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils";
import getFeed from "../../Pages/FeedPage";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../contexts/SearchValue";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginLeft: 3,
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "30rem",
  // height:"40rem",
  p: 1,
  maxHeight: "40rem",
  bgcolor: "#2b2b2b",
  border: "2px solid grey",
  borderRadius: 2,
  boxShadow: 24,
  color: "grey",
  overflowY: "auto",
};

export default function BasicModal() {
  const navigate = useNavigate();

  let { user } = React.useContext(AuthContext);
  let { setFeedPost, setPostbool, setOpenAlert, setErrorAlert, setErrorMsg } =
    React.useContext(SearchContext);

  const [age, setAge] = React.useState("");

  const [progress, setProgress] = React.useState();

  const handleChange = (event) => {
    setLang(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    // console.log('llll',zfile.name);
    setOpen(false);
    setFile("");
    setImage(null);
    setProgress(null)
  };

  const [file, setFile] = React.useState("");
  const [mediaType, setMediaType] = React.useState("");

  const [file2, setFile2] = React.useState("");
  const [file3, setFile3] = React.useState("");
  // post input hiding config
  const hiddenFileInput = React.useRef(null);
  const hiddenZFileInput = React.useRef(null);

  const [caption, setCap] = React.useState();
  const [lang, setLang] = React.useState("");
  const [repo, setRepo] = React.useState("");
  const [isZ, setIsz] = React.useState(false);
  const [zfile, setZfile] = React.useState();
  const [zDesc, setZdesc] = React.useState();
  const [isPrime, setIsprime] = React.useState();
  const [price, setPrice] = React.useState("");
  const [dprice, setDprice] = React.useState();

  const [image, setImage] = React.useState(null);

  const getFeed = (e) => {
    axios.get("feedPost").then((response) => {
      setFeedPost(response.data);
    });
  };

  const handleErrorAlert = () => {
    setErrorAlert(true);
    const timer = setTimeout(() => {
      setErrorAlert(false);
    }, 2500);
  };

  const handleUpload = (e) => {
    let userid = user.user_id;

    const formData = new FormData();
    formData.append("file", file);
    formData.append('mediatype',mediaType)
    formData.append("caption", caption);
    formData.append("userid", userid);
    formData.append("repo", repo);
    formData.append("lang", lang);
    if (isZ === true) {
      formData.append("is_z", isZ);
      formData.append("zfile", zfile);
      formData.append("zdescription", zDesc);
    }
    if (isPrime === true) {
      formData.append("is_premium", isPrime);
      formData.append("price", price);
      formData.append("discount_price", dprice);
    }
    var dat = { file, caption, userid };
    axios
      .post("uploadPost", formData, {
        onUploadProgress: (data) => {
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      })
      .then((response) => {
        if (response.status === 201) {
          handleClose();
          setFile("");
          setImage(null);
          getFeed();
        }
      })
      .catch((error) => {
        let erObj = Object.values(error.response.data);
        let errorMsg = Object.values(erObj[0]);
        setErrorMsg(errorMsg[0]);
        handleErrorAlert();
      });
  };

  const handleplus = (e) => {
    setFile(e.target.files[0]);
    let mediatype = e.target.files[0].type.substr(
      0,
      e.target.files[0].type.lastIndexOf("/")
    );
    
    setImage({ image: URL.createObjectURL(e.target.files[0]) });
    setMediaType(mediatype)
  };

  const handleZplus = (e) => {
    setZfile(e.target.files[0]);
  };

  const handleCap = (e) => {
    setCap(e.target.value);
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleZClick = (event) => {
    hiddenZFileInput.current.click();
  };

  // React.useEffect(() => {

  // }, [file])

  return (
    <div>
      <Button
        variant="contained"
        size="large"
        sx={{ height: "23px", fontSize: "8px" }}
        color="primary"
        onClick={handleOpen}
      >
        Upload Post
      </Button>
      <motion.div initial={{ scale: 1 }}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Upload Post
            </Typography>

            <Stack spacing={0.5}>
              <Stack direction="row" spacing={0.5}>
                <TextField
                  id="outlined-basic"
                  InputLabelProps={{
                    style: { color: "grey" },
                  }}
                  sx={{ input: { color: "white" } }}
                  onChange={(e) => setCap(e.target.value)}
                  label="Caption"
                  variant="outlined"
                />
                <br></br>
                <FormControl fullWidth>
                  <InputLabel
                    InputLabelProps={{
                      style: { color: "grey" },
                    }}
                    sx={{ input: { color: "white" } }}
                    id="demo-simple-select-label"
                  >
                    Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={lang}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value="Css">Css</MenuItem>
                    <MenuItem value="Javascript">JavaScript</MenuItem>
                    <MenuItem value="Python">Python</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Typography>Upload Photos</Typography>
              <Stack direction="row" spacing={0.5}>
                {image == null ? (
                  <div onClick={handleClick}>
                    <UploadFileBt name="Upload Photo 1" />
                  </div>
                ) : (
                  <img
                    style={{ width: 80, heigth: 63, objectFit: "fill" }}
                    src={image.image}
                  />
                )}
                {file ? <UploadFileBt name="Add More" /> : ""}
              </Stack>
              <TextField
                id="outlined-basic"
                InputLabelProps={{
                  style: { color: "grey" },
                }}
                sx={{ input: { color: "white" } }}
                label="Repo Link"
                onChange={(e) => setRepo(e.target.value)}
                variant="outlined"
              />
              <FormControlLabel
                control={
                  <Checkbox onChange={(e) => setIsz(e.target.checked)} />
                }
                label="Upload and Link File"
              />

              {isZ === true ? (
                <div>
                  <Typography>Files should be Packed to single</Typography>
                  <Stack direction="row" spacing={0.5}>
                    <div onClick={handleZClick}>
                      <UploadFileBt name="Upload File" />
                    </div>
                    <TextField
                      id="outlined-basic"
                      InputLabelProps={{
                        style: { color: "grey" },
                      }}
                      sx={{ input: { color: "white" } }}
                      onChange={(e) => setZdesc(e.target.value)}
                      label="File Description"
                      variant="outlined"
                    />
                  </Stack>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => setIsprime(e.target.checked)}
                      />
                    }
                    label="is Premiuim"
                  />
                </div>
              ) : (
                ""
              )}

              {isPrime === true ? (
                <Stack direction="row" spacing={0.5}>
                  <TextField
                    id="outlined-basic"
                    onChange={(e) => setPrice(e.target.value)}
                    label="Price"
                    variant="outlined"
                  />
                  <TextField
                    id="outlined-basic"
                    onChange={(e) => setDprice(e.target.value)}
                    label="Discounted Price"
                    variant="outlined"
                  />
                </Stack>
              ) : (
                ""
              )}
            </Stack>

            <form encType="multipart/form-data">
              <input
                type="file"
                ref={hiddenFileInput}
                style={{ display: "none" }}
                onChange={handleplus}
                name="file"
              ></input>

              <input
                type="file"
                ref={hiddenZFileInput}
                style={{ display: "none" }}
                onChange={handleZplus}
                name="Zfile"
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
    </div>
  );
}
