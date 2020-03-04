const vsSource = `
  attribute vec4 aPosition;
  attribute vec4 aTexCoord;

  varying vec4 vTexCoord;

  void main() {
    gl_Position = aPosition;
    vTexCoord = aTexCoord;
  }
`;

const fsSource = `
  precision highp float;

  varying vec4 vTexCoord;
  uniform sampler2D uTexture;

  void main() {
    // 用 1.0 减是因为 OpenGL 要求 y 轴 0 坐标是在图片的底部的, 但是图片的 y 轴 0 坐标通常在顶部
    gl_FragColor = texture2D(uTexture, vec2(vTexCoord.x, 1.0 - vTexCoord.y));
  }
`;

