const canvas = document.querySelector('#glcanvas');
const gl = canvas.getContext('webgl');

// 生成着色器程序
const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

// 将数据存到对应的缓冲区中
const buffers = {
  position: initBuffers(gl, positions),
  color: initBuffers(gl, colors)
};

render();

function render() {
  // 一些简单的初始化操作
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // 清空成黑色背景
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  /// 指定着色器程序
  gl.useProgram(shaderProgram);

  // 将存在 postion 缓冲区的数据绑定为当前缓冲区, 在这个程序里现在当前缓冲区里应该是上一次初始化 color 的时候绑定的东西
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  // 获得 position 数据在着色器里的索引(地址)
  const positionIndex = gl.getAttribLocation(shaderProgram, 'aVertexPosition'); 
  // 指定从当前缓冲中读取数据的方式
  gl.vertexAttribPointer(
    positionIndex,
    2,        // numComponents, 每次迭代使用 2 个单位的数据
    gl.FLOAT, // type, 单位数据类型是 32 位的浮点型
    false,    // normalize, don't normalize
    0,        // stride, 移动距离 * 单位距离长度sizeof(type)(一个数据到下一个数据要跳过多少位), 一般是 0
    0         // offset, how many bytes inside the buffer to start from
  );
  // 根据地址激活属性以便使用
  gl.enableVertexAttribArray(positionIndex);

  // color 的数据使用和 position 类似
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
  const colorIndex = gl.getAttribLocation(shaderProgram, 'aVertexColor');  
  gl.vertexAttribPointer(
    colorIndex, 
    4, 
    gl.FLOAT, 
    false, 
    0, 
    0
  );
  gl.enableVertexAttribArray(colorIndex);

  // 绘制
  gl.drawArrays(
    gl.TRIANGLE_STRIP, 
    0, // offset
    4  // vertexCount
  );
}
