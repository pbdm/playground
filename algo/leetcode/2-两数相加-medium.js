/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  console.log(l1)
  let ans = current = {};
  while (l1 || l2) {
    const sum = (l1 && l1.val || 0 ) + (l2 && l2.val + 0) + (current.val || 0);
    const exceed = Math.floor(sum / 10);
    const val = sum % 10;
    l1 = l1 && l1.next;
    l2 = l2 && l2.next;
    current.val = val
    // 是否还有下一位
    if (l1 || l2 || exceed) {
      current.next = {
        val: exceed
      }
    }
    current = current.next;
  }
  return ans;
};
// @lc code=end

