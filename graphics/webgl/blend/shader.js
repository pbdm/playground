const vsSource = `
  attribute vec3 aPosition;

  void main() {
    gl_Position = vec4(aPosition, 1.0);
  }
`;
const fsSource = `
  precision highp float;
  uniform vec2 uResolution;
  uniform sampler2D uTexture;

  void main() {
    gl_FragColor = texture2D(uTexture, gl_FragCoord.xy / uResolution.xy);
  }
`;
