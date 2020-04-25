/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 排序, 放一个中间值与左右指针计算
var threeSum = function(nums) {
  if (nums.length < 3) {
    return [];
  }
  let array = nums.sort((a, b) => a - b)
  console.log(array)
  const ans = [];
  // 第一次做的时候老把 i 放中间, 后来把 i 放第一个了逻辑就简单多了
  for (let i = 0; i < array.length; i++) {
    if (array[i] === array[i - 1]) {
      continue;
    }
    let l = i + 1;
    let r = nums.length - 1;
    while (r > l) {
      let sum = array[r] + array[l] + array[i];
      if (sum > 0) {
        r--;
      } else if (sum < 0) {
        l++;
      } else {
        console.log('i', i, 'l', l, 'r', r)
        ans.push([array[i],array[l], array[r]]);
        // 找到第一个以后后面的都要去重
        while (array[l] === array[l + 1]) {
          l++;
        }
        while (array[r] === array[r - 1]) {
          r--;
        }
        l++;
        r--;
      }
    }
  }
  return ans;
};
// @lc code=end

