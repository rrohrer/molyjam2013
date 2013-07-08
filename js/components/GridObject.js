TANK.registerComponent("GridObject")
.interfaces("Grid")

.requires("Pos2D")

.construct(function ()
{
  this._gridType  = GRID_EMPTY_TILE;
})

.initialize(function ()
{

})
