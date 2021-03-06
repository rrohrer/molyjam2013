TANK.registerComponent("GameGrid")
.construct(function ()
{
  this._grid = [];
  this._objects = {};
  this._width = 30;
  this._height = 30;



  for (var x = 0; x < this._width; x++)
  {
    for (var z = 0; z < this._height; z++)
    {
      this._grid.push(GRID_EMPTY_TILE);
    }
  }
})

.initialize(function ()
{
  this.addEventListener("OnEnterFrame", function (dt)
  {
    //clear the grid
    for (var i = 0; i < this._grid.length; i++)
    {
      this._grid[i] = GRID_EMPTY_TILE;
    }

    //blit all the grid objects into the grid
    for (var i in this._objects)
    {
      var xpos = Math.floor(this._objects[i].parent.Pos2D.x);// + (this._width * 0.5));
      var zpos = Math.floor(this._objects[i].parent.Pos2D.y);// + (this._height * 0.5));
      if (xpos > this._width - 1) continue;
      if (xpos < 0) continue;
      if (zpos > this._height - 1) continue;
      if (zpos < 0) continue;
      var index = xpos * this._width + zpos;
      //check to see if there is already something in the grid here
      if (this._grid[index] === GRID_EMPTY_TILE)
      {
        this._grid[index] = this._objects[i];
      }
      else
      {
        //there was a collision, notify the objects
        this._grid[index].parent.invoke("onCollision", this._objects[i].parent);
        this._objects[i].parent.invoke("onCollision", this._grid[index].parent);

        //draw the one with higher priority
        if (this._grid[index]._gridType < this._objects[i]._gridType)
        {
          this._grid[index] = this._objects[i];
        }
      }
    }
  });

  this.addEventListener("OnComponentInitialized", function (component)
  {
    if (component.interfaces["Grid"])
    {
      this._objects[component.name + component.parent.id] = component;
    }
  });

  this.addEventListener("OnComponentUninitialized", function (component)
  {
    if (component.interfaces["Grid"])
    {
      delete this._objects[component.name + component.parent.id];
    }
  })
})
