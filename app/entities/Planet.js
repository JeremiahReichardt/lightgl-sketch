'use strict';

var Sphere = require('../components/Sphere');
var Vec3WaveGenerator = require('../components/Vec3WaveGenerator');

function Planet(gl) {
  this.gl = gl;
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.angle = 0;
  this.components = [];
  this.drawables = [];

  // create the planet
  this.spherePlanet = new Sphere(0, 0, 0, 1.5);
  this.spherePlanet.rotationRateX = 0.05;

  // create the moon
  this.sphereMoon = new Sphere(0, 0, 0, 0.15);
  this.sphereMoon.rotationRateX = 0.35;

  // add drawables
  this.drawables.push(this.spherePlanet);
  this.drawables.push(this.sphereMoon);

  // add components
  this.components.push(this.spherePlanet);
  this.components.push(this.sphereMoon);
}

Planet.prototype.update = function(seconds) {

  var x = 2 * Math.sin(this.angle * Math.PI / 180);
  var z = 2 * Math.cos(this.angle * Math.PI / 180);

  this.angle+=0.2;
  if (this.angle>360) this.angle = 0;

  this.sphereMoon.x = x;
  this.sphereMoon.z = z;

  for ( var i = 0; i < this.components.length; i++ ) {
    this.components[i].update(seconds);
  }
};

Planet.prototype.draw = function() {
  for ( var i = 0; i < this.drawables.length; i++ ) {
    this.gl.pushMatrix();
    this.gl.translate(this.x, this.y, this.z);
    this.drawables[i].draw(this.gl);
    this.gl.popMatrix();
  }
};

Planet.prototype.TweenTo = function(x, y, z) {
  global.TweenLite.to(this, 1, {x:x, y:y, z:z});
};

module.exports = Planet;
