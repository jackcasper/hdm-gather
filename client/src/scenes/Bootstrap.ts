import Phaser from 'phaser'
import Network from '../services/Network'
import { BackgroundMode } from '../../../types/BackgroundMode'
import store from '../stores'
import { setRoomJoined } from '../stores/RoomStore'

// Define a class called "Bootstrap" that extends Phaser.Scene.
export default class Bootstrap extends Phaser.Scene {
  private preloadComplete = false // Flag to track whether preloading is complete.
  network!: Network

  constructor() {
    super('bootstrap') // Initialize the scene with the name 'bootstrap'.
  }

  // Preload game assets and set up event listeners.
  preload() {
    // Load various images, tilemaps, and spritesheets for the game.
    this.load.image('backdrop_day', 'assets/background/backdrop_day.png')
    
    this.load.image('backdrop_night', 'assets/background/backdrop_night.png')
    
    this.load.tilemapTiledJSON('tilemap', 'assets/map/map.json')
    this.load.spritesheet('tiles_wall', 'assets/map/FloorAndGround.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('chairs', 'assets/items/chair.png', {
      frameWidth: 32,
      frameHeight: 64,
    })
    this.load.spritesheet('computers', 'assets/items/computer.png', {
      frameWidth: 96,
      frameHeight: 64,
    })
    this.load.spritesheet('whiteboards', 'assets/items/whiteboard.png', {
      frameWidth: 64,
      frameHeight: 64,
    })
    this.load.spritesheet('vendingmachines', 'assets/items/vendingmachine.png', {
      frameWidth: 48,
      frameHeight: 72,
    })
    this.load.spritesheet('office', 'assets/tileset/Modern_Office_Black_Shadow.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('basement', 'assets/tileset/Basement.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('generic', 'assets/tileset/Generic.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('adam', 'assets/character/adam.png', {
      frameWidth: 32,
      frameHeight: 48,
    })
    this.load.spritesheet('ash', 'assets/character/ash.png', {
      frameWidth: 32,
      frameHeight: 48,
    })
    this.load.spritesheet('lucy', 'assets/character/lucy.png', {
      frameWidth: 32,
      frameHeight: 48,
    })
    this.load.spritesheet('nancy', 'assets/character/nancy.png', {
      frameWidth: 32,
      frameHeight: 48,
    })

    // Set up an event listener for when the loading is complete.
    this.load.on('complete', () => {
      this.preloadComplete = true
      this.launchBackground(store.getState().user.backgroundMode)
    })
  }

  // Initialize the network connection.
  init() {
    this.network = new Network()
  }

  // Launch the background scene with the specified background mode.
  private launchBackground(backgroundMode: BackgroundMode) {
    this.scene.launch('background', { backgroundMode })
  }

  // Launch the game scene when preloading is complete.
  launchGame() {
    if (!this.preloadComplete) return
    this.network.webRTC?.checkPreviousPermission()
    this.scene.launch('game', {
      network: this.network,
    })

    // Update the Redux state to indicate that the room has been joined.
    store.dispatch(setRoomJoined(true))
  }

  // Change the background mode and relaunch the background scene.
  changeBackgroundMode(backgroundMode: BackgroundMode) {
    this.scene.stop('background')
    this.launchBackground(backgroundMode)
  }
}
