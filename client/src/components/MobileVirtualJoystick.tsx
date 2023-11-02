import { useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import JoystickItem from './Joystick'

import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

import { useAppSelector } from '../hooks'
import { JoystickMovement } from './Joystick'

// Styled component for the backdrop of the mobile virtual joystick
const Backdrop = styled.div`
  position: fixed;
  bottom: 100px;
  right: 32px;
  max-height: 50%;
  max-width: 100%;
`

// Styled component for the main wrapper of the mobile virtual joystick
const Wrapper = styled.div`
  position: relative;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
`

// Styled component for the joystick container
const JoystickWrapper = styled.div`
  margin-top: auto;
  align-self: flex-end;
`

// Minimum screen width size for small screens (in pixels)
export const minimumScreenWidthSize = 650 //px

// Function to determine if the screen is considered small based on the provided size
const isSmallScreen = (smallScreenSize: number) => {
  const [width, setWidth] = useState(window.innerWidth)

  // Use useEffect to update the screen width when resizing
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width <= smallScreenSize
}

// Main component for the mobile virtual joystick
export default function MobileVirtualJoystick() {
  // Retrieve state variables using custom hooks
  const showJoystick = useAppSelector((state) => state.user.showJoystick)
  const showChat = useAppSelector((state) => state.chat.showChat)
  const hasSmallScreen = isSmallScreen(minimumScreenWidthSize)
  const game = phaserGame.scene.keys.game as Game

  // Placeholder useEffect (no dependencies), typically used for side effects
  useEffect(() => {}, [showJoystick, showChat])

  // Callback function to handle joystick movement
  const handleMovement = (movement: JoystickMovement) => {
    game.myPlayer?.handleJoystickMovement(movement)
  }

  return (
    <Backdrop>
      <Wrapper>
        {/* Conditionally render the joystick based on showJoystick, showChat, and screen size */}
        {!(showChat && hasSmallScreen) && showJoystick && (
          <JoystickWrapper>
            <JoystickItem onDirectionChange={handleMovement}></JoystickItem>
          </JoystickWrapper>
        )}
      </Wrapper>
    </Backdrop>
  )
}
