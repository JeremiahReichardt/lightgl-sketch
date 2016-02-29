'use strict';

var config = require('./config');
var Camera = require('./cameras/Base');
var Planet = require('./entities/Planet');
var SphereSwarm = require('./entities/SphereSwarm');

function App() {
  this.gl = GL.create();
  this.entities = [];

  this.camera = new Camera(this.gl);
  this.planet = new Planet(this.gl);

  this.entities.push( this.planet );

  this.camera.TweenTo(0, 0, -10, 0);
  this.planet.TweenTo(-2, 0, 0, 0);

  var planet = this.planet;
  this.gl.onmousemove = function(e) {
    var scale = 5;
    var x = ( ( e.clientX / window.innerWidth ) * scale ) - (scale/2);
    var y = ( ( e.clientY / window.innerHeight ) * scale ) - (scale/2);
    planet.TweenTo(x, y*-1, 0, 1);
  };

  var entities = this.entities;
  var gl = this.gl;
  this.gl.canvas.addEventListener('click', function(e) {
    var ss = new SphereSwarm(gl);
    var scale = 5;
    var x = ( ( e.clientX / window.innerWidth ) * scale ) - (scale/2);
    var y = ( ( e.clientY / window.innerHeight ) * scale ) - (scale/2);
    ss.x = x;
    ss.y = y * -1;
    entities.push(ss);
  }, false);

  this.gl.onupdate = this.onupdate.bind(this);
  this.gl.ondraw = this.ondraw.bind(this);

  this.gl.fullscreen();
  this.gl.animate();
  this.gl.enable(this.gl.CULL_FACE);
  this.gl.enable(this.gl.POLYGON_OFFSET_FILL);
  this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE);
  this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
  this.gl.enable(this.gl.BLEND);
  this.gl.polygonOffset(1, 1);
  this.gl.clearColor(0.8, 0.8, 0.8, 1);
  this.gl.enable(this.gl.DEPTH_TEST);
}

App.prototype.onupdate = function(seconds) {
  for ( var i = 0; i < this.entities.length; i++ ) {
    this.entities[i].update(seconds);
  }
};

App.prototype.ondraw = function(seconds) {
  this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  this.gl.loadIdentity();

  this.gl.pushMatrix();
  this.camera.draw(this.gl);

  for ( var i = 0; i < this.entities.length; i++ ) {
    this.gl.pushMatrix();
    this.entities[i].draw(this.gl);
    this.gl.popMatrix();
  }

  this.gl.popMatrix();
};

window.onload = function() {
  new App();
};
