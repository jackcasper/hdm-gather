import { Joystick } from 'react-joystick-component'

// Define an interface for joystick movement
export interface JoystickMovement {
  isMoving: boolean
  direction: Direction
}

// Define an interface for joystick directions
interface Direction {
  left: boolean
  right: boolean
  up: boolean
  down: boolean
}

// Define props for the JoystickItem component
interface Props {
  onDirectionChange: (arg: JoystickMovement) => void
}

// Function to convert angle to directions
const angleToDirections = (angle: number): Direction => {
  let outObj: Direction = {
    left: false,
    right: false,
    up: false,
    down: false,
  }
  angle = (angle + 360) % 360

  if (angle > 22.5 && angle <= 67.5) {
    outObj.down = true
    outObj.right = true
  } else if (angle > 67.5 && angle <= 112.5) {
    outObj.down = true
  } else if (angle > 112.5 && angle <= 157.5) {
    outObj.down = true
    outObj.left = true
  } else if (angle > 157.5 && angle <= 202.5) {
    outObj.left = true
  } else if (angle > 202.5 && angle <= 247.5) {
    outObj.left = true
    outObj.up = true
  } else if (angle > 247.5 && angle <= 292.5) {
    outObj.up = true
  } else if (angle > 292.5 && angle <= 337.5) {
    outObj.up = true
    outObj.right = true
  } else {
    outObj.right = true
  }
  return outObj
}

// JoystickItem component definition
const JoystickItem = (props: Props) => {
  return (
    // Render the Joystick component
    <Joystick
      size={75}
      baseColor="#4b4b4b70"
      stickColor="#42eacb80"
      stop={() => {
        // Callback when the joystick stops moving
        props.onDirectionChange({
          isMoving: false,
          direction: {
            left: false,
            right: false,
            up: false,
            down: false,
          },
        })
      }}
      move={(event) => {
        // Callback when the joystick is moved
        const x1 = 0
        const y1 = event.y ?? 0
        const x2 = event.x ?? 0
        const y2 = 0
        var deltaX = x2 - x1 // Distance between joystick and center
        var deltaY = y2 - y1 // Distance between joystick and center
        var rad = Math.atan2(deltaY, deltaX) // Angle in radians
        var deg = (rad * 180) / Math.PI // Angle in degrees
        var direction = angleToDirections(deg) // Convert degrees to direction
        props.onDirectionChange({ isMoving: true, direction })
      }}
    />
  )
}

// Export the JoystickItem component
export default JoystickItem
