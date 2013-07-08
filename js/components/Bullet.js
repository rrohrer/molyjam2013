TANK.registerComponent("Bullet")
.requires("GridObject")
.construct(function ()
{
  this._damage = 1;
  this._velocity = [0,0];

  this.onCollision = function (entity)
  {
    //check to see if you should reflect
    if (entity.GridObject._gridType == GRID_REFLECTOR && this.parent.GridObject._gridType == GRID_PLAYER_BULLET)
    {
      this._velocity[0] *= -1;
      this._velocity[1] *= -1;
      this.parent.GridObject._gridType = GRID_ENEMY_BULLET;
      var player = TANK.Game.getEntity("Player").Player;
      player._numActiveBullets--;
    }
  }
})
.initialize(function ()
{
  //get the dementions of grid;
  var grid = TANK.Game.getEntity("Grid");

  this._width = grid.GameGrid._width;
  this._height = grid.GameGrid._height;

  this.addEventListener("OnEnterFrame", function (dt)
  {
    //kill if out of bounds;
    if (this.parent.Pos2D.x > this._width - 1 || this.parent.Pos2D.x < 0
        || this.parent.Pos2D.y > this._height - 1 || this.parent.Pos2D.y < 0)
    {
      TANK.Game.removeEntity(this.parent.id);

      if (this.parent.GridObject._gridType == GRID_PLAYER_BULLET)
      {
        var player = TANK.Game.getEntity("Player").Player;
        player._numActiveBullets--;
      }
      return;
    }
    this.parent.Pos2D.x += this._velocity[0] * dt;
    this.parent.Pos2D.y += this._velocity[1] * dt;
  });

})
