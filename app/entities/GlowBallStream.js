'use strict';

var Billboard = require('../components/Billboard');
var Vec3WaveGenerator = require('../components/Vec3WaveGenerator');

function GlowBallStream(gl) {
  this.remove = false;
  this.gl = gl;
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.angle = 0;
  this.components = [];
  this.drawables = [];
  this.upwardRates = [];

  var min, max, speed;
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

    min = 0.002;
    max = 0.02;
    speed = Math.random() * (max - min) + min;

    this.upwardRates.push(speed);
    var billboard = new Billboard(gl, this.x, this.y, this.z, 0.0004);
    billboard.rotationRateX = Math.random();
    billboard.rotationRateY = Math.random();
    billboard.rotationRateZ = Math.random();

    min = 1.0795;
    max = 1.0895;
    speed = Math.random() * (max - min) + min;

    billboard.TweenScaleRate(speed, (Math.random() * 1.5) + 2);

    this.drawables.push(billboard);
  }
}

GlowBallStream.prototype.update = function(seconds) {
  for ( var i = 0; i < this.components.length; i++ ) {
    this.components[i].update(seconds);
    this.drawables[i].x = this.components[i].x;
    this.drawables[i].y += this.upwardRates[i];
    this.drawables[i].z = this.components[i].z;
  }
  for ( i = 0; i < this.drawables.length; i++ ) {
    if ( this.drawables[i].a === 0 ) {
      this.drawables.splice(i, 1);
      this.components.splice(i, 1);
      if ( this.drawables.length === 0 ) {
        this.remove = true;
      }
    }
  }
};

GlowBallStream.prototype.draw = function() {
  this.gl.pushMatrix();
  this.gl.translate(this.x, this.y, this.z);
  for ( var i = 0; i < this.drawables.length; i++ ) {
    this.drawables[i].draw(this.gl);
  }
  this.gl.popMatrix();
};

GlowBallStream.prototype.TweenTo = function(x, y, z, t) {
  global.TweenMax.to(this, t, {delay: 0, x:x, y:y, z:z});
};

module.exports = GlowBallStream;
