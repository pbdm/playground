import { initShaderProgram } from '../util.js';
import { vsSource, fsSource} from './shader.js';
import { initPositionBuffers, initColorBuffers } from './buffers.js';
const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

const programInfo = {
  program: shaderProgram,
  attribLocations: {
    vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor')
  },
  uniformLocations: {
    projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
    modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
  }
};

const buffers = {
  position: initPositionBuffers(gl),
  color: initColorBuffers(gl)
};

drawScene(gl);

function drawScene(gl) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black
  gl.clearDepth(1.0);                // Clear everything
  gl.enable(gl.DEPTH_TEST);          // Enable depth testing
  gl.depthFunc(gl.LEQUAL);           // Near things obscure far things

  // Clear the canvas before we start drawing on it.
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  gl.useProgram(programInfo.program);

  const projectionMatrix = mat4.create();

  // 设置45度的视图角度，并且宽高比设为 640/480（画布尺寸）。 指定在摄像机距离0.1到100单位长度的范围内，物体可见
  mat4.perspective(
    projectionMatrix,
    45 * Math.PI / 180,                             // fieldOfView in radians
    gl.canvas.clientWidth / gl.canvas.clientHeight, // aspect, 
    0.1,                                            // zNear, 
    100.0                                           // zFar
  );

  // 把物体放在距离摄像机6个单位的的位置
  const modelViewMatrix = mat4.create();
  mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);

  // Tell WebGL how to pull out the positions from the position buffer into the vertexPosition attribute.
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    2,        // numComponents, 每次迭代使用 2 个单位的数据
    gl.FLOAT, // type, 单位数据类型是 32 位的浮点型
    false,    // normalize, don't normalize
    0,        // stride, 移动距离 * 单位距离长度sizeof(type)(一个数据到下一个数据要跳过多少位), 一般是0
    0         // offset, how many bytes inside the buffer to start from
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

  // Tell WebGL how to pull out the colors from the color buffer into the vertexColor attribute.
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexColor, 
    4, 
    gl.FLOAT, 
    false, 
    0, 
    0
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);

  // Set the shader uniforms
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix, 
    false, 
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix, 
    false, 
    modelViewMatrix
  );
  
  gl.drawArrays(
    gl.TRIANGLE_STRIP, 
    0, // offset
    4  // vertexCount
  );
}
