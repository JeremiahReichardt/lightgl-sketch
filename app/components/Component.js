'use strict';

var baseV = require('../shaders/base.vert');
var baseF = require('../shaders/base.frag');

var mesh;
var matrix;
var shader;

function Component() {
  mesh = global.GL.Mesh.sphere({normals: true, radius: 4}).computeWireframe();
  shader = new global.GL.Shader(baseV(), baseF());
  matrix = new global.GL.Matrix();
}

Component.prototype.update = function(seconds) {

};

Component.prototype.draw = function(gl) {
  this.rotate(0.075, 0, 1, 0);
  mesh.compile();
  shader.uniforms({color: [0, 0, 0]}).draw(mesh, gl.LINES);
};

Component.prototype.translate = function(x, y, z) {
  global.GL.Matrix.translate(x, y, z, matrix);
  mesh.transform(matrix);
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
