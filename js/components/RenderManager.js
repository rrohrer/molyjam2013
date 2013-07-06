TANK.registerComponent("RenderManager")

.construct(function ()
{
  this._windowWidth = 800;
  this._windowHeight = 600;

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

  });

  //called when a component is added to the engine
  this.addEventListener("OnComponentInitialized", function (component)
  {
    //check for a rederable interface

    //check for a camera interface
  });

  //called when a component is removed from the game engine
  this.addEventListener("OnComponentUninitialized", function (component)
  {
    //check for a rederable interface

    //check for a camera interface
  });
})

