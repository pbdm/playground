/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// o(n^2)
/*
var twoSum = function(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};
*/

// o(n)
// 使用哈希表以空间换时间
var twoSum = function(nums, target) {
  var hash = {}
  for (let i = 0; i < nums.length; i++) {
    let diff = target - nums[i];
    if (hash[diff] !== undefined) {
      return [hash[diff], i]
    }
    hash[nums[i]] = i;
  }
};

// @lc code=end

