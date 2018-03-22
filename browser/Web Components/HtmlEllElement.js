// http://www.zhangxinxu.com/wordpress/2018/03/htmlunknownelement-html5-custom-elements/
class HTMLEllElement extends HTMLElement {
  // 指定观察的属性，这样attributeChangedCallback才会起作用
  static get observedAttributes() { return ['rows']; }

  constructor() {
    // constructor中首先第一件事情就是调用 super
    // super指代了整个prototype或者__proto__指向的对象
    // 这一步免不了的
    super();

    // 创建shadow元素，实际上，从本例要实现的效果讲，
    // 直接元素上设置也可以，就是HTML丑了点，CSS要放在外部
    // 且目前火狐并不支持shadow dom可以不用，
    // 但一切为了学习，还是展现下现代web组件的实现方式
    var shadow = this.attachShadow({
        // open外部可访问（通过element.shadowRoot），closed则不能
        mode: 'open'
    });

    // 文本内容移动到shadow dom元素中
    var div = document.createElement('div');
    div.innerHTML = this.innerHTML;
    this.innerHTML = '';
    var style = document.createElement('style');
    shadow.appendChild(style);
    shadow.appendChild(div);
  }

  // 下面4个方法为常用生命周期
  connectedCallback() {
    console.log('自定义元素加入页面');
    // 执行渲染更新
    this._updateRendering();
  }
  disconnectedCallback() {
    // 本例子该生命周期未使用，占位示意
    console.log('自定义元素从页面移除');
  }
  adoptedCallback() {
    // 本例子该生命周期未使用，占位示意
    console.log('自定义元素转移到新页面');
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('自定义元素属性发生变化');
    this._rows = newValue;
    // 执行渲染更新
    this._updateRendering();
  }

  // 设置直接get/set rows属性的方法
  get rows() {
    return this._rows;
  }
  set rows(v) {
    this.setAttribute('rows', v);
  }

  _updateRendering() {
    // 根据变化的属性，改变组件的UI
    var shadow = this.shadowRoot;
    var childNodes = shadow.childNodes;
    var rows = this._rows;
    for (var i = 0; i < childNodes.length; i++) {
      if (childNodes[i].nodeName === 'STYLE') {
        childNodes[i].textContent = `div {
          display: -webkit-box;
          -webkit-line-clamp: ${rows};
          -webkit-box-orient: vertical;
          overflow: hidden;
        }`;
      }
    }
  }
}
// 定义x-ell标签元素为多行打点元素
customElements.define('x-ell', HTMLEllElement);
