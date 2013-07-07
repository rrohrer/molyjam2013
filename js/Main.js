function main()
{
  // Create the "engine" object with the main components
  var space = TANK.createSpace("InputManager, CollisionManager, RenderManager");
  TANK.addSpace(space, "Game");
  TANK.Game.addEntity(TANK.createEntity().addComponents("Camera"), "MainCamera");
  TANK.Game.InputManager.context = document.body.lastChild;

  var cube = TANK.createEntity().addComponents("Cube3D");
  cube.Cube3D.setColor("rgb(255,0,0)");
  cube.Pos3D.addPosition(0.0,-2.0,0.0);
  TANK.Game.addEntity(cube);

  cube = TANK.createEntity().addComponents("Cube3D");
  cube.Cube3D.setColor("rgb(0,255,0)");
  cube.Pos3D.addPosition(1.0,-2.0,0.0);
  TANK.Game.addEntity(cube);

  var player = TANK.createEntity().addComponents("Player, Cube3D");
  player.Cube3D.setColor("rgb(0,0,255)");
  TANK.Game.addEntity(player,"Player");


  TANK.start();
}
