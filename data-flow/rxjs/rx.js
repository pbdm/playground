/* subject.next vs observable
var subject = new Rx.Subject();
var observable = Rx.Observable.from([1, 2, 3]);
var observer = (value) => {
  console.log(value)
}
subject.subscribe(observer); // 这里允许多个 observer 订阅
observable.subscribe(subject);
subject.next('22')
*/

/*
// subject and observable
var observerA = (value) => {
  console.log("a:" + value)
} 

// var observerB = (value) => {
//   console.log('b:' + value)
// } 

var subject = new Rx.Subject();
subject.subscribe(observerA);
// subject.subscribe(observerB);
// subject.next('s1');

var observable = Rx.Observable.from([1, 2, 3]);

observable.subscribe(subject); // 你可以提供一个 Subject 进行订阅

// observable.subscribe(observerA);
*/


// var button = document.querySelector('button');
// Rx.Observable.fromEvent(button, 'click')
//   // .throttleTime(1000)
//   .map(event => event.clientX)
//   .scan((count, clientX) => count + clientX, 0)
//   .subscribe(count => console.log(`Clicked ${count} times`));

// var observable = Rx.Observable.create(function (observer) {
//   observer.next(1);
//   observer.next(2);
//   observer.next(3);
//   setTimeout(() => {
//     observer.next(4);
//     observer.complete();
//   }, 1000);
// });

// console.log('just before subscribe');
// observable.subscribe({
//   next: x => console.log('got value ' + x),
//   error: err => console.error('something wrong occurred: ' + err),
//   complete: () => console.log('done'),
// });
// console.log('just after subscribe');


// var observable = Rx.Observable.create(function (observer) {
//   console.log('Hello');
//   observer.next(42);
//   observer.next(100);
// });
// console.log('before');
// var subscription = observable.subscribe(function (x) {
//   console.log(x);
// });
// subscription.unsubscribe();
// console.log('after');
// observable.subscribe(function (y) {
//   console.log(y);
// });

/* mulitcate
var source = Rx.Observable.from([1, 2, 3]);
var multicasted = source.multicast(subject);

// 在底层使用了 `subject.subscribe({...})`:
multicasted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
multicasted.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

// 在底层使用了 `source.subscribe(subject)`:
multicasted.connect();
*/

/*
// BehaviorSubject
var subject = new Rx.BehaviorSubject(0); // 0是初始值

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(3);
*/

/* ReplaySubject
var subject = new Rx.ReplaySubject(3); // 为新的订阅者缓冲3个值

// subject.subscribe({
//   next: (v) => console.log('observerA: ' + v)
// });

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});
*/


/* oper
function multiplyByTen(input) {
  var output = Rx.Observable.create(function(observer) {
    input.subscribe({
      next: (v) => observer.next(10 * v),
    });
  });
  return output;
}

var observable1 = Rx.Observable.interval(1000);
var observable2 = Rx.Observable.interval(400);

var input = Rx.Observable.merge(observable1, observable2);
var output = multiplyByTen(input);

*/

// var observable = Rx.Observable.create(function (observer) {
//   observer.next(1);
//   observer.next(2);
//   observer.next(3);
//   observer.complete();
// }).observeOn(Rx.Scheduler.asap);



/*
var increase = Rx.Observable.interval(400)
  .map(() => state => Object.assign({}, state, { count: state.count + 1 }))
  .scan((state, changeFn) => changeFn(state), { count: 0 });

// 我们使用初始状态创建了一个对象。每当状态发生变化时，我们会接收到改变状态的函数，
// 并把状态传递给它。然后返回新的状态并准备在下次点击后再次更改状态。

increase.subscribe(x => console.log(x))
*/

/*
var increaseButton = document.querySelector('#increase');
var increase = Rx.Observable.fromEvent(increaseButton, 'click')
  // 我们再一次映射到一个函数，它会增加 count
  .map(() => state => Object.assign({}, state, { count: state.count + 1 }));

var decreaseButton = document.querySelector('#decrease');
var decrease = Rx.Observable.fromEvent(decreaseButton, 'click')
  // 我们还是映射到一个函数，它会减少 count 
  .map(() => state => Object.assign({}, state, { count: state.count - 1 }));

var inputElement = document.querySelector('#input');
var input = Rx.Observable.fromEvent(inputElement, 'keypress')
  // 我们还将按键事件映射成一个函数，它会产生一个叫做 inputValue 状态
  .map(event => state => Object.assign({}, state, { inputValue: event.target.value }));

// 我们将这三个改变状态的 observables 进行合并
var state = Rx.Observable.merge(
  increase,
  decrease,
  input
).scan((state, changeFn) => changeFn(state), {
  count: 0,
  inputValue: ''
});

// 我们订阅状态的变化并更新 DOM
state.subscribe((state) => {
  document.querySelector('#count').innerHTML = state.count;
  document.querySelector('#hello').innerHTML = 'Hello ' + state.inputValue;
});

*/

/*
let liveStreaming$ = Rx.Observable.interval(1000).take(5).share().do((value) => {
  console.log('emit' + value)
});

liveStreaming$.subscribe(
  data => console.log('subscriber from first minute' + data),
  err => console.log(err),
  () => console.log('completed')
)

setTimeout(() => {
  liveStreaming$.subscribe(
    data => console.log('subscriber from 2nd minute' + data),
  err => console.log(err),
    () => console.log('completed')
  )
}, 1900)

// liveStreaming$.connect();
*/


/*
const source = Rx.Observable.timer(0, 5000);
// 当 source 发出值时切换到新的内部 observable，发出新的内部 observable 所发出的值
const example = source.switchMap(() => Rx.Observable.interval(500).map((v) => 10 * v));
// 输出: 0,1,2,3,4,5,6,7,8,9...0,1,2,3,4,5,6,7,8
const subscribe = example.subscribe(val => console.log(val));
*/

const interval$ = Rx.Observable.interval(1000);
const subject = new Rx.Subject();
interval$.subscribe(subject);
subject.subscribe(val => console.log(`First observer ${val}`));

setTimeout(() => {
  subject.subscribe(val => console.log(`Second observer ${val}`));
}, 2000);