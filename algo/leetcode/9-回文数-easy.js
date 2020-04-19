/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
/* 
// string
var isPalindrome = function(x) {
  var str = x + '';
  var ret = true;
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - i - 1]) {
      ret = false
      break;
    }
  }
  return ret
};
*/

// 通过反转后比较的方法
var isPalindrome = function(x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false
  }
  var rev = 0;
  while (x > rev) {
    rev = rev * 10 + x % 10
    x = parseInt(x / 10)
   
  }
  return x === rev || parseInt(rev / 10) === x

};
// @lc code=end

