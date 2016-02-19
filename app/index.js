'use strict';

var config = require('./config');
var Camera = require('./cameras/Base');
var Sphere = require('./components/Sphere');

var gl = GL.create();
var components = [];
var i = 0;

window.onload = function() {
  window.gui = new dat.GUI({autoPlace: false});
  var customContainer = document.getElementById('gui-container');
  customContainer.appendChild(gui.domElement);

  components.push( new Camera() );
  components.push( new Sphere() );

  gl.onupdate = function(seconds) {
    for ( i = 0; i < components.length; i++ ) {
      components[i].update(seconds);
    }
  };

  gl.ondraw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.loadIdentity();
    for ( i = 0; i < components.length; i++ ) {
      components[i].draw(gl);
    }
  };

  gl.fullscreen();
  gl.animate();
  gl.enable(gl.CULL_FACE);
  gl.enable(gl.POLYGON_OFFSET_FILL);
  gl.polygonOffset(1, 1);
  gl.clearColor(0.8, 0.8, 0.8, 1);
  gl.enable(gl.DEPTH_TEST);
};
