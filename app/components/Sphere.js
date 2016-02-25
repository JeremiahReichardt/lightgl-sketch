/*
treat rotation as rotation RATE
and just deal with not being able to rotate
things via a tween. Just Tween the rotation rate!
...maybe same thing with scale so I can have a pulse effect.

 */

'use strict';

var config = require('../config');
var baseV = require('../shaders/base.vert');
var baseF = require('../shaders/base.frag');

function Sphere(x, y, z, scale, rotation) {
  if (x === undefined ) {
    x = 0;
  }
  if (y === undefined ) {
    y = 0;
  }
  if (x === undefined ) {
    z = 0;
  }
  if (x === undefined ) {
    scale = 1;
  }
  if (rotation === undefined ) {
    rotation = 0;
  }
  this.mesh = global.GL.Mesh.sphere({normals: true, radius: 4}).computeWireframe();
  this.shader = new global.GL.Shader(baseV(), baseF());
  this.matrix = new global.GL.Matrix();
  this.shader.uniforms({color: config.hookPink});
  this.x = x;
  this.y = y;
  this.z = z;
  this.scale(scale, scale, scale);
  this.rotate(rotation);
}

Sphere.prototype.update = function(seconds) {

};

Sphere.prototype.draw = function(gl) {
  //this.rotate(0.075, 0, 1, 0);
  gl.translate(this.x, this.y, this.z);
  this.shader.draw(this.mesh, gl.LINES);
};

Sphere.prototype.scale = function(x, y, z) {
  global.GL.Matrix.scale(x, y, z, this.matrix);
  this.mesh.transform(this.matrix);
};

Sphere.prototype.rotate = function(r) {
  if ( r === 0 ){
    return;
  }
  global.GL.Matrix.rotate(r, 0, 1, 0, this.matrix);
  this.mesh.transform(this.matrix);
};

Sphere.prototype.TweenTo = function(x, y, z, r) {
  TweenLite.to(this, 1, {x:x, y:y, z:z, onUpdateScope:this, onUpdate: this.rotate, onUpdateParams: [r]});
};

module.exports = Sphere;
