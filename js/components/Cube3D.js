Cube3DMeshData = new THREE.CubeGeometry(1,1,1);

TANK.registerComponent("Cube3D")

.requires("Pos3D")

.interfaces("Renderable")

.construct(function ()
{
  //default material
  this._material = new THREE.MeshPhongMaterial();
  this._renderable = new THREE.Mesh(Cube3DMeshData, this._material);

  this.getRenderable = function ()
  {
    return this._renderable;
  }

  this.setColor = function (color)
  {
    this._material.color = new THREE.Color(color);
    this._material.ambient = new THREE.Color(color);
    this._material.needsUpdate = true;
  }

  this.onTransform = function (pos3D)
  {
    this._renderable.position.x = pos3D.x;
    this._renderable.position.y = pos3D.y;
    this._renderable.position.z = pos3D.z;

    this._renderable.rotation.x = pos3D.xRotation;
    this._renderable.rotation.y = pos3D.yRotation;
    this._renderable.rotation.z = pos3D.zRotation;
  }
})

.initialize(function ()
{

});
