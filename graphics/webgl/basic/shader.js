const vsSource = `
  // comment 
  attribute vec4 aVertexPosition;
  attribute vec4 aVertexColor;

  varying vec4 vColor;

  void main(void) {
    gl_Position = aVertexPosition;
    vColor = aVertexColor;
  }
`;

const fsSource = `
  precision highp float;
  varying vec4 vColor;
  void main() {
    gl_FragColor = vColor;
  }
`;
