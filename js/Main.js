function main()
{
  // Create the "engine" object with the main components
  var space = TANK.createSpace("InputManager, CollisionManager, RenderManager");
  TANK.addSpace(space, "Game");
  TANK.Game.addEntity(TANK.createEntity().addComponents("Camera"), "MainCamera");
  TANK.Game.InputManager.context = document.body.lastChild;

  var bg = TANK.createEntity().addComponents("BackgroundGenerator");
  TANK.Game.addEntity(bg,"BG");

  TANK.Game.addEntity(TANK.createEntity().addComponents("GameGrid"), "Grid");

  var player = TANK.createEntity().addComponents("Player, GridObject, Pos3D");
  //player.Cube3D.setColor(PLAYER_COLOR);
  player.GridObject._gridType = GRID_PLAYER;
  TANK.Game.addEntity(player,"Player");

  TANK.start();
}
