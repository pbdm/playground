/*
 * @lc app=leetcode.cn id=40 lang=javascript
 *
 * [40] 组合总和 II
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  const ans = [];
  candidates.sort((a, b) => a - b);
  console.log(candidates);
  function backTrace(begin, diff, arr) {
    console.log('begin', begin, 'diff', diff, 'arr', arr)
    for (let index = begin; index < candidates.length; index++) {
      if (candidates[index] === candidates[index - 1] && index > begin) {
        continue
      }
      console.log(index)
      const currentArray = arr.slice();
      if (diff === candidates[index]) {
        currentArray.push(diff);
        ans.push(currentArray)
      } else if (diff < candidates[index]) {
        break;
      } else {
        currentArray.push(candidates[index])
        // 关键这里每次要 + 1
        backTrace(index + 1, diff - candidates[index], currentArray)
      }
    }
  }
  backTrace(0, target, []);
  return ans;
};
// @lc code=end

