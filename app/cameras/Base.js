'use strict';

function Base() {
  this.x = 0;
  this.y = 0;
  this.z = 10;
  var folder = window.gui.addFolder('Camera');
  folder.add(this, 'x');
  folder.add(this, 'y');
  folder.add(this, 'z');
}

Base.prototype.update = function(gl) {

};

Base.prototype.draw = function(gl) {
  gl.translate(-this.x, -this.y, -this.z);
};

module.exports = Base;
