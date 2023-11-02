import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

// Define a styled component for the backdrop
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
`

// Define a styled component for the main content wrapper
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
`

// Define the VideoConnectionDialog component
export default function VideoConnectionDialog() {
  // Initialize a state variable to manage the connection warning visibility
  const [connectionWarning, setConnectionWarning] = useState(true)

  return (
    <Backdrop>
      <Wrapper>
        {connectionWarning && (
          // Display a warning alert when the connectionWarning state is true
          <Alert
            severity="warning"
            onClose={() => {
              // Allow the user to close the warning alert
              setConnectionWarning(!connectionWarning)
            }}
          >
            <AlertTitle>Warning</AlertTitle>
            No webcam connected
            <br /> <strong>connect one for the full experience!</strong>
          </Alert>
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            // Handle the action when the "Connect Webcam" button is clicked
            const game = phaserGame.scene.keys.game as Game
            game.network.webRTC?.getUserMedia()
          }}
        >
          Connect Webcam
        </Button>
      </Wrapper>
    </Backdrop>
  )
}
