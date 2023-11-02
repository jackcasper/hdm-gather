import Peer from 'peerjs'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ShareScreenManager from '../web/ShareScreenManager'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'
import { sanitizeId } from '../util'

// Define the shape of the computer-related state
interface ComputerState {
  computerDialogOpen: boolean
  computerId: null | string
  myStream: null | MediaStream
  peerStreams: Map<
    string,
    {
      stream: MediaStream
      call: Peer.MediaConnection
    }
  >
  shareScreenManager: null | ShareScreenManager
}

// Define the initial state for the computer-related state
const initialState: ComputerState = {
  computerDialogOpen: false,
  computerId: null,
  myStream: null,
  peerStreams: new Map(),
  shareScreenManager: null,
}

// Create a Redux slice for managing the computer state
export const computerSlice = createSlice({
  name: 'computer',
  initialState,
  reducers: {
    // Action to open the computer dialog
    openComputerDialog: (
      state,
      action: PayloadAction<{ computerId: string; myUserId: string }>
    ) => {
      // Initialize the screen sharing manager if not already created
      if (!state.shareScreenManager) {
        state.shareScreenManager = new ShareScreenManager(action.payload.myUserId)
      }
      const game = phaserGame.scene.keys.game as Game
      game.disableKeys()
      state.shareScreenManager.onOpen()
      state.computerDialogOpen = true
      state.computerId = action.payload.computerId
    },
    // Action to close the computer dialog
    closeComputerDialog: (state) => {
      // Tell the server the computer dialog is closed
      const game = phaserGame.scene.keys.game as Game
      game.enableKeys()
      game.network.disconnectFromComputer(state.computerId!)
      for (const { call } of state.peerStreams.values()) {
        call.close()
      }
      state.shareScreenManager?.onClose()
      state.computerDialogOpen = false
      state.myStream = null
      state.computerId = null
      state.peerStreams.clear()
    },
    // Action to set the user's media stream
    setMyStream: (state, action: PayloadAction<null | MediaStream>) => {
      state.myStream = action.payload
    },
    // Action to add a video stream from a peer
    addVideoStream: (
      state,
      action: PayloadAction<{ id: string; call: Peer.MediaConnection; stream: MediaStream }>
    ) => {
      state.peerStreams.set(sanitizeId(action.payload.id), {
        call: action.payload.call,
        stream: action.payload.stream,
      })
    },
    // Action to remove a video stream from a peer
    removeVideoStream: (state, action: PayloadAction<string>) => {
      state.peerStreams.delete(sanitizeId(action.payload))
    },
  },
})

// Extract and export the action creators from the slice
export const {
  closeComputerDialog,
  openComputerDialog,
  setMyStream,
  addVideoStream,
  removeVideoStream,
} = computerSlice.actions

// Export the reducer for use in the Redux store
export default computerSlice.reducer
