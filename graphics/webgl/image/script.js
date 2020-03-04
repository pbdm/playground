const canvas = document.querySelector('#glcanvas');
const gl = canvas.getContext('webgl');

const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
const buffers = {
  positions: initBuffers(gl, positions),
  texCoords: initBuffers(gl, texCoords)
}

loadTexture('./cloud.png',render)

function render(texture) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.useProgram(shaderProgram);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.positions);
  const poositionIndex = gl.getAttribLocation(shaderProgram, 'aPosition'); 
  gl.vertexAttribPointer(poositionIndex, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(poositionIndex);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texCoords);
  const texCoordIndex = gl.getAttribLocation(shaderProgram, 'aTexCoord'); 
  // 指定从当前缓冲中读取数据的方式
  gl.vertexAttribPointer(texCoordIndex, 2, gl.FLOAT, false, 0, 0) 
  gl.enableVertexAttribArray(texCoordIndex);

  // for texture
  const textureIndex = gl.getUniformLocation(shaderProgram, 'uTexture');
  // gl.activeTexture(gl.TEXTURE0);
  // console.log(gl.getParameter(gl.ACTIVE_TEXTURE));
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.uniform1i(textureIndex, 0)

  // 绘制
  gl.drawArrays(
    gl.TRIANGLE_STRIP, 
    0, // offset
    4  // vertexCount, 顶点数
  );
}
