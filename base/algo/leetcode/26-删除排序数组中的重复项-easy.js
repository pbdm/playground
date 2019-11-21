/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除排序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  // 传说重的双指针
  let newLength = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== nums[newLength]) {
      newLength++;
      nums[newLength] = nums[i]
    }
  }
  console.log(newLength)
  return newLength + 1
};
// @lc code=end

