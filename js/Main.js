function main()
{
  // Create the "engine" object with the main components
  var space = TANK.createSpace("InputManager, CollisionManager, RenderManager");
  TANK.addSpace(space, "Game");
  TANK.Game.addEntity(TANK.createEntity().addComponents("Camera"), "MainCamera");
  TANK.Game.InputManager.context = document.body.lastChild;

  var bg = TANK.createEntity().addComponents("BackgroundGenerator");
  TANK.Game.addEntity(bg);

  var player = TANK.createEntity().addComponents("Player, Cube3D");
  player.Cube3D.setColor("rgb(24,152,255)");
  TANK.Game.addEntity(player,"Player");


  TANK.start();
}
