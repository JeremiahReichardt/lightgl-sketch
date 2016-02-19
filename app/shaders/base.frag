/*
this is just a base shader
pass in [r,g,b]
good for drawing mesh lines with a sspecific color I guess.
*/
uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 0);
}
