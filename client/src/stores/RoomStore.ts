import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RoomAvailable } from 'colyseus.js'
import { RoomType } from '../../../types/Rooms'

// Define an extended interface for RoomAvailable with an optional 'name' property
interface RoomInterface extends RoomAvailable {
  name?: string
}

/**
 * Colyseus' real-time room list always includes the public lobby, so we have to remove it manually.
 * This function checks if a room is a custom room based on its 'name' property.
 */
const isCustomRoom = (room: RoomInterface) => {
  return room.name === RoomType.CUSTOM
}

// Create a Redux slice for managing the room state
export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    lobbyJoined: false,         // Indicates whether the user has joined the lobby
    roomJoined: false,          // Indicates whether the user has joined a room
    roomId: '',                 // ID of the joined room
    roomName: '',               // Name of the joined room
    roomDescription: '',        // Description of the joined room
    availableRooms: new Array<RoomAvailable>(), // Array of available custom rooms
  },
  reducers: {
    // Action to set the lobby joined state
    setLobbyJoined: (state, action: PayloadAction<boolean>) => {
      state.lobbyJoined = action.payload
    },
    // Action to set the room joined state
    setRoomJoined: (state, action: PayloadAction<boolean>) => {
      state.roomJoined = action.payload
    },
    // Action to set data for the joined room
    setJoinedRoomData: (
      state,
      action: PayloadAction<{ id: string; name: string; description: string }>
    ) => {
      state.roomId = action.payload.id
      state.roomName = action.payload.name
      state.roomDescription = action.payload.description
    },
    // Action to set the available custom rooms
    setAvailableRooms: (state, action: PayloadAction<RoomAvailable[]>) => {
      // Filter and set only custom rooms by applying the isCustomRoom function
      state.availableRooms = action.payload.filter((room) => isCustomRoom(room))
    },
    // Action to add or update an available custom room
    addAvailableRooms: (state, action: PayloadAction<{ roomId: string; room: RoomAvailable }>) => {
      if (!isCustomRoom(action.payload.room)) return
      const roomIndex = state.availableRooms.findIndex(
        (room) => room.roomId === action.payload.roomId
      )
      if (roomIndex !== -1) {
        // Update the room if it exists, or add it if it doesn't
        state.availableRooms[roomIndex] = action.payload.room
      } else {
        state.availableRooms.push(action.payload.room)
      }
    },
    // Action to remove an available custom room by its ID
    removeAvailableRooms: (state, action: PayloadAction<string>) => {
      // Filter out the room with the specified ID
      state.availableRooms = state.availableRooms.filter((room) => room.roomId !== action.payload)
    },
  },
})

// Extract and export the action creators from the slice
export const {
  setLobbyJoined,
  setRoomJoined,
  setJoinedRoomData,
  setAvailableRooms,
  addAvailableRooms,
  removeAvailableRooms,
} = roomSlice.actions

// Export the reducer for use in the Redux store
export default roomSlice.reducer
