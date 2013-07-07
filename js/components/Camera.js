TANK.registerComponent("Camera")

.interfaces("THREECamera")

.construct(function ()
{
  this._camera = new THREE.PerspectiveCamera(75, WINDOW_WIDTH / WINDOW_HEIGHT, 0.1, 1000.0);
})

.initialize(function ()
{
  this.addEventListener("OnEnterFrame", function ()
  {
    var player = TANK.Game.getEntity("Player")
    if (player)
    {
      var curPos = this._camera.position.x;
      var targetPos = player.Pos3D.x - 4;
      var positionDif = 0.1 * (targetPos - curPos);
      this._camera.position.x = curPos + positionDif;
      this._camera.position.y = player.Pos3D.y + 10;
      this._camera.position.z = player.Pos3D.z - 1;

      this._camera.lookAt(new THREE.Vector3(player.Pos3D.x, player.Pos3D.y, player.Pos3D.z));
    }
  });
});
