export const question = '重新排列一个字符串，使得每个相邻字符都不同';
export let testResult = '运行中';

// 字符串只包含小写字母或者数字

var reorganize = function(S) {
  let hashArr = new Array(26).fill(0);
  for (let i = 0; i< S.length; i++) {
    const index = S[i].charCodeAt() - 97;
    let item = hashArr[index];
    if (item) {
      item.count++
    } else {
      hashArr[index] = {
        count: 1,
        name: S[i]
      }
    }
  }
  hashArr = hashArr.filter((a) => {
    return a
  })
  hashArr.sort((a, b) => {
    return b.count - a.count;
  })
  const longest = hashArr[0];
  // 只要有一个数出现的次数大于 Math.ceil(S.length / 2) 就无法构造
  // a, a, a, b
  // a, a, a, a, b
  if (longest.count > Math.ceil(S.length / 2)) {
    return null;
  }
  const ans = new Array(longest.count).fill(longest.name);
  let index = 1;
  let ansIndex = 1;
  let count = hashArr[index].count;
  while (index < hashArr.length) {
    ans.splice(ansIndex, 0, hashArr[index].name)
    count--;
    if (!count) {
      index++;
      if (hashArr[index]) {
        count = hashArr[index].count
      }
    }
    ansIndex += 2;
    // 到顶了, 重新又回来插入
    // 最后一个可以插到最外面
    if (ansIndex >= ans.length + 1) {
      ansIndex = 1;
    }
  }
  return ans.join("");
};


/*******测试部分*******/
export function doTest() {
  try {
    assert.equal(reorganize('aabb'), 'abab');
    assert.equal(reorganize('aaa'), null);
    testResult = "通过";
  } catch (ex) {
    testResult = "不通过";
  }
}