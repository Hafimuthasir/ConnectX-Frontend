import React from 'react'
import {useEffect} from 'react'
import axios from 'axios';
import PrimarySearchBar from '../components/Navbar/Navbar'
import SimpleBottomNavigation from '../components/BtAppbar/BtAppBar';
import ChatPage from './ChatPage'
import { useContext } from 'react';
import { AppBarContext } from '../contexts/AppBarContext';
import FeedPage from './FeedPage';
import ProfilePage from './ProfilePage'
import ExplorePage from './ExplorePage';
import AlertModal from "../components/AlertSuccess"

function HomePage() {
  
  // function TestHandler(){
  //   console.log('koo');
  //   // const tk = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTAsImV4cCI6MTY2ODUxMjc1NiwiaWF0IjoxNjY4NTA5MTU2fQ.frGZ8WEvfkZ0fekyafMHdBoKFwSBb4qouO08JX0AgNE'
  //   // var decoded = jwt_decode(tk);
  //   // console.log('decoded',decoded);
    

  // }
  
  let {setChatcol,setFeedcol,setQnscol,setProfilecol,
    chatcol,feedcol,qnscol,profilecol
    } = useContext(AppBarContext)

  const getusername = () => {
    axios.get('http://localhost:8000/api/userhome').then((response)=>{
        console.log('lol',response.data)
    })
}






useEffect(()=>{
    getusername()
    
}, [])
  return (
    <div>
      {/* <PrimarySearchBar/> */}
      {/* <div>HomePage</div> */}
      {chatcol==='#850f0f'?
      <ChatPage></ChatPage>:
      feedcol==='#850f0f'?
      <FeedPage></FeedPage>:
      profilecol==='#850f0f'?
      <ProfilePage/>
      :qnscol ==='#850f0f'?
      <ExplorePage/>:""
    }
      <SimpleBottomNavigation/>
      
    </div>
  )
}

export default HomePage