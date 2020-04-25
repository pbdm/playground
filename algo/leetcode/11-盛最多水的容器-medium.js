/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */

function getValume(x, y, height) {
  return Math.min(height[x], height[y]) * (y - x);
}
// 双指针, 每次更新小的一边, 因为如果更新的是高的一边, 那移动过后的情况必定小于移动前的情况
var maxArea = function(height) {
  function getVolume(x, y) {
    return Math.min(height[x], height[y]) * (y - x);
  }
  let left = 0;
  let right = height.length - 1;
  let max = 0;
  while (right > left) {
    max = Math.max(getVolume(left, right), max);
    if (height[right] > height[left]) {
      left++;
    } else {
      right--;
    }
  }
  return max;
};
// @lc code=end

