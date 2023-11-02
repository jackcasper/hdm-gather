import Phaser from 'phaser'
import { BackgroundMode } from '../../../types/BackgroundMode'

// Define a class called "Background" that extends Phaser.Scene.
export default class Background extends Phaser.Scene {
  private backdropKey!: string

  constructor() {
    super('background') // Initialize the scene with the name 'background'.
  }

  // Function called when the scene is created.
  create(data: { backgroundMode: BackgroundMode }) {
    const sceneHeight = this.cameras.main.height
    const sceneWidth = this.cameras.main.width

    // Set the texture of images based on the background mode (day or night).
    if (data.backgroundMode === BackgroundMode.DAY) {
      this.backdropKey = 'backdrop_day'
      this.cameras.main.setBackgroundColor('#c6eefc') // Set the background color for the scene.
    } else {
      this.backdropKey = 'backdrop_night'
      this.cameras.main.setBackgroundColor('#2c4464') // Set a different background color.
    }

    // Add a backdrop image to the scene.
    const backdropImage = this.add.image(sceneWidth / 2, sceneHeight / 2, this.backdropKey)
    
    // Scale the backdrop image to fit the scene's dimensions and set its scroll factor.
    const scale = Math.max(sceneWidth / backdropImage.width, sceneHeight / backdropImage.height)
    backdropImage.setScale(scale).setScrollFactor(0) // Set scroll factor to make it static.
  }
}
