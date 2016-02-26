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
  this.mesh = global.GL.Mesh.sphere({normals: true}).computeWireframe();
  this.shader = new global.GL.Shader(baseV(), baseF());
  this.matrix = new global.GL.Matrix();
  this.shader.uniforms({color: config.hookPink});
  this.rotationRateX = 0;
  this.rotationRateY = 0;
  this.rotationRateZ = 0;
  this.scaleRateX = 0;
  this.scaleRateY = 0;
  this.scaleRateZ = 0;
  this.x = x;
  this.y = y;
  this.z = z;
  this.currentScale = scale;
  this.scale(scale, scale, scale);
  this.rotate(rotation);
}

Sphere.prototype.update = function(seconds) {

};

Sphere.prototype.draw = function(gl) {
  this.rotate(this.rotationRateX, this.rotationRateY, this.rotationRateZ, 0);
  gl.translate(this.x, this.y, this.z);
  this.scale(this.scaleRateX, this.scaleRateY, this.scaleRateZ);
  this.shader.draw(this.mesh, gl.LINES);
};

Sphere.prototype.scale = function(x, y, z) {
  if ( x === 0 && y === 0 && z === 0 ) {
    return;
  }
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

Sphere.prototype.TweenTo = function(x, y, z, t) {
  global.TweenLite.to(this, t, {x:x, y:y, z:z});
};
module.exports = Sphere;
