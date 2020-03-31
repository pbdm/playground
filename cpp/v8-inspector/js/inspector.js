function receive(message) {
  console.log(message)
}

const msg = JSON.stringify({
  id: 0,
  method: 'Debugger.enable',
});


vconsole.log('vconsole')
console.log('console');
send(msg);
