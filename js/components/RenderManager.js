TANK.registerComponent("RenderManager")

.construct(function ()
{
  this._activeCamera = null;

  //three.js items
  this._scene = new THREE.Scene();
  this._renderer = new THREE.WebGLRenderer();

  //setup the three system
  this._renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);
  document.body.appendChild(this._renderer.domElement);

  this.testMesh = new THREE.CubeGeometry(1,1,1);
  this.material = new THREE.MeshBasicMaterial({color: 0x00ff00});
  this.cube = new THREE.Mesh(this.testMesh, this.material);
  this._scene.add(this.cube);
})

.initialize(function ()
{
  //update function for the renderer
  this.addEventListener("OnEnterFrame", function (dt)
  {
    this.cube.rotation.x += 0.1;
    this.cube.rotation.y += 0.1;

    if (this._activeCamera)
    {
      this._renderer.render(this._scene, this._activeCamera._camera);
    }
  });

  //called when a component is added to the engine
  this.addEventListener("OnComponentInitialized", function (component)
  {
    //check for a rederable interface

    //check for a camera interface
    if (component.interfaces["THREECamera"])
    {
      this._activeCamera = component;
    }
  });

  //called when a component is removed from the game engine
  this.addEventListener("OnComponentUninitialized", function (component)
  {
    //check for a rederable interface

    //check for a camera interface
    if (component.interfaces["THREECamera"])
    {
      this._activeCamera = null;
    }
  });
})

