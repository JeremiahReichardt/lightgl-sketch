'use strict';

function Vec3(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.value = [this.x, this.y, this.z];
}

module.exports = Vec3;
