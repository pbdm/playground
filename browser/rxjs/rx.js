// Rx.Observable.of('foo', 'bar');
var myObservable = new Rx.Subject();
myObservable.subscribe(value => console.log(value));
myObservable.next('foo');
myObservable.next('bar');

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