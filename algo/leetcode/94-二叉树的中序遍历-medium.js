/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */


// var inorderTraversal = function(root) {
//   let result = [];
//   function traversal(current) {
//     if (!current) {
//       return
//     }
//     if (current.left) {
//       traversal(current.left);
//     }
//     result.push(current.val)
//     if (current.right) {
//       traversal(current.right);
//     }
//   }
//   traversal(root)
//   return result;
// };

var inorderTraversal = function(root) {
  const stack = []; 
  const result = [];
  let node = root;
  while (node || stack.length) {
    if (node) {
      stack.push(node)
      node = node.left;
    } else {
      node = stack.pop();
      result.push(node.val);
      node = node.right;
    }
  }
  return result;
};


// @lc code=end

