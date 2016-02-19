'use strict';

var config = require('../config');
var baseV = require('../shaders/base.vert');
var baseF = require('../shaders/base.frag');

function Sphere() {
  this.mesh = global.GL.Mesh.sphere({normals: true, radius: 4}).computeWireframe();
  this.shader = new global.GL.Shader(baseV(), baseF());
  this.matrix = new global.GL.Matrix();
  this.shader.uniforms({color: config.hookPink});
  this.scale(2.5, 2.5, 2.5);
  //this.TweenTo(0, 0, -10.1);

  this.TweenTo(0,0,0);
}

Sphere.prototype._scale = function(value) {
  console.log( this );
  console.log(value);
  this.scale(value, value, value);
};

Sphere.prototype.update = function(seconds) {

};

Sphere.prototype.draw = function(gl) {
  this.rotate(0.075, 0, 1, 0);

  this.shader.draw(this.mesh, gl.LINES);
};

Sphere.prototype.translate = function(x, y, z) {
  global.GL.Matrix.translate(x, y, z, this.matrix);
  this.mesh.transform(this.matrix);
};

Sphere.prototype.scale = function(x, y, z) {
  global.GL.Matrix.scale(x, y, z, this.matrix);
  this.mesh.transform(this.matrix);
};

Sphere.prototype.rotate = function(a, x, y, z) {
  global.GL.Matrix.rotate(a, x, y, z, this.matrix);
  this.mesh.transform(this.matrix);
};

Sphere.prototype.update2 = function() {
  console.log( this.matrix.m );
  this.mesh.transform(this.matrix);
};

Sphere.prototype.TweenTo = function(x, y, z) {
  var b = this.matrix.m.slice();
  var a = global.GL.Matrix.translate(x, y, z, this.matrix).m.slice();

  this.matrix.m[0] = b[0];
  this.matrix.m[1] = b[1];
  this.matrix.m[2] = b[2];
  this.matrix.m[3] = b[3];
  this.matrix.m[4] = b[4];
  this.matrix.m[5] = b[5];
  this.matrix.m[6] = b[6];
  this.matrix.m[7] = b[7];
  this.matrix.m[8] = b[8];
  this.matrix.m[9] = b[9];
  this.matrix.m[10] = b[10];
  this.matrix.m[11] = b[11];
  this.matrix.m[12] = b[12];
  this.matrix.m[13] = b[13];
  this.matrix.m[14] = b[14];
  this.matrix.m[15] = b[15];

  var f = this.update2.bind(this);
  var t = this;
  b.onUpdate = function() {
    t.matrix.m[0] = a[0];
    t.matrix.m[1] = a[1];
    t.matrix.m[2] = a[2];
    t.matrix.m[3] = a[3];
    t.matrix.m[4] = a[4];
    t.matrix.m[5] = a[5];
    t.matrix.m[6] = a[6];
    t.matrix.m[7] = a[7];
    t.matrix.m[8] = a[8];
    t.matrix.m[9] = a[9];
    t.matrix.m[10] = a[10];
    t.matrix.m[11] = a[11];
    t.matrix.m[12] = a[12];
    t.matrix.m[13] = a[13];
    t.matrix.m[14] = a[14];
    t.matrix.m[15] = a[15];
    t.mesh.transform(t.matrix);
    console.log( t.matrix.m );
  };

  TweenLite.to(a, 0.5, b);

};

module.exports = Sphere;
