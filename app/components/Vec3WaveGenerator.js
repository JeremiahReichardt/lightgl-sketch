'use strict';

function Vec3WaveGenerator(rateX, rateY, rateZ, useSineX, useSineY, useSineZ) {
  this.rateX = rateX;
  this.rateY = rateY;
  this.rateZ = rateZ;

  this.x = 0;
  this.y = 0;
  this.z = 0;

  this.angleX = 0;
  this.angleY = 0;
  this.angleZ = 0;

  this.useSineX = useSineX;
  this.useSineY = useSineY;
  this.useSineZ = useSineZ;
}

Vec3WaveGenerator.prototype.update = function() {
  if ( this.angleX > 360 ) {
    this.angleX = 0;
  }
  if ( this.angleY > 360 ) {
    this.angleY = 0;
  }
  if ( this.angleZ > 360 ) {
    this.angleZ = 0;
  }

  if ( this.useSineX ) {
    this.x = Math.sin(this.angleY * Math.PI / 180);
  } else {
    this.x = Math.cos(this.angleY * Math.PI / 180);
  }

  if ( this.useSineY ) {
    this.y = Math.sin(this.angleY * Math.PI / 180);
  } else {
    this.y = Math.cos(this.angleY * Math.PI / 180);
  }

  if ( this.useSineZ ) {
    this.z = Math.sin(this.angleZ * Math.PI / 180);
  } else {
    this.z = Math.cos(this.angleZ * Math.PI / 180);
  }

  this.angleX += this.rateX;
  this.angleY += this.rateY;
  this.angleZ += this.rateZ;
};

module.exports = Vec3WaveGenerator;
