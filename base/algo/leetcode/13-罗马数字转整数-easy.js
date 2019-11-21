/*
 * @lc app=leetcode.cn id=13 lang=javascript
 *
 * [13] 罗马数字转整数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const valueMap = {
      'I': 1,
      'V': 5,
      'X': 10,
      'L': 50,
      'C': 100,
      'D': 500,
      'M': 1000
    }
    let total = 0;
    for (let i = 0; i < s.length; i++) {
      let current = s[i];
      let prev = s[i+1];
      if (valueMap[current] < valueMap[prev]) {
        total -= valueMap[current]
      } else {
        total += valueMap[current]
      }
    }
    return total
};
// @lc code=end

