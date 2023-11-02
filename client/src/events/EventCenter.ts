import Phaser from 'phaser'

// Create an instance of Phaser's Event Emitter to manage custom events
export const phaserEvents = new Phaser.Events.EventEmitter()

// Define custom event names as an enum
export enum Event {
  PLAYER_JOINED = 'player-joined',                      // Event when a player joins
  PLAYER_UPDATED = 'player-updated',                    // Event when a player's data is updated
  PLAYER_LEFT = 'player-left',                          // Event when a player leaves
  PLAYER_DISCONNECTED = 'player-disconnected',          // Event when a player is disconnected
  MY_PLAYER_READY = 'my-player-ready',                  // Event when the user's player is ready
  MY_PLAYER_NAME_CHANGE = 'my-player-name-change',      // Event when the user's player name changes
  MY_PLAYER_TEXTURE_CHANGE = 'my-player-texture-change',  // Event when the user's player texture changes
  MY_PLAYER_VIDEO_CONNECTED = 'my-player-video-connected',// Event when the user's video is connected
  ITEM_USER_ADDED = 'item-user-added',                  // Event when an item is added for a user
  ITEM_USER_REMOVED = 'item-user-removed',              // Event when an item is removed for a user
  UPDATE_DIALOG_BUBBLE = 'update-dialog-bubble',        // Event to update a dialog bubble
}
