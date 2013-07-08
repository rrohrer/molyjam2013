TANK.registerComponent("Player")

.construct(function ()
{
  this._bulletSpeed = 10;
  this._movementVelocity = [0,0];
  this._movementSpeed = 8;
  this._numActiveBullets = 0;
  this._health = 3;
  this._damageTimeout = 0.0;

  this.fireBullet = function (vel)
  {
    var bullet = TANK.createEntity().addComponents("Bullet");
    bullet.Bullet._velocity = vel;
    bullet.Pos2D.x = this.parent.Pos3D.x;
    bullet.Pos2D.y = this.parent.Pos3D.z;
    bullet.GridObject._gridType = GRID_PLAYER_BULLET;
    bullet.Bullet._damage = Math.max(20 - this._numActiveBullets, 2);
    TANK.Game.addEntity(bullet);
    this._numActiveBullets++;
  }

  this.onCollision = function (entity)
  {
    //check to see if the player shot
    if (entity.GridObject._gridType == GRID_ENEMY_BULLET && this._damageTimeout > 3.0)
    {
      this._damageTimeout = 0.0;
      this._health--;
      if (this._health < 0)
      {
        this._health = 3;
        this.parent.Pos3D.setPosition(PLAYER_START[0], 0, PLAYER_START[1]);
      }
    }
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
    //update damage timeout
    this._damageTimeout += dt;
    if (this._health < 3 && this._damageTimeout < 3.0)
    {
      PLAYER_COLOR = PLAYER_DAMAGED_COLOR;
    }
    else
    {
      PLAYER_COLOR = PLAYER_NORMAL_COLOR;
    }
    //update movement
    var pos = this.parent.Pos3D;
    pos.addPosition(this._movementVelocity[0]*dt, 0.0, this._movementVelocity[1] * dt);
    this._movementVelocity = [0,0];

    //make sure we don't go out of bounds
    if (pos.x > this._width - 1) pos.setPosition(this._width - 1, pos.y, pos.z);
    if (pos.x <= 0) pos.setPosition(0, pos.y, pos.z);
    if (pos.z > this._height - 1) pos.setPosition(pos.x, pos.y, this._height - 1);
    if (pos.z <= 0) pos.setPosition(pos.x, pos.y, 0);

    //update the bullet color
    var color = Math.floor(Math.min(30 + this._numActiveBullets * 20, 255));

    PLAYER_BULLET_COLOR = "rgb(" + color.toString() + ",255," + color.toString() + ")";
  });
})
