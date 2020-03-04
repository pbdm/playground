const canvas = document.querySelector('#glcanvas');
const gl = canvas.getContext('webgl');
gl.enable(gl.BLEND);
gl.blendFuncSeparate(
  gl.SRC_ALPHA, // srcRGB
  gl.ONE_MINUS_SRC_ALPHA, // dstRGB
  gl.ONE, // srcAlpha
  gl.ONE_MINUS_SRC_ALPHA // dstAlpha
);
// 是否预乘
// http://www.jiazhengblog.com/blog/2017/01/04/2989/
gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
const buffers = {
  positions: initBuffers(gl, positions),
  texCoords: initBuffers(gl, texCoords)
}

// dst 在下面, 先渲染, src 在上面, 后渲染
loadTexture('./dst.png', (texture1) => {
  loadTexture('./src.png', (texture2) => {
    render(texture1, texture2)
  })
})

function render(texture1, texture2) {
  gl.clearColor(1.0, 1.0, 1.0, 1.0); // 白屏
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.useProgram(shaderProgram);

  const poositionIndex = gl.getAttribLocation(shaderProgram, 'aPosition'); 
  const textureIndex = gl.getUniformLocation(shaderProgram, 'uTexture');
  gl.uniform2f(
    gl.getUniformLocation(shaderProgram, 'uResolution'),
    canvas.width,
    canvas.height
  );
  gl.uniform1i(textureIndex, 0)

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.positions);
  gl.vertexAttribPointer(poositionIndex, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(poositionIndex);

  gl.bindTexture(gl.TEXTURE_2D, texture1);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

  // for texture
  gl.bindTexture(gl.TEXTURE_2D, texture2);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

}
