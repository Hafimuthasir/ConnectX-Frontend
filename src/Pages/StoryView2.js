import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Stories from 'react-insta-stories'
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import Sheet from'@mui/joy/Sheet';
import Stack from '@mui/material/Stack';
import { PostContext } from '../Context/CompanyContext';


function Stories_() {

const [ currentId, setCurrentId ] = useState(0);
const [story,setStory]=useState([])
const [status,setStatus]=useState([])
let  ui=[]
const {status_check,setStatus_check}=useContext(PostContext)


useEffect(()=>{
   console.log("status_check",status_check)
    let current_status=JSON.parse(window.localStorage.getItem('current_status'))
    console.log(current_status)
    axios.post("http://127.0.0.1:8000/get_status/",{"username":current_status}).then((response)=>{
        if(response.data.status_by.length >0)
        {
            setStory(response.data.status_by)
            console.log(response.data.status_by,"status")
        }
    })
   
},[])





return (<>
    <div>
    {story.map((one)=>{
     let pk=one.status.replace('/frontend/src/','')
  
    console.log(one,"one")
 
      
    
    ui.push(require("../"+pk)) 
    

})

}
{/* 
<Card component="li" sx={{ Width:500,MarginLeft:8, flexGrow: 1 }}>
        
        <CardContent> */}

        {ui.length >0 ? <Stories loop={true}
stories={ui}
width={1300}
height={800}
currentIndex={currentId}
sx={{marginRight:5}}
keyboardNavigation
defaultInterval={4000}

onStoryEnd={(s, st) => {
    console.log('story ended', s, st);
    setCurrentId(currentId => currentId + 1);
}}
onAllStoriesEnd={(s, st) => {
    console.log('all stories ended', s, st);
    setCurrentId(currentId => 0);
}}
onStoryStart={(s, st) => {
    console.log('story started', s, st);
    setCurrentId(currentId => (currentId + 1) - 1);
}}
/> 


:""}



          {/* <Typography
            level="h6"
            fontWeight="lg"
            textColor="#fff"
            mt={{ xs: 12, sm: 18 }}
          >
           
          <div>user1</div>  
       
          </Typography>
        </CardContent>
      </Card> */}


      
    </div>
    </>
  )
}

export default Stories_
