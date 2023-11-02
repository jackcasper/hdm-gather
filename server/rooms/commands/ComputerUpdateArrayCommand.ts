import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import { IOfficeState } from '../../../types/IOfficeState'

type Payload = {
  client: Client
  computerId: string
}

// Command to add a user to a computer
export class ComputerAddUserCommand extends Command<IOfficeState, Payload> {
  execute(data: Payload) {
    // Extract client and computerId from the payload
    const { client, computerId } = data

    // Get the computer with the specified computerId from the room's state
    const computer = this.room.state.computers.get(computerId)

    // Get the session ID of the client
    const clientId = client.sessionId

    // Check if the computer doesn't exist or the client is already connected to it
    if (!computer || computer.connectedUser.has(clientId)) return

    // Add the client's session ID to the list of connected users for the computer
    computer.connectedUser.add(clientId)
  }
}

// Command to remove a user from a computer
export class ComputerRemoveUserCommand extends Command<IOfficeState, Payload> {
  execute(data: Payload) {
    // Extract client and computerId from the payload
    const { client, computerId } = data

    // Get the computer with the specified computerId from the room's state
    const computer = this.state.computers.get(computerId)

    // Check if the client is connected to the computer, and if so, remove the client's session ID from the list of connected users
    if (computer.connectedUser.has(client.sessionId)) {
      computer.connectedUser.delete(client.sessionId)
    }
  }
}
