/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  let pair = {
    ')': '(',
    '}': '{',
    ']': '['
  }
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    const current = s[i]
    if (!pair[current]) {
      stack.push(current)
    } else {
      const last = stack[stack.length - 1];
      if (pair[current] === last) {
        stack.pop();
      } else {
        return false
      }
    }
  }
  if (stack.length === 0) {
    return true;
  } else {
    return false
  }
};
// @lc code=end

