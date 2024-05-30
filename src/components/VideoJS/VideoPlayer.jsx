import React from 'react'
import ReactPlayer from 'react-player'

const VideoPlayer = ({uploadedVideoFile}) => {
  return (
    
    <ReactPlayer url={uploadedVideoFile} controls={true} width={560} />
  )
}

export default VideoPlayer
