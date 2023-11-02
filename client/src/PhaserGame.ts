import Phaser from 'phaser'
import Game from './scenes/Game'
import Background from './scenes/Background'
import Bootstrap from './scenes/Bootstrap'

// Define the configuration for the Phaser game
const config: Phaser.Types.Core.GameConfig = {
  // Set the renderer to automatically choose between WebGL and Canvas
  type: Phaser.AUTO,
  // Specify the parent HTML element where the game will be rendered
  parent: 'phaser-container',
  // Set the background color of the game canvas
  backgroundColor: '#93cbee',
  // Enable pixel art mode to prevent pixel art from blurring when scaled
  pixelArt: true,
  // Configure the game's scaling mode to resize based on the window dimensions
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  // Configure the game's physics engine, using the Arcade physics system
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }, // Set gravity to 0 (no gravity)
      debug: false, // Disable physics debugging
    },
  },
  // Automatically focus the game canvas on startup
  autoFocus: true,
  // Specify the order in which scenes will be loaded and run
  scene: [Bootstrap, Background, Game],
}

// Create a new instance of the Phaser game using the provided configuration
const phaserGame = new Phaser.Game(config)

// Expose the game instance globally for debugging and development purposes
;(window as any).game = phaserGame

// Export the Phaser game instance for use in the application
export default phaserGame
