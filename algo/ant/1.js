export const question = '给定一个自然数 n，算出 n 的阶乘，分别用递归和循环两种方式实现';
export let testResult = '运行中';

// 阶乘: n！= n* (n-1) * ... * 5 * 4 * 3 * 2 * 1
// 递归实现里，需要考虑 n 极大时的爆栈情况

function recursion(number) {
  function rec(n, total = 1) {
    if (n <= 0) {
      return total;
    } else {
      return rec.bind(null, n - 1, total * n);
    }
  }
  // 使用蹦床函数(thunk)
  function trampoline(f) {
    while (f && f instanceof Function) {
      f = f();
    }  
    return f;
  }
  return trampoline(rec(number))
}


function loop(n) {
  let total = 1;
  for (let index = 1; index <= n; index++) {
    total *= index;
  }
  return total;
}

/*******测试部分*******/
export function doTest() {
  try {
    assert.equal(recursion(3), 6);
    assert.equal(loop(3), 6);
    assert.equal(recursion(20), 2432902008176640000);
    assert.equal(loop(20), 2432902008176640000);
    testResult = "通过";
  } catch (ex) {
    testResult = "不通过";
  }
}
