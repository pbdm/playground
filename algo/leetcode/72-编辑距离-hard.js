/*
 * @lc app=leetcode.cn id=72 lang=javascript
 *
 * [72] 编辑距离
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
  // 创建一个全是0的二维数组
  const dp = new Array(word1.length + 1).fill(null).map(()=> new Array(word2.length + 1).fill(0))
  // dp[i][j] 代表 word1 到 i 位置转换成 word2 到 j 位置需要最少步数
  // word1 为空变成 word2 最少步数，就是插入操作
  for (let i = 0; i < dp.length; i++) {
    dp[i][0] = i
  }
  // word2 为空，需要的最少步数，就是删除操作
  for (let i = 0; i < dp[0].length; i++) {
    dp[0][i] = i
  }
  console.log(dp)
  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[0].length; j++) {
      const del = dp[i-1][j] + 1;
      const insert = dp[i][j-1] + 1;
      const change = dp[i-1][j-1] + (word1[i-1] !== word2[j-1] ? 1: 0)
      console.log(i, j, del, insert, change)
      dp[i][j] = Math.min(del, insert, change)
    }
  }
  console.log(dp)
  return dp[dp.length-1][dp[0].length-1]
};
// @lc code=end

