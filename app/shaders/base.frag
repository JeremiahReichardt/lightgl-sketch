/*
this is just a base shader
pass in [r,g,b,a]
good for drawing mesh lines with a specific color I guess.
*/
uniform vec4 color;

void main() {
  gl_FragColor = color;
}
