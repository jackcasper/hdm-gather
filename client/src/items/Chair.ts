import { ItemType } from '../../../types/Items'
import Item from './Item'

// Define a class called Chair that extends the Item class
export default class Chair extends Item {
  itemDirection?: string // An optional property to define the direction of the chair

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    this.itemType = ItemType.CHAIR // Set the item type to "CHAIR"
  }

  // Method to handle the action when the player overlaps with the chair
  onOverlapDialog() {
    this.setDialogBox('Press E to sit') // Display a dialog message to prompt the player to sit by pressing the 'E' key
  }
}
