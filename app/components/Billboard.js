'use strict';

// 400051, 406026

var config = require('../config');


/**
 * Billboard
 * @param x
 * @param y
 * @param z
 * @param scale
 * @constructor
 */
function Billboard(gl, x, y, z, scale) {
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
  this.mesh = global.GL.Mesh.plane({ coords: true });
  this.texture = global.GL.Texture.fromURL('./images/white-circle-with-glow.png');
  this.shader = gl.shaders.texture;
  this.matrix = new global.GL.Matrix();
  this.a = 0.5;
  this.x = x;
  this.y = y;
  this.z = z;
  this.scaleRate = 1;
  this.scale(scale);
}

/**
 * Updates
 * @param seconds
 */
Billboard.prototype.update = function(seconds) {

};

/**
 * Draws
 * @param gl
 */
Billboard.prototype.draw = function(gl) {
  gl.pushMatrix();
  this.scale(this.scaleRate);
  gl.translate(this.x, this.y, this.z);
  this.texture.bind(0);
  this.shader.uniforms({
    texture: 0
  }).draw(this.mesh);

  gl.popMatrix();
};

/**
 * Scales the mesh and matrix
 * @param scale
 */
Billboard.prototype.scale = function(scale) {
  if ( scale === 1 ) {
    return;
  }
  global.GL.Matrix.scale(scale, scale, scale, this.matrix);
  this.mesh.transform(this.matrix);
};

/**
 * Tweens the X Y and Z values
 * @param x
 * @param y
 * @param z
 * @param t
 * @constructor
 */
Billboard.prototype.TweenTo = function(x, y, z, t) {
  global.TweenMax.to(this, t, {x:x, y:y, z:z});
};

/**
 * Tweens the scale rate and once complete sets it to 1
 * @param scaleRate
 * @param t
 * @constructor
 */
Billboard.prototype.TweenScaleRate = function(scaleRate, t) {
  global.TweenMax.to(this, t, {bezier:[{scaleRate: scaleRate}, {scaleRate: 1}]});
};

/**
 * Tweens just the alpha of the sphere
 * @param a
 * @param t
 * @constructor
 */
Billboard.prototype.TweenA = function(a, t) {
  global.TweenMax.to(this, t, {a: a});
};


module.exports = Billboard;
