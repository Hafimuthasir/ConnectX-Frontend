import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Box,
  Toolbar,
  List,
  ListItem,
  Typography,
  Card,
  CardContent,
  Stack,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import axios from '../../axios/axios'
import { AuthContext } from "../../contexts/AuthContext";
import { SearchContext } from "../../contexts/SearchValue";



let type;
const drawerWidth = 240;
function Chat() {

  let {user} = useContext(AuthContext)
  let {fullchat,chatUser,currentRoom,setFullChat,chatuserid} = useContext(SearchContext)
  const [fieldVal, setFieldVal] = useState("");
  
  const [replies, setReplies] = useState([]);
  const [sends, setSends] = useState([
    { message: "hai", type: "send" },
    { message: "hello", type: "reply" },
  ]);

  const bottomRef = useRef(null);
  const [trigger, setTrigger] = useState(false);

  const [showChat, setShowChat] = useState(true);
  const socketRef = useRef(null)

  const handleSend = () => {
    // setFullChat([...sends, {"messages":fieldVal,"owner":user.user_id}]);
    let details = {'owner':user.user_id,'room':currentRoom,'messages':fieldVal}
    axios.post('chat/post_messages',details).then((response)=>{
        console.log(response.data);
    })
  };

  const handleCheck = () => {
    console.log(fullchat);
  };

  
  let details = {'primary_user':user.user_id,'secondary_user':chatuserid}


let testdat
useEffect(() => {

    // axios.get(`chat/getchatsbyroom/${currentRoom}`).then((response)=>{
    //     setFullChat(response.data)

        
    // })

    socketRef.current = new WebSocket(`ws://grapicscard.ga/ws/chat/${currentRoom}/${user.user_id}/`);

    socketRef.current.onmessage = (event) => {
        testdat = JSON.parse(event.data)
      setTrigger(true)
    }

    
    bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });


    return () => {
      socketRef.current.close();
    }
  }, [fullchat,currentRoom]);

  const sendMessage = () => {
    socketRef.current.send(fieldVal);
    setFieldVal('');
  }


  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
        isInitialMount.current = false;
     } else {
        axios.get(`chat/getchatsbyroom/${currentRoom}`).then((response)=>{
            setFullChat(response.data)
        })
        setTrigger(false)
     }
  }, [trigger])


//   useEffect(()=>{

//   },[fullchat])

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: {
          sm: `calc(100% - ${drawerWidth}px)`,
          overflow: "none",
          maxHeight: "100vh",
        },
      }}
    >
      <Toolbar />

      <List
        sx={{
          overflowY: "auto",
          height: {
            xs: "72vh",
            sm: "80vh",
            md: "58vh",
            lg: "65vh",
            xl: "73vh",
        },
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
        {fullchat.map((obj,index) => {
          if (obj.owner===user.user_id){
            type = "send"
          }else{
            type = 'reply'
          }
          return (
            <>
              {type === "send" ? (
                <>
                  <ListItem
                    key={index}

                    // secondaryAction={
                    //   <IconButton edge="end" aria-label="comments">
                    //     hai
                    //   </IconButton>
                    // }
                    disablePadding
                  >
                    <Card
                      sx={{
                        minWidth: "10vw",
                        bgcolor: "grey",
                        display: "block",
                        maxWidth: "60vw",
                        height: "auto",
                      }}
                    >
                      <CardContent>
                        <Typography
                          className="text-slate-800"
                          sx={{ fontSize: 10 }}
                          // color="text.secondary'
                          gutterBottom
                        >
                          You
                        </Typography>
                        
                        <Typography
                          sx={{ display: "block" }}
                          className="text-slate-200"
                          variant="h5"
                        //   glutterBottom
                          component="div"
                        >
                          {obj.messages}
                        </Typography>
                        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography> */}
                      </CardContent>
                    </Card>
                  </ListItem>
                  <br></br>
                </>
              ) : (
                <>
                <ListItem
          key={index}

          // secondaryAction={
          //   <IconButton edge="end" aria-label="comments">
          //     hai
          //   </IconButton>
          // }
          sx={{ justifyContent: "flex-end" }}
          disablePadding
        >
          <Card
            sx={{
              minWidth: "10vw",
              bgcolor: "grey",
              display: "block",
              maxWidth: "60vw",
              height: "auto",
              mr: 2,
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                // color="text.secondary"
                gutterBottom
                className="text-slate-800"
              >
                {chatUser}
              </Typography>
              
              <Typography variant="h5" className="text-slate-100" component="div">
                {obj.messages}
              </Typography>
             
            </CardContent>
          </Card>
        </ListItem>
        <br></br>
        </>
              )}
            </>
          );
        })}

<div ref={bottomRef} />

        <br></br>
      
      </List>
      <br></br>
      <Stack direction="row">
        <TextField
          fullWidth
          onChange={(e) => setFieldVal(e.target.value)}
          sx={{ Input: { color: "white" },label:{color:"grey"} }}
          label="Write a message"
        ></TextField>
        &nbsp;&nbsp;
        <Button variant="contained" size='large' onClick={() => sendMessage()}>
          Send
        </Button>

        {/* <Button variant="contained" size='large' onClick={() => handleCheck()}>
          Check
        </Button> */}

      </Stack>
      {/* <AppBar
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
    sx={{ mr: 2, display: { sm: 'none' } }}
  >
    <MenuIcon />
  </IconButton>
  <Grid container>
        <Grid>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </Grid>
        <Grid>
          <Typography variant='h6' sx={{ ml: 1, mt: 1.5 }}>dsfdskf</Typography>
        </Grid>
      </Grid>

  {/* <Typography variant="h6" noWrap component="div">
    Responsive drawer
  </Typography> */}

      {/* </Toolbar>
</AppBar> */}
    </Box>
  );
}

export default Chat;
