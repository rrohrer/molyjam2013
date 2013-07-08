TANK.registerComponent("Player")

.construct(function ()
{
  this._bulletSpeed = 10;
  this._movementVelocity = [0,0];
  this._movementSpeed = 8;
  this.fireBullet = function (vel)
  {
    var bullet = TANK.createEntity().addComponents("Bullet");
    bullet.Bullet._velocity = vel;
    bullet.Pos2D.x = this.parent.Pos3D.x;
    bullet.Pos2D.y = this.parent.Pos3D.z;
    bullet.GridObject._gridType = GRID_PLAYER_BULLET;
    TANK.Game.addEntity(bullet);
  }
})

.initialize(function ()
{
  //get the dementions of grid;
  var grid = TANK.Game.getEntity("Grid");

  this._width = grid.GameGrid._width;
  this._height = grid.GameGrid._height;

  this.addEventListener("OnKeyPress", function (key)
  {
    if (key == TANK.W)
    {
      this._movementVelocity[0] = this._movementSpeed;
    }
    if (key == TANK.S)
    {
      this._movementVelocity[0] = -this._movementSpeed;
    }
    if (key == TANK.A)
    {
      this._movementVelocity[1] = -this._movementSpeed;
    }
    if (key == TANK.D)
    {
      this._movementVelocity[1] = this._movementSpeed;
    }

    //fireing
    if (key == TANK.DOWN_ARROW)
    {
      this.fireBullet([-this._bulletSpeed, 0]);
    }
    if (key == TANK.RIGHT_ARROW)
    {
      this.fireBullet([0, this._bulletSpeed]);
    }
    if (key == TANK.UP_ARROW)
    {
      this.fireBullet([this._bulletSpeed, 0]);
    }
    if (key == TANK.LEFT_ARROW)
    {
      this.fireBullet([0,-this._bulletSpeed]);
    }
  });

  this.addEventListener("OnKeyHeld", function (key)
  {
    if (key == TANK.W)
    {
      this._movementVelocity[0] = this._movementSpeed;
    }
    if (key == TANK.S)
    {
      this._movementVelocity[0] = -this._movementSpeed;
    }
    if (key == TANK.A)
    {
      this._movementVelocity[1] = -this._movementSpeed;
    }
    if (key == TANK.D)
    {
      this._movementVelocity[1] = this._movementSpeed;
    }
  })

  this.addEventListener("OnEnterFrame", function (dt)
  {
    //update movement
    var pos = this.parent.Pos3D;
    pos.addPosition(this._movementVelocity[0]*dt, 0.0, this._movementVelocity[1] * dt);
    this._movementVelocity = [0,0];

    //make sure we don't go out of bounds
    if (pos.x > this._width - 1) pos.setPosition(this._width - 1, pos.y, pos.z);
    if (pos.x <= 0) pos.setPosition(0, pos.y, pos.z);
    if (pos.z > this._height - 1) pos.setPosition(pos.x, pos.y, this._height - 1);
    if (pos.z <= 0) pos.setPosition(pos.x, pos.y, 0);
  });
})
