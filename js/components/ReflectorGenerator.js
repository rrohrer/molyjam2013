TANK.registerComponent("ReflectorGenerator")
.construct(function ()
{
  this._numReflectors = 20;
  this._minDistance = 5;//distance squared
  this._reflectors = [];//
  this.placeReflectors = function ()
  {
    for (var i = 0; i < this._numReflectors; i++)
    {
      var reflector = TANK.createEntity().addComponent("GridObject");
      reflector.GridObject._gridType = GRID_REFLECTOR;
      reflector.Pos2D.x = Math.floor(Math.random() * this._width);
      reflector.Pos2D.y = Math.floor(Math.random() * this._height);

      this.checkReflectorPosition(reflector.Pos2D);
      TANK.Game.addEntity(reflector);
      this._reflectors.push(reflector);
    }
  }

  this.checkReflectorPosition = function (pos)
  {
    //check to see if the point meets the criteria
    var attempts = 0;
    var maxAttempts = 4;

    for (var i = 0; i  < this._reflectors.length; i++)
    {
      var refPos = this._reflectors[i].Pos2D;
      var distance = (pos.x - refPos.x) * (pos.x - refPos.x) + (pos.y - refPos.y) * (pos.y - refPos.y);

      if (distance < this._minDistance && attempts < maxAttempts)
      {
        pos.x = Math.floor(Math.random() * this._width);
        pos.y = Math.floor(Math.random() * this._height);
        i = -1;
        attempts++;
      }
    }
  }
})

.initialize(function ()
{
  //get the grid dimensions
  var grid = TANK.Game.getEntity("Grid");

  this._width = grid.GameGrid._width;
  this._height = grid.GameGrid._height;

  this.placeReflectors();
})
