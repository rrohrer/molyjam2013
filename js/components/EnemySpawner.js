TANK.registerComponent("EnemySpawner")
.construct(function ()
{
  this._numEnemies = 5;
  this._timeSinceEnemies = 0.0;
  this.placeEnemies = function ()
  {
    for (var i = 0; i < this._numEnemies; i++)
    {
      var enemy = TANK.createEntity().addComponent("Enemy");
      enemy.Pos2D.x = Math.floor(Math.random() * this._width);
      enemy.Pos2D.y = Math.floor(Math.random() * this._height);

      TANK.Game.addEntity(enemy);
    }
    this._timeSinceEnemies = 0.0;
  }
})

.initialize(function ()
{
  //get the grid dimensions
  var grid = TANK.Game.getEntity("Grid");

  this._width = grid.GameGrid._width;
  this._height = grid.GameGrid._height;

  this.placeEnemies();

  this.addEventListener("OnEnterFrame", function (dt)
  {
    this._timeSinceEnemies += dt;
    if (this._timeSinceEnemies > 20)
    {
      this.placeEnemies();
    }
  })
})
