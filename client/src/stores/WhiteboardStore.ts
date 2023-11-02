import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

// Define the shape of the whiteboard-related state
interface WhiteboardState {
  whiteboardDialogOpen: boolean,   // Indicates if the whiteboard dialog is open
  whiteboardId: null | string,     // ID of the whiteboard
  whiteboardUrl: null | string,    // URL of the whiteboard
  urls: Map<string, string>        // Map to store whiteboard URLs by whiteboard ID
}

// Define the initial state for the whiteboard-related state
const initialState: WhiteboardState = {
  whiteboardDialogOpen: false,
  whiteboardId: null,
  whiteboardUrl: null,
  urls: new Map(),
}

// Create a Redux slice for managing the whiteboard state
export const whiteboardSlice = createSlice({
  name: 'whiteboard',
  initialState,
  reducers: {
    // Action to open the whiteboard dialog and set its properties
    openWhiteboardDialog: (state, action: PayloadAction<string>) => {
      state.whiteboardDialogOpen = true
      state.whiteboardId = action.payload
      // Get the whiteboard URL from the URLs map
      const url = state.urls.get(action.payload)
      if (url) state.whiteboardUrl = url
      const game = phaserGame.scene.keys.game as Game
      game.disableKeys()
    },
    // Action to close the whiteboard dialog
    closeWhiteboardDialog: (state) => {
      const game = phaserGame.scene.keys.game as Game
      game.enableKeys()
      // Disconnect from the whiteboard and reset whiteboard-related properties
      game.network.disconnectFromWhiteboard(state.whiteboardId!)
      state.whiteboardDialogOpen = false
      state.whiteboardId = null
      state.whiteboardUrl = null
    },
    // Action to set the whiteboard URL for a specific whiteboard ID
    setWhiteboardUrls: (state, action: PayloadAction<{ whiteboardId: string; roomId: string }>) => {
      state.urls.set(
        action.payload.whiteboardId,
        `https://wbo.ophir.dev/boards/HDM-Gather${action.payload.roomId}`
      )
    },
  },
})

// Extract and export the action creators from the slice
export const { openWhiteboardDialog, closeWhiteboardDialog, setWhiteboardUrls } =
  whiteboardSlice.actions

// Export the reducer for use in the Redux store
export default whiteboardSlice.reducer
