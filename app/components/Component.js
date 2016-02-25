'use strict';

var baseV = require('../shaders/base.vert');
var baseF = require('../shaders/base.frag');

var mesh;
var matrix;
var shader;


function Component() {
  this.mesh = global.GL.Mesh.sphere({normals: true, radius: 4}).computeWireframe();
  this.shader = new global.GL.Shader(baseV(), baseF());
  this.matrix = new global.GL.Matrix();
  this.x = x;
  this.y = y;
  this.z = z;
  this.s = s;//?
  this.r = r;//?
}

Component.prototype.update = function(seconds) {

};

Component.prototype.draw = function(gl) {
  mesh.compile();
  shader.uniforms({color: [0, 0, 0]}).draw(mesh, gl.LINES);
};

Component.prototype.scale = function(x, y, z) {
  global.GL.Matrix.scale(x, y, z, matrix);
  mesh.transform(matrix);
};

Component.prototype.rotate = function(a, x, y, z) {
  global.GL.Matrix.rotate(a, x, y, z, matrix);
  mesh.transform(matrix);
};

module.exports = Component;
