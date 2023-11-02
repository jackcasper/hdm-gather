import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import { IOfficeState } from '../../../types/IOfficeState'

type Payload = {
  client: Client
  name: string
}

// Command to update the name of a player
export default class PlayerUpdateNameCommand extends Command<IOfficeState, Payload> {
  execute(data: Payload) {
    // Extract client and name from the payload
    const { client, name } = data

    // Get the player object associated with the client's session ID from the room's state
    const player = this.room.state.players.get(client.sessionId)

    // Check if the player exists (is not null or undefined)
    if (!player) return

    // Update the player's name with the provided name from the payload
    player.name = name
  }
}
