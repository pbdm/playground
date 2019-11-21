/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
/*
var removeElement = function(nums, val) {
  // 双指针
  let newLength = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[newLength] = nums[i]
      newLength++
    }
  }
  console.log(newLength)
  return newLength
};
*/

// 把不需要的元素移到最后的方法
var removeElement = function(nums, val) {
  // 双指针
  let length = nums.length;
  let newLength = 0
  while (newLength < length) {
    if (nums[newLength] === val) {
      nums[newLength] = nums[length - 1];
      length--;
    } else {
      newLength++

    }
  }
  return newLength
};

// @lc code=end

