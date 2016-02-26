'use strict';

function Base(gl) {
  this.gl = gl;
  this.x = 0;
  this.y = 0;
  this.z = 0;
}

Base.prototype.update = function() {

};

Base.prototype.draw = function() {
  this.gl.translate(this.x, this.y, this.z);
};

Base.prototype.TweenTo = function(x, y, z, t) {
  global.TweenLite.to(this, t, {x:x, y:y, z:z});
};

module.exports = Base;
