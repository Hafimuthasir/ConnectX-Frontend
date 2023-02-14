import * as React from 'react';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import MessageIcon from '@mui/icons-material/Message';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import {AppBarContext} from '../../contexts/AppBarContext';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ExploreIcon from '@mui/icons-material/Explore';


export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  // const [chatcol,setChatcol] = React.useState('#cfcfcf');
  // const [feedcol,setFeedcol] = React.useState('#cfcfcf');
  // const [qnscol,setQnscol] = React.useState('#cfcfcf');
  // const [profilecol,setProfilecol] = React.useState('#cfcfcf');

  let{setChatcol,setFeedcol,setQnscol,setProfilecol,
  chatcol,feedcol,qnscol,profilecol
  }=useContext(AppBarContext)

  const navigate = useNavigate() 
  function handleFeed(){
    setFeedcol('#850f0f')
    setChatcol('#cfcfcf')
    setQnscol('#cfcfcf')
    setProfilecol('#cfcfcf')
    // navigate('/home')
  }

  
  function handleQns(){
    setFeedcol('#cfcfcf')
    setChatcol('#cfcfcf')
    setQnscol('#850f0f')
    setProfilecol('#cfcfcf')
    // navigate('/home')
  }

  function handleProfile(){
    setFeedcol('#cfcfcf')
    setChatcol('#cfcfcf')
    setQnscol('#cfcfcf')
    setProfilecol('#850f0f')
    // navigate('/home')
  }

  function handleChat(){
    setFeedcol('#cfcfcf')
    setChatcol('#850f0f')
    setQnscol('#cfcfcf')
    setProfilecol('#cfcfcf')
    // navigate('/chat')
  }

  return (
    <Box sx={{ width: 500, }}>
        <Paper  sx={{ position: 'fixed', bottom: 0, left: 0, right: 0,zIndex:"11111"}} elevation={3}>
      <BottomNavigation
      style={{ backgroundColor:"#171717",justifyContent:"space-around",paddingLeft:"10%",paddingRight:"12%"}} 
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        
        {/* <BottomNavigationAction onClick={handleChat} style={{ color:`${chatcol}`}} label="Chats & Community" icon={<MessageIcon />} />


        <BottomNavigationAction onClick={handleFeed} style={{ color:`${feedcol}`}} label="Feed" icon={<DynamicFeedIcon />} />
        
        
        <BottomNavigationAction onClick={handleQns} style={{ color:`${qnscol}`}} label="Questions" icon={<HelpOutlineIcon />} />
         */}

<motion.div
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 1.1 }}
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        onClick={handleChat}
      // style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}
     className="flexcc"
     >
        
        <MessageIcon
        style={{ color:`${chatcol}`}}
        // sx={{mt:2,ml:4.3,mr:2}}
        onClick={handleQns}
        />

       
      <div style={{display:"block",color:"grey"}}>Chat</div>
      
      </motion.div>
         
<motion.div
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 1.1 }}
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        onClick={handleFeed}
        className="flexcc"
        // style={{marginLeft:"50px",marginRight:"50px"}}
      >
        
        <DynamicFeedIcon
        style={{ color:`${feedcol}`}}
        sx={{ml:1}}
        
        />

       
      <div style={{display:"block",color:"grey"}}>Feed</div>
      
      </motion.div>


         <motion.div
        whileHover={{ scale: 1.5, }}
        whileTap={{ scale: 1.1 }}
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        onClick={handleQns}
        className="flexcc"
        // style={{marginLeft:"50px",marginRight:"50px"}}
      >
        
        <motion.div
        whileHover={{ rotate:180, }}
        >
        <ExploreIcon
        style={{ color:`${qnscol}`}}
        // sx={{mt:2,ml:1.2}}
        />
        </motion.div>

       
      <div style={{display:"block",color:"grey"}}>Discover</div>
      
      </motion.div>


              <motion.div
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 1.1 }}
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        onClick={handleProfile}
        className="flexcc"
        // style={{marginLeft:"50px",marginRight:"50px"}}
        
      >
        
        <AccountCircleIcon
        style={{ color:`${profilecol}`}}
        // sx={{mt:2,ml:1}}
        
        />

        {/* <BottomNavigationAction onClick={handleProfile} style={{ color:`${profilecol}`}} label="Profile" icon={<AccountCircleIcon/>}></BottomNavigationAction> */}
      <div style={{display:"block",color:"grey"}}>Profile</div>
      
      </motion.div>

      </BottomNavigation>

  

      </Paper>
    </Box>
  );
}