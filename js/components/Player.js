TANK.registerComponent("Player")

.construct(function ()
{

})

.initialize(function ()
{
  this.addEventListener("OnKeyPress", function (key)
  {
    if (key == TANK.UP_ARROW)
    {
      this.parent.Pos3D.addPosition(0.1,0,0);
    }
    if (key == TANK.DOWN_ARROW)
    {
      this.parent.Pos3D.addPosition(-0.1,0,0);
    }
    if (key == TANK.LEFT_ARROW)
    {
      this.parent.Pos3D.addPosition(0,0,-0.1);
    }
    if (key == TANK.RIGHT_ARROW)
    {
      this.parent.Pos3D.addPosition(0,0,0.1);
    }
  });

  this.addEventListener("OnKeyHeld", function (key)
  {
    if (key == TANK.UP_ARROW)
    {
      this.parent.Pos3D.addPosition(0.1,0,0);
    }
    if (key == TANK.DOWN_ARROW)
    {
      this.parent.Pos3D.addPosition(-0.1,0,0);
    }
    if (key == TANK.LEFT_ARROW)
    {
      this.parent.Pos3D.addPosition(0,0,-0.1);
    }
    if (key == TANK.RIGHT_ARROW)
    {
      this.parent.Pos3D.addPosition(0,0,0.1);
    }
  })
})
