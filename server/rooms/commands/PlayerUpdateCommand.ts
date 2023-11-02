import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import { IOfficeState } from '../../../types/IOfficeState'

type Payload = {
  client: Client
  x: number
  y: number
  anim: string
}

// Command to update the state of a player
export default class PlayerUpdateCommand extends Command<IOfficeState, Payload> {
  execute(data: Payload) {
    // Extract client, x, y, and anim from the payload
    const { client, x, y, anim } = data

    // Get the player object associated with the client's session ID from the room's state
    const player = this.room.state.players.get(client.sessionId)

    // Check if the player exists (is not null or undefined)
    if (!player) return

    // Update the player's x, y, and anim properties with the values from the payload
    player.x = x
    player.y = y
    player.anim = anim
  }
}
