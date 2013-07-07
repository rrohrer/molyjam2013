TANK.registerComponent("RenderManager")

.construct(function ()
{
  this._activeCamera = null;

  //three.js items
  this._scene = new THREE.Scene();
  this._renderer = new THREE.WebGLRenderer();

  //setup the three system
  this._renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);
  this._renderer.setClearColor(0x000000, 1);
  document.body.appendChild(this._renderer.domElement);
  this._renderer.shadowMapEnabled = true;
  //this._renderer.shadowMapSoft = true;
  this._renderer.shadowCameraNear = 3;
  this._renderer.shadowCameraFar = 1000;
  this._renderer.shadowCameraFov = 50;

  this._renderer.shadowMapBias = 0.0039;
  this._renderer.shadowMapDarkness = 0.5;
  this._renderer.shadowMapWidth = 1024;
  this._renderer.shadowMapHeight = 1024;

  //hack for ambient light
  this._ambient = new THREE.AmbientLight(0x202020);
  this._scene.add(this._ambient);
  this._direction = new THREE.DirectionalLight(0xffffff);
  this._direction.position.x = 60;
  this._direction.position.y = 70;
  this._direction.position.z = -60;
  this._direction.castShadow = true;
  //this._direction.shadowCameraVisible = true;

  this._direction.shadowCameraNear = 3;
  this._direction.shadowCameraFar = 1000;
  this._direction.shadowCameraLeft = -100;
  this._direction.shadowCameraRight = 100;
  this._direction.shadowCameraTop = 100;
  this._direction.shadowCameraBottom = -100;
  this._direction.shadowMapWidth = 1024;
  this._direction.shadowMapHeight = 1024;

  this._scene.add(this._direction);
})

.initialize(function ()
{
  //update function for the renderer
  this.addEventListener("OnEnterFrame", function (dt)
  {
    if (this._activeCamera)
    {
      this._renderer.render(this._scene, this._activeCamera._camera);
    }
  });

  //called when a component is added to the engine
  this.addEventListener("OnComponentInitialized", function (component)
  {
    //check for a rederable interface
    if (component.interfaces["Renderable"])
    {
      this._scene.add(component.getRenderable());
    }

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
    if (component.interfaces["Renderable"])
    {
      this._scene.remove(component.getRenderable());
    }

    //check for a camera interface
    if (component.interfaces["THREECamera"])
    {
      this._activeCamera = null;
    }
  });
})

