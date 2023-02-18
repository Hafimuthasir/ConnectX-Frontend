import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  List,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";
import Avatar from "@mui/material/Avatar";
import { Stack } from "@mui/system";
import Chat from "../components/Chat/Chat";
import { SearchContext } from "../contexts/SearchValue";
import { AppBarContext } from "../contexts/AppBarContext";
import axios from "../axios/axios";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect } from "react";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selechat, setSeleChat] = React.useState("");
  let {
    chatUser,
    setChatUser,
    fullchat,
    setFullChat,
    setCurrentRoom,
    setChatUserid,
    currentRoom,
    showChat,
    setShowChat
  } = React.useContext(SearchContext);
  let { chatcol, setChatcol } = React.useContext(AppBarContext);
  let { user } = useContext(AuthContext);

  const [chatlist, setChatlist] = React.useState([]);
  function handleChatClick(user1, user2, chatusername, roomid) {
 
    console.log('lool',roomid);
    axios.get(`chat/getchatsbyroom/${roomid}`).then((response)=>{
      setFullChat(response.data)
      // console.log(response.data);
  })

    setShowChat(true);
    setChatUser(chatusername);
    setCurrentRoom(roomid);
    setChatUserid(user2);
    // console.log("dsds", roomid);

    // useSeleChat('')
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    axios.get("chat/getchatlist/" + user.user_id).then((response) => {
      setChatlist(response.data);
      console.log("1111111111", response.data);
    });
  }, []);

  const drawer = (
    <div>
      <Toolbar>
        <Grid sx={{ mr: 6, ml: 4 }}>
          <ChatIcon></ChatIcon>Chats
        </Grid>
      </Toolbar>
      <Divider />
      <List sx={{ paddingBottom: "50px" }}>
        {chatlist.map((obj, index) => {
          let chatusername;
          let chatuserprofile;
          let chatuserid;
          let roomid = obj.id;
          if (obj.primary_user !== user.user_id) {
            chatusername = obj.primary_username;
            chatuserprofile = obj.primary_profile;
            chatuserid = obj.primary_user;
          } else {
            chatusername = obj.secondary_username;
            chatuserprofile = obj.secondary_profile;
            chatuserid = obj.secondary_user;
          }
          return (
            <>
            {chatuserid !== user.user_id?
            <>
            <Divider color="#333"/>

{chatUser === chatusername ?
            <ListItem
            className="shadow-md"
            sx={{bgcolor:"#3d3d3d"}}
              key={index}
              onClick={() => {
                handleChatClick(
                  obj.primary_user,
                  obj.secondary_user,
                  chatusername,
                  roomid
                );
                setSeleChat(chatusername);
              }}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon sx={{color:"white"}}/> : <MailIcon />} */}
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemIcon>
                <ListItemText primary={chatusername} />
              </ListItemButton>
            </ListItem>
            
            :

            <ListItem
              key={index}
              onClick={() => {
                handleChatClick(
                  obj.primary_user,
                  obj.secondary_user,
                  chatusername,
                  roomid
                );
                setSeleChat(chatusername);
              }}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon sx={{color:"white"}}/> : <MailIcon />} */}
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemIcon>
                <ListItemText primary={chatusername} />
              </ListItemButton>
            </ListItem>

            }
            
            
            <Divider color="#333"/>
            </>
            :""
          }
          </>

          );
        })}
      </List>
      {/* <Divider /> */}
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    // <Grid container sx={{ height: "490px" }}>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {showChat === true ? (
        <AppBar
          style={{ backgroundColor: "#363636" }}
          // position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Grid container>
              <Grid>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </Grid>
              <Grid>
                <Typography variant="h6" sx={{ ml: 1, mt: 1.5 }}>
                  {chatUser}
                </Typography>
              </Grid>
            </Grid>

            {/* <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography> */}
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar
          style={{ backgroundColor: "#363636" }}
          // position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            {/* <Grid container>
              <Grid>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </Grid>
              <Grid>
                <Typography variant="h6" sx={{ ml: 1, mt: 1.5 }}>
                  {chatUser}
                </Typography>
              </Grid>
            </Grid> */}

            {/* <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography> */}
          </Toolbar>
        </AppBar>
      )}

      <Box
      
        component="nav"
        sx={{width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          PaperProps={{
            sx: {
              bgcolor: "#171717",
              color: "#c9c9c9",
              height: "100vh",
              paddingBottom: "100px",
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
            },
          }}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          PaperProps={{
            sx: {
              bgcolor: "#171717",
              color: "#c9c9c9",
              height: "100vh",
              paddingBottom: "100px",
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
            },
          }}
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {showChat === true ? <Chat /> : <Typography>Select one user to chat</Typography>}

      {/* <Box component="main"
        sx={{bgcolor:"blue", flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>

      </Box> */}
    </Box>
    // </Grid>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
