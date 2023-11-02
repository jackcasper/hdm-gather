import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IChatMessage } from '../../../types/IOfficeState'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

// Define an enumeration for different message types
export enum MessageType {
  PLAYER_JOINED,
  PLAYER_LEFT,
  REGULAR_MESSAGE,
}

// Create a Redux slice for managing the chat state
export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    // Initialize the chat state with an empty array for chat messages,
    // and set 'focused' and 'showChat' to default values.
    chatMessages: new Array<{ messageType: MessageType; chatMessage: IChatMessage }>(),
    focused: false,
    showChat: true,
  },
  reducers: {
    // Define reducer actions for adding different types of chat messages
    pushChatMessage: (state, action: PayloadAction<IChatMessage>) => {
      // Push a regular chat message to the chatMessages array
      state.chatMessages.push({
        messageType: MessageType.REGULAR_MESSAGE,
        chatMessage: action.payload,
      })
    },
    pushPlayerJoinedMessage: (state, action: PayloadAction<string>) => {
      // Push a message indicating a player joined the chat
      state.chatMessages.push({
        messageType: MessageType.PLAYER_JOINED,
        chatMessage: {
          createdAt: new Date().getTime(),
          author: action.payload,
          content: 'joined the lobby',
        } as IChatMessage,
      })
    },
    pushPlayerLeftMessage: (state, action: PayloadAction<string>) => {
      // Push a message indicating a player left the chat
      state.chatMessages.push({
        messageType: MessageType.PLAYER_LEFT,
        chatMessage: {
          createdAt: new Date().getTime(),
          author: action.payload,
          content: 'left the lobby',
        } as IChatMessage,
      })
    },
    setFocused: (state, action: PayloadAction<boolean>) => {
      // Set the focus state and enable/disable game keys accordingly
      const game = phaserGame.scene.keys.game as Game
      action.payload ? game.disableKeys() : game.enableKeys()
      state.focused = action.payload
    },
    setShowChat: (state, action: PayloadAction<boolean>) => {
      // Update the showChat state
      state.showChat = action.payload
    },
  },
})

// Extract and export the action creators from the slice
export const {
  pushChatMessage,
  pushPlayerJoinedMessage,
  pushPlayerLeftMessage,
  setFocused,
  setShowChat,
} = chatSlice.actions

// Export the reducer for use in the Redux store
export default chatSlice.reducer
