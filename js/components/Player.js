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
      this.parent.Pos3D.addPosition(1,0,0);
    }
  })
})
