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
  components.push( new Sphere(0 , 0 ,0 , 1.5) );
  components.push( new Sphere(-2.5 , -2.5 ,0 , 1.0) );

  components[1].TweenTo(0 , 0 , -10 , 2);
  components[2].TweenTo(3 , 0, -10 , 0.075 * 2);

  gl.onupdate = function(seconds) {
    for ( i = 0; i < components.length; i++ ) {
      components[i].update(seconds);
    }
  };

  gl.ondraw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.loadIdentity();

    for ( i = 0; i < components.length; i++ ) {
      gl.pushMatrix();
      components[i].draw(gl);
      gl.popMatrix();
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
