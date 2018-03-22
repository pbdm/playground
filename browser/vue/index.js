var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log('message is: ' + this.message)
  },
  methods: {
    reverseMessage: function() {
      this.message = this.message.split('').reverse().join('');
    },
    cap: function() {
      console.log('cap')
    },
    bub: function() {
      console.log('bub');
    }
  }
});

/*
var app2 = new Vue({
  el: '#app-2',
  data: {
    message: '页面加载于 ' + new Date()
  }
});

var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
});

var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [{ text: '学习 JavaScript' }, { text: '学习 Vue' }, { text: '整个牛项目' }]
  }
});

var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function() {
      this.message = this.message.split('').reverse().join('');
    }
  }
});

var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
});

var Child = {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
};
var app7 = new Vue({
  el: '#app-7',
  components: {
    // <my-component> 将只在父模板可用
    'todo-item': Child
  },
  data: {
    groceryList: [
      { id: 0, text: '蔬菜' },
      { id: 1, text: '奶酪' },
      { id: 2, text: '随便其他什么人吃的东西' }
    ]
  }
});

*/
