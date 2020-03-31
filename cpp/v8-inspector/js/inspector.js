console.log('begin')

// test inspector
function receive(message) {
  console.log(message)
}
const msg = JSON.stringify({
  id: 0,
  method: 'Debugger.enable',
});
send(msg);
