import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container, Grid, Card, Stack } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";
import Avatar from "@mui/material/Avatar";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Grid sx={{ mr: 6, ml: 4 }}>
          <ChatIcon></ChatIcon>Chats
        </Grid>
        <Grid sx={{ ml: 3, mr: 4 }}>
          <PeopleIcon />
          Community
        </Grid>
      </Toolbar>
      <Divider />
      <List sx={{ paddingBottom: "50px" }}>
        {[
          "Arun",
          "John",
          "Ely",
          "Joerge",
          "All mail",
          "Trash",
          "Spam",
          "Starred",
          "Send email",
          "Drafts",
          "All mail",
          "Trash",
        ].map((text, index) => (
          <ListItem style={{ height: "90%" }} key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon sx={{color:"white"}}/> : <MailIcon />} */}
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemIcon>
              <ListItemText
                primary={text}
                onClick={() => {
                  handleChatClick();
                  setSeleChat(text);
                }}
              />
              hai
            </ListItemButton>
          </ListItem>
        ))}
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

  function handleChatClick(e) {
    // useSeleChat(e.target.value)
    console.log("dsds", selechat);

    // useSeleChat('')
  }

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Grid container sx={{ height: "490px" }}>
      <Box sx={{ display: "flex", bgcolor: "#363636", height: "800px" }}>
        <CssBaseline />
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
            <Typography variant="h6" noWrap component="div">
              <Grid container>
                <Grid>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </Grid>
                <Grid>
                  <Typography sx={{ ml: 1, mt: 1.5 }}>Hai</Typography>
                </Grid>
              </Grid>
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{
            display: "none",
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              bgcolor: "yellow",
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>

          {/* <Drawer
         PaperProps={{
          sx: {
            height:"min-content",
            bgcolor: "#171717",
            color:"#c9c9c9",
            
            "&::-webkit-scrollbar": {
              width: 4
              },
              "&::-webkit-scrollbar-track": {
              backgroundColor: "#454545"
              },
              "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#661414",
              borderRadius: 7
              }
            
          }
        }}
        
        
          variant="permanent"
          sx={{
            bgcolor:"yellow",
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
          
        </Drawer> */}
        </Box>
        <Box
          component="main"
          sx={{
            pl:5,
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(55% - ${drawerWidth}px)`,md: `calc(40% - ${drawerWidth}px)`,xs: `calc(65% - ${drawerWidth}px)`  },
          }}
        >
          <Toolbar />

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
              bgcolor: "yellow",
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

          {/* <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
    </Card> */}
           <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
          <Typography paragraph sx={{color:"white"}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>

          <Typography paragraph sx={{color:"white"}}>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>


        </Box>
        {/* <Box
          component="main"
          sx={{
            background:"#2b2b2b",
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Stack  sx={{mt:10,ml:2,backgroundColor:"green"}}>

          <List dense sx={{ width: '100%', maxWidth: 360 }}>

          <ListItem
            // key={value}
            sx={{}}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                hai
              </IconButton>
            }
            disablePadding
          >
          <Card sx={{minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                be{bull}nev{bull}o{bull}lent
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
              </Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
          </Card>
          </ListItem>
<br></br>

<ListItem
            // key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                hai
              </IconButton>
            }
            disablePadding
          >

          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                be{bull}nev{bull}o{bull}lent
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
              </Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
          </Card>

          </ListItem>

</List>

          </Stack>
          
        </Box> */}
      {/* </Box> */}
      </Box>
    </Grid>
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
