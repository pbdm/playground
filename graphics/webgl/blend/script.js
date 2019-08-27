var canvas,
  gl,
  buffer,
  vertex_shader,
  fragment_shader,
  currentProgram,
  vertexPositionLocation,
  texture1,
  texture2,
  textureLocation;
  
init();

function init() {
  vertex_shader = `
attribute vec3 position;
void main() {

  gl_Position = vec4( position, 1.0 );

}
`;
  fragment_shader = `
  precision highp float;
uniform vec2 resolution;
uniform sampler2D texture;

void main( void ) {

  gl_FragColor = texture2D( texture, gl_FragCoord.xy / resolution.xy ).rgba;

}
`;

  canvas = document.getElementById('GameCanvas');

  // Initialise WebGL

  try {
    gl = canvas.getContext('webgl');

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.enable(gl.BLEND);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  } catch (error) {
    console.log(error);
  }

  // Create Vertex buffer (2 triangles)

  buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -1.0,
      -1.0,
      1.0,
      -1.0,
      -1.0,
      1.0,
      1.0,
      -1.0,
      1.0,
      1.0,
      -1.0,
      1.0
    ]),
    gl.STATIC_DRAW
  );

  // Create Program
  currentProgram = createProgram(vertex_shader, fragment_shader);
  texture1 = loadTexture('dst.png');
  texture2 = loadTexture('src.png');
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  gl.viewport(0, 0, canvas.width, canvas.height);
}

function loadTexture(url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);
  const image = new Image();
  image.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
       gl.generateMipmap(gl.TEXTURE_2D);
    } else {
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
    render()
  };
  image.src = url;
  return texture;
  function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
  }
}

function createProgram(vertex, fragment) {
  var program = gl.createProgram();

  var vs = createShader(vertex, gl.VERTEX_SHADER);
  var fs = createShader(
    fragment,
    gl.FRAGMENT_SHADER
  );

  if (vs == null || fs == null) return null;

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);

  gl.deleteShader(vs);
  gl.deleteShader(fs);

  gl.linkProgram(program);
  return program;
}

function createShader(src, type) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  return shader;
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  // Load program into GPU
  gl.useProgram(currentProgram);
  // Get var locations
  vertexPositionLocation = gl.getAttribLocation(currentProgram, 'position');
  textureLocation = gl.getUniformLocation(currentProgram, 'texture');
  // Set values to program variables
  gl.uniform2f(
    gl.getUniformLocation(currentProgram, 'resolution'),
    canvas.width,
    canvas.height
  );

  gl.uniform1i(textureLocation, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture1);

  // Render geometry

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(vertexPositionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vertexPositionLocation);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  gl.disableVertexAttribArray(vertexPositionLocation);

  // set custom blend mode
  gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
  // const functions = [
  //   'gl.ZERO',
  //   'gl.ONE',
  //   'gl.SRC_COLOR',
  //   'gl.ONE_MINUS_SRC_COLOR',
  //   'gl.DST_COLOR',
  //   'gl.ONE_MINUS_DST_COLOR',
  //   'gl.SRC_ALPHA',
  //   'gl.ONE_MINUS_SRC_ALPHA',
  //   'gl.DST_ALPHA',
  //   'gl.ONE_MINUS_DST_ALPHA',
  //   'gl.SRC_ALPHA_SATURATE',
  //   'gl.CONSTANT_COLOR',
  //   'gl.ONE_MINUS_CONSTANT_COLOR',
  //   'gl.CONSTANT_ALPHA',
  //   'gl.ONE_MINUS_CONSTANT_ALPHA'
  // ];
  gl.blendFuncSeparate(
    gl.SRC_ALPHA, // srcRGB
    gl.ONE_MINUS_SRC_ALPHA, // dstRGB
    gl.ONE, // srcAlpha
    gl.ONE_MINUS_SRC_ALPHA // dstAlpha
  );

  gl.bindTexture(gl.TEXTURE_2D, texture2);

  // Render geometry

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(vertexPositionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vertexPositionLocation);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  gl.disableVertexAttribArray(vertexPositionLocation);
}
