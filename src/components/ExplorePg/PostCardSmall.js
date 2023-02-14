import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack, Button, Badge } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import ImageIcon from "@mui/icons-material/Image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function ActionAreaCard(props) {

  function getExtension(filename) {
    return filename.split(".").pop();
  }

  const filetype = props.data.mediatype


  let mainwidth = 145
  let mainheight = 176
  let mediaheight = "13rem"
  if (props.type=='homeside'){
    mainwidth = 70
    mainheight = 110
    mediaheight = "8rem"
  }


  return (
    <Card sx={{ width:mainwidth,height:mainheight }}>
      <CardActionArea>
        {filetype === "image" ? (
          <>
            <CardMedia
              sx={{ objectFit: "cover", height: mediaheight }}
              component="img"
              height="40"
              image={props.data.file}
              alt="green iguana"
            />

            <CardContent sx={{ backgroundColor: "#131313" }}>
              <Stack
                direction="row"
                spacing={2}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography
                  sx={{ color: "#d6d6d6",fontSize:"1rem" }}
                  gutterBottom
                  // variant="h6"
                  component="div"
                >
                  @{props.data.username}
                </Typography>
                <ImageIcon
                  sx={{
                    backgroundColor: "blue",
                    color: "white",
                    borderRadius: "4px",
                  }}
                  variant="contained"
                />
                {/* <Button sx={{minHeight:"2px",minWidth:"25px"}}  size="small" variant="outlined">Video</Button> */}
              </Stack>

              <Typography
                sx={{ color: "grey" }}
                variant="body2"
                color="text.secondary"
              >
                {props.data.caption}
              </Typography>
            </CardContent>
          </>
        ) : (
          <>
            <CardMedia
              sx={{ objectFit: "cover", height: "12rem" }}
              component="video"
              height="40"
              image={props.data.file}
              alt="green iguana"
            />
            <CardContent sx={{ backgroundColor: "#131313" }}>
              <Stack
                direction="row"
                spacing={2}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography
                  sx={{ color: "#d6d6d6" }}
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  @{props.data.username}
                </Typography>
                <VideocamIcon
                  sx={{
                    backgroundColor: "blue",
                    color: "white",
                    borderRadius: "4px",
                  }}
                  variant="contained"
                />
                {/* <Button sx={{minHeight:"2px",minWidth:"25px"}}  size="small" variant="outlined">Video</Button> */}
              </Stack>

              <Typography
                sx={{ color: "grey" }}
                variant="body2"
                color="text.secondary"
              >
                {props.data.caption}
              </Typography>
            </CardContent>
          </>
        )}
      </CardActionArea>
    </Card>
  );
}
