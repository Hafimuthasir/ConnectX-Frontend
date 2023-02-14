import * as React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import axios from "../../axios/axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";
import PostCardSmall from "../../components/ExplorePg/PostCardSmall";
import {
  Grid,
  Modal,
  Box,
  Avatar,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItem,
  List,
  Button,
  Typography,
} from "@mui/material";
import Post from "../../components/Post";
import { DataObjectRounded } from "@mui/icons-material";
import DownloadIcon from "@mui/icons-material/Download";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

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

export default function AlignItemsList(props) {
  let { user } = React.useContext(AuthContext);
  const [Posts, setPosts] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const [currentPost, setCurrentPost] = React.useState([]);

  const handleOpen = (obj) => {
    setCurrentPost(obj);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const downloadFile = (file, id) => {
    console.log("d clicked", file, id);
    let filename = file.replace("/reactapp/src/uploads/zpostfile/", "");
    console.log(filename);
    axios({
      url: `DownloadFile/${filename}`,
      method: "GET",
      responseType: "blob",
      filename,
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); //or any other extension
      document.body.appendChild(link);
      link.click();
    });

    let details = { userid: user.user_id, postid: id };
    axios.post("addDownloadsCount", details).then((response) => {});
  };

  useEffect(() => {
    if (props.type == "trendpost") {
      axios.get("GetExplorePosts/trend").then((response) => {
        setPosts(response.data);
      });
    } else {
      axios.get("GetTrendingDownloads").then((response) => {
        setPosts(response.data);
      });
    }
  }, []);

  return (
    <>
      {/* //  */}

      {props.type == "trendpost" ? (
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            columnGap: "4px",
            rowGap: "9px",
            paddingLeft: "9px",
          }}
        >
          {Posts.map((obj) => {
            return <PostCardSmall type="homeside" data={obj} />;
          })}
        </Grid>
      ) : (
        <List sx={{ width: "100%", maxWidth: 360 }}>
          {Posts.map((obj) => {
            // console.log('2222',obj);
            return (
              <ListItem alignItems="flex-start">
                <ListItemIcon sx={{ minWidth: "4px" }}>
                  <FolderIcon
                    className="text-lg"
                    sx={{ fontSize: "x-large", color: "darkgray" }}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    color: "grey",
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "x-large",
                    mt: 2,
                  }}
                  primary={obj.caption.slice(0, 5)}
                  // primary="hai"
                  secondary={
                    <>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleOpen(obj);
                        }}
                        color="secondary"
                        sx={{ minWidth: "0.5rem" }}
                      >
                        <RemoveRedEyeIcon />
                      </Button>
                      &nbsp;
                      <Button
                        // size="small"
                        sx={{ minWidth: "2rem" }}
                        variant="contained"
                        onClick={() => downloadFile(obj.zfile, obj.id)}
                        color="success"
                      >
                        <DownloadIcon />
                      </Button>
                    </>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      )}
      {/* // </List> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Post data={currentPost} />
        </Box>
      </Modal>
    </>
  );
}
