import { SnapshotSandbox } from './sandbox.js';
import './hook.js';
import './listener.js';

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
app.innerHTML = 'parent app'

const appConfig = [
  {
    name: 'one'
  }, {
    name: 'two'
  }
]

// start micro FE framework
function start() {
  appConfig.forEach(app => {
    import (`./apps/${app.name}.js`)
    console.log(app)
  })
}

let count = 0;
const replaceState = document.createElement('div')
replaceState.innerHTML = 'replaceState'
replaceState.addEventListener('click', () => {
  count++
  history.replaceState(null, null, `#${count}`)
})

const pushState = document.createElement('div')
pushState.innerHTML = 'pushState'
pushState.addEventListener('click', () => {
  count++
  history.pushState(null, null, `#${count}`)
})

const hash = document.createElement('div')
hash.innerHTML = 'pushState'
hash.addEventListener('click', () => {
  count++
  location.hash = `#${count}`
})

document.body.appendChild(replaceState)
document.body.appendChild(pushState)
document.body.appendChild(hash)

start();