import Phaser from 'phaser'

// Define a type for the keyboard input mapping
export type Keyboard = {
  W: Phaser.Input.Keyboard.Key // Key for 'W' key on the keyboard
  S: Phaser.Input.Keyboard.Key // Key for 'S' key on the keyboard
  A: Phaser.Input.Keyboard.Key // Key for 'A' key on the keyboard
  D: Phaser.Input.Keyboard.Key // Key for 'D' key on the keyboard
}

// Extend the Keyboard type to include Phaser's cursor key input
export type NavKeys = Keyboard & Phaser.Types.Input.Keyboard.CursorKeys
