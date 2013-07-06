TANK.registerComponent("Camera")

.interfaces("THREECamera")

.construct(function ()
{
  this._camera = new THREE.PerspectiveCamera(75, WINDOW_WIDTH / WINDOW_HEIGHT, 0.1, 1000.0);
})

.initialize(function ()
{

});
