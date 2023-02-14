import React, { useContext } from "react";
import Stories from "react-insta-stories";
import axios from "../../axios/axios";
import { AuthContext } from "../../contexts/AuthContext";
import { SearchContext } from "../../contexts/SearchValue";

function Story(props) {
  const [resp, setResp] = React.useState([]);
  const testar = [];
  const [arr, setArr] = React.useState([]);

  const handleCheck = () => {
    axios.get(`getCurStory/${props.name}`).then((response) => {
      setArr(response.data);
    });
  };

  React.useEffect(() => {
    handleCheck();
  }, []);

  console.log("ddddddddd", resp);

  function getExtension(filename) {
    return filename.split(".").pop();
  }

  const {setOwnStory,setOwnStoryWatched,setStory} = useContext(SearchContext)
  let { user } = useContext(AuthContext)
  const getOwnStory = () => {
    axios.get(`getOwnStory/${user.user_id}`).then((response) => {
      setOwnStory(response.data);
      let selfwatch = response.data[response.data.length - 1].watched.find (obj => obj.user===user.user_id)
      console.log('opo',selfwatch);
      if (selfwatch !== undefined){
        setOwnStoryWatched (true)
      }else{
        setOwnStoryWatched (false)
      }
      console.log('jojojo',response.data)
    });
    
  };

  const getStory = (e) => {
    axios.get("getStory").then((response) => {
      setStory(response.data);
    });
  };

  return (
    <>
      {arr.map((obj) => {
        let req = obj.file
        let filetype = obj.mediatype;
        // if (
        //   getExtension(name).toLowerCase() === "jpg" ||
        //   getExtension(name).toLowerCase() === "png" ||
        //   getExtension(name).toLowerCase() === "bmp" ||
        //   getExtension(name).toLowerCase() === "jpeg"
        // ) {
        //   filetype = "image";
        // } else {
        //   filetype = "video";
        // }
        testar.push({ url: req, type: filetype });
      })}

      {testar.length != 0 ? (
        <Stories
          stories={testar}
          defaultInterval={1500}
          width={432}
          height={"80vh"}
          onAllStoriesEnd={()=>{getOwnStory();getStory()}}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Story;
