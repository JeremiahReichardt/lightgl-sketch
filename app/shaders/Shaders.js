'use strict';

var baseV = require('../shaders/base.vert');
var baseF = require('../shaders/base.frag');
var textureV = require('../shaders/texture.vert');
var textureF = require('../shaders/texture.frag');

function Shaders() {
  this.base = new global.GL.Shader(baseV(), baseF());
  this.texture = new global.GL.Shader(textureV(), textureF());
}

module.exports = Shaders;
