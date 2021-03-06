const mat4 = glMatrix.mat4
const canvas = document.querySelector('#glcanvas');
const gl = canvas.getContext('webgl');

// const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
// const shaderProgram = initShaderProgram(gl, vsSourceTexture, fsSourceTexture);
const shaderProgram = initShaderProgram(gl, vsSourceNormal, fsSourceNormal);

const programInfo = {
  program: shaderProgram,
  // 寻找顶点着色器中需要的数据
  attribLocations: {
    vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal')
  },
  uniformLocations: {
    projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
    modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix')
  }
};

const buffers = {};
// for square
// buffers.position = initPositionBuffers(gl);
// buffers.color = initColorBuffers(gl);
// for cube
buffers.position = initCubePositionBuffers(gl);
buffers.color = initCubeColorBuffers(gl);
buffers.indices = initCubeIndicesBuffers(gl);

buffers.textureCoord = initCubeTextureCoordBuffers(gl);

buffers.normal = initCubeNormalBuffers(gl);

var then = 0;
var rotation = 0.0;
// const texture = loadTexture(gl, 'cubetexture.png');
const texture = initText(gl, 'hello', 100, 100)

// Draw the scene repeatedly
function render(now) {
  now *= 0.001;  // convert to seconds
  const deltaTime = now - then;
  then = now;
  drawScene(deltaTime);
  rotation += deltaTime;
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
// drawScene(gl, programInfo, buffers);



function drawScene(deltaTime) {
  gl.clearColor(0.0, 0.5, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
  // Clear the canvas before we start drawing on it.
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  gl.useProgram(programInfo.program);

  // 设置45度的视图角度，并且宽高比设为 640/480（画布尺寸）。 指定在摄像机距离0.1到100单位长度的范围内，物体可见
  const fieldOfView =45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
  // 把物体放在距离摄像机6个单位的的位置
  const modelViewMatrix = mat4.create();
  mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);
  mat4.rotate(modelViewMatrix, modelViewMatrix, rotation, [0, 0, 1]);
  mat4.rotate(modelViewMatrix, modelViewMatrix, rotation * .7, [0, 1, 0]);
  const normalMatrix = mat4.create();
  mat4.invert(normalMatrix, modelViewMatrix);
  mat4.transpose(normalMatrix, normalMatrix);

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    3, //  每次迭代使用3个单位的数据
    gl.FLOAT, // 单位数据类型是32位的浮点型
    false, // don't normalize
    0, // stride, 移动距离 * 单位距离长度sizeof(type)(一个数据到下一个数据要跳过多少位), 一般是0
    0   // offset, how many bytes inside the buffer to start from
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  // color
  // gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
  // gl.vertexAttribPointer( programInfo.attribLocations.vertexColor, 4, gl.FLOAT, false, 0, 0);
  // gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
  // texture
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
  gl.vertexAttribPointer( programInfo.attribLocations.textureCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
  // normal 法线
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
  gl.vertexAttribPointer( programInfo.attribLocations.vertexNormal, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray( programInfo.attribLocations.vertexNormal);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
  gl.uniformMatrix4fv( programInfo.uniformLocations.normalMatrix, false, normalMatrix);
  // Tell WebGL we want to affect texture unit 0
  // gl.activeTexture(gl.TEXTURE0);
  // Bind the texture to texture unit 0
  // gl.bindTexture(gl.TEXTURE_2D, texture);
  // Tell the shader we bound the texture to texture unit 0
  // gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
  
  // gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
}
