/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let subStr = ''
  let max = 0;
  for (let index = 0; index < s.length; index++) {
    console.log(subStr)
    const letter = s[index];
    const pos = subStr.indexOf(letter);
    if (pos === -1) {
      subStr += letter;
    } else {
      subStr = subStr.slice(pos + 1) + letter;
    }
    max = Math.max(subStr.length, max);
  }
  return max;

};
// @lc code=end

