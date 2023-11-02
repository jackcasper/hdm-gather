import React, { VideoHTMLAttributes, useEffect, useRef } from 'react'

// Define the type for the Video component's props
type PropsType = VideoHTMLAttributes<HTMLVideoElement> & {
  srcObject: MediaStream
}

// Define the Video component
export default function Video({ srcObject, ...props }: PropsType) {
  // Create a reference to the video element using useRef
  const refVideo = useRef<HTMLVideoElement>(null)

  // Use the useEffect hook to set the srcObject of the video element
  useEffect(() => {
    // Check if the video element exists (it may be null during initial render)
    if (!refVideo.current) return

    // Set the srcObject of the video element to the provided MediaStream
    refVideo.current.srcObject = srcObject
  }, [srcObject])

  // Render the video element with the provided props and ref
  return <video ref={refVideo} {...props} />
}
