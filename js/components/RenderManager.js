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

  //hack for ambient light
  this._ambient = new THREE.AmbientLight( 0x404040 );
  this._scene.add(this._ambient);
  this._point = new THREE.PointLight(0xffffff, 1, 20);
  this._point.position.x = 5;
  this._point.position.y = 5;
  this._scene.add(this._point);
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

