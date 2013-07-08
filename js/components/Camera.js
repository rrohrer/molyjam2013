TANK.registerComponent("Camera")

.interfaces("THREECamera")

.construct(function ()
{
  this._camera = new THREE.PerspectiveCamera(75, WINDOW_WIDTH / WINDOW_HEIGHT, 0.1, 1000.0);
  this._moveSpeed = 0.1;
  this.targetX = 0.0;
  this.targetY = 0.0;
  this.targetZ = 0.0;
})

.initialize(function ()
{
  this.addEventListener("OnEnterFrame", function ()
  {
    var player = TANK.Game.getEntity("Player");
    var BG = TANK.Game.getEntity("BG");
    if (player && BG)
    {
      var spacing = BG.BackgroundGenerator._spacing;
      var curPosX = this._camera.position.x;
      var targetPosX = player.Pos3D.x * spacing - 4;
      var positionDifX = this._moveSpeed * (targetPosX - curPosX);

      var curPosY = this._camera.position.y;
      var targetPosY = player.Pos3D.y + 10;
      var positionDifY = this._moveSpeed * (targetPosY - curPosY);

      var curPosZ = this._camera.position.z;
      var targetPosZ = player.Pos3D.z * spacing - 0.5;
      var positionDifZ = this._moveSpeed * (targetPosZ - curPosZ);

      this._camera.position.x = curPosX + positionDifX;
      this._camera.position.y = curPosY + positionDifY;
      this._camera.position.z = curPosZ + positionDifZ;

      var targetXDif = (player.Pos3D.x * spacing - this.targetX) * this._moveSpeed;
      var targetYDif = (player.Pos3D.y - this.targetY) * this._moveSpeed;
      var targetZDif = (player.Pos3D.z * spacing - this.targetZ) * this._moveSpeed;

      this.targetX = this.targetX + targetXDif;
      this.targetY = this.targetY + targetYDif;
      this.targetZ = this.targetZ + targetZDif;

      this._camera.lookAt(new THREE.Vector3(this.targetX, this.targetY, this.targetZ));
    }
  });
});
