import { Schema, ArraySchema, SetSchema, MapSchema } from '@colyseus/schema'

// Interface representing a player's data
export interface IPlayer extends Schema {
  name: string
  x: number
  y: number
  anim: string
  readyToConnect: boolean
  videoConnected: boolean
}

// Interface representing a computer's data
export interface IComputer extends Schema {
  connectedUser: SetSchema<string>
}

// Interface representing a whiteboard's data
export interface IWhiteboard extends Schema {
  roomId: string
  connectedUser: SetSchema<string>
}

// Interface representing a chat message's data
export interface IChatMessage extends Schema {
  author: string
  createdAt: number
  content: string
}

// Interface representing the overall office state
export interface IOfficeState extends Schema {
  players: MapSchema<IPlayer>
  computers: MapSchema<IComputer>
  whiteboards: MapSchema<IWhiteboard>
  chatMessages: ArraySchema<IChatMessage>
}
