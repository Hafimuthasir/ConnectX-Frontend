import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [searchVal, setSearchVal] = useState("");
  const [selectVal, setSelectVal] = useState("");
  const [chatUser, setChatUser] = useState("");
  const [fullchat, setFullChat] = useState([]);
  const [chatuserid, setChatUserid] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [chatdp, setChatdp] = useState("");
  const [showChat, setShowChat] = React.useState(false);
  const [feedPost, setFeedPost] = React.useState([]);
  const [postBool, setPostbool] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [ownStory, setOwnStory] = React.useState([]);
  const [ownStoryWatched, setOwnStoryWatched] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [successMsg, setSuccessMsg] = React.useState("");
  const [story, setStory] = React.useState([]);
  const [openCrop, setOpenCrop] = React.useState(true);
  const [croppedImage, setCroppedImage] = React.useState({});

  return (
    <SearchContext.Provider
      value={{
        searchVal,
        setSearchVal,
        selectVal,
        setSelectVal,
        chatUser,
        setChatUser,
        fullchat,
        setFullChat,
        currentRoom,
        setCurrentRoom,
        chatuserid,
        setChatUserid,
        showChat,
        setShowChat,
        chatdp,
        setChatdp,
        feedPost,
        setFeedPost,
        postBool,
        setPostbool,
        successAlert,
        setSuccessAlert,
        successMsg,
        setSuccessMsg,
        errorAlert,
        setErrorAlert,
        errorMsg,
        setErrorMsg,
        ownStory,
        setOwnStory,
        ownStoryWatched,
        setOwnStoryWatched,
        story,
        setStory,
        croppedImage,
        setCroppedImage,
        openCrop,
        setOpenCrop
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
