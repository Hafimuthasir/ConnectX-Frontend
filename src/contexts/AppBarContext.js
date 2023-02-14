import React,{ createContext,useState,useEffect } from "react";


export const AppBarContext = createContext()



export default function BarProvider({children}){
    var pre = "#850f0f"
    
    const [chatcol,setChatcol] = React.useState('mintcream');
    const [feedcol,setFeedcol] = React.useState(pre);
    const [qnscol,setQnscol] = React.useState('mintcream');
    const [profilecol,setProfilecol] = React.useState('mintcream');
    
    // let contextData = {
      
    //   user:user,
    //   setUser:setUser,
    //   logoutUser: logoutUser
   

      
    // }

    return(
        <AppBarContext.Provider value={{chatcol,setChatcol,feedcol,setFeedcol,qnscol,setQnscol,profilecol,setProfilecol}}>
           {children}
        </AppBarContext.Provider>
    )
}