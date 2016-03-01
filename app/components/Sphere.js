'use strict';

// 400051

var config = require('../config');
var baseV = require('../shaders/base.vert');
var baseF = require('../shaders/base.frag');

/**
 * Sphere
 * @param x
 * @param y
 * @param z
 * @param scale
 * @param rotation
 * @constructor
 */
function Sphere(gl, x, y, z, scale, rotation) {
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
  // this might not be the best route to go down because shouldn't i share them?

  this.shader =  new global.GL.Shader(baseV(), baseF());

  this.matrix = new global.GL.Matrix();
  this.r = 1;
  this.g = 0;
  this.b = 0.314;
  this.a = 0.5;
  this.shader.uniforms({color: config.hookPink});
  this.rotationRateX = 0;
  this.rotationRateY = 0;
  this.rotationRateZ = 0;
  this.x = x;
  this.y = y;
  this.z = z;
  this.scaleRate = 1;
  this.scale(scale);
  this.rotate(rotation);
}

/**
 * Updates
 * @param seconds
 */
Sphere.prototype.update = function(seconds) {

};

/**
 * Draws
 * @param gl
 */
Sphere.prototype.draw = function(gl) {
  this.rotate(this.rotationRateX, this.rotationRateY, this.rotationRateZ, 0);
  this.scale(this.scaleRate);
  gl.translate(this.x, this.y, this.z);
  this.shader.draw(this.mesh, gl.LINES);
};

/**
 * Scales the mesh and matrix
 * @param scale
 */
Sphere.prototype.scale = function(scale) {
  if ( scale === 1 ) {
    return;
  }
  global.GL.Matrix.scale(scale, scale, scale, this.matrix);
  this.mesh.transform(this.matrix);
};

/**
 * Rotates the mesh and matrix
 * @param r
 */
Sphere.prototype.rotate = function(r) {
  if ( r === 0 ){
    return;
  }
  global.GL.Matrix.rotate(r, 0, 1, 0, this.matrix);
  this.mesh.transform(this.matrix);
};

/**
 * Sets the color of the sphere
 * @param r
 * @param g
 * @param b
 * @param a
 */
Sphere.prototype.setColor = function(r, g, b, a) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
  this._updateColor();
};

Sphere.prototype._updateColor = function() {
  this.shader.uniforms({color: [this.r, this.g, this.b, this.a]});
};

/**
 * Tweens the X Y and Z values
 * @param x
 * @param y
 * @param z
 * @param t
 * @constructor
 */
Sphere.prototype.TweenTo = function(x, y, z, t) {
  global.TweenMax.to(this, t, {x:x, y:y, z:z});
};

/**
 * Tweens the scale rate and once complete sets it to 1
 * @param scaleRate
 * @param t
 * @constructor
 */
Sphere.prototype.TweenScaleRate = function(scaleRate, t) {
  global.TweenMax.to(this, t, {bezier:[{scaleRate: scaleRate}, {scaleRate: 1}]});
};

/**
 * Tweens the rotation rate and once complete sets it to 0
 * @param rotationRateX
 * @param rotationRateY
 * @param rotationRateZ
 * @param t
 * @constructor
 */
Sphere.prototype.TweenRotationRate = function(rotationRateX, rotationRateY, rotationRateZ, t) {
  var start = {
    rotationRateX: rotationRateX,
    rotationRateY: rotationRateY,
    rotationRateZ: rotationRateZ
  };
  var end = {
    rotationRateX: 0,
    rotationRateY: 0,
    rotationRateZ: 0
  };
  global.TweenMax.to(this, t, {bezier:[start, end]});
};

/**
 * Tweens the color of the sphere
 * @param r
 * @param g
 * @param b
 * @param a
 * @param t
 * @constructor
 */
Sphere.prototype.TweenRGBA = function(r, g, b, a, t) {
  var _updateColor = this._updateColor.bind(this);
  global.TweenMax.to(this, t, {r: r, g: g, b: b, a: a, onUpdate: _updateColor});
};

Sphere.prototype.TweenA = function(a, t) {
  var _updateColor = this._updateColor.bind(this);
  global.TweenMax.to(this, t, {a: a, onUpdate: _updateColor});
};


module.exports = Sphere;
