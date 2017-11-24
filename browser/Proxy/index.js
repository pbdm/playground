var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    target[key] = value;
    // return Reflect.set(target, key, value, receiver);
  }
});

obj.count = 1;
console.log(obj.count);
