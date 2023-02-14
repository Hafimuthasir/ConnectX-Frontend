import Button from '@mui/material/Button';
import {motion} from 'framer-motion-3d'
import React from 'react'
// import axios from '../axios/axios'
import axios from '../axios/axios';
export default function TestPage() {
  const [lat,setLat] = React.useState()
  const [lon,setLon] = React.useState()
  const params = {
    access_key: '1e6019aa8e5b0530be51b9fcc86e276',
    query: lat,lon
  }
  const handleClick=()=>{
    console.log('bt clicked');
    axios.get('GetTestData').then((response)=>{
      console.log(response.data);
      })
       var loc = navigator.geolocation.getCurrentPosition((locate)=>{
        setLat(locate.coords.longitude)
        setLon(locate.coords.longitude)
      // axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&sensor=true&key=AIzaSyANoQEtE9ejokJFs8iA8F_0p6ctQqtgjqo').then((response)=>{
      //   console.log('22222222',response.data)
      // })
      // axios.get(`http://api.positionstack.com/v1/reverse?access_key = 31e6019aa8e5b0530be51b9fcc86e276&query=${lat},${lon}`).then((response)=>{
      //   console.log(response.data);
      // })

      // axios.get('http://api.positionstack.com/v1/reverse',{params}).then((response)=>{
      //   console.log(response.data);
      // })
      console.log(lat,lon)
    })
    
    axios.get(`https://apis.mapmyindia.com/advancedmaps/v1/cb15a76d2067a4e2b9d4b186d59465c7/rev_geocode?lat=${lat}&lng=${lon}`).then((response)=>{
    console.log('444',response.data);
  })
  }
  return (
    <>
    <div>TestPage</div>
    <motion.div initial={{scale:0.1}} whileHover={{scale:2}} animate={{ x: 2 }} >
    <Button variant="contained" color="success" onClick={()=>handleClick()}>
  test
</Button>
</motion.div>
</>
  )
}
