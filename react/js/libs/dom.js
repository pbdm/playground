// 获取第一个滚动父节点
// 为了更精确计算请使用 getComputedStyle 获取计算后的样式
export const getScrollParent = (node) => {
  if (!node) {
    return document;
  }
  const excludeStaticParent = node.style.position === 'absolute';
  const overflowRegex = /(scroll|auto)/;
  let parent = node;
  while (parent) {
    if (!parent.parentNode || (parent.parentNode === (node.ownerDocument || document))) {
      return node.ownerDocument || document;
    }
    // const { position, overflow, overflowX, overflowY } = parent.style;
    const { position, overflow, overflowX, overflowY } = getComputedStyle(parent);
    if (position === 'static' && excludeStaticParent) {
      continue;
    }
    if (overflowRegex.test(overflow + overflowX + overflowY)) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return node.ownerDocument || document;
};

// 获取CSS前缀
export const getStylePrefix = (style) => {
    const prefixs = [ 'webkit', 'Moz', 'ms', 'O' ];
    const dom = document.createElement('div').style;
    if (style in dom) return '';
    const newStyle = style.replace('-', ' ').replace(/(^|\s+)\w/g, s => s.toUpperCase()).replace(' ', '');
    // for (let i = 0; i < prefixs.length; i++) {
    for (const prefix of prefixs) {
        if ((prefix + newStyle) in dom) {
            return prefix;
        }
    }
    return null;
};

