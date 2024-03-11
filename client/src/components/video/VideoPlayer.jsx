import React from 'react';

function VideoPlayer({ videoSrc }) {
  return (
    <div>
      <video width='750' height='500' controls>
        <source src={videoSrc} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;
