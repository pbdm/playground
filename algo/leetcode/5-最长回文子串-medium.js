/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  if (s.length === 1) {
    return s;
  }
  let max = 0;
  let ans = '';
  for (let index = 0; index < s.length; index++) {
    let len = Math.max(
      getLenByCenter(index, index), 
      getLenByCenter(index, index + 1)
    );
    if (len > max) {
      max = len;
      let left;
      if (len % 2 === 0) {
        left = index - len / 2 + 1; 
      } else {
        left = index - Math.floor(len/ 2);
      }
      console.log('len', len, 'index', index, 'left', left)
      ans = s.substr(left, len)
    }
  }

  function getLenByCenter(l, r) {
    while ((l >= 0) && (r < s.length) && s[l] === s[r]) {
      l--;
      r++;
    }
    // 这里的 l 和 r 都多算了一次
    console.log('l', l, 'r', r);
    let result = r - l - 1;
    return result;
  }
  return ans;

};
// @lc code=end

