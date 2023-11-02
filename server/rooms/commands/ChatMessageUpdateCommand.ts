import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import { IOfficeState } from '../../../types/IOfficeState'
import { ChatMessage } from '../schema/OfficeState'

type Payload = {
  client: Client
  content: string
}

export default class ChatMessageUpdateCommand extends Command<IOfficeState, Payload> {
  execute(data: Payload) {
    // Extract client and content from the payload
    const { client, content } = data

    // Get the player associated with the client's session
    const player = this.room.state.players.get(client.sessionId)

    // Get the chat messages from the room's state
    const chatMessages = this.room.state.chatMessages

    // Check if chatMessages is defined (not null or undefined)
    if (!chatMessages) return

    /**
     * Only allow server to store a maximum of 100 chat messages:
     * remove the first element before pushing a new one when array length is >= 100
     */
    if (chatMessages.length >= 100) chatMessages.shift()

    // Create a new chat message and set its author and content
    const newMessage = new ChatMessage()
    newMessage.author = player.name
    newMessage.content = content

    // Add the new message to the chatMessages array
    chatMessages.push(newMessage)
  }
}
