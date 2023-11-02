import Phaser from 'phaser'

// Function for drawing debug information for a tilemap layer
export const debugDraw = (layer: Phaser.Tilemaps.TilemapLayer, scene: Phaser.Scene) => {
  // Create a graphics object for rendering debug information
  const debugGraphics = scene.add.graphics().setAlpha(0.7)

  // Render debug information for the layer with specific visual settings
  layer.renderDebug(debugGraphics, {
    tileColor: null,  // Color for tiles (null for default)
    collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255), // Color for colliding tiles
    faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color for tile faces
  })
}

// The debugDraw function is exported and can be used elsewhere in the application
