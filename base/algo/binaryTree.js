/**
 * javascript 二叉树遍历
 * 2014-07-16
 * 2019-12-20
 */
function Node(text) {
  this.text = text;
  this.leftChild = null;
  this.rightChild = null;
}

/**
 * 
 * @param {*} node 
 * @param {*} i: 当前根节点 index
 */
function buildTree(node, i) {
  let leftIndex = 2 * i + 1;
  let rightIndex = 2 * i + 2;
  if (leftIndex < charecters.length) {
    let childNode = new Node(charecters[leftIndex]);
    childNode.text = charecters[leftIndex];
    node.leftChild = childNode;
    buildTree(childNode, leftIndex);
  }
  if (rightIndex < charecters.length) {
    let childNode = new Node(charecters[rightIndex]);
    node.rightChild = childNode;
    buildTree(childNode, rightIndex);
  }
}
const charecters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
const newNode = new Node(charecters[0]);
buildTree(newNode, 0);
/*
       A
   B       C
 D   E   F   G
H I J K L M N O
*/
console.log(newNode)

let result = [];

// 前序遍历
function preorder(node) {
  result.push(node.text);
  if (node.leftChild) {
    preorder(node.leftChild)
  }
  if (node.rightChild) {
    preorder(node.rightChild)
  }
}
result = [];
preorder(newNode);
console.log('preorder', result)

// 中序遍历
function inorder(node) {
  if (node.leftChild) {
    inorder(node.leftChild)
  }
  result.push(node.text);
  if (node.rightChild) {
    inorder(node.rightChild)
  }
}
result = [];
inorder(newNode);
console.log('inorder', result)

// 后续遍历
function postorder(node) {
  if (node.leftChild) {
    postorder(node.leftChild)
  }
  if (node.rightChild) {
    postorder(node.rightChild)
  }
  result.push(node.text);
}
result = [];
postorder(newNode);
console.log('postorder', result)

// 非递归前序遍历 (父, 左 , 右)
function iterativePreorder(node) {
  const stack = [];
  while (node || stack.length) {
    if (node) {
      result.push(node.text)
      stack.push(node);
      node = node.leftChild;
    } else {
      node = stack.pop();
      node = node.rightChild
    }
  }
}
result = []
iterativePreorder(newNode);
console.log('非递归 preorder', result);

// 非递归中序遍历(左, 父, 右)
function iterativeInorder(node) {
  const stack = [];
  while (node || stack.length) {
    if (node) {
      stack.push(node);
      node = node.rightChild;
    } else {
      node = stack.pop();
      result.push(node.text)
      node = node.leftChild
    }
  }
}
result = []
iterativeInorder(newNode);
console.log('非递归 inorder', result);

// 非递归后序遍历 (左, 右, 父) TODO

