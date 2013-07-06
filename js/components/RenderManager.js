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
      this._scene.add(component.GetRenderable());
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
      this._scene.remove(component.GetRenderable());
    }

    //check for a camera interface
    if (component.interfaces["THREECamera"])
    {
      this._activeCamera = null;
    }
  });
})

