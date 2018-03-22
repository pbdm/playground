
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
    reverseMessage: function(e) {
      var _this2 = this;
        setTimeout(function () {
      _this2.test.bind(_this2, e)();
    }, 50);
      this.message = this.message.split('').reverse().join('');
    },
    test: function(e) {
    }

  }
});
