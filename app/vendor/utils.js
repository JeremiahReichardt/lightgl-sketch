'use strict';
function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {
  if (h.charAt(0) === '#') {
    return h.substring(1, 7);
  } else {
    return h;
  }
}
function hexToRgb(hex) {
  if(hex.toString().charAt(0) !== '#'){
    return hex;
  }
  var r = hexToR(hex);
  var g = hexToG(hex);
  var b = hexToB(hex);
  return [r,g,b];
}
