import { ItemType } from '../../../types/Items'
import store from '../stores'
import Item from './Item'
import Network from '../services/Network'
import { openComputerDialog } from '../stores/ComputerStore'

// Define a class called Computer that extends the Item class
export default class Computer extends Item {
  id?: string // An optional property to store the computer's unique identifier
  currentUsers = new Set<string>() // A set to keep track of current users interacting with the computer

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    this.itemType = ItemType.COMPUTER // Set the item type to "COMPUTER"
  }

  // Private method to update the status box based on the number of current users
  private updateStatus() {
    if (!this.currentUsers) return
    const numberOfUsers = this.currentUsers.size
    this.clearStatusBox()
    if (numberOfUsers === 1) {
      this.setStatusBox(`${numberOfUsers} user`)
    } else if (numberOfUsers > 1) {
      this.setStatusBox(`${numberOfUsers} users`)
    }
  }

  // Method to handle the action when the player overlaps with the computer
  onOverlapDialog() {
    if (this.currentUsers.size === 0) {
      this.setDialogBox('Press R to use computer') // Instruct the player to press 'R' to use the computer
    } else {
      this.setDialogBox('Press R join') // Instruct the player to press 'R' to join the computer
    }
  }

  // Method to add a user to the currentUsers set
  addCurrentUser(userId: string) {
    if (!this.currentUsers || this.currentUsers.has(userId)) return
    this.currentUsers.add(userId)
    const computerState = store.getState().computer
    if (computerState.computerId === this.id) {
      computerState.shareScreenManager?.onUserJoined(userId)
    }
    this.updateStatus()
  }

  // Method to remove a user from the currentUsers set
  removeCurrentUser(userId: string) {
    if (!this.currentUsers || !this.currentUsers.has(userId)) return
    this.currentUsers.delete(userId)
    const computerState = store.getState().computer
    if (computerState.computerId === this.id) {
      computerState.shareScreenManager?.onUserLeft(userId)
    }
    this.updateStatus()
  }

  // Method to open the computer dialog and connect to the computer
  openDialog(playerId: string, network: Network) {
    if (!this.id) return
    store.dispatch(openComputerDialog({ computerId: this.id, myUserId: playerId }))
    network.connectToComputer(this.id)
  }
}
