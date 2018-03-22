Vue.component('child', {
  props: ['data', 'fun'],
  created: function() {
    this.fun();
  },
  template: '<li>{{data}}</li>'
})

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  props: ['test'],
  created: function () {
    // `this` 指向 vm 实例
    console.log('message is: ' + this.test)
  },
  methods: {
    fun: function() {
      console.log('fun')
    }
  }
});
