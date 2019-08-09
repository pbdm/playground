// 简单的观察者模式示例

class Pubsub {

  constructor() {
    this.handles = {};
  }

  on (key, fn) {
    if (!this.handles[key]) {
      this.handles[key] = [];
    }
    this.handles[key].push(fn);
  }
  
  emit () {
    // 取出第一个参数(type 类型)
    const key = Array.prototype.shift.call(arguments);
    const fns = this.handles[key];
    if (fns && fns.length !== 0) {
      for (let i = 0; i < fns.length; i++) {
        fns[i].apply(this, arguments);
      }
      fns.length = 0; // remove all fns once we call it
    }
  }
}

const p = new Pubsub();

p.on('a', () => {
  console.log('here')
})

p.on('a', () => {
  console.log('there')
})

p.emit('a')

