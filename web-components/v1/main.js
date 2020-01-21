const template = document.getElementById("my-template");
const templateBis = document.getElementById("my-template-bis");

class AppDrawer extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ 
      mode: "open" 
      // mode: "closed" 
    });
    this.shadowRoot.appendChild(template.content);
  }

  connectedCallback() {
    console.log('自定义元素加入页面');
    // 执行渲染更新
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
  }

}

// Custom Elements
window.customElements.define(template.id, AppDrawer)

// 非 Custom Elements
const shadowRoot = document.getElementById("root").attachShadow({ mode: 'open' });
shadowRoot.appendChild(templateBis.content);
