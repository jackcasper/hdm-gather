import { Schema, ArraySchema, SetSchema, MapSchema, type } from '@colyseus/schema'
import {
  IPlayer,
  IOfficeState,
  IComputer,
  IWhiteboard,
  IChatMessage,
} from '../../../types/IOfficeState'

// Define a class for representing a player
export class Player extends Schema implements IPlayer {
  @type('string') name = ''              // Player's name
  @type('number') x = 705                // Player's X-coordinate
  @type('number') y = 500                // Player's Y-coordinate
  @type('string') anim = 'adam_idle_down' // Player's animation state
  @type('boolean') readyToConnect = false // Player's connection readiness
  @type('boolean') videoConnected = false // Player's video connection status
}

// Define a class for representing a computer
export class Computer extends Schema implements IComputer {
  @type({ set: 'string' }) connectedUser = new SetSchema<string>() // Users connected to the computer
}

// Define a class for representing a whiteboard
export class Whiteboard extends Schema implements IWhiteboard {
  @type('string') roomId = getRoomId()        // Unique ID for the whiteboard room
  @type({ set: 'string' }) connectedUser = new SetSchema<string>() // Users connected to the whiteboard
}

// Define a class for representing a chat message
export class ChatMessage extends Schema implements IChatMessage {
  @type('string') author = ''                   // Message author's name
  @type('number') createdAt = new Date().getTime() // Timestamp of message creation
  @type('string') content = ''                   // Message content
}

// Define a class for representing the entire office state
export class OfficeState extends Schema implements IOfficeState {
  @type({ map: Player })     // Map of player objects
  players = new MapSchema<Player>()

  @type({ map: Computer })   // Map of computer objects
  computers = new MapSchema<Computer>()

  @type({ map: Whiteboard }) // Map of whiteboard objects
  whiteboards = new MapSchema<Whiteboard>()

  @type([ChatMessage])      // Array of chat messages
  chatMessages = new ArraySchema<ChatMessage>()
}

// Set to keep track of whiteboard room IDs
export const whiteboardRoomIds = new Set<string>()

// Characters used to generate random room IDs
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const charactersLength = characters.length

// Function to generate a unique room ID for a whiteboard
function getRoomId() {
  let result = ''
  for (let i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  if (!whiteboardRoomIds.has(result)) {
    whiteboardRoomIds.add(result)
    return result
  } else {
    console.log('roomId exists, remaking another one.')
    getRoomId() // Recursively try to generate a new ID if it already exists
  }
}
