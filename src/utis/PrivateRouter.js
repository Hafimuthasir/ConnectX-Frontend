import React,{useContext} from 'react'
import { Route, Navigate } from 'react-router-dom'
import {AuthContext} from '../contexts/AuthContext'

const PrivateRouter = ({children})=> {
    let {user} = useContext(AuthContext)
    if(!user){
      return <Navigate to='/' />
    }
  return children
}

export default PrivateRouter