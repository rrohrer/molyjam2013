var 3dCubeMeshData = new THREE.CubeGeometry(1,1,1);

TANK.registerComponent("Cube3D")

.requires("Pos3D")

.interfaces("Renderable")

.construct(function ()
{
  //default material
  this._material = new THREE.MeshPhongMaterial();
  this._renderable = new THREE.Mesh(3dCubeMeshData, this._material);
})

initialize(function ()
{
  this.getRenderable = function ()
  {
    return this._renderable;
  }

  this.setColor = function (color)
  {
    this._material.color = new THREE.Color(color);
  }
})
