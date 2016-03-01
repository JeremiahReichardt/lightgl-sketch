'use strict';

var baseV = require('../shaders/base.vert');
var baseF = require('../shaders/base.frag');

function Shaders() {
  this.base = new global.GL.Shader(baseV(), baseF());
}

module.exports = Shaders;
