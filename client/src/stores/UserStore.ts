import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sanitizeId } from '../util'
import { BackgroundMode } from '../../../types/BackgroundMode'

import phaserGame from '../PhaserGame'
import Bootstrap from '../scenes/Bootstrap'

// Function to determine the initial background mode based on the current hour
export function getInitialBackgroundMode() {
  const currentHour = new Date().getHours()
  return currentHour > 6 && currentHour <= 18 ? BackgroundMode.DAY : BackgroundMode.NIGHT
}

// Create a Redux slice for managing the user state
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    backgroundMode: getInitialBackgroundMode(), // Initial background mode
    sessionId: '',           // User's session ID
    videoConnected: false,   // Indicates if the user's video is connected
    loggedIn: false,         // Indicates if the user is logged in
    playerNameMap: new Map<string, string>(), // Map of player IDs to their names
    showJoystick: window.innerWidth < 650, // Show joystick on smaller screens
  },
  reducers: {
    // Action to toggle the background mode between day and night
    toggleBackgroundMode: (state) => {
      const newMode =
        state.backgroundMode === BackgroundMode.DAY ? BackgroundMode.NIGHT : BackgroundMode.DAY

      state.backgroundMode = newMode
      const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap
      bootstrap.changeBackgroundMode(newMode)
    },
    // Action to set the user's session ID
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload
    },
    // Action to set the video connection status
    setVideoConnected: (state, action: PayloadAction<boolean>) => {
      state.videoConnected = action.payload
    },
    // Action to set the user's login status
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload
    },
    // Action to set the player name mapping based on player ID
    setPlayerNameMap: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.playerNameMap.set(sanitizeId(action.payload.id), action.payload.name)
    },
    // Action to remove a player name mapping based on player ID
    removePlayerNameMap: (state, action: PayloadAction<string>) => {
      state.playerNameMap.delete(sanitizeId(action.payload))
    },
    // Action to set the visibility of the joystick on smaller screens
    setShowJoystick: (state, action: PayloadAction<boolean>) => {
      state.showJoystick = action.payload
    },
  },
})

// Extract and export the action creators from the slice
export const {
  toggleBackgroundMode,
  setSessionId,
  setVideoConnected,
  setLoggedIn,
  setPlayerNameMap,
  removePlayerNameMap,
  setShowJoystick,
} = userSlice.actions

// Export the reducer for use in the Redux store
export default userSlice.reducer
