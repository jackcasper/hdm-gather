import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import { IOfficeState } from '../../../types/IOfficeState'

type Payload = {
  client: Client
  whiteboardId: string
}

// Command to add a user to a whiteboard
export class WhiteboardAddUserCommand extends Command<IOfficeState, Payload> {
  execute(data: Payload) {
    // Extract client and whiteboardId from the payload
    const { client, whiteboardId } = data

    // Get the whiteboard with the specified whiteboardId from the room's state
    const whiteboard = this.room.state.whiteboards.get(whiteboardId)

    // Get the session ID of the client
    const clientId = client.sessionId

    // Check if the whiteboard doesn't exist or the client is already connected to it
    if (!whiteboard || whiteboard.connectedUser.has(clientId)) return

    // Add the client's session ID to the list of connected users for the whiteboard
    whiteboard.connectedUser.add(clientId)
  }
}

// Command to remove a user from a whiteboard
export class WhiteboardRemoveUserCommand extends Command<IOfficeState, Payload> {
  execute(data: Payload) {
    // Extract client and whiteboardId from the payload
    const { client, whiteboardId } = data

    // Get the whiteboard with the specified whiteboardId from the room's state
    const whiteboard = this.state.whiteboards.get(whiteboardId)

    // Check if the client is connected to the whiteboard, and if so, remove the client's session ID from the list of connected users
    if (whiteboard.connectedUser.has(client.sessionId)) {
      whiteboard.connectedUser.delete(client.sessionId)
    }
  }
}
