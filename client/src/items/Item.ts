import Phaser from 'phaser'
import { ItemType } from '../../../types/Items'

// Define a class called "Item" that extends Phaser's Arcade Sprite.
export default class Item extends Phaser.Physics.Arcade.Sprite {
  private dialogBox!: Phaser.GameObjects.Container
  private statusBox!: Phaser.GameObjects.Container
  itemType!: ItemType

  // Constructor for the Item class.
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    // Create dialogBox and statusBox containers, which are used for displaying text.
    this.dialogBox = this.scene.add.container().setDepth(10000)
    this.statusBox = this.scene.add.container().setDepth(10000)
  }

  // Add text to the dialog box container.
  setDialogBox(text: string) {
    const innerText = this.scene.add
      .text(0, 0, text)
      .setFontFamily('Arial')
      .setFontSize(12)
      .setColor('#000000')

    // Set the size and position of the dialog box container relative to the item's position.
    const dialogBoxWidth = innerText.width + 4
    const dialogBoxHeight = innerText.height + 2
    const dialogBoxX = this.x - dialogBoxWidth * 0.5
    const dialogBoxY = this.y + this.height * 0.5

    // Create a graphical representation of the dialog box and add the text to it.
    this.dialogBox.add(
      this.scene.add
        .graphics()
        .fillStyle(0xffffff, 1)
        .fillRoundedRect(dialogBoxX, dialogBoxY, dialogBoxWidth, dialogBoxHeight, 3)
        .lineStyle(1.5, 0x000000, 1)
        .strokeRoundedRect(dialogBoxX, dialogBoxY, dialogBoxWidth, dialogBoxHeight, 3)
    )
    this.dialogBox.add(innerText.setPosition(dialogBoxX + 2, dialogBoxY))
  }

  // Remove everything from the dialog box container.
  clearDialogBox() {
    this.dialogBox.removeAll(true)
  }

  // Add text to the status box container.
  setStatusBox(text: string) {
    const innerText = this.scene.add
      .text(0, 0, text)
      .setFontFamily('Arial')
      .setFontSize(12)
      .setColor('#000000')

    // Set the size and position of the status box container relative to the item's position.
    const statusBoxWidth = innerText.width + 4
    const statusBoxHeight = innerText.height + 2
    const statusBoxX = this.x - statusBoxWidth * 0.5
    const statusBoxY = this.y - this.height * 0.25

    // Create a graphical representation of the status box and add the text to it.
    this.statusBox.add(
      this.scene.add
        .graphics()
        .fillStyle(0xffffff, 1)
        .fillRoundedRect(statusBoxX, statusBoxY, statusBoxWidth, statusBoxHeight, 3)
        .lineStyle(1.5, 0x000000, 1)
        .strokeRoundedRect(statusBoxX, statusBoxY, statusBoxWidth, statusBoxHeight, 3)
    )
    this.statusBox.add(innerText.setPosition(statusBoxX + 2, statusBoxY))
  }

  // Remove everything from the status box container.
  clearStatusBox() {
    this.statusBox.removeAll(true)
  }
}
