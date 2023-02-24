import React from 'react';
import ReactPlayer from 'react-player';
import { useInView } from "react-intersection-observer";


function VideoPlayer({src}) {

  const [ref, inView] = useInView();
  const [playing, setPlaying] = React.useState(false);

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

    return (
      <ReactPlayer url={src} 
      muted controls 
      playing={playing && inView}
        onPlay={handlePlay}
        onPause={handlePause}
      />
    );
  }
  
  export default VideoPlayer;