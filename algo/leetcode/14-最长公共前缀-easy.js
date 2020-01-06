/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
/*
// s1 两两找出前缀
var longestCommonPrefix = function(strs) {
  if (strs.length === 0) {
    return '';
  }
  let prefix = strs[0];
  for (let i = 0; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1)
    }
  }
  return prefix;
};
*/

// s2 一位一位的确认
var longestCommonPrefix = function(strs) {
  if (strs.length === 0) {
    return '';
  }
  for (let i = 0; i < strs[0].length; i++) {
    let current = strs[0][i];
    for (let j = 1; j < strs.length; j++) {
      if (strs[j].charAt(i) !== current) {
        return strs[0].substring(0, i); 
      } 
    }
  }
  return strs[0];
};

// @lc code=end

