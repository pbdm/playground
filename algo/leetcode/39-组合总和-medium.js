/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// 树的方式去做
var combinationSum = function(candidates, target) {
  candidates.sort((a, b) => a - b);
  const ans = [];
  function backtrack(begin, diff, currentArr) {
    for (let i = begin; i < candidates.length; i++) {
      let arr = currentArr.slice();
      console.log('diff', diff, 'arr', arr)
      if (diff === candidates[i]) {
        arr.push(candidates[i]);
        ans.push(arr);
      } else if (diff < candidates[i]) {
        break;
      } else {
        arr.push(candidates[i]);
        backtrack(i, diff - candidates[i], arr)
      }
    }
  }
  backtrack(0, target,[])
  return ans;
};
// @lc code=end

