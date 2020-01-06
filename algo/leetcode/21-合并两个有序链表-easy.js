import { link } from "fs";

/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
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
/*
var mergeTwoLists = function(l1, l2) {
  let crt = head = {}
  while (l1 && l2) {
    if (l1.val > l2.val) {
      crt.next = l2;
      l2 = l2.next;
    } else {
      crt.next = l1;
      l1 = l1.next;
    }
    crt = crt.next;
  }
  crt.next = l1 || l2;
  return head.next;
};
*/

// 递归
var mergeTwoLists = function(l1, l2) {
  if (!l1) {
    return l2
  }
  if (!l2) {
    return l1
  }
  let ret;
  if (l1.val < l2.val) {
    ret = l1;
    ret.next = mergeTwoLists(l1.next, l2)
  } else {
    ret = l2;
    ret.next = mergeTwoLists(l1, l2.next)
  }
  return ret;
};
// @lc code=end

