export function initPositionBuffers(gl) {
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = [
    -1.0, 1.0,
     1.0, 1.0,
    -1.0, -1.0,
     1.0, -1.0
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  return positionBuffer;
}

export function initColorBuffers(gl) {
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  const colors = [
    1.0, 1.0, 1.0, 1.0, // 白色
    1.0, 0.0, 0.0, 1.0, // 红色
    0.0, 1.0, 0.0, 1.0, // 绿色
    0.0, 0.0, 1.0, 1.0  // 蓝色
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  return colorBuffer;
}
