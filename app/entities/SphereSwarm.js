'use strict';

var Sphere = require('../components/Sphere');
var Vec3WaveGenerator = require('../components/Vec3WaveGenerator');

function SphereSwarm(gl) {
  this.gl = gl;
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.angle = 0;
  this.components = [];
  this.drawables = [];

  // create the swarm
  var swarmCount = Math.random() * 10 + 5;
  for( var i = 0; i < swarmCount; i++ ) {
    this.components.push(new Vec3WaveGenerator(
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random()<0.5,
      Math.random()<0.5,
      Math.random()<0.5
    ));
    var sphere = new Sphere(this.x, this.y, this.z, Math.random());
    sphere.rotationRateX = Math.random();
    sphere.rotationRateY = Math.random();
    sphere.rotationRateZ = Math.random();
    sphere.TweenScaleRate( 0.50, 100  );
    this.drawables.push(sphere);
  }
}

SphereSwarm.prototype.update = function(seconds) {
  for ( var i = 0; i < this.components.length; i++ ) {
    this.components[i].update(seconds);
    this.drawables[i].x = this.components[i].x;
    this.drawables[i].y = this.components[i].y;
    this.drawables[i].z = this.components[i].z;
  }
};

SphereSwarm.prototype.draw = function() {
  for ( var i = 0; i < this.drawables.length; i++ ) {
    this.gl.pushMatrix();
    this.gl.translate(this.x, this.y, this.z);
    this.drawables[i].draw(this.gl);
    this.gl.popMatrix();
  }
};

SphereSwarm.prototype.TweenTo = function(x, y, z) {
  global.TweenLite.to(this, 1, {x:x, y:y, z:z});
};

module.exports = SphereSwarm;
