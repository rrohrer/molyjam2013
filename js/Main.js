function main()
{
  // Create the "engine" object with the main components
  var space = TANK.createSpace("InputManager, CollisionManager, RenderManager");
  TANK.addSpace(space, "Game");
  TANK.Game.addEntity(TANK.createEntity().addComponents("Camera"), "MainCamera");

  var cube = TANK.createEntity().addComponents("Cube3D");
  cube.Cube3D.setColor("rgb(255,0,0)");
  TANK.Game.addEntity(cube);



  TANK.start();
}
