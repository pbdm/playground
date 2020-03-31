function receive(message) {
  print(message)
}

const msg = JSON.stringify({
  id: 0,
  method: 'Debugger.enable',
});

send(msg);
