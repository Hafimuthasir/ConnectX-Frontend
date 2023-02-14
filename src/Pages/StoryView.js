import React from 'react'
import ReactInstaStories from 'react-insta-stories';
import { useLocation } from 'react-router-dom'
import axios from '../axios/axios'
import Stories from 'react-insta-stories';


function StoryView() {
    const loc=useLocation()
    console.log(loc.state.userid);
    const testar=[]
    const [arr,setArr] = React.useState([])

    const init=()=>{
        axios.get(`getCurStory/${loc.state.userid}`).then((response)=>{
            console.log('pppppppppppppp',response.data);
            setArr(response.data)
            // setStor(response)
            // let item
            // let item2
            // response.data.map((obj)=>{
            //     console.log('hai');
            //     item = obj.file.replace(
            //         '/reactapp/src/uploads/story/',
            //         ''
            //     )
            //     item2 = require("../uploads/story/"+item)
            //     // testar.push(require("../uploads/story"+item))
            //     setArr(...arr,item2)
            // })
        })
        // setArr(testar)
    }

    console.log(testar)
    console.log('7777777',arr);
    React.useEffect(() => {
      init()
    }, [])
    
  return (<>
  
  {arr.map((obj)=>{
    let name = obj.file.replace('/reactapp/src/uploads/story/','')
    testar.push(require("../uploads/story/"+name))
  })}


    {testar.length!=0?
    <Stories
    stories={testar}
    defaultInterval={1500}
    width={432}
    height={600}
/>:""
}
</>

  )
}

export default StoryView