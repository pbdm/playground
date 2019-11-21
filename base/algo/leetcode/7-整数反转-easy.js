/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  var rev = 0;
  while (x !== 0) {
    rev = rev * 10 + x % 10
    x = parseInt(x / 10)
  }
  // 为了 java 做的限制... 
  // js 里的限制应该是 Number.MAX_SAFE_INTEGER(Math.pow(2, 53) - 1): 9007199254740991
  let max = Math.pow(2, 31)
  if (rev > max || rev < - max ) {
    return 0
  } else {
    return rev
  }
};
// @lc code=end

