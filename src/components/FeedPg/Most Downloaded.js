import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import axios from "../../axios/axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";

export default function AlignItemsList() {
  let { user } = React.useContext(AuthContext);
  const [userlist, setUserlist] = React.useState([]);

  useEffect(() => {
    axios.get(`getUserNotFollowers/${user.user_id}`).then((response) => {
      setUserlist(response.data);
    });
  }, []);

  return (
    <List sx={{ width: "100%", maxWidth: 360 }}>
      {userlist.map((obj) => {
        return (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                sx={{ color: "grey" }}
                primary={obj.follower.first_name}
                secondary={
                  <Button variant="contained" color="success">
                    View
                  </Button>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        );
      })}
    </List>
  );
}
