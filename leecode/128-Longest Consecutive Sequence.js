// https://leetcode.com/problems/longest-consecutive-sequence/

// Longest Consecutive Sequence

// Given an unsorted array of integers, find the length of the longest consecutive elements sequence.

// For example, Given [100, 4, 200, 1, 3, 2], The longest consecutive elements sequence is [1, 2, 3, 4]. Return its length: 4.

// Your algorithm should run in O(n) complexity.

// hash table
var arr = [10, 5, 4, 200, 1, 3, 2, 201];
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

console.log(longestConsecutive(arr));
