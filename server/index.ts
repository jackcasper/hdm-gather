import http from 'http'
import express from 'express'
import cors from 'cors'
import { Server, LobbyRoom } from 'colyseus'
import { monitor } from '@colyseus/monitor'
import { RoomType } from '../types/Rooms'

// import socialRoutes from "@colyseus/social/express"

import { HdmGather } from './rooms/HdmGather'

// Define the port number to listen on
const port = Number(process.env.PORT || 2569)
const app = express()

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from different origins
app.use(cors())

// Parse JSON in request bodies
app.use(express.json())

// Create an HTTP server using the Express app
const server = http.createServer(app)

// Create a Colyseus game server
const gameServer = new Server({
  server,
})

// Register different room handlers

// Register the LobbyRoom for the lobby
gameServer.define(RoomType.LOBBY, LobbyRoom)

// Register the HdmGather room as a public lobby
gameServer.define(RoomType.PUBLIC, HdmGather, {
  name: 'Public Lobby',
  description: 'For making friends and familiarizing yourself with the controls',
  password: null,
  autoDispose: false,
})

// Register the HdmGather room for custom lobbies and enable real-time listing
gameServer.define(RoomType.CUSTOM, HdmGather).enableRealtimeListing()

/**
 * Register @colyseus/social routes
 *
 * - Uncomment if you want to use default authentication (https://docs.colyseus.io/server/authentication/)
 * - Also uncomment the import statement
 */
// app.use("/", socialRoutes);

// Register the Colyseus monitor for monitoring server activity
app.use('/colyseus', monitor())

// Start the game server and listen on the specified port
gameServer.listen(port)
console.log(`Listening on ws://localhost:${port}`)
