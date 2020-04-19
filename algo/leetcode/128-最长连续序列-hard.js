/*
 * @lc app=leetcode.cn id=128 lang=javascript
 *
 * [128] 最长连续序列
 */

// @lc code=start
var arr = [10, 5, 4, 200, 1, 3, 2, 201];

// hash table(散列表, 哈希表)
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
  var mySet = new Set(nums);
  
  var heads = [];
  mySet.forEach((value)=> {
    if (!mySet.has(value - 1)) {
      heads.push(value)
    }
  })
  var max = 0;
  heads.forEach((value)=> {
    var len = 1;
    var temp = value + 1;
    while (mySet.has(temp)) {
      len++;
      temp++;
    }
    if (len > max) {
      max = len;
    }
  })
  return max;
}

// union-find (并查集)
var longestConsecutiveUnionFind = function(nums) {
  var max = 0;
  var mySet = new Set(nums);
  nums.forEach((value)=> {
    var left = value - 1;
    var right = value + 1; 
    var count = 1;
    while (mySet.has(left)) {
      count++;
      mySet.delete(left);
      left--;
    }
    while (mySet.has(right)) {
      count++;
      mySet.delete(right);
      right++;
    }
    if (count > max) {
      max = count;
    }
  })
  return max;
}
// console.log(longestConsecutive(arr));
console.log(longestConsecutiveUnionFind(arr));
// @lc code=end

