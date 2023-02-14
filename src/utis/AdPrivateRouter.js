import React,{useContext} from 'react'
import { Route, Navigate } from 'react-router-dom'
import {AuthContext} from '../contexts/AuthContext'

const AdPrivateRouter = ({children})=> {
    console.log('private route works');
    let {admin} = useContext(AuthContext)
    console.log(admin)

    if(!admin){
      console.log(localStorage.getItem('authTokensAd'))
      return <Navigate to='/adminlogin' />
    }

  return children
}

export default AdPrivateRouter