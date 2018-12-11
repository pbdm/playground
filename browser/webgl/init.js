const canvas = document.querySelector('#glcanvas');
// Initialize the GL context
// const gl = canvas.getContext("2d");
const gl = canvas.getContext('webgl');
// Only continue if WebGL is available and working
if (!gl) {
  alert(
    'Unable to initialize WebGL. Your browser or machine may not support it.'
  );
}
// Set clear color to black, fully opaque
// gl.clearColor(0.0, 0.0, 0.0, 1.0);
// Clear the color buffer with specified clear color
// gl.clear(gl.COLOR_BUFFER_BIT);


//  初始化着色器程序，让WebGL知道如何绘制我们的数据
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  // 创建着色器程序
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  // 创建失败， alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }
  return shaderProgram;
}

//
// 创建指定类型的着色器，上传source源码并编译
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  // Send the source to the shader object
  gl.shaderSource(shader, source);
  // Compile the shader program
  gl.compileShader(shader);
  // See if it compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

