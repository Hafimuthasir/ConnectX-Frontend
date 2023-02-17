import React from 'react'
import Login from '../components/Login/Login'
import PrimarySearchBar from '../components/Navbar/Navbar'
import iLogin from '../images/iLogin.jpg'
import { useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function LoginPage() {

 const navigate = useNavigate()
 let { user } = useContext(AuthContext)


 useEffect(() => {
  if (user != null) {
    navigate('/home')
 }
 }, [])
 
  
  return (
    <div style={{backgroundImage:`url(${iLogin})`,height:"100vh",width:"100vw",backgroundSize:"cover"}}> 
    <Login/>
    </div>
  )
}

export default LoginPage