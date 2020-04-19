export const question = '找出一个字符串中，所有长度为 8，且出现超过 1 次的子串';
export let testResult = '运行中';

function findChildStr(str) {
  let stack = str[0];
  const result = [];
  for (let index = 1; index < str.length; index++) {
    if (stack[0] === str[index]) {
      stack += str[index];
    } else {
      if (stack.length >= 8) {
        if (result.indexOf(stack) === -1) {
          result.push(stack);
        }
      }
      stack = str[index];
    }
  }
  return result;
}

/*******测试部分*******/
export function doTest() {
  try {
    assert.deepEqual(findChildStr('AAAAAAAABBAAAAAAAA'), ['AAAAAAAA']);
    assert.deepEqual(findChildStr('BABABAB'), []);
    assert.deepEqual(findChildStr('AAAAAAAABBBBBBBBAAAAAAAABBBBBBBB'), ['AAAAAAAA', 'BBBBBBBB']);
    testResult = "通过";
  } catch (ex) {
    testResult = "不通过";
  }
}