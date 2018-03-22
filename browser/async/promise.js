function pro() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true)
    }, 5000);
  })
}

function done() {
  if (promiseFinish && clicked) {
    console.log('success')
  }
}

var promiseFinish = false;
var clicked = false;


pro().then((data)=> {
  promiseFinish = true;
  done();
});

document.addEventListener('click', () => {
  clicked = true;
  done();
});
