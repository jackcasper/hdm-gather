import { ItemType } from '../../../types/Items'
import Item from './Item'

// Define a class called "VendingMachine" that extends the "Item" class.
export default class VendingMachine extends Item {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    // Set the item type to ItemType.VENDINGMACHINE.
    this.itemType = ItemType.VENDINGMACHINE
  }

  // Function to display a dialog box when the player overlaps with the vending machine.
  onOverlapDialog() {
    this.setDialogBox('Press R to buy a coffee :)')
  }
}
