/*
 * @lc app=leetcode.cn id=344 lang=javascript
 *
 * [344] 反转字符串
 */

// @lc code=start
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
// var reverseString = function(s) {
//   return s.reverse();
// };

var reverseString = function(s) {
  let i = 0;
  let l = s.length - 1;
  while (l > i) {
    [s[i], s[l]] = [s[l], s[i]];
    l--;
    i++
  }
};
// @lc code=end

