'use strict';

var Sphere = require('../components/Sphere');
var Vec3WaveGenerator = require('../components/Vec3WaveGenerator');

function SphereSwarm(gl) {
  this.remove = false;
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
      Math.random()/2,
      Math.random()/2,
      Math.random()/2,
      Math.random()<0.5,
      Math.random()<0.5,
      Math.random()<0.5
    ));
    var sphere = new Sphere(gl, this.x, this.y, this.z, 0.0001);
    sphere.rotationRateX = Math.random();
    sphere.rotationRateY = Math.random();
    sphere.rotationRateZ = Math.random();
    sphere.TweenScaleRate(1.0895, (Math.random() * 1.5) + 2);
    var TweenA = sphere.TweenA.bind(sphere);
    TweenMax.to( sphere, 5 + (Math.random() * 2),
      {
        delay: Math.random() * 3,
        onComplete:TweenA,
        onCompleteParams:[0, 1]
      }
    );
    this.drawables.push(sphere);
  }
  this.TweenTo(this.x, this.y += 4, this.z, 30);
}

SphereSwarm.prototype.update = function(seconds) {
  for ( var i = 0; i < this.components.length; i++ ) {
    this.components[i].update(seconds);
    this.drawables[i].x = this.components[i].x;
    this.drawables[i].y = this.components[i].y;
    this.drawables[i].z = this.components[i].z;
  }
  for ( i = 0; i < this.drawables.length; i++ ) {
    if ( this.drawables[i].a === 0 ) {
      this.drawables.splice(i, 1);
      this.components.splice(i, 1);
      if ( this.drawables.length === 0 ) {
        this.remove = true;
        console.log( this.remove );
      }
    }
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

SphereSwarm.prototype.TweenTo = function(x, y, z, t) {
  global.TweenLite.to(this, t, {delay: 0, x:x, y:y, z:z});
};

module.exports = SphereSwarm;
