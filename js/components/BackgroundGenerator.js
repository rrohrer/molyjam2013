TANK.registerComponent("BackgroundGenerator")

.requires("Pos3D")

.construct(function ()
{
  this._tiles = [];
  this._width = 30;
  this._height = 30;
  this._spacing = 1.5;
  this._minDepth = -1.0;
  this._maxDepth = -10.0;
  this._waveLengthW = 2.0;
  this._waveLengthH = 2.0;
  this._phase = 0.0;
  this._phaseSpeed = 0.2;
})

.initialize(function ()
{
  this.createCubes = function ()
  {
    var radiansPerUnitWidth = (this._waveLengthW / this._width) * (Math.PI * 2.0);
    var radiansPerUnitHeight = (this._waveLengthH) / this._height * (Math.PI * 2.0);
    for (var x = 0; x < this._width; x++)
    {
      for (var z = 0; z < this._height; z++)
      {
        var cube = TANK.createEntity().addComponents("Cube3D");
        cube.Cube3D.setColor("rgb(255,136,16)");

        cube.Pos3D.x = this.parent.Pos3D.x - Math.floor(0.5 * this._width * this._spacing) + x * this._spacing;
        cube.Pos3D.z = this.parent.Pos3D.z - Math.floor(0.5 * this._height * this._spacing) + z * this._spacing;

        var sinXNormalized = (Math.sin(cube.Pos3D.x * radiansPerUnitWidth + this._phase) + 1.0) / 2.0;
        var sinZNormalized = (Math.sin(cube.Pos3D.z * radiansPerUnitWidth + this._phase) + 1.0) / 2.0;

        cube.Pos3D.y = sinXNormalized * sinZNormalized * (this._maxDepth - this._minDepth) + this._minDepth;

        cube.invoke("onTransform", cube.Pos3D);
        TANK.Game.addEntity(cube);

        this._tiles.push(cube);
      }
    }
  }

  this.addEventListener("OnEnterFrame", function (dt)
  {
    this._phase += dt * this._phaseSpeed;
    var radiansPerUnitWidth = (this._waveLengthW / this._width) * (Math.PI * 2.0);
    var radiansPerUnitHeight = (this._waveLengthH) / this._height * (Math.PI * 2.0);

    for (var i = 0; i < this._tiles.length; i++)
    {
      var cube = this._tiles[i];
      var sinXNormalized = (Math.sin(cube.Pos3D.x * radiansPerUnitWidth + this._phase) + 1.0) / 2.0;
      var sinZNormalized = (Math.sin(cube.Pos3D.z * radiansPerUnitWidth + this._phase) + 1.0) / 2.0;

      cube.Pos3D.y = sinXNormalized * sinZNormalized * (this._maxDepth - this._minDepth) + this._minDepth;

      cube.invoke("onTransform", cube.Pos3D);
    }
  });

  this.createCubes();
})
