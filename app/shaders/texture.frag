uniform sampler2D texture;
uniform sampler2D texture2;
varying vec2 coord;
void main() {
  gl_FragColor = texture2D(texture, coord) - texture2D(texture2, coord);
}
