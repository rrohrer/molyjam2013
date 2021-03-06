TANK.registerComponent("Enemy")

.requires("GridObject")

.construct(function ()
{
  this._velocity = [0,0];
  this._correctTime = 0.0;
  this._fireTime = 0.0;
  this._health = 10;

  this.fireBullet = function (vel)
  {
    var bullet = TANK.createEntity().addComponents("Bullet");
    bullet.Bullet._velocity = vel;
    bullet.Pos2D.x = this.parent.Pos2D.x;
    bullet.Pos2D.y = this.parent.Pos2D.y;
    bullet.GridObject._gridType = GRID_ENEMY_BULLET;
    TANK.Game.addEntity(bullet);
  }

  this.onCollision = function (entity)
  {
    //check to see if the player shot
    if (entity.GridObject._gridType == GRID_PLAYER_BULLET)
    {
      this._health -= entity.Bullet._damage;
      if (this._health <= 0) TANK.Game.removeEntity(this.parent.id);
    }
  }
})
.initialize(function ()
{
  //get the width and height of the grid
  var grid = TANK.Game.getEntity("Grid");
  this._width = grid.GameGrid._width;
  this._height = grid.GameGrid._height;
  this.parent.GridObject._gridType = GRID_ENEMY;

  this.addEventListener("OnEnterFrame", function (dt)
  {
    //find out where the player is
    var playerPos = TANK.Game.getEntity("Player").Pos2D;

    //decide if you want to course correct
    this._correctTime += dt;
    if (this._correctTime > 5.0 && (Math.random() > 0.5))
    {
      this._velocity = [(Math.random() * 2) - 1, (Math.random() * 2) - 1];
      this._correctTime = 0.0;
    }

    //decide if you want to fire a bullet
    this._fireTime += dt;
    if (Math.floor(this.parent.Pos2D.x) == Math.floor(playerPos.x))
    {
      if (Math.random() > 0.8 && this._fireTime > 2.0)
      {
        this._fireTime = 0.0;
        if(this.parent.Pos2D.y > playerPos.y)
        {
            this.fireBullet([0,-6]);
        }
        else
        {
          this.fireBullet([0,6]);
        }
      }
    }
    else if (Math.floor(this.parent.Pos2D.y) == Math.floor(playerPos.y))
    {
      if (Math.random() > 0.8 && this._fireTime > 2.0)
      {
        this._fireTime = 0.0;
        if(this.parent.Pos2D.x > playerPos.x)
        {
            this.fireBullet([-6, 0]);
        }
        else
        {
          this.fireBullet([6, 0]);
        }
      }
    }

    //move
    var pos = this.parent.Pos2D;
    pos.x += this._velocity[0] * dt * 4;
    pos.y += this._velocity[1] * dt * 4;

    //make sure we don't go out of bounds
    if (pos.x > this._width - 1) pos.x = this._width - 1;
    if (pos.x <= 0) pos.x = 0;
    if (pos.y > this._height - 1) pos.y = this._height - 1;
    if (pos.y <= 0) pos.y = 0;
  });
})
