import { SnapshotSandbox } from './sandbox.js';

// 测试 sandbox
let sandbox = new SnapshotSandbox();
((window) => {
    window.a = 1;
    window.b = 2;
    window.c = 3
    console.log(a,b,c)
    sandbox.inactive();
    console.log(a,b,c)
    sandbox.active();
    console.log(a,b,c)
})(sandbox.proxy);

const app = document.getElementById('app');
app.innerHTML = 'ddd'

const appConfig = [
  {
    name: 'one'
  }, {
    name: 'two'
  }, {
    name: 'three'
  }
]

function render() {
  appConfig.forEach(app => {
    console.log(app)
  })
}

render();