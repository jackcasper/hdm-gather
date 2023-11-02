import { enableMapSet } from 'immer'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserStore'
import computerReducer from './ComputerStore'
import whiteboardReducer from './WhiteboardStore'
import chatReducer from './ChatStore'
import roomReducer from './RoomStore'

// Enable Map and Set support in Immer, a library for immutability
enableMapSet()

// Configure the Redux store with reducers for different parts of the application
const store = configureStore({
  reducer: {
    user: userReducer,         // User-related state reducer
    computer: computerReducer, // Computer-related state reducer
    whiteboard: whiteboardReducer, // Whiteboard-related state reducer
    chat: chatReducer,         // Chat-related state reducer
    room: roomReducer,         // Room-related state reducer
  },
  // Temporary disable serialize check for Redux, allowing MediaStream storage.
  // This change is made to avoid issues with serializable checks.
  // Reference: https://stackoverflow.com/a/63244831
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: { user: UserState, computer: ComputerState, ... }
export type AppDispatch = typeof store.dispatch

// Export the configured Redux store for use in the application
export default store
