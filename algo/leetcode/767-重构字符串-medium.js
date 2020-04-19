/*
 * @lc app=leetcode.cn id=767 lang=javascript
 *
 * [767] 重构字符串
 */

// @lc code=start
/**
 * @param {string} S
 * @return {string}
 */
var reorganizeString = function(S) {
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
    return '';
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
// @lc code=end

