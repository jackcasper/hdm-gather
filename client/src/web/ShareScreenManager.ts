import Peer from 'peerjs'
import store from '../stores'
import { setMyStream, addVideoStream, removeVideoStream } from '../stores/ComputerStore'
import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'

// Class responsible for managing screen sharing using PeerJS
export default class ShareScreenManager {
  private myPeer: Peer
  myStream?: MediaStream

  constructor(private userId: string) {
    // Generate a sanitized PeerJS ID for the user
    const sanitizedId = this.makeId(userId)

    // Create a Peer instance for WebRTC communication
    this.myPeer = new Peer(sanitizedId)

    // Handle errors that may occur during WebRTC communication
    this.myPeer.on('error', (err) => {
      console.log('ShareScreenWebRTC err.type', err.type)
      console.error('ShareScreenWebRTC', err)
    })

    // Handle incoming calls for screen sharing
    this.myPeer.on('call', (call) => {
      call.answer()

      call.on('stream', (userVideoStream) => {
        // Dispatch action to add the video stream to the store
        store.dispatch(addVideoStream({ id: call.peer, call, stream: userVideoStream }))
      })
      // We handle 'on close' on our own
    })
  }

  // Method to handle actions when the screen sharing manager is opened
  onOpen() {
    if (this.myPeer.disconnected) {
      this.myPeer.reconnect()
    }
  }

  // Method to handle actions when the screen sharing manager is closed
  onClose() {
    this.stopScreenShare(false)
    this.myPeer.disconnect()
  }

  // Generate a sanitized PeerJS ID for the user
  // PeerJS throws invalid_id error if it contains certain characters.
  // Additionally, for screen sharing ID, add a '-ss' at the end.
  private makeId(id: string) {
    return `${id.replace(/[^0-9a-z]/gi, 'G')}-ss`
  }

  // Start screen sharing by capturing the user's screen
  startScreenShare() {
    // Capture the user's screen using the browser's mediaDevices API
    // and handle when the user stops sharing
    navigator.mediaDevices
      ?.getDisplayMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        // Detect when the user clicks "Stop sharing" outside of our UI.
        // Reference: https://stackoverflow.com/a/25179198
        const track = stream.getVideoTracks()[0]
        if (track) {
          track.onended = () => {
            this.stopScreenShare()
          }
        }

        this.myStream = stream
        store.dispatch(setMyStream(stream))

        // Call all existing users to share the screen
        const game = phaserGame.scene.keys.game as Game
        const computerItem = game.computerMap.get(store.getState().computer.computerId!)
        if (computerItem) {
          for (const userId of computerItem.currentUsers) {
            this.onUserJoined(userId)
          }
        }
      })
  }

  // Stop screen sharing and optionally dispatch actions
  stopScreenShare(shouldDispatch = true) {
    this.myStream?.getTracks().forEach((track) => track.stop())
    this.myStream = undefined
    if (shouldDispatch) {
      store.dispatch(setMyStream(null))
      // Manually let all other existing users know screen sharing is stopped
      const game = phaserGame.scene.keys.game as Game
      game.network.onStopScreenShare(store.getState().computer.computerId!)
    }
  }

  // Handle when a user joins and share the screen with them
  onUserJoined(userId: string) {
    if (!this.myStream || userId === this.userId) return

    const sanitizedId = this.makeId(userId)
    this.myPeer.call(sanitizedId, this.myStream)
  }

  // Handle when a user leaves and remove their video stream
  onUserLeft(userId: string) {
    if (userId === this.userId) return

    const sanitizedId = this.makeId(userId)
    store.dispatch(removeVideoStream(sanitizedId))
  }
}
